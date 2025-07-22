'use client'
import { Input } from '@/components/ui/input'
import { SearchInput } from '../search-input/SearchInput'
import { useFilterFromUrl } from '@/modules/core'
import { Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface IAsideTeacherProps {
  hasSearch?: boolean
}

export const AsideTeacher = (props: IAsideTeacherProps) => {
  const { hasSearch = false } = props
  const { updateFilters, getParams } = useFilterFromUrl()

  const date = getParams('date', '')
  const validated = getParams('validated', 'all')

  const handleSelected = (value: string) => {
    if (value === 'all') {
      updateFilters({ validated: '' })
    } else {
      updateFilters({ validated: value })
    }
  }

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ date: e.target.value })
  }

  return (
    <div className="flex flex-col gap-6">
      {hasSearch && <SearchInput />}
      <div className="bg-white w-full px-4 pb-8">
        <div className="flex gap-2 items-center">
          <Filter size={18} />
          <h2 className="font-medium text-base py-4">Filtrar por</h2>
        </div>
        <div className="flex flex-col space-y-3">
          <section className="space-y-2 w-full">
            <span className="text-sm text-gray-800">Fecha de evaluación</span>
            <Input
              type="date"
              className="w-full"
              value={date}
              onChange={handleDate}
            />
          </section>
          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">Validación</span>
            <Select
              value={validated}
              onValueChange={handleSelected}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Validado</SelectItem>
                <SelectItem value="false">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </section>
        </div>
      </div>
    </div>
  )
}
