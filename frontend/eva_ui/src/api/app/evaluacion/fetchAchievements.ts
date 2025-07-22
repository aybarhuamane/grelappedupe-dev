import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { achievements } from '@/types'

const apiBase = apiUrl.evaluacion.achievements

export async function fetchAchievementsList(filters:achievements.IAchievementFilter){
    const {
        id,
        is_active,
        name,
        name__icontains,
        ordering,
        page
    } = filters

    const params = new URLSearchParams()

    if(id) params.append('id',id.toString())
    if(is_active) params.append('is_active',is_active.toString())
    if(name) params.append('name',name)
    if(name__icontains) params.append('name__icontains',name__icontains)
    if(ordering) params.append('ordering',ordering)
    if(page) params.append('page',page.toString())
    
    const response = await fetchCore(`${apiBase}/?${params.toString()}`, {
        method: 'GET'
    })

    return response
}


export async function createOrUpdateAchievement(
    data: achievements.IAchievementPost,
    id?: number
){
    const url = id ? `${apiBase}/${id}` : apiBase
    const method = id ? 'PUT' : 'POST'
    const response = await fetchCore(url,{
        method,
        body: JSON.stringify(data)
    })
    return response
}