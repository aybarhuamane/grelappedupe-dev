import { teacher } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const TeacherColumns: ColumnDef<teacher.ITeacherAssigmentSchoolList>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'teaching.person.name',
    header: 'Nombre',
  },
  {
    accessorKey: 'teaching.person.last_name',
    header: 'Apellido',
  },
  {
    accessorKey: 'teaching.person.num_document',
    header: 'N° Documento',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
]
