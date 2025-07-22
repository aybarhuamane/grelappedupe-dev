/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SearchFilter } from "@/components/custom/search-filter";
import { useParamsFilters } from "@/lib/filter-url";
import { ReloadIcon } from "@radix-ui/react-icons";
import { GraduationCap } from "lucide-react";
import { useEffect } from "react";
import { useCourse } from "../director";
import { CourseCard } from "./components/CourseCard";

export const CoursesList = () => {
  const { getParams } = useParamsFilters();
  const { getCursos, listCursos, loading } = useCourse();

  const search = getParams({ key: "search", value: "" });

  useEffect(() => {
    getCursos({
      name__icontains: search,
    });
  }, [search]);

  return (
    <>
      <section className="container flex flex-col m-4 mx-auto">
        <div className="bg-white py-8 px-6 space-y-5">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold">Cursos activos</h2>
            <div className="w-1/3">
              <SearchFilter icon />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="flex items-center justify-start">
                <div className="animate-pulse">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-primary" />
                </div>
                <span>Buscando...</span>
              </div>
            ) : listCursos.results.length === 0 ? (
              <div className="flex items-center justify-start">
                <span>No se encontraron resultados</span>
              </div>
            ) : (
              listCursos.results.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.name}
                  icon={<GraduationCap className="h-5 w-5" />}
                  labelButton="Detalles"
                  hrefButton={`quiz-manage/${course.id}`}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
