'use client'
import { useState } from 'react'
import { courseEvaluation } from '@/types'
import { courseEvaluationFuntionsApi } from '@/api'

export const useCourseEvaluation = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [courseEvaluationData, setCourseEvaluationData] = useState<
    courseEvaluation.ICourseEvaluationItem[]
  >([])

  const getCoursesEvaluation = async (
    filter: courseEvaluation.ICourseEvaluationFilter
  ) => {
    setLoading(true)

    try {
      const res = await courseEvaluationFuntionsApi.fetchCourseEvaluation(
        filter
      )
      if (res.ok) {
        const data: courseEvaluation.ICourseEvaluationItem[] = await res.json()
        if (data[0]?.student) {
          setCourseEvaluationData(data)
        } else {
          setCourseEvaluationData([])
        }
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { getCoursesEvaluation, courseEvaluationData, loading }
}
