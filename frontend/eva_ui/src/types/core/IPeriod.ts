export interface IPeriodList {
  id: number
  name: string
  start_date: string
  end_date: string
  is_active: boolean
}
export interface IPeriodFilter {
  name?: string
  name__icontains?: string
  start_date?: string
  start_date__icontains?: string
  start_date__gte?: string
  start_date__lte?: string
  end_date?: string
  end_date__icontains?: string
  end_date__gte?: string
  end_date__lte?: string
  is_active?: boolean
  page?: number
  ordering?: string
  page_size?: number
}

export interface IPeriodPost {
  name: string
  start_date: string
  end_date: string
  is_active: boolean
}
