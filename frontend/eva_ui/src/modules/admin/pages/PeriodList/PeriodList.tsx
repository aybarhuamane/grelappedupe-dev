import { HeaderSection, LayoutAsideSection } from "@/modules/core"
import { tablePeriods, AsidePeriodFilter } from "@/modules/admin"
import {periodoFunctionsApi} from "@/api"
import { functionsGetUserData } from '@/modules/core'
import { period, response } from "@/types"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { usePeriod } from "../../hooks/usePeriod"

export const PeriodList = async() => {
    const user = await functionsGetUserData.getUser()
    const { fetchPeriodoList } = periodoFunctionsApi

    let periodAsigment: response.IResApi<period.IPeriodList> = {
        count: 0,
        next: null,
        previous: null,
        results: [],
    }

    try{
        const res = await fetchPeriodoList({})
        if(res.ok){
            const data: response.IResApi<period.IPeriodList> = await res.json()
            periodAsigment = data
        }
    }
    catch(error){
        console.error(error)
    }
    return (
        <main className="flex flex-col w-full gap-4">
            <HeaderSection
                title="Periodos"
                subtitle="Lista de periodos"
                hrefAddButton="/admin/period-manange/create"
                labelAddButton="Agregar periodo"
            />
            <LayoutAsideSection
                aside={
                    <AsidePeriodFilter />
                }
            >
                <tablePeriods.PeriodTable periodAsigment={periodAsigment}/>
            </LayoutAsideSection>
        </main>
    )
}