/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { DataTable, useFilterFromUrl } from '@/modules/core'
import { periodColumns } from './PeriodColumns'
import { useEffect, useState } from 'react'
import { period, response } from '@/types'
import { usePeriod } from '@/modules/admin/hooks/usePeriod'
import { HeaderSection, LayoutAsideSection } from '@/modules/core'
import { usePathname } from 'next/navigation'
import { AsideIndications } from '../../directorManange/AsideIndications'
import { set } from 'date-fns'

const indications = [
  'Este es el listado de periodos registrados en el sistema.',
  'Si deseas agregar un nuevo periodo, puedes hacerlo desde el botón "Agregar Periodo".',
]

interface IPeriodTableProps {
  periodAsigment: response.IResApi<period.IPeriodList>
}

export const PeriodTable = (props: IPeriodTableProps) => {
  const { periodAsigment } = props
  const { getPeriods, listPeriods, loading } = usePeriod()
  const { getParams, updateFilters } = useFilterFromUrl()

  const isActived = getParams('is_actived', 'all')
  const period = getParams('periodos', `${periodAsigment.results[0]?.id}`)

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [isLetter, setIsLetter] = useState(false)
  const pathname = usePathname()
  const [sizePage, setSizePage] = useState(15)
  const urlAdd = `${pathname}/create`

  useEffect(() => {
    getPeriods({
      is_active: isActived !== 'all' ? isActived === 'true' : undefined,
      page,
      page_size: sizePage,
      name__icontains: search,
    })
  }, [periodAsigment, page, search, sizePage, isActived])

  const listPeriodsData: period.IPeriodList[] =
    listPeriods.results?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        start_date: item.start_date,
        end_date: item.end_date,
        is_active: item.is_active,
      }
    }) || []

  return (
    <div>
      <HeaderSection
        title="Periodos"
        subtitle="Listado de los periodos académicos de evaluación de los estudiantes"
        hrefAddButton="/admin/period-manange/create"
        labelAddButton="Agregar Periodo"
      />
      <LayoutAsideSection aside={<AsideIndications indications={indications} />}>
        <DataTable
          columns={periodColumns}
          data={listPeriodsData}
          paginationProps={{
            page,
            pageSize: sizePage,
            count: listPeriods.count,
            onPageChange: (page) => {
              setPage(page)
            },
            onPageSizeChange: (sizePage) => {
              setSizePage(sizePage)
            },
          }}
          hasSearch={true}
          valueSearch={search}
          onValueSearch={(value) => setSearch(value)}
          isLoading={loading}
          searchPlaceholder="Buscar por nombre..."
        />
      </LayoutAsideSection>
    </div>
  )
}
