'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { detailInstitution } from '@/types'

interface IAsideGradoFilterProps {
  institutionAssigned: detailInstitution.IDetailInstitutionList[]
}

export const AsideGradoFilter = (props: IAsideGradoFilterProps) => {
  const { institutionAssigned } = props
  const { updateFilters, getParams } = useFilterFromUrl()

  const isActived = getParams('is_actived', 'all')
  const institution = getParams(
    'institution',
    `${institutionAssigned[0]?.id || ''}`
  )

  const handleSelected = (value: string) => {
    if (value === 'all') {
      updateFilters({ is_actived: '' })
    } else {
      updateFilters({ is_actived: value })
    }
  }

  const handleInstitution = (value: string) => {
    if (value === 'all') {
      updateFilters({ institution: '' })
    } else {
      updateFilters({ institution: value })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white w-full px-4 pb-8">
        <div className="flex gap-2 items-center">
          <Filter size={18} />
          <h2 className="font-medium text-base py-4">Filtrar por</h2>
        </div>
        <div className="flex flex-col space-y-3">
          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">I.E asignadas</span>
            <Select
              value={institution}
              onValueChange={handleInstitution}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Institución" />
              </SelectTrigger>
              <SelectContent>
                {institutionAssigned.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id.toString()}
                  >
                    {item.institution.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">Estado</span>
            <Select
              value={isActived}
              onValueChange={handleSelected}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Activos</SelectItem>
                <SelectItem value="false">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </section>
        </div>
      </div>
    </div>
  )
}
