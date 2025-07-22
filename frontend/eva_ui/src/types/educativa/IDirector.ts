import { person } from '@/types'

interface IDirectorBase {
  id: number
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface IDirectorList extends IDirectorBase {
  last_name?: string
  name?: string
  person: person.IPersonList
}

export interface IDirector {
  id: number
  is_active: boolean
  person: number
}

export interface IDirectorFilter {
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
}

export interface IDirectorPost {
  is_active: boolean
  person: number
  detailinstitution?: number
}

export interface IDirectorTable {
  id: number
  name: string
  last_name: string
  num_document: string
  email: string
  phone: string
  status: string
  created_at: string
}

export interface IDirectorAssignmentList extends IDirectorBase {
  person: person.IPersonList
  is_active: boolean
}