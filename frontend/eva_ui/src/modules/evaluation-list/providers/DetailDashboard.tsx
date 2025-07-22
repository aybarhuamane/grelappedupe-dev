import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { createContext, useContext, useEffect, useState } from 'react'

interface IDetailDashboard {
    colegios: number
    evaluaciones: number
    evaluaciones_faltantes: number
    ultima_evaluacion: string
}

const apiBase = apiUrl.evaluacion.detaildashboard

export const DetailDashboardContext = createContext<{
    dataValues: IDetailDashboard | null
}>({
    dataValues: null,
})

export const DetailDashboardProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [dataValues, setDataValues] = useState<IDetailDashboard | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCore(`${apiBase}`, {
                    method: 'GET',
                })

                if (response.ok) {
                    const jsonResponse = await response.json()
                    const values: IDetailDashboard = jsonResponse[0] as IDetailDashboard
                    setDataValues(values)
                } else {
                    console.error('Error fetching data', response.statusText)
                }
            } catch (error) {
                console.error('Error during fetch', error)
            }
        }

        fetchData()
    }, [])

    return (
        <DetailDashboardContext.Provider
            value={{
                dataValues,
            }}
        >
            {children}
        </DetailDashboardContext.Provider>
    )
}

export const useDetailDashboardContext = () => useContext(DetailDashboardContext)
