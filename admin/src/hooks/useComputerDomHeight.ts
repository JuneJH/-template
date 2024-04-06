import { useRef, useState, useEffect } from "react";

export function useComputerDomHeight(
    // ref: React.RefObject<HTMLElement> | React.RefObject<HTMLDivElement>,
    dep: any[]
) {
    const tableRef = useRef<HTMLDivElement>(null);
    const [tableH, setTableH] = useState(0);
    useEffect(() => {
        tableRef?.current && setTableH(tableRef?.current?.clientHeight + 50);
        window.onresize = () => {
            setTableH(0);
            tableRef?.current && setTableH(tableRef?.current?.clientHeight + 50);
        };
    }, [dep]);

    return {
        height:tableH,
        ref:tableRef
    }

}