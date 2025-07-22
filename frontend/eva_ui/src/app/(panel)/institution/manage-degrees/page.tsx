import { GradosList } from '@/modules/director'
import { detailInstitution, response } from '@/types'
import { detailsInstitutionApi } from '@/api'
import { functionsGetUserData } from '@/modules/core'

export default async function Page() {
  const user = await functionsGetUserData.getUser()
  const { fetchDetailInstitutionList } = detailsInstitutionApi
  //   const { fetchDegreeList } = degreesFunctionsApi

  let institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList> =
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

  //   let degreeList: response.IResApi<degree.IDegreeList> = {
  //     count: 0,
  //     next: null,
  //     previous: null,
  //     results: [],
  //   }

  try {
    const res = await fetchDetailInstitutionList({
      director__person__id: user.persona_id,
    })
    if (res.ok) {
      const data: response.IResApi<detailInstitution.IDetailInstitutionList> =
        await res.json()
      institutionAssigned = data
    }
  } catch (error) {
    console.error(error)
  }

  return <GradosList institutionAssigned={institutionAssigned} />
}
