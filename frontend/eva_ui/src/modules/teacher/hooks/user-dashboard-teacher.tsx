"use client";

import { fetchTeacherAssignmentDashboard } from "@/api/app/evaluacion/fetchDashboard";
import { dashboardCollege } from "@/types";
import { useCallback, useMemo, useState } from "react";

export interface IResumeResponseDashboard {
  curso: string;
  competencias: Array<Array<number | string>>;
  data: Datum[];
}

export interface Datum {
  id: number;
  competencia: string;
  capacidades: Capacidades[];
  logros: LogroElement[];
}

export interface Capacidades {
  id: number;
  capacidad: string;
  logros: LogroElement[];
}

export interface LogroElement {
  id: number;
  logro: LogroEnum;
  valor: number;
  total_alumnos: number;
}

export enum LogroEnum {
  Inicio = "Inicio",
  PrevioInicio = "Previo Inicio",
  Proceso = "Proceso",
  Satisfactorio = "Satisfactorio",
}

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const useResumeDashboardTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IResumeResponseDashboard[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cache for dashboard data
  const cache = useMemo(
    () => new Map<string, CacheItem<IResumeResponseDashboard[]>>(),
    []
  );

  const getTeacherResumeDashboard = useCallback(
    async (query: dashboardCollege.IResumeResponseDashboardFilter) => {
      setLoading(true);
      setError(null);

      const cacheKey = `dashboard-${query.course_assignment_id}-${
        query.competence_id || "all"
      }`;
      const cachedData = cache.get(cacheKey);

      // Check if we have valid cached data
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        setData(cachedData.data);
        setLoading(false);
        return;
      }

      try {
        const response = await fetchTeacherAssignmentDashboard(query);

        if (response.ok) {
          const newData: IResumeResponseDashboard[] = await response.json();
          setData(newData);

          // Update cache
          cache.set(cacheKey, {
            data: newData,
            timestamp: Date.now(),
          });
        } else {
          setError("Error al cargar los datos del dashboard");
          console.error("Error loading dashboard data:", response.statusText);
        }
      } catch (error) {
        setError("Error al cargar los datos del dashboard");
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  return {
    data,
    loading,
    error,
    getTeacherResumeDashboard,
  };
};
