import { teacher } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const TeacherColumnsAction: ColumnDef<teacher.ITeacherList>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'person.name',
    header: 'Nombre',
  },
  {
    accessorKey: 'person.last_name',
    header: 'Apellido',
  },
  {
    accessorKey: 'person.num_document',
    header: 'N° Documento',
  },
]
