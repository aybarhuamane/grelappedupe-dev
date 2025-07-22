/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { DataTable } from '@/modules/core'
import { person } from '@/types'
import { usePerson } from '@/modules/admin/hooks/usePerson'
import { personColumns } from '@/modules/admin/components/personManange/tablePerson/PersonColumns'

interface IProps<T> {
  onSelected?: (value: T) => void
}

export const PersonsList = (
  props: IProps<person.IPersonList>
) => {
  const { onSelected } = props
  const { getPerson, listPerson, loading } = usePerson()
  const [isLetter, setIsLetter] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    getPerson({
      page,
    })
  }, [search])

  const dataList: person.IPersonList[] =
    listPerson.results?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        last_name: item.last_name,
        num_document: item.num_document,
        email: item.email,
        phone: item.phone,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }
    }) || []

  const handleSearch = (value: string) => {
    if (!isNaN(Number(value))) {
      setIsLetter(false)
    } else if (/^[a-zA-Z]+$/.test(value)) {
      setIsLetter(true)
    } else {
      setIsLetter(false)
    }
    setSearch(value)
  }

  return (
    <main className="">
      <DataTable
        columns={personColumns}
        data={dataList}
        paginationProps={{
          page,
          count: listPerson.count,
          onPageChange: (page) => setPage(page),
          onPageSizeChange: (pageSize) => (pageSize),
          pageSize: 15,
        }}
        onValueSelectedChange={(value) =>
          onSelected && onSelected(value as person.IPersonList)
        }
      />
    </main>
  )
}
