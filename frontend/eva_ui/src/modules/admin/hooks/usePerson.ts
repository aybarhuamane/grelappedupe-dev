'use client'

import { fetchPersonList } from "@/api/app/core/fetchPerson"
import { person, response } from "@/types"
import { useState } from "react"

export const usePerson = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listPerson, setPerson] = useState<response.IResApi<person.IPersonList>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getPerson = async (query: person.IPersonFilter) => {
        setLoading(true)

        try {
            const res = await fetchPersonList(query)
            if (res.ok) {
                const data: response.IResApi<person.IPersonList> = await res.json()
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
