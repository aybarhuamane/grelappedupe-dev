"use client";
import { useState, useCallback, useMemo } from "react";
import { donaEvaluation, studentEvaluation } from "@/types";
import { courseEvaluationFuntionsApi } from "@/api";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const useStudentCourseEvaluation = () => {
  const [loadingEvaluation, setLoadingEvaluation] = useState<boolean>(false);
  const [studentEvaluationList, setStudentEvaluationData] = useState<
    studentEvaluation.IEvaluationCourse[]
  >([]);
  const [donaData, setDonaData] = useState<donaEvaluation.IDonaEvaluation>();
  const [loadingDona, setLoadingDona] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cache for dona data
  const cache = useMemo(
    () => new Map<string, CacheItem<donaEvaluation.IDonaEvaluation>>(),
    []
  );

  const getStudentCourseEvaluation = useCallback(
    async (filter: studentEvaluation.IEvaluationCourseFilter) => {
      setLoadingEvaluation(true);
      setError(null);

      try {
        const res = await courseEvaluationFuntionsApi.fetchEvaluationCourseBulk(
          filter
        );
        if (res.ok) {
          const data: studentEvaluation.IEvaluationCourse[] = await res.json();
          if (data) {
            setStudentEvaluationData(data);
          } else {
            setStudentEvaluationData([]);
          }
        } else {
          setError(res.statusText);
          console.error(res.statusText);
        }
      } catch (error) {
        setError("Error al cargar los datos de evaluación");
        console.error(error);
      } finally {
        setLoadingEvaluation(false);
      }
    },
    []
  );

  const getDonaData = useCallback(
    async (filter: donaEvaluation.IDonaFilter) => {
      setLoadingDona(true);
      setError(null);

      const cacheKey = `dona-${filter.course_assignment_id}`;
      const cachedData = cache.get(cacheKey);

      // Check if we have valid cached data
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        setDonaData(cachedData.data);
        setLoadingDona(false);
        return;
      }

      try {
        const res = await courseEvaluationFuntionsApi.fetDonaEvaluation(filter);
        if (res.ok) {
          const data: donaEvaluation.IDonaEvaluation = await res.json();
          if (data) {
            setDonaData(data);
            // Update cache
            cache.set(cacheKey, {
              data,
              timestamp: Date.now(),
            });
          } else {
            setDonaData(undefined);
          }
        } else {
          setError(res.statusText);
          console.error(res.statusText);
        }
      } catch (error) {
        setError("Error al cargar los datos del gráfico");
        console.error(error);
      } finally {
        setLoadingDona(false);
      }
    },
    [cache]
  );

  return {
    getStudentCourseEvaluation,
    studentEvaluationList,
    loadingEvaluation,
    loadingDona,
    getDonaData,
    donaData,
    error,
  };
};
