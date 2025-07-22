'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AsideSection = () => {
  const pathname = usePathname()
  const path = pathname.split('/').pop()

  return (
    <section className="bg-white py-4 px-6 rounded-md w-full">
      <ul className="grid grid-cols-1 gap-2 w-full">
        <Link
          className={`py-2 px-2 w-full hover:bg-gray-100 ${
            path === 'modality' ? 'bg-gray-100' : ''
          }`}
          href={`/director/manage-classrooms/modality`}
        >
          <li className="w-full ">Modalidades</li>
        </Link>
        <Link
          className={`py-2 px-2 w-full min-w-full hover:bg-gray-100 ${
            path === 'level' ? 'bg-gray-100' : ''
          }`}
          href={`/director/manage-classrooms/level`}
        >
          <li>Niveles</li>
        </Link>
        <Link
          className={`py-2 px-2 w-full hover:bg-gray-100 min-w-full ${
            path === 'category' ? 'bg-gray-100' : ''
          }`}
          href={`/director/manage-classrooms/category`}
        >
          <li>Categorias</li>
        </Link>
      </ul>
    </section>
  )
}
