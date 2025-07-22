'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableSections } from '@/modules/core'
import { courseAssignment } from '@/types'
const { DataTableRowActions } = DataTableSections

export const directorColumns: ColumnDef<courseAssignment.ITeacherAssignmentTable>[] =
  [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'date',
      header: 'Fecha de evaluación',
    },
    {
      accessorKey: 'grade',
      header: 'Grado',
    },
    {
      accessorKey: 'section',
      header: 'Seccion',
    },
    {
      accessorKey: 'number',
      header: 'Número',
    },
    {
      accessorKey: 'course',
      header: 'Curso',
    },
    {
      accessorKey: 'institution',
      header: 'Institución',
    },
    {
      accessorKey: 'modular_code',
      header: 'Cod. modular',
    },
    {
      accessorKey: 'local_code',
      header: 'Cod. local',
    },

    {
      accessorKey: 'status',
      header: 'Estado',
    },
    {
      accessorKey: 'validation',
      header: 'Validación',
    },
    {
      id: 'actions',
      header: 'Accion',
      cell: ({ row }) => <DataTableRowActions row={row} menuOptions={[]} />,
    },
  ]
