/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { DataTable } from '@/modules/core'
import { useModalities } from '@/modules/director'
import { ColumnDef } from '@tanstack/react-table'
import { modality } from '@/types'
import { DataTableRowActions } from './DataTableRowActions'
import { usePathname } from 'next/navigation'

const columns: ColumnDef<modality.IModalityTable>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'is_active',
    header: 'Estado',
  },

  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        path="/director/manage-classrooms/modality"
        id={row.original.id}
      />
    ),
  },
]

export const ModalidadList = () => {
  const { getModalities, listCategories } = useModalities()
  const pathname = usePathname()

  const isPath = pathname.split('/').pop() === 'modality'

  useEffect(() => {
    if (isPath) {
      getModalities({})
    }
  }, [isPath])

  const data: modality.IModalityTable[] = listCategories?.results?.map(
    (category) => ({
      id: category.id,
      name: category.name,
      is_active: category.is_active ? 'Activo' : 'Inactivo',
    })
  )
  return (
    <section className="">
      <DataTable
        columns={columns}
        data={data}
      />
    </section>
  )
}
