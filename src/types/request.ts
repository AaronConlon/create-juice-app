interface Response {
  code?: number | string
  message?: string
}

export interface ResponseData<T = any> extends Response {
  data: T
}

interface PageResponse extends Response {
  pageNum: number
  pageSize: number
  total: number
}

export interface PageResponseData<T = any> extends PageResponse {
  data: T
}

export interface PageModel {
  pageNum: number
  pageSize: number
}
