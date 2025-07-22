/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { directoresFunctionsApi, periodoFunctionsApi, personaFunctionsApi } from "@/api";
import { CardContentDashboard } from "@/modules/admin/components/dashboard/CardContentDashboard";
import { CalendarIcon, UserIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CardList = () => {

    const { fetchPersonList } = personaFunctionsApi
    const { fetchPeriodoList } = periodoFunctionsApi
    const {fetchDirectorList} = directoresFunctionsApi
    const [countPerson, setCountPerson] = useState(0)
    const [countPeriod, setCountPeriod] = useState(0)
    const [countDirector, setCountDirector] = useState(0)

    const fetchDataPerson = async () => {
        try {
            const response = await fetchPersonList({
                page: 1,
                ordering: '-id',
            })
            const data = await response.json()
            setCountPerson(data.count || 0);

        } catch (error) {
            toast.error('Error al cargar la lista de personas')
        }
    }

    const fetchDataPeriod = async () => {
        try {
            const response = await fetchPeriodoList({
                page: 1,
                ordering: '-id',
                is_active: true
            })
            const data = await response.json()
            setCountPeriod(data.count || 0);
        }
        catch (error) {
            toast.error('Error al cargar la lista de periodos')
        }
    }

    const fetchDataDirector = async () => {
        try {
            const response = await fetchDirectorList({
                page: 1,
                ordering: '-id',
            })
            const data = await response.json()
            setCountDirector(data.count || 0);
        }
        catch (error) {
            toast.error('Error al cargar la lista de directores')
        }
    }

    useEffect(() => {
        fetchDataPerson()
        fetchDataPeriod()
        fetchDataDirector()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <CardContentDashboard
                title="Personas"
                icon={<Users className="h-6 w-6 text-muted-foreground" />}
                count={countPerson}
                label="Personas registrados"
                labelButton="Gestionar Personas"
                hrefButton="/admin/person-manange"
            />
            <CardContentDashboard
                title="Periodos"
                icon={<CalendarIcon className="h-6 w-6 text-muted-foreground" />}
                count={countPeriod}
                label="Periodos activos"
                labelButton="Gestionar Periodos"
                hrefButton="/admin/period-manange"
            />
            <CardContentDashboard
                title="Directores"
                icon={<UserIcon className="h-6 w-6 text-muted-foreground" />}
                count={countDirector}
                label="Directores registrados"
                labelButton="Gestionar Directores"
                hrefButton="/admin/director-manage"
            />
        </div>
    )
}