import { DetailsSection, RecentList } from './sections'
import { course, detailInstitution } from '@/types'
import { Suspense } from 'react'
import { TableSection } from './sections/TableSection'
interface IDirectorHomeProps {
  data: detailInstitution.IDetailInstitutionList | null
  courses: course.ICourse[]
}

export const InstitutionHome = (props: IDirectorHomeProps) => {
  const { data, courses } = props

  return (
    <main className="grid grid-cols-12 gap-5 container pt-6 h-full">
      <Suspense fallback={<div>Cargando...</div>}>
        <section className="col-span-3 h-full">
          {data && <DetailsSection data={data} />}
        </section>
        <section className="col-span-9 grid grid-cols-1 gap-5">
          <TableSection
            data={data}
            courses={courses}
          />
          {/* <RecentList data={data} /> */}
        </section>
      </Suspense>
    </main>
  )
}
