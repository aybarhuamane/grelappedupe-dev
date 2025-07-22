import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { competences } from '@/types'

const apiBase = apiUrl.educativa.competences

export async function fetchCompetenceListByCourseId(
  filters: competences.ICompetencesFilter
) {
  const { id, name, name__icontains, course__id, course__name, course__name__icontains, is_active, ordering, page, search } = filters

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (name) params.append('name', name)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (course__id) params.append('course__id', course__id.toString())
  if (course__name) params.append('course__name', course__name)
  if (course__name__icontains) params.append('course__name__icontains', course__name__icontains)
  if (search) params.append('search', search)

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}