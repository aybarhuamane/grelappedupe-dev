'use client'

import { competences, response } from "@/types"

interface CompetencesListByCourseProps {
    competences: response.IResApi<competences.ICompetences>
}

export const CompetencesListByCourse = ({ competences }: CompetencesListByCourseProps) => {
    if (competences.count === 0) {
        return <p>No hay competencias disponibles para este curso.</p>
    }

    return (
        <div className="space-y-4">
            <h2>COMPETENCIAS</h2>
            {competences.results.map((competence) => (
                <div key={competence.id} className="">
                    <span className="text-xs font-semibold">{competence.name}</span>
                </div>
            ))}
        </div>
    )
}
