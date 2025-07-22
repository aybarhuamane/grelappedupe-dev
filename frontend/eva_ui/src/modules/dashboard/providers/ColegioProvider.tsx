/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

// import { useFilterFromUrl } from '@/hooks'
import { useLocationContext } from './locationProvider'
// import { useColegios } from '@/hooks'
// import { IColegioListApi, IResApi } from '@/types'

// function remplaceAccents(str: string) {
//   return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
// }

// Crea el contexto del proveedor
export const ColegioContext = createContext<{
  //   listColegiosApi: IResApi<IColegioListApi> | null
  //   loading: boolean
  //   page: number
  //   search: string
  //   evaluation: string
  //   setHandlePage: (page: number) => void
  //   setSearch: (search: string) => void
  //   setIsEvaluado: (isEvaluado: string) => void
}>({
  //   listColegiosApi: null,
  //   loading: false,
  //   page: 1,
  //   search: '',
  //   evaluation: 'all',
  //   setHandlePage: () => {},
  //   setSearch: () => {},
  //   setIsEvaluado: () => {},
})

// Crea el proveedor
export const ColegioProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  //   const { getParams } = useFilterFromUrl()
  //   const { getColegiosApiList, listColegios, loading } = useColegios()
  const { selectedValues } = useLocationContext()

  //For query params
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isEvaluado, setIsEvaluado] = useState<string>('all')

  //Values for location
  // const { ugel, distrito } = selectedValues

  //   useEffect(() => {
  //     getColegiosApiList({
  //       ugel: ugel === 'all' ? '' : ugel.replace(/'+'/, ' '),
  //       distrito: distrito === 'all' ? '' : distrito.replace(/'+'/, ' '),
  //       nombre: search,
  //       evaluacion:
  //         isEvaluado === 'all'
  //           ? undefined
  //           : isEvaluado === 'true'
  //           ? 'true'
  //           : 'false',
  //     })
  //   }, [page, search, ugel, distrito, isEvaluado])

  return (
    <ColegioContext.Provider
      value={
        {
          // listColegiosApi: listColegios,
          // loading,
          // page,
          // search,
          // evaluation: isEvaluado || 'all',
          // setSearch,
          // setHandlePage: setPage,
          // setIsEvaluado,
        }
      }
    >
      {children}
    </ColegioContext.Provider>
  )
}

export const useColegioContext = () => useContext(ColegioContext)
