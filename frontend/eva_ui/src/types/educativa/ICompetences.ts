import { course } from '@/types'

export interface ICompetencesBase {
  id: number
  name: string
  is_active: boolean
  code: string
}

export interface ICompetencesList extends ICompetencesBase {
  course: course.ICourse
}

export interface ICompetences extends ICompetencesBase {
  course: number
}

export interface ICompetencesPost {
  name: string
  description?: string
  course: number
  code?: string
  is_active?: boolean
}

export interface ICompetencesFilter {
  id?: number
  name?: string
  name__icontains?: string
  course__id?: number
  course__name?: string
  course__name__icontains?: string
  is_active?: boolean
  ordering?: string
  page?: number,
  search?: string
  page_size?: number
}
