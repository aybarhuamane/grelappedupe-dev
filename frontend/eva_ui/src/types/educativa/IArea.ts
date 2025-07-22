export interface IArea {
  id: number
  name: string
  is_active: boolean
}

export interface IAreaPost {
  name: string
  is_active: boolean
}
export interface IAreaFilter {
  name__icontains?: string
  is_active?: boolean
  ordering?: string
  page?: number
}
