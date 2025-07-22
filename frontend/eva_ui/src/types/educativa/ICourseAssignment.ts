import { teacher, course, degree } from '@/types'

interface ICourseAssignmentBase {
  id: number
  date: string
  is_active: boolean
  is_sent: boolean
  is_validated: boolean
}

export interface ICourseAssignmentList extends ICourseAssignmentBase {
  teaching: teacher.ITeacherList
  course: course.ICourse
  degree: degree.IDegreeList
}

export interface ICourseAssignment extends ICourseAssignmentBase {
  teaching: number
  course: number
  degree: number
}

export interface ICourseAssignmentPost {
  is_active: boolean
  is_validated: boolean
  is_sent?: boolean
  teaching: number
  course: number
  degree: number
}

export interface ICourseAssignmentFilter {
  id?: number
  course__id?: number
  degree__id?: number
  teacher__id?: number
  degree__detail_institution__id?: number
  date?: string
  date__gt?: string
  date__lt?: string
  is_active?: boolean
  is_sent?: boolean
  is_validated?: boolean
  ordering?: string
  page?: number
  page_size?: number
}

export interface ITeacherAssignmentList extends ICourseAssignmentBase {
  teaching: teacher.ITeacherList
  course: course.ICourse
  degree: degree.IDegreeList
}

export interface ITeacherAssignmentFilter {
  id?: number
  course__id?: number
  degree__id?: number
  teaching__id?: number
  date?: string
  date__gt?: string
  date__lt?: string
  is_active?: boolean
  is_validated?: boolean
  ordering?: string
  page?: number
  teaching__person__id?: number
}

export interface ITeacherAssignmentTable {
  id: number
  date: string
  is_active: boolean
  is_validated: boolean
  course: string
  grade: string
  section: string
  number: number
  institution: string
  modular_code: string
  local_code: string
}

export interface ICourseAssignmentTable {
  id: number
  date: string
  is_active: boolean
  is_validated: boolean
  is_sent: boolean
  teacher: string
  course: string
  degree: string
}
