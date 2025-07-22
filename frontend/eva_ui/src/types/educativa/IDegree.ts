import { detailInstitution } from '@/types'

interface IDegreeBase {
  id: number
  degree_text: string
  degree_number: string
  section: string
  is_active: boolean
}

export interface IDegreeList extends IDegreeBase {
  detail_institution: detailInstitution.IDetailInstitutionList
}

export interface IDegree extends IDegreeBase {
  detail_institution: number
}

export interface IDegreePost {
  degree_text: string
  degree_number: string
  section: string
  is_active: boolean
  detail_institution: number
}

export interface IDegreeFilter {
  id?: number
  section?: string
  section__icontains?: string
  is_active?: boolean
  detail_institution__id?: number
  detail_institution__institution__id?: number
  degree_number?: string
  ordering?: string
  page?: number
  page_size?: number
}

export interface IDegreeTable {
  id: number
  degree_text: string
  degree_number: string
  section: string
  is_active: string
  fullname?: string
}
