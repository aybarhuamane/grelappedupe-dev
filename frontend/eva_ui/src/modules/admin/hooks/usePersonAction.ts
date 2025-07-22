'use client'

import { fetchPersonListActions } from "@/api/app/core/fetchPersonAction"
import { person, response } from "@/types"
import { useState } from "react"

export const usePersonAction = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listPerson, setPerson] = useState<response.IResApi<person.IPersonListActions>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getPerson = async (query: person.IPersonFilter) => {
        setLoading(true)

        try {
            const res = await fetchPersonListActions(query)
            if (res.ok) {
                const data: response.IResApi<person.IPersonListActions> = await res.json()
                setPerson(data)
                setLoading(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    return { getPerson, listPerson, loading }
}
