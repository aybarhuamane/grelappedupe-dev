'use client'
import { useState } from 'react'
import { modality, response } from '@/types'
import { modalitiesFunctionsApi } from '@/api'

export const useModalities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listCategories, setCategories] = useState<
    response.IResApi<modality.IModality>
  >({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getModalities = async (query: modality.IModalityFilter) => {
    setLoading(true)

    try {
      const res = await modalitiesFunctionsApi.fetchModalityList(query)

      if (res.ok) {
        const data: response.IResApi<modality.IModality> = await res.json()
        setCategories(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { getModalities, listCategories, loading }
}
