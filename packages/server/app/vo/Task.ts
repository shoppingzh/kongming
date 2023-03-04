export interface ListQuery {
  id: number
  keyword: string
  startTime: Date
  endTime: Date
  categoryId: number
  orderBy: string
  orderAsc: boolean
}

export interface ExportQuery extends ListQuery {
  sheetName?: string
}
