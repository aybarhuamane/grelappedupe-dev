import { dashboardFuntions, fetchCore } from '@/api'
import { apiUrl } from '@/config'
import { detailDashboard } from '@/types'
import { IResApi } from '@/types/core/IResApi'
import { useState } from 'react'

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

const regionBase = apiUrl.core.region
const provinceBase = apiUrl.core.province
const districtBase = apiUrl.core.district

export const useDrelLocation = () => {
  const [loading, setLoading] = useState(false)
  const [listRegion, setListRegion] = useState<IRegion[] | null>(null)
  const [listProvince, setListProvince] = useState<IProvince[] | null>(null)
  const [listDistrict, setListDistrict] = useState<IDistrict[] | null>(null)
  const [listColegioApi, setListColegioApi] =
    useState<IResApi<IInstitutionEvaluated> | null>(null)

  const { fetchInstitutionEvaluated } = dashboardFuntions

  const getRegion = async () => {
    setLoading(true)

    const response = await fetchCore(regionBase, { method: 'GET' })

    if (response.ok) {
      const jsonResponse = await response.json()
      const values: IRegion[] = jsonResponse as IRegion[]
      setListRegion(values)
    } else {
      console.error('Error fetching data', response.statusText)
    }
    setLoading(false)
  }

  const getProvince = async (region: string) => {
    setLoading(true)
    const response = await fetchCore(`${provinceBase}?region=Loreto`, {
      method: 'GET',
    })

    if (response.ok) {
      const jsonResponse = await response.json()
      const values: IProvince[] = jsonResponse as IProvince[]
      setListProvince(values)
    } else {
      console.error('Error fetching data', response.statusText)
    }
    setLoading(false)
  }

  const getDistrict = async (region: string, province: string) => {
    setLoading(true)
    const response = await fetchCore(
      `${districtBase}?region=${region}&province=${province}`,
      { method: 'GET' }
    )

    if (response.ok) {
      const jsonResponse = await response.json()
      const values: IDistrict[] = jsonResponse as IDistrict[]
      setListDistrict(values)
    } else {
      console.error('Error fetching data', response.statusText)
    }
    setLoading(false)
  }

  const getColegio = async (
    filter: detailDashboard.IInsitutionEvaluatedFilter
  ) => {
    setLoading(true)
    try {
      const response = await fetchInstitutionEvaluated(filter)

      if (response.ok) {
        const jsonResponse = await response.json()
        const values: IResApi<IInstitutionEvaluated> =
          jsonResponse as IResApi<IInstitutionEvaluated>
        setListColegioApi(values)
      } else {
        console.error('Error fetching data', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching data', error)
      setListColegioApi(null)
    }
    setLoading(false)
  }

  return {
    getRegion,
    // getDrel,
    // getUgel,
    listRegion,
    getProvince,
    listProvince,
    getDistrict,
    listDistrict,
    loading,
    getColegio,
    listColegioApi,
  }
}
