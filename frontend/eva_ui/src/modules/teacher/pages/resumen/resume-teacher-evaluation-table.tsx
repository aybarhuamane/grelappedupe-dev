/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseEvaluation } from "@/modules/teacher";
import {
  StudentCapacityDetail,
  StudentCapacityDetailTable,
} from "@/modules/teacher/components/table/StudentCapacityDetailTable";
import {
  GroupedQuestions,
  NewStudentDetail,
  StudentEvaluationDetailTable,
} from "@/modules/teacher/components/table/StudentEvaluationDetailTable";
import { useStudentCourseEvaluation } from "@/modules/teacher/hooks/useStudentEvaluation";
import { courseAssignment, studentEvaluation } from "@/types";
import { Database } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ResumeTeacherDashboard } from "./resume-teacher-dashboard";
import { TeacherGraphicResume } from "./teacher-graphic-resume";

interface Capacity {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  competence: {
    id: number;
    name: string;
    code: string;
    course: number;
  };
}

interface Question {
  questionId: number;
  label: string;
  questionText: string;
  capacity: Capacity;
  codeNum: number;
}

interface ResumeTeacherEvaluationTableProps {
  listData?: courseAssignment.ITeacherAssignmentList;
  showHeader?: boolean;
}

export const ResumeTeacherEvaluationTable = ({
  listData,
  showHeader = true,
}: ResumeTeacherEvaluationTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { uid } = useParams();

  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const { getStudentCourseEvaluation, studentEvaluationList } =
    useStudentCourseEvaluation();

  useEffect(() => {
    setLoading(true);
    getCoursesEvaluation({
      course_assignment_id: uid ? Number(uid) : Number(id),
    });
    getStudentCourseEvaluation({
      course_assignment_id: uid ? Number(uid) : Number(id),
    });
    setLoading(false);
  }, [id, uid]);

  let dataStudent: studentEvaluation.IEvaluationCourseTable[] = [];

  if (studentEvaluationList?.length > 0) {
    dataStudent = studentEvaluationList?.map((evaluation) => ({
      id: evaluation?.student?.id,
      name: evaluation?.student?.name,
      full_name: evaluation?.student.name + " " + evaluation.student.last_name,
      last_name: evaluation?.student?.last_name,
      num_document: evaluation?.student?.num_document,
      age: evaluation?.student?.age || 0,
      gender: evaluation?.student?.gender,
      results: evaluation?.result,
    }));
  }

  const dataList = courseEvaluationData || [];

  // Mapeo para StudentEvaluationDetailTable
  type QuestionResult = {
    questionId: number;
    label: string;
    result: "✔" | "✗" | "—";
  };
  type StudentDetail = {
    id: number;
    full_name: string;
    asistencia: "PRESENTE" | "AUSENTE";
    questions: QuestionResult[];
    adecuadas: number;
    inadecuadas: number;
    omitidas: number;
    porcentaje_adecuadas: number;
    porcentaje_inadecuadas: number;
    porcentaje_omitidas: number;
  };
  let studentsDetail: StudentDetail[] = [];
  let groupedQuestions: GroupedQuestions[] = [];
  let studentsCapacityDetail: StudentCapacityDetail[] = [];

  if (dataStudent.length > 0 && dataList[0]?.evaluation) {
    const allQuestions: Question[] = dataList[0].evaluation.map((ev) => {
      const capacity = ev.question.capacity as unknown as {
        id: number;
        name: string;
        code: string;
        is_active: boolean;
        competence: {
          id: number;
          name: string;
          code: string;
          course: number;
        };
      };
      return {
        questionId: ev.question.id,
        label: ev.question.code || `P${ev.question.id}`,
        questionText: ev.question.question,
        capacity,
        codeNum: Number((ev.question.code || "").replace(/\D/g, "")),
      };
    });
    // Ordena por capacidad y luego por codeNum
    allQuestions.sort((a, b) =>
      a.capacity.id !== b.capacity.id
        ? a.capacity.id - b.capacity.id
        : a.codeNum - b.codeNum
    );
    // Agrupa
    groupedQuestions = allQuestions.reduce((acc, q) => {
      let group = acc.find((g) => g.capacity.id === q.capacity.id);
      if (!group) {
        group = { capacity: q.capacity, questions: [] };
        acc.push(group);
      }
      group.questions.push({
        questionId: q.questionId,
        label: q.label,
        questionText: q.questionText,
      });
      return acc;
    }, [] as GroupedQuestions[]);
  }

  studentsDetail = dataStudent.map((student) => {
    const evals = (
      dataList.find((s) => s.student.id === student.id)?.evaluation || []
    ).map((ev) => ({
      ...ev,
      question: {
        ...ev.question,
        capacity: ev.question.capacity as unknown as Capacity,
      },
    }));
    // Ordena y agrupa las preguntas igual que groupedQuestions
    const questions = groupedQuestions.flatMap((group) =>
      group.questions.map((q) => {
        const ev = evals.find((e) => e.question.id === q.questionId);
        let result: "✔" | "✗" | "—" = "—";
        if (ev && ev.student_answer && ev.question.answers) {
          const selected = ev.question.answers.find(
            (ans) => ans.id === ev.student_answer
          );
          if (selected) {
            result = selected.is_correct ? "✔" : "✗";
          }
        }
        return {
          questionId: q.questionId,
          label: q.label,
          questionText: q.questionText,
          result,
        };
      })
    );
    return {
      id: student.id,
      full_name: student.full_name,
      asistencia: student.results.nsp ? "AUSENTE" : "PRESENTE",
      questions,
      adecuadas: student.results.adecuadas,
      inadecuadas: student.results.inadecuadas,
      omitidas: student.results.omitidas,
      porcentaje_adecuadas: student.results.adecuadas_porcentaje,
      porcentaje_inadecuadas: student.results.inadecuadas_porcentaje,
      porcentaje_omitidas: student.results.omitidas_porcentaje,
    };
  });

  // Procesar datos para la vista por capacidad
  studentsCapacityDetail = dataStudent.map((student) => {
    const evals = (
      dataList.find((s) => s.student.id === student.id)?.evaluation || []
    ).map((ev) => ({
      ...ev,
      question: {
        ...ev.question,
        capacity: ev.question.capacity as unknown as Capacity,
      },
    }));

    // Agrupar evaluaciones por capacidad
    const capacityResults = groupedQuestions.map((group) => {
      const capacityQuestions = evals.filter(
        (ev) => ev.question.capacity.id === group.capacity.id
      );

      const total = capacityQuestions.length;
      const adecuadas = capacityQuestions.filter((ev) => {
        if (!ev.student_answer || !ev.question.answers) return false;
        const selected = ev.question.answers.find(
          (ans) => ans.id === ev.student_answer
        );
        return selected?.is_correct;
      }).length;

      const inadecuadas = capacityQuestions.filter((ev) => {
        if (!ev.student_answer || !ev.question.answers) return false;
        const selected = ev.question.answers.find(
          (ans) => ans.id === ev.student_answer
        );
        return selected && !selected.is_correct;
      }).length;

      const omitidas = total - adecuadas - inadecuadas;
      const porcentaje_adecuadas =
        total > 0 ? Math.round((adecuadas / total) * 100) : 0;

      return {
        capacityId: group.capacity.id,
        capacityName: group.capacity.name,
        capacityCode: group.capacity.code,
        adecuadas,
        inadecuadas,
        omitidas,
        total,
        porcentaje_adecuadas,
      };
    });

    return {
      id: student.id,
      full_name: student.full_name,
      capacities: capacityResults,
      total_adecuadas: student.results.adecuadas,
      total_inadecuadas: student.results.inadecuadas,
      total_omitidas: student.results.omitidas,
      total_porcentaje_adecuadas: student.results.adecuadas_porcentaje,
    };
  });

  const course = listData?.course;
  const detailsInstitution = listData?.degree?.detail_institution;
  const degree = listData?.degree;
  const teacher = listData?.teaching.person;

  return (
    <>
      <section className="container">
        {showHeader && (
          <div className="flex flex-col gap-2 mb-6 border-b pb-6">
            <h1 className="text-2xl font-medium">
              {course?.name} - {degree?.degree_text} - {degree?.section}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Docente</p>
                <p className="font-medium">
                  {teacher?.name} {teacher?.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Institución</p>
                <p className="font-medium">
                  {detailsInstitution?.institution?.name}
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="evaluada" className="w-full space-y-4">
          <TabsList>
            <TabsTrigger value="evaluada">Evaluación por Pregunta</TabsTrigger>
            <TabsTrigger value="capacidades">
              Evaluación por Capacidad
            </TabsTrigger>
            <TabsTrigger value="resumen">Resumen Gráfico</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="evaluada">
            <section className="flex flex-col gap-4">
              {dataList?.length > 0 && !loading && (
                <>
                  <StudentEvaluationDetailTable
                    students={studentsDetail as NewStudentDetail[]}
                    groupedQuestions={groupedQuestions}
                    hideQuestions={false}
                    hidePercentages={false}
                    hideTotals={false}
                    hideSubHeader={true}
                  />
                </>
              )}
            </section>
          </TabsContent>
          <TabsContent value="capacidades">
            <section className="flex flex-col gap-4">
              {dataList?.length > 0 && !loading && (
                <>
                  <StudentCapacityDetailTable
                    students={studentsCapacityDetail}
                    hideCapacities={false}
                    hideTotal={true}
                  />
                </>
              )}
            </section>
          </TabsContent>
          <TabsContent value="resumen">
            {dataList?.length > 0 && !loading && (
              <TeacherGraphicResume id={uid ? uid.toString() : id.toString()} />
            )}
          </TabsContent>
          <TabsContent value="dashboard">
            {dataList?.length > 0 && !loading && (
              <ResumeTeacherDashboard
                course_assignment_id={uid ? Number(uid) : Number(id)}
              />
            )}
          </TabsContent>
        </Tabs>
      </section>
      {dataList.length === 0 && (
        <main className="flex flex-col justify-center items-center min-h-96 text-center">
          <Database size={64} className="text-gable-green-500" />
          <h1 className="font-bold">No hay datos para mostrar</h1>
          <p className="text-xs text-gray-500 max-w-2xl">
            Parece que no hay registros de evaluaciones para este curso todavía.
            Espere a que los estudiantes realicen la evaluación para poder ver
            los resultados.
          </p>
        </main>
      )}
      {loading && (
        <section className="flex justify-center items-center min-h-96">
          <p>Cargando...</p>
        </section>
      )}
    </>
  );
};
