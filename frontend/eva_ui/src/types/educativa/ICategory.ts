export interface ICategory {
  id: number
  name: string
  is_active: boolean
}

export interface ICategoryPost {
  name: string
  is_active: boolean
}
export interface ICategoryFilter {
  name__icontains?: string
  is_active?: boolean
  ordering?: string
  page?: number
}

export interface ICategoryTable {
  id: number
  name: string
  is_active: string
}
