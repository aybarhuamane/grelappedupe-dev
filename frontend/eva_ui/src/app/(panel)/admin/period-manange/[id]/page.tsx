import { PeriodEdit } from '@/modules/admin'
import { period, response } from '@/types'
import { functionsGetUserData } from '@/modules/core'
import { periodoFunctionsApi } from '@/api'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
  const { id } = params
  const user = await functionsGetUserData.getUser()
  const { fetchPeriodoList } = periodoFunctionsApi

  let periodAsigment: response.IResApi<period.IPeriodList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  let defaultData: period.IPeriodPost | undefined = undefined

  try {
    const res = await periodoFunctionsApi.fetchPeriod(Number(id))
    if (res.ok) {
      const data = await res.json()
      defaultData = data
    }
  } catch (error) {
    console.error(error)
  }

  try {
    const res = await fetchPeriodoList({})
    if (res.ok) {
      const data: response.IResApi<period.IPeriodList> = await res.json()
      periodAsigment = data
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <main className="flex flex-col w-full gap-4">
      {defaultData && (
        <PeriodEdit
          periodData={defaultData}
          idPeriod={Number(id)}
        />
      )}
    </main>
  )
}
