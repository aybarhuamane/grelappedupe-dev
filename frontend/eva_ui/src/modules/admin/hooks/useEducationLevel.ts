'use client'

import {fetchEducationLevelList} from "@/api/app/educativa/fetchEducationalLevel"
import { educationalLevel, response } from "@/types"
import { useState } from "react"

export const useEducationLevel = () => {
    const [loadingLevel, setLoadingLevel] = useState<boolean>(false)
    const [listLevel, setListLevel] = useState<response.IResApi<educationalLevel.IEducationalLevel>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getEducationsLevels = async (query: educationalLevel.IEducationalLevelFilter) => {
        setLoadingLevel(true)

        try {
            const res = await fetchEducationLevelList(query)
            if (res.ok) {
                const data: response.IResApi<educationalLevel.IEducationalLevel> = await res.json()
                setListLevel(data)
                setLoadingLevel(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingLevel(false)
    }

    return { getEducationsLevels, listLevel, loadingLevel }

}