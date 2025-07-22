"use client";

import { useStudentCourseEvaluation } from "@/modules/teacher/hooks/useStudentEvaluation";
import { useEffect } from "react";
import { CharData } from "./CharData";

interface IChartDirectorDataProps {
  id: string;
}

export const ChartDirectorData = (props: IChartDirectorDataProps) => {
  const { id } = props;

  const { donaData, getDonaData, loadingDona } = useStudentCourseEvaluation();

  useEffect(() => {
    getDonaData({
      course_assignment_id: Number(id),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loadingDona) {
    return <p>Cargando...</p>;
  }

  if (!donaData) {
    return <p>No hay datos disponibles.</p>;
  }

  const dataGender = [
    { value: donaData.student.masculino, name: "Masculino" },
    { value: donaData.student.femenino, name: "Femenino" },
  ];

  const dataEvaluation = [
    { value: donaData.result.inadecuadas, name: "Inadecuado" },
    { value: donaData.result.adecuadas, name: "Adecuado" },
    { value: donaData.result.omitidas, name: "Omitido" },
  ];

  return (
    <main className="p-6 bg-white grid gap-6">
      <header className="mb-4">
        <h1 className="text-lg font-bold text-gray-800">
          📊 Resumen de evaluación de la asignatura
        </h1>
      </header>

      <section className="grid grid-cols-12 gap-6">
        {/* Estadísticas generales */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Género de alumnos */}
          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              👥 Género de alumnos
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-semibold">
                ♂️ {donaData?.student.masculino}
              </span>
              <span className="text-pink-500 font-semibold">
                ♀️ {donaData?.student.femenino}
              </span>
            </div>
            <div className="relative h-2 w-full bg-gray-300 rounded-full mt-2">
              <div
                className="absolute h-2 bg-blue-600 rounded-l-full"
                style={{
                  width: `${
                    (donaData?.student.masculino /
                      (donaData?.student.masculino +
                        donaData?.student.femenino)) *
                    100
                  }%`,
                }}
              />
              <div
                className="absolute h-2 bg-pink-500 rounded-r-full"
                style={{
                  width: `${
                    (donaData?.student.femenino /
                      (donaData?.student.masculino +
                        donaData?.student.femenino)) *
                    100
                  }%`,
                  left: `${
                    (donaData?.student.masculino /
                      (donaData?.student.masculino +
                        donaData?.student.femenino)) *
                    100
                  }%`,
                }}
              />
            </div>
          </section>

          {/* Evaluación de respuestas */}
          <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              📑 Evaluación de respuestas
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-semibold">
                  ❌ Inadecuadas
                </span>
                <span className="text-gray-700">
                  {donaData?.result.inadecuadas}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-500 font-semibold">
                  ✔️ Adecuadas
                </span>
                <span className="text-gray-700">
                  {donaData?.result.adecuadas}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500 font-semibold">
                  ⏳ Omitidas
                </span>
                <span className="text-gray-700">
                  {donaData?.result.omitidas}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <span className="text-gray-900 font-semibold">
                  📊 Total de respuestas
                </span>
                <span className="text-gray-900 font-bold">
                  {donaData?.result.total}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Gráfica */}
        <div className="col-span-9 bg-white shadow-md rounded-lg p-6">
          <CharData dataGender={dataGender} dataEvaluation={dataEvaluation} />
        </div>
      </section>
    </main>
  );
};
