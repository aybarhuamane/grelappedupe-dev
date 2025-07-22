'use client'

import { fetchModalityList } from "@/api/app/educativa/fetchModalities"
import { modality, response } from "@/types"
import { useState } from "react"

export const useModality = () => {
    const [loadingModality, setLoadingModality] = useState<boolean>(false)
    const [listModality, setListModality] = useState<response.IResApi<modality.IModality>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getModality = async (query: modality.IModalityFilter) => {
        setLoadingModality(true)

        try {
            const res = await fetchModalityList(query)
            if (res.ok) {
                const data: response.IResApi<modality.IModality> = await res.json()
                setListModality(data)
                setLoadingModality(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingModality(false)
    }

    return { getModality, listModality, loadingModality }

}