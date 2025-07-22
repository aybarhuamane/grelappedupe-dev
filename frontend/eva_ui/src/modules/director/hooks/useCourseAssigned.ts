'use client'
import { useState } from 'react'
import { courseAssignment, response } from '@/types'
import { courseAssignmentsFunctionsApi } from '@/api'

export const useCourseAsigned = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listCursosAssigned, setCursosAssigned] = useState<
    response.IResApi<courseAssignment.ICourseAssignmentList>
  >({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getCursosAssigned = async (
    query: courseAssignment.ICourseAssignmentFilter
  ) => {
    setLoading(true)

    try {
      const res = await courseAssignmentsFunctionsApi.fetchCourseAssigmanetList(
        query
      )

      if (res.ok) {
        const data: response.IResApi<courseAssignment.ICourseAssignmentList> =
          await res.json()
        setCursosAssigned(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { listCursosAssigned, getCursosAssigned, loading }
}
