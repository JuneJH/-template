export interface IColumn {
    title: string
    dataIndex: string
    render?: (data: any) => any
}