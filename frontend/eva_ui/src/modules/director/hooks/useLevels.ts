'use client'
import { useState } from 'react'
import { educationalLevel, response } from '@/types'
import { educationalLevelsFunctionsApi } from '@/api'

export const useLevels = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listLevels, setLevels] = useState<
    response.IResApi<educationalLevel.IEducationalLevel>
  >({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getLevels = async (query: educationalLevel.IEducationalLevelFilter) => {
    setLoading(true)

    try {
      const res = await educationalLevelsFunctionsApi.fetchEducationLevelList(
        query
      )

      if (res.ok) {
        const data: response.IResApi<educationalLevel.IEducationalLevel> =
          await res.json()
        setLevels(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { listLevels, getLevels, loading }
}
