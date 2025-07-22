import { EvaluacionesList } from '@/modules/director'
import { detailInstitution, period, response } from '@/types'
import { detailsInstitutionApi, periodoFunctionsApi } from '@/api'
import { functionsGetUserData } from '@/modules/core'

export default async function Page() {
  const user = await functionsGetUserData.getUser()
  const { fetchDetailInstitutionList } = detailsInstitutionApi
  const { fetchPeriodoList } = periodoFunctionsApi

  let institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList> =
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

  let periodData: response.IResApi<period.IPeriodList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

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

  try {
    const res = await fetchPeriodoList({
      page: 1,
      is_active: true,
    })

    if (res.ok) {
      periodData = await res.json()
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <EvaluacionesList
      periodoData={periodData}
      institutionsAssigned={institutionAssigned}
    />
  )
}
