import { FrmGradoEditor } from '@/modules/director'
import { degreesFunctionsApi } from '@/api'
import { degree } from '@/types'
import { detailInstitution, response } from '@/types'
import { detailsInstitutionApi } from '@/api'
import { functionsGetUserData } from '@/modules/core'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
  const { id } = params
  const user = await functionsGetUserData.getUser()
  const { fetchDetailInstitutionList } = detailsInstitutionApi

  let institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList> =
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

  let defaultData: degree.IDegree | undefined = undefined

  try {
    const res = await degreesFunctionsApi.fetchDegree(Number(id))
    if (res.ok) {
      const data = await res.json()
      defaultData = data
    }
  } catch (error) {
    console.error(error)
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

  return (
    <main>
      {defaultData && (
        <FrmGradoEditor
          institutionAssigned={institutionAssigned.results}
          defaultData={defaultData}
        />
      )}
    </main>
  )
}
