import { HeaderSection, LayoutAsideSection } from '@/modules/core'
import { AsideAsignedCurso } from './AsideAsignedCurso'
import { FrmCourseASignedEditor } from '../../components'
import { detailInstitution, response } from '@/types'

interface IAsignedCursoListProps {
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>
}

export const AsignedCursoList = (props: IAsignedCursoListProps) => {
  const { institutionAssigned } = props
  return (
    <main className="grid grid-cols-1 gap-5">
      <HeaderSection
        title="Asignación de cursos"
        subtitle="Asignación de docentes a cursos para las evaluaciones"
        disableAddButton
      />
      <LayoutAsideSection aside={<AsideAsignedCurso />}>
        <FrmCourseASignedEditor institutionAssigned={institutionAssigned} />
      </LayoutAsideSection>
    </main>
  )
}
