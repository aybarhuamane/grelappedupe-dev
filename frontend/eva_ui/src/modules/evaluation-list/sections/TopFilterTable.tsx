import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

interface ITopFilterTable {
  valueSearch: string
  handleSearch: (value: string) => void
  statusValue?: string
  handleStatus?: (value: string) => void
  typeFilterSelect?: string
  setTypeFilter?: (value: string) => void
}

const options = [
  {
    value: 'name',
    label: 'Inst. educativa',
    placeholder: 'Digite el nombre de la institución',
  },
  {
    value: 'code_modular',
    label: 'Código modular',
    placeholder: 'Digite el código modular',
  },
  {
    value: 'code_local',
    label: 'Código local',
    placeholder: 'Digite el código local',
  },
]

const statusOptions = [
  {
    value: 'all',
    label: 'Todos',
  },
  {
    value: 'evaluado',
    label: 'Evaluado',
  },
  {
    value: 'en proceso',
    label: 'En proceso',
  },
  {
    value: 'no evaluado',
    label: 'No evaluado',
  },
]

export const TopFilterTable = (props: ITopFilterTable) => {
  const {
    valueSearch,
    handleSearch,
    statusValue,
    handleStatus,
    typeFilterSelect,
    setTypeFilter,
  } = props

  const typeFilter = options.find((option) => option.value === typeFilterSelect)

  const onChangeHandler = (value: string) => {
    setTypeFilter && setTypeFilter(value)
  }

  const handleStatusChange = (value: string) => {
    handleStatus && handleStatus(value)
  }

  return (
    <main className="px-4 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Select
          value={typeFilter?.value}
          onValueChange={(value) => onChangeHandler(value)}
        >
          <SelectTrigger className="w-[180px] h-10 bg-gray-100">
            <SelectValue placeholder="Seleccionar filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo filtro</SelectLabel>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <section className="flex items-center space-x-2 border rounded-md border-gray-200 p-1 px-3 max-w-sm">
          <div>
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={`${typeFilter?.placeholder} ...`}
            value={valueSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="h-8 w-[240px] lg:w-[290px] focus:outline-none"
          />
        </section>
      </div>
      <div>
        <Select
          value={statusValue}
          onValueChange={(value) => handleStatusChange(value)}
        >
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </main>
  )
}
