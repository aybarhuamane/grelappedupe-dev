'use client'

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AlertCustom } from '@/modules/core'
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from 'react'

const indications = [
  'Este es el listado de personas registrados en el sistema.',
  'Puedes filtrar por valor y ordenar por ascendente o descendente.',
  'Puedes buscar por numero de documento.',
  'Si deseas agregar una nueva persona, puedes hacerlo desde el botón "Agregar persona".',
]


interface AsidePeriodFilterProps {
  setOrdering?: (ordering: string) => void
  options?: { value: string, label: string }[] // Agregamos las opciones como prop
}

export const AsidePeriodFilter = (props: AsidePeriodFilterProps) => {
  const { setOrdering, options = [] } = props
  const [valueFilter, setValueFilter] = useState('') // Valor a ordenar (e.g., 'name', 'email')
  const [orderFilter, setOrderFilter] = useState('') // Orden ascendente o descendente ('' o '-')

  const [ascOpen, setAscOpen] = useState(false)
  const [descOpen, setDescOpen] = useState(false)



  const descOptions = [
    { value: '', label: 'Ascendente' },
    { value: '-', label: 'Descendente' },
  ]

  // Actualizar el estado de ordering en el componente principal
  const handleUpdateFilter = (order: string, value: string) => {
    const ordering = order === '-' ? `-${value}` : value
    setOrdering && setOrdering(ordering) // Actualiza el estado en PersonTable
    setOrderFilter(order)
    setValueFilter(value)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white w-full px-4 pb-8">
        <div className="flex gap-2 items-center">
          <h2 className="font-medium text-base py-4">Filtrar por</h2>
        </div>
        <div className="flex flex-col space-y-3">
          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">Valor</span>
            <Popover open={ascOpen} onOpenChange={setAscOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={ascOpen}
                  className="w-[200px] justify-between"
                >
                  {valueFilter
                    ? (options ?? []).find((opt) => opt.value === valueFilter)?.label
                    : "Selecciona un valor..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No se encontraron opciones.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setValueFilter(currentValue === valueFilter ? '' : currentValue)
                            handleUpdateFilter(orderFilter, currentValue) // Mantener el orden seleccionado
                            setAscOpen(false)
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${valueFilter === option.value ? "opacity-100" : "opacity-0"}`}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </section>

          <section className="space-y-2">
            <span className="text-sm text-gray-800 w-full">Orden</span>
            <Popover open={descOpen} onOpenChange={setDescOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={descOpen}
                  className="w-[200px] justify-between"
                >
                  {orderFilter
                    ? descOptions.find((opt) => opt.value === orderFilter)?.label
                    : "Selecciona un orden..."
                  }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandEmpty>No se encontraron opciones.</CommandEmpty>
                    <CommandGroup>
                      {descOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setOrderFilter(currentValue === orderFilter ? '' : currentValue)
                            handleUpdateFilter(currentValue, valueFilter) // Mantener el valor seleccionado
                            setDescOpen(false)
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${orderFilter === option.value ? "opacity-100" : "opacity-0"}`}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </section>
        </div>
        <section className="pt-3">
          <AlertCustom
            title="Indicaciones"
            hasIcon={false}
            content={
              <ul className="list-disc list-inside space-y-2">
                {indications.map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            }
          />
        </section>
      </div>
    </div>
  )
}
