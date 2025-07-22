export interface ICourse {
  id: number
  name: string
  is_active: boolean
}
export interface ICoursePost {
  name: string
  is_active: boolean
}
export interface ICourseFilter {
  id?: number
  name__icontains?: string
  name?: string
  is_active?: boolean
  ordering?: string
  page?: number
  page_size?: number
}
