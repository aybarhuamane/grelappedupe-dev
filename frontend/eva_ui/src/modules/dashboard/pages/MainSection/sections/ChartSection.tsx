/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useFilterEvaluacion, useCoursesContext } from '@/modules/dashboard'
import { useFilterFromUrl } from '@/modules/core'
import Image from 'next/image'
import { RenderChart } from './RenderChart'
import { Skeleton } from '@/components/ui/skeleton'
import { RenderDonus } from './RenderDonus'

export const ChartSection = () => {
  const { getDataDashboard, dataDashboard, loadingFilter } =
    useFilterEvaluacion()
  const { listCoursesApi, competencesList, capacitiesList } =
    useCoursesContext()
  const { getParams } = useFilterFromUrl()

  const listCourses = listCoursesApi?.results || []

  const capacity = getParams('capacity', '')

  const region = getParams('region', '')
  const province = getParams('province', '')
  const curso = getParams('curso', `${listCourses[0]?.id || ''}`)
  const competence = getParams('competence', '')
  const district = getParams('district', '')
  const codigo_local = getParams('codigo_local', '')
  const codigo_modular = getParams('codigo_modular', '')
  const periodo_id = getParams('periodo_id', '')

  useEffect(() => {
    getDataDashboard({
      curso_id: Number(curso),
      codigo_local,
      codigo_modular,
      competencia_id: Number(competence),
      period_id: Number(periodo_id),
      distrito: district,
      drel: region,
      ugel: province,
    })
  }, [
    curso,
    district,
    codigo_local,
    codigo_modular,
    periodo_id,
    competence,
    region,
    province,
  ])

  const filterData = dataDashboard?.map((item) => item?.competencia)?.flat()
  const filterDataCompetence = filterData
    ?.map((item) => item?.capacidades)
    ?.flat()
  const capacityData = filterDataCompetence?.find(
    (item) => item?.id === Number(capacity)
  )

  const competenceData = competencesList?.results?.find(
    (item) => item?.id === Number(competence)
  )

  const capacityDataList = capacitiesList?.results?.find(
    (item) => item?.id === Number(capacity)
  )

  const renderNoData = () => (
    <section className="flex flex-col items-center justify-center">
      <Image
        src="/svg/no-data.svg"
        alt="IE"
        width={300}
        height={200}
      />
      <h1 className="text-sm text-center">
        Aún no se han registrado evaluaciones
      </h1>
    </section>
  )

  const renderChart = () => {
    if (dataDashboard && dataDashboard.length > 0 && capacity === '') {
      return (
        <RenderChart
          dataChart={dataDashboard || []}
          loadingFilter={loadingFilter}
        />
      )
    } else if (dataDashboard && dataDashboard.length > 0 && capacity !== '') {
      return (
        <RenderDonus
          title={capacityDataList?.name || ''}
          subTitle={competenceData?.name || ''}
          dataList={capacityData || null}
        />
      )
    }

    return renderNoData()
  }

  return (
    <section className="flex flex-col gap-3 ">
      <section className="w-full">
        {loadingFilter ? (
          <main>
            <Skeleton className="mt-6 h-96 w-full rounded-md" />
          </main>
        ) : (
          <>
            {curso ? (
              dataDashboard && dataDashboard.length > 0 ? (
                renderChart()
              ) : (
                <section className="flex flex-col items-center justify-center">
                  <Image
                    src="/svg/no-data.svg"
                    alt="IE"
                    width={300}
                    height={200}
                  />
                  <h1 className="text-sm text-center">No hay datos</h1>
                </section>
              )
            ) : (
              <section className="flex flex-col items-center justify-center">
                <Image
                  src="/svg/research.svg"
                  alt="IE"
                  width={300}
                  height={200}
                />
                <h1 className="text-sm text-center">Seleccione un curso</h1>
              </section>
            )}
          </>
        )}
      </section>
    </section>
  )
}
