import { tablePeriods } from '@/modules/admin'
import { periodoFunctionsApi } from '@/api'
import { functionsGetUserData } from '@/modules/core'
import { period, response } from '@/types'

export default async function page() {
  const user = await functionsGetUserData.getUser()
  const { fetchPeriodoList } = periodoFunctionsApi

  let periodAsigment: response.IResApi<period.IPeriodList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const res = await fetchPeriodoList({
      name: user.persona_nombres,
    })

    if (res.ok) {
      const data: response.IResApi<period.IPeriodList> = await res.json()
      periodAsigment = data
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <main className="flex flex-col w-full gap-4">
      <tablePeriods.PeriodTable periodAsigment={periodAsigment} />
    </main>
  )
}
