import { period } from '@/types'

interface SectionBannerEvaluationProps {
  dataPeriodo: period.IPeriodList
}

export const SectionBannerEvaluation = (prop: SectionBannerEvaluationProps) => {
  const { dataPeriodo } = prop

  return (
    <main className="flex flex-col gap-4 bg-green-800 py-2">
      <section className="container flex gap-4">
        <div>
          <h1 className=" text-white text-sm">Periodo activo</h1>
          <p className="text-white font-bold">{dataPeriodo.name}</p>
        </div>
        <div className="border-l pl-4">
          <h1 className=" text-white text-sm">Fechas de evaluación</h1>
          <p className="text-white font-bold">
            {dataPeriodo.start_date}
            <span className="font-normal"> hasta </span>
            {dataPeriodo.end_date}
          </p>
        </div>
      </section>
    </main>
  )
}
