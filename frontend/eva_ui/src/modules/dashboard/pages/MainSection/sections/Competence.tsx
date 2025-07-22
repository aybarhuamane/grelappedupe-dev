'use client'
import { useCoursesContext } from '@/modules/dashboard'
import { useFilterFromUrl } from '@/modules/core'

export const CompetenceSection = () => {
  const { getParams, updateFilters } = useFilterFromUrl()
  const { competencesList } = useCoursesContext()

  const competenceId = getParams('competence', '')

  const handleCompetenceClick = (competenceId: string) => {
    updateFilters({ competence: competenceId, capacity: '' })
  }

  const dataList = competencesList?.results || []

  return (
    <main>
      {dataList.map((competence) => (
        <div
          key={competence.id}
          className={`p-3 cursor-pointer rounded-sm flex flex-col gap-1 border-l-4 text-sm ${
            competence.id === Number(competenceId)
              ? 'bg-green-200 text-green-800 font-bold border-green-800'
              : ''
          }`}
          onClick={() => handleCompetenceClick(competence.id.toString())}
        >
          <p className="text-xs">{competence?.code || ''}</p>
          <h2 className="text-sm">{competence.name}</h2>
        </div>
      ))}
    </main>
  )
}
