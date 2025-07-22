'use client'
import { useState } from 'react'
import { institution, response } from '@/types'
import { institutionsFunctionsApi } from '@/api'

export const useInstitutionsListAction = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [listInstitution, setInstitution] = useState<
        response.IResApi<institution.IDetailsInstitutionList>
    >({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getInstitutions = async (query: institution.IInstitutionFilter) => {
        setLoading(true)

        try {
            const res = await institutionsFunctionsApi.fetchInstitutionListAction(query)

            if (res.ok) {
                const data: response.IResApi<institution.IDetailsInstitutionList> = await res.json()
                setInstitution(data)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoading(false)
    }

    return { getInstitutions, listInstitution, loading }
}

