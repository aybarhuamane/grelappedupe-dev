export interface IAchievement {
  id: number
  name: string
  worth_min: number
  worth_max: number
  is_active: boolean
}

export interface IAchievementPost {
  name: string
  worth_min: number
  worth_max: number
  is_active: boolean
}

export interface IAchievementFilter {
  id?: number
  name?: string
  name__icontains?: string
  is_active?: boolean
  page?: number
  ordering?: string
}
