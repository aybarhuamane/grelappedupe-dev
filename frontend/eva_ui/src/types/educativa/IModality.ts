export interface IModality {
  id: number
  name: string
  is_active: boolean
}

export interface IModalityPost {
  name: string
  is_active: boolean
}

export interface IModalityFilter {
  name__icontains?: string
  is_active?: boolean
  ordering?: string
  page?: number
}

export interface IModalityTable {
  id: number
  name: string
  is_active: string
}
