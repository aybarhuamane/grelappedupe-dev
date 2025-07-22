import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { auth } from '@/types'

const apiBase = apiUrl.account

export const fetchLogin = async (data: auth.ICredentials) => {
  const response = await fetchCore(`${apiBase.login}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return response
}
