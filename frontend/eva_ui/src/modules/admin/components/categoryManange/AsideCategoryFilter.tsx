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
// import { detailInstitution } from '@/types'

// interface IAsidePeriodFilterProps {
//   institutionAssigned: detailInstitution.IDetailInstitutionList[]
// }

export const AsideCategoryFilter = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white w-full px-4 pb-8">
        <div className="flex gap-2 items-center">
          <Filter size={18} />
          <h2 className="font-medium text-base py-4">Filtrar por</h2>
        </div>
        <div className="flex flex-col space-y-3">
          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">Ordenamiento</span>
            <Select
                value='fruta'
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Institución" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'mezy'}>Ascendente</SelectItem>
                <SelectItem value={'ronaldo'}>Descendiente</SelectItem>
              </SelectContent>
            </Select>
          </section>
          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">Estado</span>
            <Select
                value='estado'
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
