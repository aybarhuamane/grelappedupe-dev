/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { DataTable, HeaderSection, LayoutAsideSection } from '@/modules/core'
import { directoresColumns } from './DirectoresColumns'
import { useEffect, useState } from 'react'
import { useDirector } from '@/modules/admin/hooks/useDirector'
import { director } from '@/types'
import { AsideIndications } from '../AsideIndications'

const indications = [
    'Este es el listado de directores registrados en el sistema.',
    'Puedes buscar por nombre del director.',
    'Si deseas agregar un nuevo director, puedes hacerlo desde el botón "Agregar Director".',
  ]

export const DirectoresTable = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [ordering, setOrdering] = useState('')
    const { listDirector, getDirector, loading } = useDirector()

    useEffect(() => {
        getDirector({
            page,
            person__name__icontains: search,
            ordering: ordering,
        })
    }, [page, search, ordering])

    const data: director.IDirectorTable[] = listDirector?.results?.map(
        (director) => ({
            id: Number(director?.id),
            name: director?.person.name,
            last_name: director?.person.last_name,
            email: director?.person.email,
            num_document: director?.person.num_document,
            phone: director?.person.phone,
            status: director?.is_active ? 'Activo' : 'Inactivo',
            created_at: director?.created_at,
        })
    ) || []


    return (
        <main className="flex flex-col w-full gap-4">
            <HeaderSection
                title="Directores"
                subtitle="Listado de directores registrados en la plataforma"
                hrefAddButton="/admin/director-manage/create"
                labelAddButton="Agregar Director"
                hrefBack="/admin/director-manage"
            />
            <LayoutAsideSection
                aside={
                    <AsideIndications indications={indications} />
                }
            >
                <DataTable
                    columns={directoresColumns}
                    data={data}
                    hasSearch={true}
                    searchPlaceholder='Buscar por nombre'
                    valueSearch={search}
                    onValueSearch={(value) => setSearch(value)}
                    isLoading={loading}
                    hasPagination={true}
                    paginationProps={{
                        page: page,
                        count: listDirector.count,
                        pageSize: 15,
                        onPageChange: (page: number) => {
                            setPage(page)
                        },
                        onPageSizeChange: () => { },
                    }}
                />
            </LayoutAsideSection>
        </main>
    )
}

