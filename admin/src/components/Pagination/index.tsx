import { FC } from 'react';
import { Pagination } from 'antd';
import style from './index.less';
interface IProps {
  page: number;
  size: number;
  total: number;
  selectRows?: number;
  onChange: (page: number, size: number) => void;
}
const Page: FC<IProps> = (props) => {
  const { size, page, total, onChange, selectRows } = props;
  return (
    <div className={style.pagination}>
      <div className={style.pageTip}>
        <span>{selectRows !== undefined ? `选择 ${selectRows} 条/` : ''}</span>
        共 {total} 条记录
      </div>
      <Pagination
        pageSizeOptions={[10, 50, 200, 1000]}
        showQuickJumper
        pageSize={size}
        current={page}
        total={total}
        onChange={onChange}
      />
    </div>
  );
};

export default Page;
