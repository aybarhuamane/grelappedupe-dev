import { Skeleton } from "@/components/ui/skeleton";
import { BarChartComponent } from "@/modules/dashboard";
import { INewDirectorResumeDashboard } from "@/types/evaluacion/new-director-dashboard";
import { Suspense } from "react";

export interface IEvaluationDashboard {
  curso: string;
  competencia: Competencia[];
}

export interface Competencia {
  id: number;
  competencia: string;
  capacidades: Capacidade[];
}

export interface Capacidade {
  id: number;
  capacidad: string;
  logros: Logro[];
}

export interface Logro {
  id: number;
  logro: string;
  valor: number;
}

interface IProps {
  dataChart: INewDirectorResumeDashboard[];
  loadingFilter: boolean;
}

export const NewRenderChart = (props: IProps) => {
  const { dataChart, loadingFilter } = props;

  const formattedData =
    dataChart && dataChart.length > 0
      ? (() => {
          const firstCompetencia = dataChart[0]?.cursos ?? [];

          // Verificar si existen capacidades dentro de las competencias
          const hasCapacities = firstCompetencia.some(
            (comp) => comp?.data && comp.data.length > 0
          );

          // Crear el header con los nombres de los logros
          const header = [
            ...(hasCapacities
              ? firstCompetencia[0]?.data?.[0]?.capacidades?.[0]?.logros?.map(
                  (logro) => logro?.logro || ""
                ) || []
              : firstCompetencia[0]?.data?.[0]?.logros?.map(
                  (logro) => logro?.logro || ""
                ) || []),
          ];

          // Crear las filas para competencias o capacidades
          const rows = firstCompetencia.flatMap((comp) => {
            if (hasCapacities && comp?.data) {
              // Si hay capacidades, generar filas para cada capacidad
              return comp.data.map((capacidad) => [
                capacidad?.competencia || "",
                ...(capacidad?.logros?.map((logro) => logro?.valor ?? 0) || []),
              ]);
            }

            // Si no hay capacidades, trabajar solo con competencias
            return [
              [
                comp?.name || "",
                ...(comp?.data?.[0]?.logros?.map(
                  (logro) => logro?.valor ?? 0
                ) || []),
              ],
            ];
          });

          // Unir header y filas para la estructura final
          return [header, ...rows];
        })()
      : [];

  return (
    <section className="flex flex-col gap-3 pt-8 items-center justify-center h-full">
      {loadingFilter && <Skeleton className="mt-6 h-full w-full rounded-md" />}

      {!loadingFilter && (
        <Suspense
          fallback={<Skeleton className="mt-6 h-full w-full rounded-md" />}
        >
          <BarChartComponent
            legends={formattedData[0] || []}
            dataSources={formattedData.slice(1)}
          />
        </Suspense>
      )}
    </section>
  );
};
