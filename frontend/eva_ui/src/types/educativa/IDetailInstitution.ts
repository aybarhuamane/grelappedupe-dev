import {
  institution,
  director,
  educationalLevel,
  category,
  area,
} from '@/types'

interface IDetailInstitutionBase {
  id: number
  local_code: string
  modular_code: string
}

export interface IDetailInstitutionList extends IDetailInstitutionBase {
  institution: institution.IInstitutionList
  director: director.IDirectorList | null
  level: educationalLevel.IEducationalLevelList
  category: category.ICategory | null
  area: area.IArea
}

export interface IDetailInstitution extends IDetailInstitutionBase {
  institution: number
  director: number
  level: number
  category: number
  area: number
}

export interface IDetailInstitutionPost {
  local_code: string
  modular_code: string
  institution: number
  director: number
  level: number
  category: number | null
  area: number
  modality: number | null
  person?: number
}

export interface IDetailInstitutionUpdate {
  local_code: string
  modular_code: string
  institution: number
  director: number
  level: number
  category: number | null
  area: number
}

export interface IDetailInstitutionFilter {
  id?: number
  institution__id?: number
  director__person__id?: number
  local_code?: string
  local_code__icontains?: string
  modular_code?: string
  modular_code__icontains?: string
  level__id?: number
  level__name?: string
  level__name__icontains?: string
  level__modality__id?: number
  category__id?: number
  area_id?: number
  ordering?: string
  page?: number
}
