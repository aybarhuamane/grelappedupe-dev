'use client'
import { useState } from 'react'
import { response, ubigeo } from '@/types'
import { ubigeoFunctionsApi } from '@/api'

export const useUbigeos = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listUbigeos, setUbigeos] = useState<
        response.IResApi<ubigeo.IUbigeoList>
    >({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getUbigeos = async (query: ubigeo.IUbigeoFilter) => {
        setLoading(true)

        try {
            const res = await ubigeoFunctionsApi.fetchUbigeoList(query)

            if (res.ok) {
                const data: response.IResApi<ubigeo.IUbigeoList> = await res.json()
                setUbigeos(data)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    return { getUbigeos, listUbigeos, loading }
}

