'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableSections } from '@/modules/core'
import { director } from '@/types'
const { DataTableRowActions } = DataTableSections
import { format } from "date-fns"

export const directoresColumns: ColumnDef<director.IDirectorTable>[] =
    [
        {
            accessorKey: 'id',
            header: 'N°',
        },
        {
            accessorKey: 'name',
            header: 'NOMBRES',
        },
        {
            accessorKey: 'last_name',
            header: 'APELLIDOS',
        },
        {
            accessorKey: 'num_document',
            header: 'DOCUMENTO',
        },
        {
            accessorKey: 'email',
            header: 'CORREO',
        },
        {
            accessorKey: 'phone',
            header: 'TELÉFONO',
        },
        {
            accessorKey: 'status',
            header: 'ESTADO',
        },
        {
            accessorKey: 'created_at',
            header: 'FECH.CREACION',
            cell: ({ row }) => {
                return format(row.original.created_at, 'dd/MM/yyyy')
            }
        },
        {
            id: 'actions',
            header: 'ACCIONES',
            cell: ({ row }) => (
                <DataTableRowActions
                    row={row}
                    menuOptions={[
                        { label: 'Detalles', url : `/admin/director-manage/${row.original.id}` },
                    ]}
                />
            ),
        },
    ]