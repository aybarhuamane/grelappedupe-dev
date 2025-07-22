"use client";
import { useState } from "react";
import { fetchCore } from "@/api";
import { apiUrl } from "@/config";
import { detailDashboard } from "@/types";
import { dashboardFuntions } from "@/api";
import { INewDirectorResumeDashboard } from "@/types/evaluacion/new-director-dashboard";

interface IDashboard extends detailDashboard.IDashboardData {}

export interface IQueryFilter {
  region: string;
  province?: string;
  district?: string;
  codigo_local?: string;
  codigo_modular?: string;
  period_id?: string;
  curso_id: string;
  competencia_id: string;
}

const apiBase = apiUrl.evaluacion.dashboard;

export const useFilterEvaluacion = () => {
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [listFilter, setListFilter] = useState<IDashboard[] | null>(null);
  const [dataDashboard, setDataDashboard] = useState<
    detailDashboard.IDashboardData[] | null
  >(null);
  const [timeoutError, setTimeoutError] = useState(false);

  const [newDataDashboard, setNewDataDashboard] = useState<
    INewDirectorResumeDashboard[] | null
  >(null);
  const [loadingNewDataDashboard, setLoadingNewDataDashboard] = useState(false);

  const getCompleteFilter = async (query: IQueryFilter) => {
    setLoadingFilter(true);

    const params = new URLSearchParams();
    if (query.curso_id) params.append("curso_id", query.curso_id);

    const response = await fetchCore(`${apiBase}?${params.toString()}`, {
      method: "GET",
    });

    if (response.ok) {
      const data: IDashboard[] = await response.json();
      setListFilter(data);
    } else {
      setListFilter(null);
    }
    setLoadingFilter(false);
  };

  const getDataDashboard = async (query: detailDashboard.IDashboardFilter) => {
    setLoadingFilter(true);

    try {
      const response = await dashboardFuntions.fetchDashboard(query);
      if (response.ok) {
        const data: detailDashboard.IDashboardData[] = await response.json();

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

          // setDataDashboard(data)
        } else {
          setListFilter(null);
        }
      }
    } catch (error) {
      setListFilter(null);
    }

    setLoadingFilter(false);
  };

  const getNewDataDashboard = async (
    query: detailDashboard.IDashboardFilter
  ) => {
    setLoadingFilter(true);
    setTimeoutError(false);

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("timeout"));
        }, 20000); // 20 segundos
      });

      const responsePromise = dashboardFuntions.fetchNewDashboard(query);

      const response = (await Promise.race([
        responsePromise,
        timeoutPromise,
      ])) as Response;

      if (response.ok) {
        const data: INewDirectorResumeDashboard[] = await response.json();
        setNewDataDashboard(data);
      } else {
        setListFilter(null);
      }
    } catch (error) {
      if (error instanceof Error && error.message === "timeout") {
        setTimeoutError(true);
      }
      setListFilter(null);
    }

    setLoadingFilter(false);
  };

  return {
    getCompleteFilter,
    loadingFilter,
    listFilter,
    getDataDashboard,
    dataDashboard,
    getNewDataDashboard,
    newDataDashboard,
    loadingNewDataDashboard,
    timeoutError,
  };
};
