import { Suspense } from 'react'
import { BarChartComponent } from '../components/BarChar'
import { Skeleton } from '@/components/ui/skeleton'
import { IDashboard } from '../components/Filters/useFilterEvaluacion'
import { transformDataForChart } from './EvaluationData';
import { converData, extraerKeys, extraerNames } from './converData'


export interface IEvaluationDashboard {
  curso:       string;
  competencia: Competencia[];
}

export interface Competencia {
  id:          number;
  competencia: string;
  capacidades: Capacidade[];
}

export interface Capacidade {
  id:        number;
  capacidad: string;
  logros:    Logro[];
}

export interface Logro {
  id:    number;
  logro: string;
  valor: number;
}


interface IProps {
  listFilter: IDashboard[] | null
  loadingFilter: boolean
}

export const ChartSection = (props: IProps) => {
  const { listFilter, loadingFilter } = props

  // Mapeamos las competencias para crear los datos del gráfico y tabla
  const data = listFilter && listFilter.length > 0 ? listFilter[0].competencia.map(comp => ({
    name: comp.competencia,
    ...comp.logros.reduce((acc, logro) => ({ ...acc, [logro.logro]: logro.valor }), {})
  })) : []

  const legends = listFilter ? listFilter[0].competencia[0]?.logros.map(logro => logro.logro) : []
  const names = data.map(item => item.name)

  return (
    <section className="flex flex-col gap-3">
      {loadingFilter && <Skeleton className="mt-6 h-full w-full rounded-md" />}

      {!loadingFilter && (
        <Suspense
          fallback={<Skeleton className="mt-6 h-full w-full rounded-md" />}
        >
          <BarChartComponent
            legends={legends}
            names={names}
            data={data}
          />
        </Suspense>
      )}
    </section>
  )
}
