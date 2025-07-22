'use client'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableSections } from '@/modules/core'
import { courseAssignment } from '@/types'
const { DataTableRowActions } = DataTableSections

export const categoryColumns: ColumnDef<courseAssignment.ITeacherAssignmentTable>[] =
    [
        {
            accessorKey: 'id', 
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Nombre Categoria',
        },
        {
            accessorKey: 'description',
            header: 'Descripción',
        },
        {
            accessorKey: 'is_active',
            header: 'Estado',
        },

        {
            accessorKey: 'action',
            header: 'Acciones',
        },
    ]
