import { detailInstitution, person } from '@/types'

interface ITeacherBase {
  id: number
  created_at: string
  updated_at: string
  is_active: boolean
  status: string
}

export interface ITeacherList extends ITeacherBase {
  person: person.IPersonList
}

export interface ITeacherDetail extends ITeacherBase {
  person: number
}
export interface ITeacherFilter {
  person?: number
  person__id?: number
  person__name__icontains?: string
  person__last_name__icontains?: string
  person__num_document__icontains?: string
  person__num_document?: string
  is_active?: boolean
  page?: number
  ordering?: string
  page_size?: number
  search?: string
}
export interface ITeacherPost {
  is_active: boolean
  person: number
}

export interface ITeacherTable {
  id: number
  // created_at: string
  // updated_at: string
  name: string
  last_name: string
  num_document: string
  email: string
  phone: string
  status: string
}

export interface ITeacherAssigmentSchool {
  id: number
  is_active: boolean
  detail_institution: number
  teaching: number
}

export interface ITeacherAssigmentSchoolList {
  id: number
  is_active: boolean
  detail_institution: detailInstitution.IDetailInstitutionList
  teaching: ITeacherList
}

export interface ITeacherAssigmentSchoolFilter {
  id?: number
  teaching?: number
  detail_institution?: number
  is_active?: boolean
  teaching__person__num_document?: string
  teaching__person__num_document__icontains?: string
  teaching__person__name?: string
  teaching__person__name__icontains?: string
  teaching__person__last_name?: string
  teaching__person__last_name__icontains?: string
  detail_institution__modular_code?: string
  detail_institution__modular_code__icontains?: string
  page?: number
  page_size?: number
  ordering?: string
  search?: string
}

export interface ITeacherAssigmentSchoolPost {
  is_active: boolean
  detail_institution: number
  teaching: number
}

export interface ITeacherAssigmentSchoolPostAction {
  is_active: boolean
  detail_institution: number
  person: number
}
