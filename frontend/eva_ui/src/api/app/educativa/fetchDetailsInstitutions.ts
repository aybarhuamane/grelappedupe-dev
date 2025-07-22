import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { detailInstitution } from '@/types'

const apiBase = apiUrl.educativa.detailinstitutions

export async function fetchDetailInstitutionList(
  filters: detailInstitution.IDetailInstitutionFilter
) {
  const {
    id,
    ordering,
    page,
    area_id,
    category__id,
    director__person__id,
    institution__id,
    level__id,
    level__modality__id,
    level__name,
    level__name__icontains,
    local_code,
    local_code__icontains,
    modular_code,
    modular_code__icontains,
  } = filters

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (area_id) params.append('area_id', area_id.toString())
  if (category__id) params.append('category__id', category__id.toString())
  if (director__person__id)
    params.append('director__person__id', director__person__id.toString())
  if (institution__id)
    params.append('institution__id', institution__id.toString())
  if (level__id) params.append('level__id', level__id.toString())
  if (level__modality__id)
    params.append('level__modality__id', level__modality__id.toString())
  if (level__name) params.append('level__name', level__name)
  if (level__name__icontains)
    params.append('level__name__icontains', level__name__icontains)
  if (local_code) params.append('local_code', local_code)
  if (local_code__icontains)
    params.append('local_code__icontains', local_code__icontains)
  if (modular_code) params.append('modular_code', modular_code)
  if (modular_code__icontains)
    params.append('modular_code__icontains', modular_code__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())

  const response = await fetchCore(
    `${apiUrl.educativa.detailinstitutionslist}?${params.toString()}`,
    {
      method: 'GET',
    }
  )
  return response
}

export async function createOrUpdateDetailInstitution(
  data: detailInstitution.IDetailInstitutionPost,
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

export async function updateDetailInstitution(
  data: detailInstitution.IDetailInstitutionUpdate,
  id?: number
) {
  const url = `${apiBase}${id}/`
  const method = 'PUT' 
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}

export async function fetchDetailInstitutionId(id: number) {
  const response = await fetchCore(`${apiBase}${id}`, {
    method: 'GET', cache: 'no-store'
  })

  return response
}

export async function fetchDetailInstitutionByInstitutionId(institution__id: number) {
  const response = await fetchCore(`${apiBase}?institution__id=${institution__id}`, {
    method: 'GET', cache: 'no-store'
  })

  return response
}