'use client'

import { fetchPersonListActions } from "@/api/app/core/fetchPersonAction"
import { getUser, response } from "@/types"
import { useState } from "react"

export const useGetPersonAction = () => {
    const [getLoading, setGetLoading] = useState<boolean>(false)
    const [listGetPerson, setGetPerson] = useState<response.IResApi<getUser.IGetPersonList>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getPerson = async (query: getUser.IGetPersonFilter) => {
        setGetLoading(true)

        try {
            const res = await fetchPersonListActions(query)
            if (res.ok) {
                const data: response.IResApi<getUser.IGetPersonList> = await res.json()
                setGetPerson(data)
                setGetLoading(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setGetLoading(false)
    }

    return { getPerson, listGetPerson, getLoading }
}
