'use client'

import { useCoursesContext } from '@/modules/dashboard'
import { useFilterFromUrl } from '@/modules/core'

export const CapacitiesSection = () => {
  const { getParams, updateFilters } = useFilterFromUrl()
  const { capacitiesList } = useCoursesContext()

  const capacityId = getParams('capacity', '')

  const handleCapacityClick = (capacity: string) => {
    updateFilters({ capacity: capacity })
  }

  const dataList = capacitiesList?.results || []

  return (
    <main>
      {dataList.map((capacity) => (
        <div
          key={capacity.id}
          className={`p-3 cursor-pointer rounded-sm flex flex-col gap-1 border-l-4 text-sm ${
            capacity.id === Number(capacityId)
              ? 'bg-green-200 text-green-800 font-bold border-green-800'
              : ''
          }`}
          onClick={() => handleCapacityClick(capacity.id.toString())}
        >
          <p className="text-xs">{capacity?.code || ''}</p>
          <h2 className="text-sm">{capacity.name}</h2>
        </div>
      ))}
    </main>
  )
}
