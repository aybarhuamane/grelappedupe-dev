/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { BarChartDirectorEvaluation } from './BarChartDirectorEvaluation'
import { useDashboardCollege } from '@/modules/director'
import {
  competences,
  course,
  dashboardCollege,
  detailInstitution,
  response,
} from '@/types'
import { fetchCompetenceListByCourseId } from '@/api/app/educativa/fetchCompetencesByCourse'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RenderDirectorChart } from './BarcharRender'
import Image from 'next/image'

interface ITableProps {
  data: detailInstitution.IDetailInstitutionList | null
  courses: course.ICourse[]
}

function convertirCompetencias(
  curso: dashboardCollege.IDashboardTeacher
): (string | number)[][] {
  if (!curso) return []

  // Inicializamos el array de resultados
  const resultado: (string | number)[][] = []

  // Agregamos la primera fila con los nombres de los logros de la primera competencia
  const encabezado: string[] = [
    'Logro',
    ...(curso?.competencia[0]?.logros?.map((logro) => logro?.logro) || []),
  ]
  resultado.push(encabezado)

  // Recorremos cada competencia para agregar sus valores en una fila
  curso.competencia.forEach((competencia) => {
    const fila: (string | number)[] = [
      competencia?.competencia,
      ...(competencia?.logros?.map((logro) => logro.valor) || []),
    ]
    resultado.push(fila)
  })

  return resultado
}

export const TableSection = (props: ITableProps) => {
  const { data, courses } = props
  const { dataDashboard, loading, getDashboardCollege } = useDashboardCollege()

  const [selectedCourse, setSelectedCourse] = useState<number>(courses[0]?.id)
  const [competenceSelected, setCompetenceSelected] = useState<number>(0)

  const [competenceList, setCompetenceList] = useState<
    response.IResApi<competences.ICompetencesList>
  >({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  useEffect(() => {
    getDashboardCollege({
      colegio_id: Number(data?.id),
      curso_id: selectedCourse,
      competencia_id: competenceSelected === 0 ? undefined : competenceSelected,
    })
  }, [selectedCourse, competenceSelected])

  useEffect(() => {
    if (selectedCourse) {
      getCompetences()
    }
  }, [selectedCourse, setCompetenceList])

  const getCompetences = async () => {
    try {
      const res = await fetchCompetenceListByCourseId({
        course__id: selectedCourse,
      })
      if (res.ok) {
        const data: response.IResApi<competences.ICompetencesList> =
          await res.json()
        setCompetenceList(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <section className="bg-white rounded-md">
      <section className="p-4 flex gap-2">
        <div className="">
          <Select
            value={selectedCourse.toString()}
            onValueChange={(value) => {
              setSelectedCourse(Number(value))
              setCompetenceSelected(0)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cursos</SelectLabel>
                {courses.map((course) => (
                  <SelectItem
                    key={course.id}
                    value={course.id.toString()}
                  >
                    {course.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={competenceSelected.toString()}
            onValueChange={(value) => setCompetenceSelected(Number(value))}
          >
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Seleccionar competencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Competencias</SelectLabel>
                <SelectItem value="0">Todas las competencias</SelectItem>
                {competenceList.results.map((competence) => (
                  <SelectItem
                    key={competence.id}
                    value={competence.id.toString()}
                  >
                    {competence.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
      {dataDashboard && dataDashboard.length > 0 ? (
        <RenderDirectorChart
          dataChart={dataDashboard}
          loadingFilter={loading}
        />
      ) : (
        <section className="flex flex-col items-center justify-center">
          <Image
            src="/svg/no-data.svg"
            alt="IE"
            width={300}
            height={200}
          />
          <h1 className="text-sm text-center">
            Aún no se han registrado evaluaciones
          </h1>
        </section>
      )}
    </section>
  )
}
