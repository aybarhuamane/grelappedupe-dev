'use client'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useDetailHeaderContext } from '@/modules/dashboard'

export const CounterSection = () => {
  const { dataValues } = useDetailHeaderContext()

  const nInstituciones = dataValues?.colegios || 0
  const evaluaciones = dataValues?.evaluaciones || 0
  const evaluacionesFaltantes = dataValues?.evaluaciones_faltantes || 0

  //calcula el porcentaje
  const porcentaje = (a: number, b: number) => {
    return b > 0 ? ((a / b) * 100).toFixed(3) : '0.000'
  }

  const porcentajeEvaluaciones = porcentaje(evaluaciones, nInstituciones)
  const porcentajeEvaluacionesFaltantes = porcentaje(
    evaluacionesFaltantes,
    nInstituciones
  )

  // Condicional para mostrar el skeleton cuando los datos están cargando
  const isLoading = !dataValues

  return (
    <main className="bg-gray-200">
      <section className="flex gap-4 justify-between items-center px-6 py-2 container">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Skeleton className="h-6 w-12" />
          ) : (
            <h1 className="font-bold">{nInstituciones}</h1>
          )}
          <p className="text-xs font-medium">Nº de Instituciones Educativas</p>
        </div>
        <Separator
          orientation="vertical"
          className="h-10 bg-gray-400"
        />
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Skeleton className="h-6 w-20" />
          ) : (
            <h1 className="font-bold">
              {evaluaciones} ({porcentajeEvaluaciones} %)
            </h1>
          )}
          <p className="text-xs font-medium">Evaluaciones Subidas</p>
        </div>
        <Separator
          orientation="vertical"
          className="h-10 bg-gray-400"
        />
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Skeleton className="h-6 w-20" />
          ) : (
            <h1 className="font-bold">
              {evaluacionesFaltantes} ({porcentajeEvaluacionesFaltantes} %)
            </h1>
          )}
          <p className="text-xs font-medium">Evaluaciones Restantes</p>
        </div>
        <Separator
          orientation="vertical"
          className="h-10 bg-gray-400"
        />
        <div className="flex flex-col items-center">
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <h1 className="font-bold">
              {dataValues?.ultima_evaluacion || 'Sin fecha'}
            </h1>
          )}
          <p className="text-xs font-medium">Ultima actualización</p>
        </div>
      </section>
    </main>
  )
}
