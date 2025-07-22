'use client'
import { useState } from 'react'
import { competences, response } from '@/types'
import { competencesFunctionsApi } from '@/api'

export const useCompetences = () => {
    const [loadingCompetences, setLoadingCompetences] = useState<boolean>(false)
    const [listCompetences, setCompetences] = useState<response.IResApi<competences.ICompetencesList>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getCompetences = async (query: competences.ICompetencesFilter) => {
        setLoadingCompetences(true)

        try {
            const res = await competencesFunctionsApi.fetchCompetenceList(query)

            if (res.ok) {
                const data: response.IResApi<competences.ICompetencesList> = await res.json()
                setCompetences(data)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingCompetences(false)
    }

    return { getCompetences, listCompetences, loadingCompetences }
}
