'use client'

import { ColumnDef } from '@tanstack/react-table'
import { period } from '@/types'
import { DataTableRowActions } from './components/PeriodActions'
import { Badge } from '@/components/ui/badge'

export const periodColumns: ColumnDef<period.IPeriodList>[] =
  [
    // {
    //   accessorKey: 'id',
    //   header: 'N°',
    // },
    {
      accessorKey: 'start_date',
      header: 'FECHA INCIAL',
    },
    {
      accessorKey: 'end_date',
      header: 'FECHA FINAL',
    },
    {
      accessorKey: 'name',
      header: 'NOMBRE DEL PERIODO',
    },
    {
      accessorKey: 'is_active',
      header: 'ESTADO',
      cell: ({ row }) => {
        const isActive = row.original.is_active

        return (
          <>
            {isActive ? (
              <Badge>EN PROCESO</Badge>
            ) : (
              <Badge className='bg-primary-foreground text-muted-foreground hover:bg-slate-300'>CONCLUIDO</Badge>
            )}
          </>
        )
      }
    },
    {
      id: 'actions',
      header: 'ACCIONES',
      cell: ({ row }) => (
        <DataTableRowActions path={row.original.id.toString()} />
      ),
    },
  ]