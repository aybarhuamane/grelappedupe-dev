'use client'
import { useState } from 'react'
import { capacity, response } from '@/types'
import { capacitiesFunctionsApi } from '@/api'

export const useCapacitiesAction = () => {
    const [loadingCapacities, setLoadingCapacities] = useState<boolean>(false)
    const [listCapacities, setCapacities] = useState<response.IResApi<capacity.ICapacityList>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })
    const [listCapacity, setCapacity] = useState<capacity.ICapacityList[]>()

    const getCapacitiesAction = async (query: capacity.ICapacityFilter) => {
        setLoadingCapacities(true)

        try {
            const res = await capacitiesFunctionsApi.fetchCapacityListAction(query)

            if (res.ok) {
                const data: response.IResApi<capacity.ICapacityList> = await res.json()
                setCapacities(data)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingCapacities(false)
    }

    const getCapacity = async (query: capacity.ICapacityFilter) => {
        setLoadingCapacities(true)

        try {
            const res = await capacitiesFunctionsApi.fetchCapacityList(query)

            if (res.ok) {
                const data: capacity.ICapacityList[] = await res.json()
                setCapacity(data)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { getCapacitiesAction, getCapacity, listCapacities, listCapacity, loadingCapacities }
}
