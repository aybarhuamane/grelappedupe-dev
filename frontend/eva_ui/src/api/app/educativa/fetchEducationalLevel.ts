import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { educationalLevel } from '@/types'

const apiBase = apiUrl.educativa.educationallevels

export async function fetchEducationLevelList(
  filters: educationalLevel.IEducationalLevelFilter
) {
  const {
    is_active,
    ordering,
    page,
    modality__id,
    modality__name,
    modality__name__icontains,
    name__icontains,
  } = filters

  const params = new URLSearchParams()

  if (modality__id) params.append('modality__id', modality__id.toString())
  if (modality__name) params.append('modality__name', modality__name)
  if (modality__name__icontains)
    params.append('modality__name__icontains', modality__name__icontains)
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function createOrUpdateEducationLevel(
  data: educationalLevel.IEducationalPost,
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
