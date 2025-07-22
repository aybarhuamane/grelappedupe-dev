import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './types'
import { functionsGetUserData } from './modules/core'

type Group =
  | 'ADMINISTRATIVO'
  | 'ADMINISTRADOR'
  | 'DOCENTE'
  | 'ALUMNO'
  | 'DIRECTOR'
  | 'USERIE'

const APP_NAME = process.env.APP_NAME

// Define las rutas y los roles permitidos
const routePermissions: Record<string, Group[]> = {
  '/director': ['DIRECTOR'],
  '/teacher': ['DOCENTE'],
  '/student': ['ALUMNO'],
  '/admin': ['ADMINISTRADOR', 'DIRECTOR'],
  '/institution': ['USERIE'],
}

export async function middleware(request: NextRequest) {
  const { getUser } = functionsGetUserData
  const currentUser = request.cookies.get(`${APP_NAME}_user`)?.value
  const dataUser: auth.IUserAuth = await getUser()

  const groupsParsed: auth.IGroup[] = dataUser?.groups || []
  const isAuthenticated = currentUser !== undefined

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Obtener la ruta solicitada
  const { pathname } = request.nextUrl

  // Verificar los permisos basados en la ruta
  for (const [route, allowedGroups] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route)) {
      const hasPermission = groupsParsed?.some((group) =>
        allowedGroups.includes(group.name.toUpperCase() as Group)
      )
      if (!hasPermission) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
      break
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/teacher/:path*', '/director/:path*', '/admin/:path*', '/institution/:path*'],
}
