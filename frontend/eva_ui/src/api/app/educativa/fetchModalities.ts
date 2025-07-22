import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { modality } from '@/types'

const apiBase = apiUrl.educativa.modalitys

export async function fetchModalityList(filters: modality.IModalityFilter) {
  const { is_active, name__icontains, ordering, page } = filters

  const params = new URLSearchParams()

  if (name__icontains) params.append('name__icontains', name__icontains)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function fetchModality(id: number) {
  const response = await fetchCore(`${apiBase}${id}/`, {
    method: 'GET',
  })
  return response
}

export async function createOrUpdateInstitution(
  data: modality.IModalityPost,
  id?: number
) {
  const url = id ? `${apiBase}${id}/` : apiBase
  const method = id ? 'PUT' : 'POST'
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}
