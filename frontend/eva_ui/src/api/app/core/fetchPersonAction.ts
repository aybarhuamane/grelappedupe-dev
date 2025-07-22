import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { person } from '@/types'

const apiBase = apiUrl.core.personlist

export async function fetchPersonListActions(filters: person.IPersonFilter) {
  const {
    email__icontains,
    last_name__icontains,
    name__icontains,
    num_document,
    num_document__icontains,
    ordering,
    page,
    phone__icontains,
    page_size,
    search,
  } = filters

  const params = new URLSearchParams()

  if (email__icontains) params.append('email__icontains', email__icontains)
  if (last_name__icontains)
    params.append('last_name__icontains', last_name__icontains)
  if (name__icontains) params.append('name__icontains', name__icontains)
  if (num_document) params.append('num_document', num_document)
  if (num_document__icontains)
    params.append('num_document__icontains', num_document__icontains)
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (phone__icontains) params.append('phone__icontains', phone__icontains)
  if (page_size) params.append('page_size', page_size.toString())
  if (search) params.append('search', search)

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: 'GET', cache: 'no-store',
  })
  return response
}

// export async function createOrUpdatePerson(
//   data: person.IPersonPost,
//   id?: number
// ) {
//   const url = id ? `${apiBase}${id}/` : apiBase
//   const method = id ? 'PUT' : 'POST'
//   const response = await fetchCore(url, {
//     method,  cache: 'no-store',
//     body: JSON.stringify(data),
//   })
//   return response
// }

// export async function personGetId(id: number) {
//   const response = await fetchCore(`${apiBase}${id}`, {
//     method: 'GET', cache: 'no-store',
//   });

//   return response

// }