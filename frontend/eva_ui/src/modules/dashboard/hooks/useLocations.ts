'use client'
import { useState } from 'react'
import { fetchCore } from '@/api'
import { apiUrl } from '@/config'
import { IResApi } from '@/types/core/IResApi'
import { detailDashboard, dashboardData } from '@/types'
import { dashboardFuntions } from '@/api'
import { IInstitutionEvaluated } from '@/types/dashboard/IDashboradData'

interface IRegion extends dashboardData.IRegion {}
interface IProvince extends dashboardData.IProvince {}
interface IDistrict extends dashboardData.IDistrict {}

const regionBase = apiUrl.core.region
const provinceBase = apiUrl.core.province
const districtBase = apiUrl.core.district

export const useDrelLocation = () => {
  const [loading, setLoading] = useState(false)
  const [listRegion, setListRegion] = useState<IRegion[]>([])
  const [listProvince, setListProvince] = useState<IProvince[]>([])
  const [listDistrict, setListDistrict] = useState<IDistrict[]>([])
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
