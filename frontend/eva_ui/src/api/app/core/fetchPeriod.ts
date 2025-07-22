import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { period } from '@/types'
import { revalidatePath } from 'next/cache'

const apiBase = apiUrl.core.period

export async function fetchPeriodoList(filters: period.IPeriodFilter) {
  const {
    end_date,
    end_date__gte,
    end_date__icontains,
    end_date__lte,
    is_active,
    name,
    name__icontains,
    ordering,
    page,
    start_date,
    start_date__gte,
    start_date__icontains,
    start_date__lte,
    page_size
  } = filters

  const params = new URLSearchParams()

  if (end_date) params.append('end_date', end_date)
  if (end_date__gte) params.append('end_date__gte', end_date__gte)
  if (end_date__icontains)
    params.append('end_date__icontains', end_date__icontains)
  if (end_date__lte) params.append('end_date__lte', end_date__lte)
  if (is_active !== undefined)
    params.append('is_active', is_active ? 'true' : 'false')
  if (name) params.append('name', name)
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (start_date) params.append('start_date', start_date)
  if (start_date__gte) params.append('start_date__gte', start_date__gte)
  if (start_date__icontains)
    params.append('start_date__icontains', start_date__icontains)
  if (start_date__lte) params.append('start_date__lte', start_date__lte)
  if (page_size) params.append('page_size', page_size.toString())

  // const response = await fetchCore(`${apiBase}/?${params.toString()}`, {
  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  })
  return response
}

export async function fetchPeriod(id: number) {
  const response = await fetchCore(`${apiBase}${id}/`, {
    method: 'GET',
    cache: 'no-store',
  })
  return response
}

export async function createOrUpdatePeriod(
  data: period.IPeriodPost,
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
