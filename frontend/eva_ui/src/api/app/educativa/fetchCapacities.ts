import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { capacity } from '@/types'

const apiBase = apiUrl.educativa.capacitys
const apiBaseAction = apiUrl.educativa.capacitysaction

export async function fetchCapacityList(filters: capacity.ICapacityFilter) {
  const {
    is_active,
    name__icontains,
    competence__id,
    competence__name,
    competence__name__icontains,
    id,
    name,
    ordering,
    page,
    competence__course__id,
  } = filters

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (name) params.append('name', name)
  if (competence__id) params.append('competence__id', competence__id.toString())
  if (competence__name) params.append('competence__name', competence__name)
  if (competence__name__icontains)
    params.append('competence__name__icontains', competence__name__icontains)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (competence__course__id)
    params.append('competence__course__id', competence__course__id.toString())

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function createOrUpdateCapacity(
  data: capacity.ICapacityPost,
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

export async function fetchCapacityListAction(filters: capacity.ICapacityFilter) {
  const {
    is_active,
    name__icontains,
    competence__id,
    competence__name,
    competence__name__icontains,
    id,
    name,
    ordering,
    page,
    competence__course__id,
    search,
    page_size,
  } = filters

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (name) params.append('name', name)
  if (competence__id) params.append('competence__id', competence__id.toString())
  if (competence__name) params.append('competence__name', competence__name)
  if (competence__name__icontains)
    params.append('competence__name__icontains', competence__name__icontains)
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (competence__course__id)
    params.append('competence__course__id', competence__course__id.toString())
  if (search) params.append('search', search)
  if (page_size) params.append('page_size', page_size.toString())

  const response = await fetchCore(`${apiBaseAction}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function fetchCapacityById(id: number) {
  const response = await fetchCore(`${apiBase}${id}/`, {
    method: 'GET',
  })
  return response
}