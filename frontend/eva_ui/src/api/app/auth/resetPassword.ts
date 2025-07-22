import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { IResetPassword } from '@/types/auth/IAuth'

const apiBase = apiUrl.account

export async function resetPassword(id: number) {
    const person_id = id

    const response = await fetchCore(`${apiBase.resetpassword}`, {
      method: 'POST', cache: 'no-store',
      body: JSON.stringify({person_id}),
    })
  
    return response
  }

  export async function modifyPassword(data: IResetPassword) {

    const response = await fetchCore(`${apiBase.modifypassword}`, {
      method: 'POST', cache: 'no-store',
      body: JSON.stringify(data),
    })
  
    return response
  }