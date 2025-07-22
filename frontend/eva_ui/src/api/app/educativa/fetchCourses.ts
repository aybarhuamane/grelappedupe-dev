import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { course } from '@/types'

const apiBase = apiUrl.educativa.courses

export async function fetchCourseList(filters: course.ICourseFilter) {
  const { is_active, id, ordering, page, name, name__icontains, page_size } =
    filters

  const params = new URLSearchParams()

  if (name) params.append('name', name)
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (id) params.append('id', id.toString())
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (page_size) params.append('page_size', page_size.toString())

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function createOrUpdateCourse(
  data: course.ICoursePost,
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

export async function deleteCourse(id: number) {
  const url = `${apiBase}${id}/`
  const response = await fetchCore(url, {
    method: 'DELETE',
  })
  return response
}
