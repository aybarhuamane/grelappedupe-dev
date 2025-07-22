'use client'
import { useState } from 'react'
import { degree, response } from '@/types'
import { degreesFunctionsApi } from '@/api'

export const useGrados = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listGrados, setGrados] = useState<response.IResApi<degree.IDegree>>({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getGrados = async (query: degree.IDegreeFilter) => {
    setLoading(true)

    try {
      const res = await degreesFunctionsApi.fetchDegreeList(query)

      if (res.ok) {
        const data: response.IResApi<degree.IDegree> = await res.json()
        setGrados(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { getGrados, listGrados, loading }
}
