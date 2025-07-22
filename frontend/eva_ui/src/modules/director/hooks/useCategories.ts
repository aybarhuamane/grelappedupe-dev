'use client'
import { useState } from 'react'
import { category, response } from '@/types'
import { categoriesFunctionsApi } from '@/api'

export const useCategories = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [listCategories, setCategories] = useState<
    response.IResApi<category.ICategory>
  >({
    count: 0,
    results: [],
    next: null,
    previous: null,
  })

  const getCategories = async (query: category.ICategoryFilter) => {
    setLoading(true)

    try {
      const res = await categoriesFunctionsApi.fetchCategoryList(query)

      if (res.ok) {
        const data: response.IResApi<category.ICategory> = await res.json()
        setCategories(data)
      } else {
        console.error(res.statusText)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return { getCategories, listCategories, loading }
}
