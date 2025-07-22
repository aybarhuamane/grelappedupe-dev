import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { director } from '@/types'

const apiBase = apiUrl.educativa

export async function fetchDirectorList(
  filters: director.IDirectorFilter,
  isList?: boolean
) {
  const {
    is_active,
    ordering,
    page,
    person,
    person__id,
    person__last_name__icontains,
    person__name__icontains,
    person__num_document,
    person__num_document__icontains,
    page_size
  } = filters

  const params = new URLSearchParams()

  if (person) params.append('person', person.toString())
  if (person__id) params.append('person__id', person__id.toString())
  if (person__last_name__icontains)
    params.append('person__last_name__icontains', person__last_name__icontains)
  if (person__name__icontains)
    params.append('person__name__icontains', person__name__icontains)
  if (person__num_document)
    params.append('person__num_document', person__num_document)
  if (person__num_document__icontains)
    params.append(
      'person__num_document__icontains',
      person__num_document__icontains
    )
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (page_size) params.append('page_size', page_size.toString())

  const url = isList ? apiBase.directorlist : apiBase.directors

  const response = await fetchCore(`${url}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}

export async function createOrUpdateDirector(
  data: director.IDirectorPost,
  id?: number
) {
  const url = id ? `${apiBase.directors}/${id}/` : apiBase.directors
  const method = id ? 'PUT' : 'POST'
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}

export async function directorGetId(id: number) {
  const response = await fetchCore(`${apiBase.directors}${id}`, {
    method: 'GET',
  })

  return response
}


export async function createNewDirector(
  data: director.IDirectorPost,
) {
  const url = `${apiBase.asignardirector}`
  const method = 'POST'
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}

export async function fetchDirectorListAction(
  filters: director.IDirectorFilter,
  isList?: boolean
) {
  const {
    is_active,
    ordering,
    page,
    person,
    person__id,
    person__last_name__icontains,
    person__name__icontains,
    person__num_document,
    person__num_document__icontains,
    page_size
  } = filters

  const params = new URLSearchParams()

  if (person) params.append('person', person.toString())
  if (person__id) params.append('person__id', person__id.toString())
  if (person__last_name__icontains)
    params.append('person__last_name__icontains', person__last_name__icontains)
  if (person__name__icontains)
    params.append('person__name__icontains', person__name__icontains)
  if (person__num_document)
    params.append('person__num_document', person__num_document)
  if (person__num_document__icontains)
    params.append(
      'person__num_document__icontains',
      person__num_document__icontains
    )
  if (is_active !== undefined) params.append('is_active', is_active.toString())
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (page_size) params.append('page_size', page_size.toString())

  const url = isList ? apiBase.directorlistaction : apiBase.directors

  const response = await fetchCore(`${url}?${params.toString()}`, {
    method: 'GET',
  })
  return response
}