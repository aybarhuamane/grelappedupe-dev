import { AlumnosImport } from '@/modules/teacher'
import { IParams } from '@/types'

export default async function ImportPage(props: IParams) {
  const { params } = props
  const course_assigned_id = Number(params.id)

  return <AlumnosImport course_assigned_id={course_assigned_id} />
}
