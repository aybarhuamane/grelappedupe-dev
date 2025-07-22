/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { cursosFunctionsApi, competencesByCourseFunctionsApi, capacitiesCompetenceFunctionsApi } from "@/api"
import { competences, course, capacity, response } from "@/types"
import { useFilterFromUrl } from "@/modules/core"
import { CoursesList } from "./CoursesList"

export const Capacidades = () => {
  const { fetchCourseList } = cursosFunctionsApi
  const { fetchCompetenceListByCourseId } = competencesByCourseFunctionsApi
  const { fetchCapacityListByCompetence } = capacitiesCompetenceFunctionsApi

  const { getParams, updateFilters } = useFilterFromUrl()

  const [coursesList, setCoursesList] = useState<response.IResApi<course.ICourse>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [competencesList, setCompetencesList] = useState<response.IResApi<competences.ICompetences>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [capacitiesList, setCapacitiesList] = useState<response.IResApi<capacity.ICapacity>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Obtener el valor del curso y la competencia seleccionada desde los parámetros de la URL
  const courseId = getParams('curso_id', coursesList.results[0]?.id?.toString() || '')
  const competenceId = getParams('competencia_id', competencesList.results[0]?.id?.toString() || '')

  // Fetch de cursos al cargar el componente
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const resCourse = await fetchCourseList({})
        if (resCourse.ok) {
          const dataCourse: response.IResApi<course.ICourse> = await resCourse.json()
          setCoursesList(dataCourse)
        } else {
          throw new Error('Failed to fetch courses')
        }
      } catch (error) {
        console.error(error)
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Fetch de competencias cuando cambie el courseId
  useEffect(() => {
    if (courseId) {
      const fetchCompetences = async () => {
        setLoading(true)
        try {
          const resCompetences = await fetchCompetenceListByCourseId({
            course__id: Number(courseId)
          })
          if (resCompetences.ok) {
            const dataCompetences: response.IResApi<competences.ICompetences> = await resCompetences.json()
            setCompetencesList(dataCompetences)
          } else {
            throw new Error('Failed to fetch competences')
          }
        } catch (error) {
          console.error(error)
          setError(error instanceof Error ? error.message : 'An unknown error occurred')
        } finally {
          setLoading(false)
        }
      }

      fetchCompetences()
    }
  }, [courseId])

  // Fetch de capacidades cuando cambie el competenceId
  useEffect(() => {
    if (competenceId) {
      const fetchCapacities = async () => {
        setLoading(true)
        try {
          const resCapacities = await fetchCapacityListByCompetence({
            competence__id: Number(competenceId)
          })
          if (resCapacities.ok) {
            const dataCapacities: response.IResApi<capacity.ICapacity> = await resCapacities.json()
            setCapacitiesList(dataCapacities)
          } else {
            throw new Error('Failed to fetch capacities')
          }
        } catch (error) {
          console.error(error)
          setError(error instanceof Error ? error.message : 'An unknown error occurred')
        } finally {
          setLoading(false)
        }
      }

      fetchCapacities()
    }
  }, [competenceId])

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error}</p>

  return (
    <main className="flex flex-col gap-2">
      <CoursesList courses={coursesList} competences={competencesList} capacities={capacitiesList} />
    </main>
  )
}
