import { dashboardData } from '@/types'

interface IDistritoApi extends dashboardData.IDistrict {}
interface IProvinciaApi extends dashboardData.IProvince {}

export const renderOptionsDistrito = (listDistrito: IDistritoApi[]) => {
  const options = [{ key: 'all', label: '-- Todos--' }]

  listDistrito.forEach((item) => {
    options.push({ key: item.district, label: item.district })
  })

  return options
}

export const renderOptionsProvincia = (listProvincia: IProvinciaApi[]) => {
  const options = [{ key: 'all', label: '-- Todos--' }]

  listProvincia.forEach((item) => {
    options.push({ key: item.province, label: item.province })
  })

  return options
}
