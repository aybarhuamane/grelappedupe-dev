'use client'

export interface IDashboard {
  curso:       string;
  competencia: Competencia[];
}

export interface Competencia {
  id:          number;
  competencia: string;
  logros:      Logro[];
}

export interface Logro {
  id:    number;
  logro: string;
  valor: number;
}



import { useState } from 'react'
import { fetchCore } from '@/api'
import { apiUrl } from '@/config'

export interface IQueryFilter {
    region: string
  province?: string
  district?: string
  codigo_local?: string
  codigo_modular?: string
  period_id?: string
  curso_id: string
  competencia_id: string
}

const apiBase = apiUrl.evaluacion.dashboard

export const useFilterEvaluacion = () => {
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [listFilter, setListFilter] = useState<IDashboard[] | null>(null)

  const getCompleteFilter = async (query: IQueryFilter) => {
    setLoadingFilter(true)

    const params = new URLSearchParams()
    if (query.curso_id) params.append('curso_id', query.curso_id)

    const response = await fetchCore(`${apiBase}?${params.toString()}`, {
      method: 'GET',
    })

    if (response.ok) {
      const data: IDashboard[] = await response.json()
      setListFilter(data)
    } else {
      setListFilter(null)
    }
    setLoadingFilter(false)
  }

  return {
    getCompleteFilter,
    loadingFilter,
    listFilter,
  }
}
