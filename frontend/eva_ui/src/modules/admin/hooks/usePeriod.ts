'use client'

import { useState } from 'react'
import { period, response } from '@/types'
import { periodoFunctionsApi } from '@/api'

export const usePeriod = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listPeriods, setPeriods] = useState<response.IResApi<period.IPeriodList>>({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getPeriods = async (query: period.IPeriodFilter) => {
    setLoading(true)
    try {
      const res = await periodoFunctionsApi.fetchPeriodoList(query)
      if (res.ok) {
        const data: response.IResApi<period.IPeriodList> = await res.json()
        setPeriods(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return { getPeriods, listPeriods, loading }
}