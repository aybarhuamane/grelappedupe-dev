import { Search } from 'lucide-react'

interface TableHeaderProps {
  valueSearch?: string
  onValueSearch?: (value: string) => void
  hasSearch?: boolean
  placeholder?: string
}

export const TableHeaderCustom = (props: TableHeaderProps) => {
  const { valueSearch, onValueSearch, hasSearch, placeholder } = props

  return (
    <main>
      {hasSearch && (
        <main>
          <section className="flex items-center space-x-2 border rounded-md border-gray-200 p-2 px-3 max-w-sm">
            <div>
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={placeholder || 'Buscar...'}
              value={valueSearch}
              onChange={(e) => onValueSearch && onValueSearch(e.target.value)}
              className="w-[150px] lg:w-[250px] focus:outline-none"
            />
          </section>
        </main>
      )}
    </main>
  )
}
