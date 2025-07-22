import { period } from '@/types'
import { CalendarRange } from 'lucide-react'

interface IProps {
  dataPeriodo: period.IPeriodList
}

export const BannerPeriodo = (props: IProps) => {
  const { dataPeriodo } = props

  const daysCount = (date: string) => {
    const date1 = new Date(date)
    const date2 = new Date()
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <section className="bg-green-700 py-5">
      <main className="container flex gap-4 items-center">
        <section className="flex items-center gap-4">
          <div className="text-white flex gap-4 items-center">
            <CalendarRange
              size={52}
              className="text-white border-1"
            />
            <div className="flex flex-col gap-1">
              <h1 className="flex items-center gap-2 text-white text-xs">
                Periodo actual
              </h1>
              <p className="text-white font-bold text-xl">
                {dataPeriodo.name} {dataPeriodo.is_active && '(activo)'}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-l pl-4">
            <h1 className="text-white text-xs">Fecha de inicio y fin</h1>
            <p className="text-white  text-xl">
              {dataPeriodo.start_date} hasta {dataPeriodo.end_date}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l pl-4">
            <h1 className="text-white text-xs">Días restantes</h1>
            <p className="text-white font-bold text-xl">
              {daysCount(dataPeriodo.end_date)}
            </p>
          </div>
        </section>
      </main>
    </section>
  )
}
