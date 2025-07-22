import { BarChartComponent } from "@/modules/dashboard";
import { INewDirectorResumeDashboard } from "@/types/evaluacion/new-director-dashboard";
import Image from "next/image";
import { BarChartSkeleton } from "./bar-chart-skeleton";

interface IProps {
  dataChart: INewDirectorResumeDashboard[];
  loadingFilter: boolean;
  selectedCompetenceId?: number;
}

export const NewRenderDirectorChart = (props: IProps) => {
  const { dataChart, loadingFilter, selectedCompetenceId } = props;

  const formattedData =
    dataChart && dataChart.length > 0
      ? (() => {
          const firstCompetencia = dataChart[0]?.cursos ?? [];

          // Get the logros structure from the first item to use as header
          const logrosStructure =
            firstCompetencia[0]?.data?.[0]?.logros?.map(
              (logro) => logro?.logro || ""
            ) || [];

          // If a competence is selected, show capacidades with their logros
          if (selectedCompetenceId && selectedCompetenceId !== 0) {
            const selectedCompetence = firstCompetencia[0]?.data?.find(
              (comp) => comp.id === selectedCompetenceId
            );

            if (
              selectedCompetence?.capacidades &&
              selectedCompetence.capacidades.length > 0
            ) {
              const rows = selectedCompetence.capacidades.map((capacidad) => [
                capacidad?.capacidad || "",
                ...(capacidad?.logros?.map((logro) => logro?.valor ?? 0) || []),
              ]);

              return [logrosStructure, ...rows];
            }
          }

          // If no competence is selected, show competencias with their logros
          const rows =
            firstCompetencia[0]?.data?.map((comp) => [
              comp?.competencia || "",
              ...(comp?.logros?.map((logro) => logro?.valor ?? 0) || []),
            ]) || [];

          return [logrosStructure, ...rows];
        })()
      : [];

  return (
    <section className="flex flex-col gap-3 items-center justify-center h-full min-h-96">
      {loadingFilter && <BarChartSkeleton />}

      {!loadingFilter && formattedData.length > 0 && (
        <BarChartComponent
          legends={formattedData[0] || []}
          dataSources={formattedData.slice(1)}
        />
      )}
      {!loadingFilter && formattedData.length === 0 && (
        <section className="flex flex-col items-center justify-center">
          <Image src="/svg/no-data.svg" alt="IE" width={300} height={200} />
          <h1 className="text-sm text-center">
            Aún no se han registrado evaluaciones
          </h1>
        </section>
      )}
    </section>
  );
};
