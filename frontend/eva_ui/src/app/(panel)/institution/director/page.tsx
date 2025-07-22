import { detailInstitution, response } from '@/types'
import { detailsInstitutionApi, cursosFunctionsApi } from '@/api'
import { functionsGetUserData } from '@/modules/core'
import { DirectorDetails } from '@/modules/institution-admin/director/DirectorDetails'

export default async function Page() {
  const user = await functionsGetUserData.getUser()
  const { fetchDetailInstitutionList } = detailsInstitutionApi

  let institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList> =
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

  try {
    const res = await fetchDetailInstitutionList({
      modular_code: user.institution_modular_code
    })
    if (res.ok) {
      const data: response.IResApi<detailInstitution.IDetailInstitutionList> =
        await res.json()
      institutionAssigned = data
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <DirectorDetails
      data={institutionAssigned?.results[0] || null}
    />
  )
}
