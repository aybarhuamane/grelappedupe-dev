"use client";
import { useState } from "react";
import { dashboardCollege, detailDashboard } from "@/types";
import { dashboardFuntions } from "@/api";
import { INewDirectorResumeDashboard } from "@/types/evaluacion/new-director-dashboard";

export const useDashboardCollege = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataDashboard, setDataDashboard] = useState<
    detailDashboard.IDashboardData[] | null
  >(null);
  const [loadingDirector, setLoadingDirector] = useState<boolean>(false);
  const [timeoutError, setTimeoutError] = useState(false);
  // const [dataDashboardDirector, setDataDashboardDirector] = useState<
  //   detailDashboard.IDirectorResumeDashboard[] | null
  // >(null);
  const [dataDashboardDirector, setDataDashboardDirector] = useState<
    INewDirectorResumeDashboard[] | null
  >(null);

  const getDashboardCollege = async (
    query: dashboardCollege.IDashboardTeacherFilter
  ) => {
    setLoading(true);

    try {
      const res = await dashboardFuntions.fetchDashboardTeacher(query);

      if (res.ok) {
        const data: detailDashboard.IDashboardData[] = await res.json();

        if (data && data.length > 0) {
          const organizedData = data.map((item) => {
            const { competencia } = item;

            const updatedCompetencia = competencia.map((comp) => {
              if (comp.capacidades) {
                const updatedCapacidades = comp.capacidades.map((cap) => {
                  const { logros } = cap;
                  const updatedLogros = logros.map((logro) => {
                    return {
                      ...logro,
                      valor: logro.valor,
                    };
                  });

                  return {
                    ...cap,
                    logros: updatedLogros,
                  };
                });

                return {
                  ...comp,
                  capacidades: updatedCapacidades,
                };
              }

              return comp;
            });

            return {
              ...item,
              competencia: updatedCompetencia,
            };
          });

          setDataDashboard(organizedData);
        } else {
          console.error(res.statusText);
        }
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getDirectorDashboardCollege = async (
    query: dashboardCollege.IDashboardTeacherFilter
  ) => {
    setLoadingDirector(true);
    setTimeoutError(false);

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("timeout"));
        }, 20000);
      });

      const responsePromise =
        dashboardFuntions.fetchDirectorResumeDashboard(query);
      const res = (await Promise.race([
        responsePromise,
        timeoutPromise,
      ])) as Response;

      if (res.ok) {
        const data: INewDirectorResumeDashboard[] = await res.json();

        if (data && data.length > 0) {
          setDataDashboardDirector(data);
        } else {
          console.error(res.statusText);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message === "timeout") {
        setTimeoutError(true);
      }
      console.error(error);
    }

    setLoadingDirector(false);
  };

  return {
    getDashboardCollege,
    getDirectorDashboardCollege,
    dataDashboard,
    loading,
    loadingDirector,
    dataDashboardDirector,
    timeoutError,
  };
};
