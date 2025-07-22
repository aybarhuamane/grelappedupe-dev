/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { DataTable } from '@/modules/core'
import { useLevels } from '@/modules/director'
import { ColumnDef } from '@tanstack/react-table'
import { educationalLevel } from '@/types'
import { DataTableRowActions } from './DataTableRowActions'
import { usePathname } from 'next/navigation'

const columns: ColumnDef<educationalLevel.IEducationalLevelTable>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'modalidad',
    header: 'Modalidad',
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

export const NivelesList = () => {
  const { getLevels, listLevels } = useLevels()
  const pathname = usePathname()

  const isPath = pathname.split('/').pop() === 'level'

  useEffect(() => {
    if (isPath) {
      getLevels({})
    }
  }, [isPath])

  const data: educationalLevel.IEducationalLevelTable[] =
    listLevels?.results?.map((level) => ({
      id: level.id,
      name: level.name,
      modalidad: level.modality ? String(level.modality) : 'No asignado',
      is_active: level.is_active ? 'Activo' : 'Inactivo',
    }))
  return (
    <section className="">
      <DataTable
        columns={columns}
        data={data}
      />
    </section>
  )
}
