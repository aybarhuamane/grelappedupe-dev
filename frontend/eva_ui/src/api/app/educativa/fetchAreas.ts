import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { area } from '@/types'

const apiBase = apiUrl.educativa.areas

export async function fetchAreaList(filters: area.IAreaFilter) {
  const { is_active, name__icontains, ordering, page } = filters

  const params = new URLSearchParams()

  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET', cache: 'no-store'
  })
  return response
}

export async function createOrUpdateArea(data: area.IAreaPost, id?: number) {
  const url = id ? `${apiBase}/${id}/` : apiBase
  const method = id ? 'PUT' : 'POST'
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}
