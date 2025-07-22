import { Skeleton } from "@/components/ui/skeleton";
import { BarChartComponent } from "@/modules/dashboard";
import Image from "next/image";
import { IResumeResponseDashboard } from "../../hooks/user-dashboard-teacher";

interface IProps {
  dataChart: IResumeResponseDashboard[];
  loadingFilter: boolean;
  competenceSelected: number;
}

export const ResumeTeacherBarchart = (props: IProps) => {
  const { dataChart, loadingFilter, competenceSelected } = props;

  const formattedData =
    dataChart && dataChart.length > 0
      ? (() => {
          const firstCompetencia = dataChart[0]?.data ?? [];

          // Si se seleccionó una competencia específica
          if (competenceSelected !== 0) {
            const selectedCompetence = firstCompetencia.find(
              (comp) => comp.id === competenceSelected
            );

            if (!selectedCompetence) return [];

            // Obtener los logros de todas las capacidades
            const header =
              selectedCompetence.capacidades[0]?.logros?.map(
                (logro) => logro.logro
              ) || [];

            const rows = selectedCompetence.capacidades.map((capacidad) => [
              capacidad.capacidad,
              ...capacidad.logros.map((logro) => logro.valor),
            ]);

            return [header, ...rows];
          }

          // Si no hay competencia seleccionada, mostrar todas las competencias
          const header =
            firstCompetencia[0]?.logros?.map((logro) => logro.logro) || [];
          const rows = firstCompetencia.map((comp) => [
            comp.competencia,
            ...comp.logros.map((logro) => logro.valor),
          ]);

          return [header, ...rows];
        })()
      : [];

  return (
    <section className="flex flex-col gap-3 items-center justify-center h-full min-h-96">
      {loadingFilter && <Skeleton className="mt-6 h-full w-full rounded-md" />}

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
