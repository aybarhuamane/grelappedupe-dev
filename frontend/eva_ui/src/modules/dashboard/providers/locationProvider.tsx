/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect } from 'react'
import { useDrelLocation } from '@/modules/dashboard'
import { useFilterFromUrl } from '@/modules/core'
import { dashboardData } from '@/types'

interface IRegion extends dashboardData.IRegion {}
interface IProvince extends dashboardData.IProvince {}
interface IDistrict extends dashboardData.IDistrict {}

interface IListsLocation {
  listDrel: IRegion[]
  listUgel: IProvince[]
  listDistrito: IDistrict[]
}

// interface ILoadings {
//   loadDrel: boolean
//   loadUgel: boolean
//   loadDistrito: boolean
// }

interface ISelectedValues {
  drel: string
  province: string
  district: string
}

interface IFuntions {
  handleRegionChange: (val: string) => void
  handleProvinceChange: (val: string) => void
  handleDistritoChange: (val: string) => void
}

// Crea el contexto del proveedor
export const LocationContext = createContext<{
  listLocation: IListsLocation
  selectedValues: ISelectedValues
  functions?: IFuntions
}>({
  listLocation: {
    listDrel: [],
    listUgel: [],
    listDistrito: [],
  },
  //   loadings: {
  //     loadDrel: false,
  //     loadUgel: false,
  //     loadDistrito: false,
  //   },
  //Verificar si no hay error
  selectedValues: {
    drel: '',
    province: 'all',
    district: 'all',
  },
})

// Crea el proveedor
export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { getParams, updateFilters } = useFilterFromUrl()
  const {
    getRegion,
    getDistrict,
    getProvince,
    listRegion,
    listProvince,
    listDistrict,
  } = useDrelLocation()

  const drelSelected = getParams(
    'drel',
    listRegion?.length > 0 ? listRegion[0]?.region : ''
  )

  // const ugelSelected = getParams(
  //   'province',
  //   listProvince?.length > 0 ? listProvince[0]?.province : ''
  // )
  const ugelSelected = getParams('province', 'all')
  const distritoSelected = getParams('district', 'all')

  useEffect(() => {
    getRegion()
  }, [])

  useEffect(() => {
    if (drelSelected) {
      getProvince(drelSelected)
    }
  }, [drelSelected])

  useEffect(() => {
    if (ugelSelected) {
      getDistrict(drelSelected, ugelSelected)
    }
  }, [ugelSelected])

  const handleRegionChange = (value: string) => {
    updateFilters({
      drel: value ? (value as string) : '',
      province: '',
      district: '',
    })
  }

  const handleProvinceChange = (value: string) => {
    if (value === 'all') {
      updateFilters({
        province: '',
        district: '',
      })
    } else {
      updateFilters({
        province: value ? (value as string) : '',
        district: '',
      })
    }
  }

  const handleDistritoChange = (value: string) => {
    if (value === 'all') {
      updateFilters({
        district: '',
      })
    } else {
      updateFilters({
        district: value ? (value as string) : '',
      })
    }
  }

  return (
    <LocationContext.Provider
      value={{
        listLocation: {
          listDrel: listRegion,
          listUgel: listProvince,
          listDistrito: listDistrict,
        },
        // loadings: {
        //   loadDrel,
        //   loadUgel,
        //   loadDistrito,
        // },
        selectedValues: {
          drel: drelSelected,
          province: ugelSelected,
          district: distritoSelected,
        },
        functions: {
          handleRegionChange,
          handleProvinceChange,
          handleDistritoChange,
        },
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => useContext(LocationContext)
