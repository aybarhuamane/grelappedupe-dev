'use client'

import { capacity, response } from "@/types"

interface IProps {
  capacities: response.IResApi<capacity.ICapacity>
}

export const CapacityListByCompetence = (props: IProps) => {
  const { capacities } = props

  return (
    <div>
      <h3>Capacidades</h3>
      <ul>
        {capacities.results.map((capacity) => (
          <li key={capacity.id}>
            <span className="text-xs font-semibold">{capacity.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
