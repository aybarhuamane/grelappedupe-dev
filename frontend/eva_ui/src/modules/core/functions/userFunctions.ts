import { auth } from '@/types'
import { IResCookie } from '@/types/core/IResApi'
import { getCookie } from '@/utils/funtions'

const APP_NAME = process.env.APP_NAME

const roles = [
  { id: 2, key: 'DIRECTOR', name: 'DIRECTOR', pathUrl: '/director' },
  { id: 1, key: 'ADMIN', name: 'ADMINISTRADOR', pathUrl: '/admin' },
  { id: 3, key: 'TEACHER', name: 'DOCENTE', pathUrl: '/teacher' },
  { id: 4, key: 'USERIE', name: 'USERIE', pathUrl: '/institution' },
]

export function getRolesUser(groups: auth.IGroup[]): auth.IRole[] {
  const rolesUser = groups.map((group) => {
    const role = roles.find((role) => role.name === group.name)
    return role
  })

  return rolesUser as auth.IRole[]
}

export async function getUser() {
  const res: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie
  const user: auth.IUserAuth = res ? JSON.parse(res.value) : null
  return user
}
