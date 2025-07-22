'use client'
import { useState } from 'react'
import { course, response } from '@/types'
import { cursosFunctionsApi } from '@/api'

export const useCourse = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listCursos, setCursos] = useState<response.IResApi<course.ICourse>>({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getCursos = async (query: course.ICourseFilter) => {
    setLoading(true)

    try {
      const res = await cursosFunctionsApi.fetchCourseList(query)

      if (res.ok) {
        const data: response.IResApi<course.ICourse> = await res.json()
        setCursos(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { getCursos, listCursos, loading }
}
