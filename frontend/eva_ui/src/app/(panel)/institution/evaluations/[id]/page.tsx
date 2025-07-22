import { EvaluacionDetails } from '@/modules/director'
import { courseAssignmentsFunctionsApi } from '@/api'
import { courseAssignment, response } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
  const { fetchCourseAssigmanetList } = courseAssignmentsFunctionsApi

  let listData: response.IResApi<courseAssignment.ICourseAssignmentList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const res = await fetchCourseAssigmanetList({
      id: Number(params.id),
    })

    if (res.ok) {
      listData = await res.json()
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <main>
      {listData?.results?.length > 0 && (
        <EvaluacionDetails dataDefault={listData.results[0]} />
      )}
    </main>
  )
}
