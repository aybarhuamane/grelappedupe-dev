import { modality } from '@/types'

interface IEducationalLevelBase {
  id: number
  name: string
  is_active: boolean
}

export interface IEducationalLevelList extends IEducationalLevelBase {
  modality: modality.IModality
}

export interface IEducationalLevel extends IEducationalLevelBase {
  modality: number
}

export interface IEducationalPost {
  name: string
  is_active: boolean
  modality: number
}
export interface IEducationalLevelFilter {
  name__icontains?: string
  modality__id?: number
  modality__name__icontains?: string
  modality__name?: string
  is_active?: boolean
  ordering?: string
  page?: number
}

export interface IEducationalLevelTable {
  id: number
  name: string
  modalidad: string
  is_active: string
}
