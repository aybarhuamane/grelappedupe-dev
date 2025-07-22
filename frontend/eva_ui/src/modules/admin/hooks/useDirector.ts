'use client'

import { fetchDirectorList, fetchDirectorListAction } from "@/api/app/educativa/fetchDirectors"
import { director, response } from "@/types"
import { useState } from "react"

export const useDirector = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listDirector, setDirector] = useState<response.IResApi<director.IDirectorList>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getDirector = async (query: director.IDirectorFilter) => {
        setLoading(true)

        try {
            const res = await fetchDirectorList(query, true)
            if (res.ok) {
                const data: response.IResApi<director.IDirectorList> = await res.json()
                setDirector(data)
                setLoading(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    const getDirectorAction = async (query: director.IDirectorFilter) => {
        setLoading(true)

        try {
            const res = await fetchDirectorListAction(query, true)
            if (res.ok) {
                const data: response.IResApi<director.IDirectorList> = await res.json()
                setDirector(data)
                setLoading(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    return { getDirector, listDirector, loading, getDirectorAction }

}