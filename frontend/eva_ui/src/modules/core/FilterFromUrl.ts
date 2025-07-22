import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useFilterFromUrl = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const getParams = (nameParams: string, defaultValue: string) => {
    const value = searchParams.get(nameParams)
    return value || defaultValue
  }

  const updateFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      // Set the new filter
      if (name === 'page') {
        if (value === '1') {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      } else {
        params.delete('page')
        if (value === '') {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      }

      // Remove the parameters that come after the updated parameter
      let foundUpdatedParam = false
      const keysToRemove: string[] = []
      for (const key of Array.from(params.keys())) {
        if (foundUpdatedParam) {
          keysToRemove.push(key)
        }
        if (key === name) {
          foundUpdatedParam = true
        }
      }
      keysToRemove.forEach((key) => params.delete(key))

      const queryString = params.toString()
      const url = `${pathname}${queryString ? `?${queryString}` : ''}`

      router.push(url)
    },
    [searchParams, router, pathname]
  )

  return {
    getParams,
    updateFilter,
  }
}
