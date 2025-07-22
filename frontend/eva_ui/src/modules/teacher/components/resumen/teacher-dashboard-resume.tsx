import { Skeleton } from "@/components/ui/skeleton";
import { BarChartComponent } from "@/modules/dashboard";
import { detailDashboard } from "@/types";

interface IProps {
  dataChart: detailDashboard.IDirectorResumeDashboard[];
  loadingFilter: boolean;
}

export const TeacherEvaluationChart = (props: IProps) => {
  const { dataChart, loadingFilter } = props;

  const formattedData =
    dataChart && dataChart.length > 0
      ? (() => {
          const firstCompetencia = dataChart[0]?.data ?? [];

          // Verificar si existen capacidades dentro de las competencias
          const hasCapacities = firstCompetencia.some(
            (comp) => comp?.capacidades && comp.capacidades.length > 0
          );

          // Crear el header con los nombres de los logros
          const header = [
            ...(hasCapacities
              ? firstCompetencia[0]?.capacidades?.[0]?.logros?.map(
                  (logro) => logro?.logro || ""
                ) || []
              : firstCompetencia[0]?.logros?.map(
                  (logro) => logro?.logro || ""
                ) || []),
          ];

          // Crear las filas para competencias o capacidades
          const rows = firstCompetencia.flatMap((comp) => {
            if (hasCapacities && comp?.capacidades) {
              // Si hay capacidades, generar filas para cada capacidad
              return comp.capacidades.map((capacidad) => [
                capacidad?.capacidad || "",
                ...(capacidad?.logros?.map((logro) => logro?.valor ?? 0) || []),
              ]);
            }

            // Si no hay capacidades, trabajar solo con competencias
            return [
              [
                comp?.competencia || "",
                ...(comp?.logros?.map((logro) => logro?.valor ?? 0) || []),
              ],
            ];
          });

          // Unir header y filas para la estructura final
          return [header, ...rows];
        })()
      : [];

  return (
    <section className="flex flex-col gap-3 items-center justify-center h-full min-h-96">
      {loadingFilter && <Skeleton className="mt-6 h-full w-full rounded-md" />}

      {!loadingFilter && (
        <BarChartComponent
          legends={formattedData[0] || []}
          dataSources={formattedData.slice(1)}
        />
      )}
    </section>
  );
};
