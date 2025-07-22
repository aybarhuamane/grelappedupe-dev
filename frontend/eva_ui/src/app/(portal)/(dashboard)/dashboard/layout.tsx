/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { functionsGetUserData, NavBarCustom } from '@/modules/core'
import { auth } from '@/types'
interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  const { children } = props
  const [user, setUser] = useState<auth.IUserAuth | null>(null)
  const [rolesUser, setRolesUser] = useState<auth.IRole[] | null>(null)
  const { getUser, getRolesUser } = functionsGetUserData

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (user) {
      const roles = getRolesUser(user.groups)
      setRolesUser(roles)
    }
  }, [user])

  return (
    <main className="flex flex-col h-full">
      <NavBarCustom
        menuNavbar={[]}
        user={{
          name: `${user?.user.username.toUpperCase()}`,
          email: `${user?.user.email}`,
          roles: rolesUser || ([] as auth.IRole[]),
        }}
      />
      <article className="w-full h-full">{children}</article>
    </main>
  )
}
