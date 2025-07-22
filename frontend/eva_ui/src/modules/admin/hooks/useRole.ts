'use client'

import { fetchRoleList } from "@/api/app/core/fetchRole"
import { role, response } from "@/types"
import { useState } from "react"

export const useRole = () => {
    const [loadingRole, setLoadingRole] = useState<boolean>(false)
    const [listRole, setListRole] = useState<role.IRole[]>()

    const getRoles = async () => {
        setLoadingRole(true)

        try {
            const res = await fetchRoleList()
            if (res.ok) {
                const data: role.IRole[] = await res.json()
                setListRole(data)
                setLoadingRole(false)
            } else {
                console.error(res.statusText)
            }
        } catch (error) {
            console.error(error)
        }

        setLoadingRole(false)
    }

    return { getRoles, listRole, loadingRole }

}