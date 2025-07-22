'use client'

import Link from 'next/dist/client/link'
import { usePathname } from 'next/navigation'

interface IMenuUserProps {
  hrefProfile: string
  hrefContact: string
  hrefPassword?: string
}

export const MenuUser = (props: IMenuUserProps) => {
  const { hrefProfile, hrefContact, hrefPassword } = props
  const pathname = usePathname()

  const activeProfile = pathname === hrefProfile
  const activeContact = pathname === hrefContact
  const activePassword = pathname === hrefPassword

  return (
    <div className="flex flex-col p-5 gap-4 w-[286px] bg-white">
      <h1 className="font-bold">Menu</h1>
      <Link
        href={`${hrefProfile}`}
        className={`hover:bg-slate-100 p-2 hover:border rounded-sm text-sm ${
          activeProfile ? 'bg-slate-100 border' : ''
        }`}
      >
        <span className="text-sm">Datos Personales</span>
      </Link>
      <Link
        href={`${hrefContact}`}
        className={`hover:bg-slate-100 p-2 hover:border rounded-sm text-sm ${
          activeContact ? 'bg-slate-100 border' : ''
        }`}
      >
          Datos de Contacto
      </Link>
      <Link
        href={`${hrefPassword}`}
        className={`hover:bg-slate-100 p-2 hover:border rounded-sm text-sm ${
          activePassword ? 'bg-slate-100 border' : ''
        }`}
      >
        Cambiar Contraseña
      </Link>
    </div>
  )
}
