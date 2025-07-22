'use client'
import { useFilterFromUrl } from '@/modules/core'
import { BookCopy } from 'lucide-react'

import { useCoursesContext } from '@/modules/dashboard'

export const CourseSection = () => {
  const { listCoursesApi } = useCoursesContext()
  const { getParams, updateFilters } = useFilterFromUrl()

  const dataList = listCoursesApi?.results || []
  const cursoSelected = getParams('curso', `${dataList[0]?.id || ''}`)

  const handleSelectCourse = (id: string) => {
    updateFilters({ curso: id, competence: '', capacity: '' })
  }

  return (
    <main className="grid grid-cols-1">
      {listCoursesApi &&
        listCoursesApi.results.map((course) => (
          <div
            key={course.id}
            className={`p-3 cursor-pointer rounded-sm flex items-center gap-3 border-l-4 text-sm ${
              course.id === Number(cursoSelected)
                ? 'bg-green-200 text-green-800 font-bold border-green-800'
                : ''
            }`}
            onClick={() => handleSelectCourse(course.id.toString())}
          >
            <BookCopy
              className={`w-5 h-5
                ${
                  course.id === Number(cursoSelected)
                    ? 'text-green-800'
                    : 'text-gray-800'
                }
               `}
            />
            <h2>{course.name}</h2>
          </div>
        ))}
    </main>
  )
}
