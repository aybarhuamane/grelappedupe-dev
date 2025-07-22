import { degree } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const DegreeColumns: ColumnDef<degree.IDegreeTable>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'id',
  // },
  {
    accessorKey: 'fullname',
    header: 'Grado y Sección',
  },
]
