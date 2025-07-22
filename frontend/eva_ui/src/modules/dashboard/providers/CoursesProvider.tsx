/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  capacitiesFunctionsApi,
  competencesFunctionsApi,
  cursosFunctionsApi,
} from "@/api";
import { createContext, useContext, useEffect, useState } from "react";

import { fetchCapacityListAction } from "@/api/app/educativa/fetchCapacities";
import { useFilterFromUrl } from "@/modules/core";
import { capacity, competences, response } from "@/types";
import { ICourse } from "@/types/educativa/ICourse";

export const CoursesContext = createContext<{
  listCoursesApi: response.IResApi<ICourse> | null;
  competencesList: response.IResApi<competences.ICompetencesList> | null;
  //! CapacitiesList  ya no devuelve paginado, solo un objeto
  capacitiesList: response.IResApi<capacity.ICapacityList> | null;
}>({
  listCoursesApi: null,
  competencesList: null,
  capacitiesList: null,
});

// Crea el proveedor
export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<response.IResApi<ICourse> | null>(
    null
  );
  const [competences, setCompetences] =
    useState<response.IResApi<competences.ICompetencesList> | null>(null);
  const [capacities, setCapacities] =
    useState<response.IResApi<capacity.ICapacityList> | null>(null);

  const { getParams } = useFilterFromUrl();

  const { fetchCourseList } = cursosFunctionsApi;
  const { fetchCompetenceList } = competencesFunctionsApi;
  const { fetchCapacityList } = capacitiesFunctionsApi;

  const getCourses = async () => {
    const response = await fetchCourseList({});
    if (response.ok) {
      const jsonResponse: response.IResApi<ICourse> = await response.json();
      setCourses(jsonResponse);
    } else {
      console.error("Error fetching data", response.statusText);
    }
  };

  const getCompetences = async () => {
    const response = await fetchCompetenceList({
      course__id: Number(cursoId),
    });
    if (response.ok) {
      const jsonResponse: response.IResApi<competences.ICompetencesList> =
        await response.json();
      setCompetences(jsonResponse);
    } else {
      console.error("Error fetching data", response.statusText);
    }
  };

  const getCapacities = async () => {
    const response = await fetchCapacityListAction({
      competence__id: Number(competenceId),
    });
    if (response.ok) {
      const jsonResponse: response.IResApi<capacity.ICapacityList> =
        await response.json();
      setCapacities(jsonResponse);
    } else {
      console.error("Error fetching data", response.statusText);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const cursoId = getParams("curso", `${courses?.results[0]?.id || ""}`);
  const competenceId = getParams("competence", "");

  useEffect(() => {
    if (cursoId) {
      getCompetences();
    }
  }, [cursoId]);

  useEffect(() => {
    if (competenceId) {
      getCapacities();
    }
  }, [competenceId]);

  return (
    <CoursesContext.Provider
      value={{
        listCoursesApi: courses,
        competencesList: competences,
        capacitiesList: capacities,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => useContext(CoursesContext);
