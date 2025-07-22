import { courseAssignment } from '@/types'
import { RenderEvaluation } from './RenderEvaluation'

interface IProps {
  dataDefault: courseAssignment.ICourseAssignmentList
}

export const EvaluacionDetails = (props: IProps) => {
  const { dataDefault } = props

  return <RenderEvaluation dataDefault={dataDefault} />
}
