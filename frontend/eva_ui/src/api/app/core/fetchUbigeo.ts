import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { ubigeo } from '@/types'

const apiBase = apiUrl.core.ubigeo

export async function fetchUbigeoList(filters: ubigeo.IUbigeoFilter) {
  const {
    code,
    district,
    province,
    region,
    region__icontains,
    page,
    ordering,
  } = filters

  const params = new URLSearchParams()

  if (code) params.append('code', code)
  if (district) params.append('district', district)
  if (province) params.append('province', province)
  if (region) params.append('region', region)
  if (region__icontains) params.append('region__icontains', region__icontains)
  if (page) params.append('page', page.toString())
  if (ordering) params.append('ordering', ordering)

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function createOrUpdateUbigeo(
  data: ubigeo.IUbigeoPost,
  id?: number
) {
  const url = id ? `${apiBase}/${id}/` : apiBase
  const method = id ? 'PUT' : 'POST'
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}
