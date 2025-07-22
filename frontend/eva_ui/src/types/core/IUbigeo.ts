export interface IUbigeoList {
  id: number
  code: string
  region: string
  province: string
  district: string
}

export interface IUbigeoFilter {
  code?: string
  region?: string
  region__icontains?: string
  province?: string
  district?: string
  page?: number
  ordering?: string
}

export interface IUbigeoPost {
  code: string
  region: string
  province: string
  district: string
}
