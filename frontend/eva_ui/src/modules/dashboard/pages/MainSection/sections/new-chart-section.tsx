/* eslint-disable react-hooks/exhaustive-deps */
import { NoDataFound } from "@/components/custom/no-data-found";
import { useFilterFromUrl } from "@/modules/core";
import { useCoursesContext, useFilterEvaluacion } from "@/modules/dashboard";
import Image from "next/image";
import { useEffect } from "react";
import { RenderDonus } from "./RenderDonus";
import { ChartSkeleton } from "./chart-skeleton";
import { NewRenderChart } from "./new-render-chart";

export const NewChartSection = () => {
  const { loadingFilter, getNewDataDashboard, newDataDashboard, timeoutError } =
    useFilterEvaluacion();
  const { listCoursesApi, competencesList, capacitiesList } =
    useCoursesContext();
  const { getParams } = useFilterFromUrl();

  const listCourses = listCoursesApi?.results || [];

  const capacity = getParams("capacity", "");

  const region = getParams("region", "");
  const province = getParams("province", "");
  const curso = getParams("curso", "") || "";
  const competence = getParams("competence", "");
  const district = getParams("district", "");
  const codigo_local = getParams("codigo_local", "");
  const codigo_modular = getParams("codigo_modular", "");
  const period_id = getParams("period_id", "");

  useEffect(() => {
    getNewDataDashboard({
      curso_id: Number(curso),
      codigo_local,
      codigo_modular,
      competencia_id: Number(competence),
      period_id: Number(period_id),
      distrito: district,
      drel: region,
      ugel: province,
    });
  }, [
    curso,
    district,
    codigo_local,
    codigo_modular,
    period_id,
    competence,
    region,
    province,
  ]);

  const renderNoData = () => (
    <section className="flex flex-col items-center justify-center">
      <Image src="/svg/no-data.svg" alt="IE" width={300} height={200} />
      <h1 className="text-sm text-center">
        Aún no se han registrado evaluaciones
      </h1>
    </section>
  );

  const renderChart = () => {
    if (newDataDashboard && newDataDashboard.length > 0 && capacity === "") {
      return (
        <NewRenderChart
          dataChart={newDataDashboard || []}
          loadingFilter={loadingFilter}
        />
      );
    } else if (
      newDataDashboard &&
      newDataDashboard.length > 0 &&
      capacity !== ""
    ) {
      return (
        <RenderDonus
          title={
            capacitiesList?.results?.find(
              (item) => item?.id === Number(capacity)
            )?.name || ""
          }
          subTitle={
            competencesList?.results?.find(
              (item) => item?.id === Number(competence)
            )?.name || ""
          }
          dataList={
            newDataDashboard
              .flatMap((item) => item.cursos)
              .flatMap((comp) => comp.data)
              .flatMap((comp) => comp.capacidades)
              .find((item) => item?.id === Number(capacity)) || null
          }
        />
      );
    }

    return renderNoData();
  };

  return (
    <section className="flex flex-col gap-3 ">
      <section className="w-full">
        {loadingFilter ? (
          <ChartSkeleton />
        ) : (
          <>
            {timeoutError ? (
              <NoDataFound />
            ) : curso ? (
              newDataDashboard && newDataDashboard.length > 0 ? (
                renderChart()
              ) : (
                <NoDataFound />
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
  );
};
