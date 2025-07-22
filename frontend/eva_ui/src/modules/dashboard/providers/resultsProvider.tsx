/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect } from 'react'
// import { Selection } from '@nextui-org/react'
// import {
//   useFilterFromUrl,
//   useDrelLocation,
//   useUgelLocation,
//   useDistritoLocation,
// } from '@/hooks'
// import { IDistritoApi, IDrel, IUgelApi } from '@/types'

interface IListsLocation {
  //   listDrel: IDrel[]
  //   listUgel: IUgelApi[]
  //   listDistrito: IDistritoApi[]
}

interface ILoadings {
  loadDrel: boolean
  loadUgel: boolean
  loadDistrito: boolean
}

interface ISelectedValues {
  drel: string
  ugel: string
  distrito: string
}

interface IFuntions {
  handleUgelChange: (val: Selection) => void
  handleDistritoChange: (val: Selection) => void
}

// Crea el contexto del proveedor
export const LocationContext = createContext<{
  //   listLocation: IListsLocation
  //   loadings: ILoadings
  //   selectedValues: ISelectedValues
  //   functions?: IFuntions
}>({
  listLocation: {
    listDrel: [],
    listUgel: [],
    listDistrito: [],
  },
  loadings: {
    loadDrel: false,
    loadUgel: false,
    loadDistrito: false,
  },
  //Verificar si no hay error
  selectedValues: {
    drel: '',
    ugel: '',
    distrito: '',
  },
})

// Crea el proveedor
export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  //   const { getParams, updateFilters } = useFilterFromUrl()
  //   const { getDrel, listGrel, loading: loadDrel } = useDrelLocation()
  //   const { getUgelApi, listUgel, loading: loadUgel } = useUgelLocation()
  //   const {
  //     getDistritosApi,
  //     listDistrito,
  //     loading: loadDistrito,
  //   } = useDistritoLocation()

  //   const drelSelected = getParams(
  //     'drel',
  //     listGrel.length > 0 ? listGrel[0].region : ''
  //   )
  //   const ugelSelected = getParams(
  //     'ugel',
  //     listUgel.length > 0 ? listUgel[0].provincia : ''
  //   )

  //   const distritoSelected = getParams('distrito', 'all')

  //   useEffect(() => {
  //     getDrel()
  //   }, [])

  //   useEffect(() => {
  //     if (drelSelected) {
  //       getUgelApi({ drel: drelSelected })
  //     }
  //   }, [drelSelected])

  //   useEffect(() => {
  //     if (ugelSelected) {
  //       getDistritosApi({ ugel: ugelSelected, drel: drelSelected })
  //     }
  //   }, [ugelSelected])

  //   const handleUgelChange = (val: Selection) => {
  //     const value = Object.values(val)[0]
  //     updateFilters({
  //       ugel: value ? (value === 'all' ? '' : (value as string)) : '',
  //       distrito: '',
  //     })
  //   }

  //   const handleDistritoChange = (val: Selection) => {
  //     const value = Object.values(val)[0]
  //     if (value === 'all') {
  //       updateFilters({
  //         distrito: '',
  //       })
  //     } else {
  //       updateFilters({
  //         distrito: value ? (value as string) : '',
  //       })
  //     }
  //   }

  return (
    <LocationContext.Provider
      value={
        {}
        //     {
        //     listLocation: {
        //       listDrel: listGrel,
        //       listUgel: listUgel,
        //       listDistrito: listDistrito,
        //     },
        //     loadings: {
        //       loadDrel,
        //       loadUgel,
        //       loadDistrito,
        //     },
        //     selectedValues: {
        //       drel: drelSelected,
        //       ugel: ugelSelected,
        //       distrito: distritoSelected,
        //     },
        //     functions: {
        //       handleUgelChange,
        //       handleDistritoChange,
        //     },
        //   }
      }
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => useContext(LocationContext)
