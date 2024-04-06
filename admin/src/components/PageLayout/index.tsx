import { useComputerDomHeight } from '@/hooks/useComputerDomHeight';
import usePageRequest, { IUsePageList } from '@/hooks/usePageRequest';
import { FC, useMemo, useRef } from 'react';
import Pagination from '../Pagination';
import { IColumn } from '../Pagination/interface/IColumn';
import style from './index.less';

interface IContext {
  initCondition: any;
  columns: IColumn[];
  conditionConf: any;
  h:number
}
export type ITContext = IUsePageList & IContext;

interface IProps {
  Statistics?: FC<ITContext>;
  Condition?: FC<ITContext>;
  Operate?: FC<ITContext>;
  Table?: FC<ITContext & {h:number}>;

  isPagination?: boolean;
  columns?: IColumn[];
  conditionConf?: any[];
  getDataHander: <T = any, R = any>(params: T) => Promise<R>;
  extraParams?: any;
}

const PageLayout: FC<IProps> = (props) => {
  const { Statistics, Condition, Operate, Table } = props;

  const {
    isPagination = true,
    conditionConf = [],
    getDataHander,
    extraParams,
    columns,
  } = props;
  // 计算所需的条件
  const defaultCondition: any = useMemo(() => {
    const temp: any = {};
    conditionConf.forEach((item: any) => {
      temp[item.dataIndex] = item.initValue;
      item?.secondDataIndex &&
        (temp[item.secondDataIndex] = item.secondInitValue);
    });
    return temp;
  }, []);

  // 默认参数,后期置空会利用该对象
  const initCondition = useRef<any>(defaultCondition);
  // 获取高度
  const { height: tableH, ref: tableRef } = useComputerDomHeight([Table]);
  const tableData = usePageRequest<any>(
    getDataHander,
    {
      ...initCondition.current,
      ...extraParams,
      keyword: '',
      page: 1,
      size: 200,
    },
    { deps: [getDataHander] },
  );
  // 重组上下文
  const context: ITContext = useMemo(
    () =>
      ({
        ...tableData,
        initCondition,
        columns,
        conditionConf,
      } as ITContext),
    [tableData],
  );
  return (
    <div className={`${style.pageLayout}`}>
      {Statistics && (
        <div className={style.statisticsContainer}>
          <Statistics {...context} />
        </div>
      )}
      {Condition && (
        <div className={style.conditionContainer}>
          <Condition {...context} />
        </div>
      )}
      <div className={style.tableContainer}>
        {true && (
          <div className={style.operate}>
            {Operate && <Operate {...context} />}
          </div>
        )}
        {Table && (
          <div className={style.tableContent} ref={tableRef}>
            <Table {...context} h={tableH - 100} />
          </div>
        )}
        {isPagination && (
          <div className={style.pageContainer}>
            <Pagination
              page={tableData?.condition?.page}
              size={tableData?.condition?.size}
              total={tableData?.total}
              selectRows={tableData?.selectRows?.length}
              onChange={(p, s) => {
                tableData?.setCondition({
                  ...tableData?.condition,
                  page: p,
                  size: s,
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
