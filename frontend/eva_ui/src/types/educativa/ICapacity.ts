import { competences } from '@/types'

interface ICapacityBase {
  id: number
  name: string
  is_active: boolean
  code: string
}

export interface ICapacityList extends ICapacityBase {
  competence: competences.ICompetences
}

export interface ICapacity extends ICapacityBase {
  competence: number
}

export interface ICapacityPost {
  name: string
  is_active: boolean
  competence: number
  code?: string
}
export interface ICapacityFilter {
  id?: number
  name?: string
  name__icontains?: string
  is_active?: boolean
  competence__id?: number
  competence__name?: string
  competence__name__icontains?: string
  ordering?: string
  page?: number
  competence__course__id?: number
  search?: string
  page_size?: number
}
