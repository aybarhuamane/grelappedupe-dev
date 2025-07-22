'use client'
import { Button } from '@/components/ui/button'
import { detailInstitution } from '@/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const MapSection = dynamic(
  () => import('./MapSection').then((mod) => mod.MapSection),
  { ssr: false }
)
interface IDetailsSectionProps {
  data: detailInstitution.IDetailInstitutionList
}

export const DetailsSection = (props: IDetailsSectionProps) => {
  const { data } = props
  const { institution, director, level, category, area, modular_code } = data

  return (
    <main className="flex flex-col gap-5 bg-white py-8 px-6 h-full">
      <section className="flex flex-col gap-3 w-full">
        <header>
          <p className="text-xs text-gray-500">Detalles de colegio</p>
          <div className='flex gap-4 items-center'>
            <span className='text-sm text-gray-500'>Código modular: </span>
            <h1 className="font-bold uppercase">
              {modular_code}
            </h1>
          </div>
          <div className='flex gap-4 items-center'>
            <span className='text-sm text-gray-500'>Nombre: </span>
            <h1 className="font-bold uppercase">
              {institution?.name}
            </h1>
          </div>
        </header>
        <section className="text-sm text-gray-500 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Nivel | Modalidad :</h2>
            <h3 className="col-span-2">
              {level?.name || 'No registradi'} -{' '}
              {level?.modality?.name || 'Sin dirección'}
            </h3>
          </div>
          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Director :</h2>
            <h3 className="col-span-2">
              <div>
                  <h3 className="col-span-2">{director?.person?.name} {director?.person?.last_name}</h3>
                  <Link href="/institution/create">
                    <Button size='sm'>Asignar director</Button>
                  </Link>
                </div> 
              {/* {
                director === null ? <div>
                  <h3 className="col-span-2">Sin director asignado</h3>
                  <Link href="/institution/create">
                    <Button size='sm'>Asignar director</Button>
                  </Link>
                </div> : `${director?.person?.name} ${director?.person?.last_name}`
              } */}
            </h3>
          </div>

          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Localidad :</h2>
            <h3 className="col-span-2">
              {institution?.ubigeo?.region || ''} -{' '}
              {institution?.ubigeo?.province || ''} -{' '}
              {institution?.ubigeo?.district || ''}
            </h3>
          </div>
          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Dirección :</h2>
            <h3 className="col-span-2">
              {institution?.address || 'Sin dirección'}
            </h3>
          </div>
          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Cod. Ubigeo :</h2>
            <h3 className="col-span-2"> {institution?.ubigeo?.code}</h3>
          </div>
          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Área :</h2>
            <h3 className="col-span-2"> {area?.name}</h3>
          </div>
          <div className="grid grid-cols-4">
            <h2 className="col-span-2">Categoria :</h2>
            <h3 className="col-span-2"> {category?.name || 'No asignado'}</h3>
          </div>
        </section>
      </section>
      <section className="grid grid-cols-1 gap-2">
        <div>
          <p className="text-sm">Ubicación</p>
        </div>
        <main className="border-2 rounded-md">
          <MapSection
            data={{
              lat: Number(institution?.latitude) || 0,
              lng: Number(institution?.longitude) || 0,
            }}
          />
        </main>
      </section>
    </main>
  )
}
