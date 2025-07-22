export interface IRegion {
  region: string
}

export interface IProvince {
  province: string
}

export interface IDistrict {
  district: string
}

export interface IInstitutionEvaluated {
  id: number
  evaluacion: 'evaluado' | 'no evaluado' | 'en proceso'
  local_code: string
  modular_code: string
  institution: Institution
  director: null
  level: Area
  category: null
  area: Area
}

export interface Area {
  id: number
  name: string
  is_active: boolean
  modality?: Area
}

export interface Institution {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  ubigeo: Ubigeo
}

export interface Ubigeo {
  id: number
  code: string
  region: string
  province: string
  district: string
}
