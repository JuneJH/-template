import { HTTPCODE } from '@/services';
import { useCallback, useEffect, useReducer, useState, useRef } from 'react';

export interface IUsePageList {
  data: any
  setData: React.Dispatch<React.SetStateAction<never[]>>
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  condition: any
  setCondition: React.Dispatch<React.SetStateAction<any>>
  selectRows: number[]
  setSelectRows: React.Dispatch<React.SetStateAction<number[]>>
  clearCondition: any
  setClearCondition: any
  subResetAfter: (cb: (cond: any) => void) => void
  onSearchHandle: (data?: any) => void
}

/**
 * 获取页面初始化状态,
 * @param api 列表请求方法
 * @param initCondtion 初始化参数
 * @returns
 */
export default function usePageList<C>(
  api: any, initCondtion: C, option = { deps: [] } as any): IUsePageList {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState<C>(initCondtion);
  const [selectRows, setSelectRows] = useState<any>([]);
  const [clearCondition, setClearCondition] = useReducer((state) => state + 1, 0);
  const resetAfterHooks = useRef<any>([]);
  const subResetAfter = useCallback((cb: (conditon: unknown) => void) => {
    resetAfterHooks.current.push(cb)
  }, [])
  // 筛选项搜索 and 强制刷新页面
  const onSearchHandle = useCallback((data?: any) => {
    if (!data) {
      data = { ...initCondtion, page: 1 };
      setClearCondition();
      setSelectRows([]);
      setCondition((condition) => ({ ...condition, ...data }));
      resetAfterHooks.current && resetAfterHooks.current.forEach((cb: any) => {
        if (typeof cb === "function") {
          cb(condition)
        }
      })
    } else if (data === 'forceUpdate') {
      setCondition((condition) => ({ ...condition }));
    } else {
      setCondition((condition) => ({ ...condition, ...data, page: 1 }));
    }

  }, []);
  // 列表数据请求
  useEffect(() => {
    setLoading(true);
    setData([]);
    setSelectRows([]);
    api({ ...condition }).then((res: any) => {
      if (res.code === HTTPCODE.SUCCEED) {
        setData(res.data.data || res.data);
        setTotal(res.data.total || res?.data?.length);
        setLoading(false);
      } else {
        option.onError && option.onError(res);
      }
    });
  }, [condition, ...option.deps]);

  return {
    data,
    setData,
    total,
    setTotal,
    loading,
    setLoading,
    condition,
    setCondition,
    selectRows,
    setSelectRows,
    clearCondition,
    setClearCondition,
    onSearchHandle,
    subResetAfter,
  };
}
