import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { competences } from '@/types'

const apiBase = apiUrl.educativa.competences

export async function fetchCompetenceList(
  filters: competences.ICompetencesFilter
) {
  const {
    id,
    name,
    name__icontains,
    course__id,
    course__name,
    course__name__icontains,
    is_active,
    ordering,
    page,
    page_size,
    search,
  } = filters

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (name) params.append('name', name)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (course__id) params.append('course__id', course__id.toString())
  if (course__name) params.append('course__name', course__name)
  if (course__name__icontains)
    params.append('course__name__icontains', course__name__icontains)
  if (page_size) params.append('page_size', page_size.toString())
  if (search) params.append('search', search)

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  })
  return response
}

export async function createOrUpdateCompetence(
  data: competences.ICompetencesPost,
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
