'use client'
import { useState } from 'react'
import { institution, response } from '@/types'
import { institutionsFunctionsApi } from '@/api'

export const useInstitution = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listInstitution, setInstitution] = useState<
        response.IResApi<institution.IInstitutionList>
    >({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getInstitution = async (query: institution.IInstitutionFilter) => {
        setLoading(true)

        try {
            const res = await institutionsFunctionsApi.fetchInstitutionList(query)

            if (res.ok) {
                const data: response.IResApi<institution.IInstitutionList> = await res.json()
                setInstitution(data)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    return { getInstitution, listInstitution, loading }
}

