export interface IResApi<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface IResCookie {
  name: string
  value: string
  path: string
}

export interface IErrorResponse {
  [key: string]: string[] | string
}
