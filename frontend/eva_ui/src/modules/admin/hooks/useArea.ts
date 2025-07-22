'use client'

import { fetchAreaList } from "@/api/app/educativa/fetchAreas"
import { area, response } from "@/types"
import { useState } from "react"

export const useArea = () => {
    const [loadingArea, setLoadingArea] = useState<boolean>(false)
    const [listArea, setListArea] = useState<response.IResApi<area.IArea>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getAreas = async (query: area.IAreaFilter) => {
        setLoadingArea(true)

        try {
            const res = await fetchAreaList(query)
            if (res.ok) {
                const data: response.IResApi<area.IArea> = await res.json()
                setListArea(data)
                setLoadingArea(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingArea(false)
    }

    return { getAreas, listArea, loadingArea }

}