'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { dashboardFuntions } from '@/api'

interface IDetailHeader {
  colegios: number
  evaluaciones: number
  evaluaciones_faltantes: number
  ultima_evaluacion: string
}

export const DetailHeaderContext = createContext<{
  dataValues: IDetailHeader | null
}>({
  dataValues: null,
})

export const DetailHeaderProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [dataValues, setDataValues] = useState<IDetailHeader | null>(null)

  const fetchData = async () => {
    try {
      const response = await dashboardFuntions.fetchEvaluationHeader()

      if (response.ok) {
        const data = await response.json()
        setDataValues(data[0])
      } else {
        console.error('Error fetching data', response.statusText)
      }
    } catch (error) {
      console.error('Error during fetch', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DetailHeaderContext.Provider
      value={{
        dataValues,
      }}
    >
      {children}
    </DetailHeaderContext.Provider>
  )
}

export const useDetailHeaderContext = () => useContext(DetailHeaderContext)
