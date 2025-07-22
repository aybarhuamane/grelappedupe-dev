'use client'

import { fetchQuestionsListAction } from "@/api/app/evaluacion/fetchQuestions"
import { questions, response } from "@/types"
import { useState } from "react"

export const useQuestionTableAction = () => {
    const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false)
    const [listQuestions, setQuestions] = useState<response.IResApi<questions.IQuestionListAction>>({
        count: 0,
        results: [],
        next: null,
        previous: null,
    })

    const getQuestionsList = async (query: questions.IQuestionFilter) => {
        setLoadingQuestion(true)

        try {
            const res = await fetchQuestionsListAction(query)
            if (res.ok) {
                const data: response.IResApi<questions.IQuestionListAction> = await res.json()
                setQuestions(data)
                setLoadingQuestion(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingQuestion(false)
    }

    return { getQuestionsList, listQuestions, loadingQuestion }
}
