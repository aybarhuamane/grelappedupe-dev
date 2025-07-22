'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilterFromUrl } from "@/modules/core"
import { course, response, competences, capacity } from "@/types"
import { useEffect, useState } from "react"

interface IProps {
    courses: response.IResApi<course.ICourse>
    competences: response.IResApi<competences.ICompetences>
    capacities: response.IResApi<capacity.ICapacity>
}

export const CoursesList = (props: IProps) => {
    const { courses, competences, capacities } = props
    const { getParams, updateFilters } = useFilterFromUrl()

    // Inicializa los estados con los valores de la URL o valores predeterminados
    const initialCourseId = getParams('curso_id', courses.results[0]?.id.toString() || '')
    const initialCompetenceId = getParams('competencia_id', competences.results[0]?.id.toString() || '')
    const initialCapacityId = getParams('capacity__id', capacities.results[0]?.id.toString() || '')

    const [courseId, setCourseId] = useState<string>(initialCourseId)
    const [competenceId, setCompetenceId] = useState<string>(initialCompetenceId)
    const [capacityId, setCapacityId] = useState<string>(initialCapacityId)

    useEffect(() => {
        setCourseId(initialCourseId)
    }, [initialCourseId])

    useEffect(() => {
        setCompetenceId(initialCompetenceId)
    }, [initialCompetenceId])

    useEffect(() => {
        setCapacityId(initialCapacityId)
    }, [initialCapacityId])

    const handleCourseFilter = (value: string) => {
        setCourseId(value)
        updateFilters({
            'curso_id': value
        })
    }

    const handleCompetenceFilter = (value: string) => {
        setCompetenceId(value)
        updateFilters({
            'competencia_id': value
        })
    }

    // const handleCapacityFilter = (value: string) => {
    //     setCapacityId(value)
    //     updateFilters({
    //         'capacity__id': value
    //     })
    // }

    return (
        <div
            className="flex flex-col gap-4"
        >
            {/* Filtro de cursos */}

            <Select value={courseId} onValueChange={handleCourseFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un curso" />
                </SelectTrigger>
                <SelectContent>
                    {courses.results.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                            {course.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Filtro de competencias */}
            <div className="space-y-2">
                <h1 className="text-sm font-medium">Competencias</h1>
                <Select value={competenceId} onValueChange={handleCompetenceFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona una competencia" />
                    </SelectTrigger>
                    <SelectContent>
                        {competences.results.map((competence) => (
                            <SelectItem key={competence.id} value={competence.id.toString()}>
                                {competence.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Filtro de capacidades */}
            <div className="space-y-2">
                <h1 className="text-sm font-medium">Capacidades</h1>
                {/* <Select value={capacityId} onValueChange={handleCapacityFilter}> */}
                <Select value={capacityId} onValueChange={setCapacityId}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona una capacidad" />
                    </SelectTrigger>
                    <SelectContent>
                        {capacities.results.map((capacity) => (
                            <SelectItem key={capacity.id} value={capacity.id.toString()}>
                                {capacity.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* {
                    competenceId !== null ? (
                        <ul className="flex flex-col gap-2">
                        {capacities.results.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col gap-1 text-xs font-medium bg-gray-200 p-2 rounded-sm"
                        >
                            <span>{item.name}</span>
                        </li>
                        ))}
                    </ul>
                    ) : (
                        <p>Selecciona una competencia</p>
                    )
                } */}
            </div>
        </div>
    )
}
