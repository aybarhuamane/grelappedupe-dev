/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { CustomDataTableEvaluation } from "@/modules/quiz-manage/components/tables/custom-data-table-evaluation";
import { useCourseEvaluation } from "@/modules/teacher";
import { useStudentCourseEvaluation } from "@/modules/teacher/hooks/useStudentEvaluation";
import { studentEvaluation } from "@/types";
import { Database } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChartDirectorData } from "./ChartDirectorData";
import { studentEvaluationColumn } from "./StudentEvaluationTable";

export const TableEvaluacionSection = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tableView, setTableView] = useState<boolean>(true);

  const { id } = useParams();
  // const { isBlocked } = props
  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const {
    getStudentCourseEvaluation,
    studentEvaluationList,
    loadingEvaluation,
  } = useStudentCourseEvaluation();

  useEffect(() => {
    setLoading(true);
    getCoursesEvaluation({
      course_assignment_id: Number(id),
    });
    setLoading(false);
    getStudentCourseEvaluation({
      course_assignment_id: Number(id),
    });
  }, [id]);

  const dataList = courseEvaluationData || [];

  if (dataList.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center min-h-96 text-center">
        <Database size={64} className="text-gable-green-500" />
        <h1 className="font-bold">No hay datos para mostrar</h1>
        <p className="text-xs text-gray-500 max-w-2xl">
          Parece que no hay registros de evaluaciones para este curso todavía.
          Espere a que los estudiantes realicen la evaluación para poder ver los
          resultados.
        </p>
      </main>
    );
  }

  const dataStudent: studentEvaluation.IEvaluationCourseTable[] =
    studentEvaluationList?.map((evaluation) => ({
      id: evaluation?.student?.id,
      name: evaluation?.student?.name,
      full_name: evaluation?.student.name + " " + evaluation.student.last_name,
      last_name: evaluation?.student?.last_name,
      num_document: evaluation?.student?.num_document,
      age: evaluation?.student?.age || 0,
      gender: evaluation?.student?.gender,
      results: evaluation?.result,
    }));

  return (
    <>
      {loading && (
        <main className="flex justify-center items-center min-h-96">
          <p>Cargando...</p>
        </main>
      )}
      <section className="container">
        <main className="flex justify-between py-4">
          <div>
            <h2 className="text-lg font-bold">
              Total de estudiantes: {dataList?.length}
            </h2>
          </div>
          <div>
            <section className="flex gap-1">
              <Button
                size="sm"
                variant={tableView ? "default" : "secondary"}
                onClick={() => setTableView(true)}
              >
                Lista evaluada
              </Button>
              <Button
                size="sm"
                variant={!tableView ? "default" : "secondary"}
                onClick={() => setTableView(false)}
              >
                Resumen
              </Button>
            </section>
          </div>
        </main>
      </section>
      {dataList?.length > 0 && !loading && (
        <main className="w-full flex flex-col justify-center items-center pb-8">
          <section className="w-full max-w-7xl">
            {tableView ? (
              <CustomDataTableEvaluation
                columns={studentEvaluationColumn}
                data={dataStudent}
                hasToolbar={false}
                isLoading={loading}
              />
            ) : (
              <ChartDirectorData id={id.toString()} />
            )}
          </section>
        </main>
      )}
      {dataList.length === 0 && !loading && (
        <main className="flex flex-col justify-center items-center min-h-96">
          <Database size={64} className="text-gable-green-500" />
          <h1 className="font-bold">No hay datos para mostrar</h1>
          <p className="text-xs text-gray-500 max-w-2xl">
            Parece que no hay registros de evaluaciones para este curso.
          </p>
        </main>
      )}
    </>
  );
};
