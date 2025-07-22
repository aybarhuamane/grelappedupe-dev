/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { DataTable } from '@/modules/core'
import { useCategories } from '@/modules/director'
import { ColumnDef } from '@tanstack/react-table'
import { category } from '@/types'
import { DataTableRowActions } from './DataTableRowActions'
import { usePathname } from 'next/navigation'

const columns: ColumnDef<category.ICategoryTable>[] = [
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
        path="/director/manage-classrooms/level"
        id={row.original.id}
      />
    ),
  },
]

export const CategoriasList = () => {
  const { getCategories, listCategories } = useCategories()
  const pathname = usePathname()

  const isPath = pathname.split('/').pop() === 'category'

  useEffect(() => {
    if (isPath) {
      getCategories({})
    }
  }, [isPath])

  const data: category.ICategoryTable[] = listCategories?.results?.map(
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
