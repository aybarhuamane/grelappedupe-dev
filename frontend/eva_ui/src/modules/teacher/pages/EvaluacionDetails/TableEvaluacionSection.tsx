/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { useCourseEvaluation } from "@/modules/teacher";
import { CloudUpload, LockKeyhole, Plus, Send } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import TableEvaluationList from '@/modules/home/sections/TableEvaluationList'
import { courseAssignmentsFunctionsApi } from "@/api";
import { Progress } from "@/components/ui/progress";
import { HeaderSection, ToastCustom, useFilterFromUrl } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import NewViewEvaluationList from "@/modules/evaluation-list/sections/new-view-evaluation-list";
import { useEvaluationContext } from "@/modules/teacher";
import { courseAssignment, courseEvaluation, studentEvaluation } from "@/types";
import { toast } from "react-toastify";
import { useStudentCourseEvaluation } from "../../hooks/useStudentEvaluation";
import { InstitutionDetails } from "./InstitutionDetails";

interface IProps {
  isBlocked: boolean;
}

function calculateTotalEvaluation(
  evaluationItems: courseEvaluation.ICourseEvaluationItem[]
) {
  let totalEvaluations = 0; // Total general de evaluaciones
  let totalResolvedEvaluations = 0; // Total general de evaluaciones resueltas

  if (evaluationItems?.length === 0) {
    // Si el array está vacío, devolver resultados en 0
    return {
      totalEvaluations: 0,
      totalResolvedEvaluations: 0,
      totalResolvedPercentage: 0,
    };
  }

  evaluationItems?.forEach((item) => {
    // Obtener las evaluaciones de un estudiante
    const evaluations = item.evaluation;

    // Filtrar evaluaciones con score diferente de null
    const evaluationsWithScore = evaluations?.filter(
      (evalItem) => evalItem.student_answer !== null
    );

    // Contar el total de evaluaciones y las que tienen un score válido para el estudiante
    const studentTotalEvaluations = evaluations?.length;
    const studentResolvedEvaluations = evaluationsWithScore?.length;

    // Sumar al total global
    totalEvaluations += studentTotalEvaluations;
    totalResolvedEvaluations += studentResolvedEvaluations;
  });

  // Calcular el porcentaje global de evaluaciones resueltas
  const totalResolvedPercentage =
    (totalResolvedEvaluations / totalEvaluations) * 100;

  return {
    totalEvaluations,
    totalResolvedEvaluations,
    totalResolvedPercentage,
  };
}

function hasStudentsWithoutAnswers(
  evaluationItems: studentEvaluation.IEvaluationCourseTable[]
): boolean {
  if (!evaluationItems?.length) return true;

  return evaluationItems.some(
    (item) => item.results?.omitidas_porcentaje === 100
  );
}

export const TableEvaluacionSection = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<number>(0);
  const [hasNoAnswers, setHasNoAnswers] = useState<boolean>(false);

  const { id } = useParams();
  const { isBlocked } = props;
  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const {
    getStudentCourseEvaluation,
    studentEvaluationList,
    loadingEvaluation,
  } = useStudentCourseEvaluation();

  const { updateFilters, getParams } = useFilterFromUrl();
  const { data: dataDefault } = useEvaluationContext();
  const { createOrUpdateCourseAssigmanetTeach } = courseAssignmentsFunctionsApi;
  const router = useRouter();

  const isEvaluated = getParams("evaluated", "");

  useEffect(() => {
    getCoursesEvaluation({
      course_assignment_id: Number(id),
    });
    getStudentCourseEvaluation({
      course_assignment_id: Number(id),
    });
    setLoading(false);
  }, [id]);

  const studentEvaluationListTable: studentEvaluation.IEvaluationCourseTable[] =
    Array.isArray(studentEvaluationList)
      ? studentEvaluationList.map((item) => ({
          id: item.student?.id || 0,
          name: item.student?.name || "",
          last_name: item.student?.last_name || "",
          full_name: `${item.student?.name || ""} ${
            item.student?.last_name || ""
          }`,
          num_document: item.student?.num_document || "",
          gender: item.student?.gender || "",
          age: item.student?.age || 0,
          results: item.result || { omitidas_porcentaje: 100 },
        }))
      : [];

  // Efecto para actualizar hasNoAnswers cuando cambie studentEvaluationList
  useEffect(() => {
    if (studentEvaluationList?.length > 0) {
      setHasNoAnswers(hasStudentsWithoutAnswers(studentEvaluationListTable));
    } else {
      setHasNoAnswers(true);
    }
  }, [studentEvaluationList, studentEvaluationListTable]);

  useEffect(() => {
    if (courseEvaluationData?.length > 0) {
      const { totalResolvedPercentage } =
        calculateTotalEvaluation(courseEvaluationData);
      setPercentage(totalResolvedPercentage);
    } else {
      setPercentage(0);
    }
  }, [courseEvaluationData, isEvaluated]);

  const dataList = courseEvaluationData || [];

  const openDialog = () => {
    setIsOpen(true);
  };

  // Enviar la evaluación para revisión del director

  const sendEvaluation = async (
    data: courseAssignment.ICourseAssignmentList
  ) => {
    setIsOpen(false);
    try {
      const res = await createOrUpdateCourseAssigmanetTeach(
        {
          ...data,
          is_sent: true,
        },
        data.id
      );

      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Evaluación enviada"
            message="La evaluación ha sido enviada correctamente, ya no podrá realizar cambios."
          />
        );
        setTimeout(() => refreshWindow(), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshWindow = () => {
    window.location.reload();
  };

  const isBlockedPercentage = percentage === 100 && !hasNoAnswers;

  const level_id = `level_id=${dataDefault?.degree?.detail_institution?.level?.id}`;
  const degree = `degree_number=${dataDefault?.degree?.degree_number}`;

  return (
    <>
      <HeaderSection
        title={`${dataDefault.course?.name} - ${
          dataDefault.degree?.degree_number
        } (${dataDefault.degree?.degree_text.toLowerCase()}) ${
          dataDefault?.degree?.section
        }`}
        subtitle={`Estado de revisión: ${
          dataDefault.is_validated ? "Validado" : "Pendiente"
        }`}
        disableAddButton
        showBackButton
        renderLeftSection={<InstitutionDetails {...dataDefault} />}
        renderRightSection={
          <section>
            {!dataDefault?.is_sent && (
              <Button
                className="flex gap-3 items-center"
                onClick={openDialog}
                disabled={dataDefault.is_sent || hasNoAnswers}
              >
                <Send size={16} />
                Enviar evaluación
              </Button>
            )}
            {dataDefault?.is_sent && (
              <div className="flex gap-3 items-center p-4 rounded-md bg-green-700 text-gray-200">
                <LockKeyhole size={18} stroke="white" />
              </div>
            )}
          </section>
        }
      />

      <section className="bg-[#0E793C] py-4">
        <main className="container flex justify-between items-center">
          <div className="flex gap-3">
            <div>
              <p className="text-white text-xs">Cantidad de Alumnos</p>
              <h2 className="text-white font-medium">
                Total de alumnos: {dataList?.length}
              </h2>
            </div>
            <div className="pl-4 border-l">
              <p className="text-white text-xs">Progreso de evaluación</p>
              <h2 className="text-white font-medium">
                {percentage.toFixed(2)}% de evaluaciones completadas
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={isBlocked}
              onClick={() =>
                router.push(
                  `/teacher/evaluaciones/${id}/import?${level_id}&${degree}`
                )
              }
            >
              <CloudUpload size={16} className="mr-2" />
              Importar lista
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                updateFilters({
                  add: "true",
                  level_id:
                    dataDefault?.degree?.detail_institution?.level?.id.toString(),
                  degree_number: dataDefault?.degree?.degree_number,
                });
              }}
              disabled={isBlocked}
            >
              <Plus size={16} className="mr-2" />
              Añadir Alumno
            </Button>
          </div>
        </main>
      </section>
      <section>
        <Progress value={percentage} className="rounded-none" />
      </section>
      {loading && (
        <main className="flex justify-center items-center min-h-96">
          <p>Cargando...</p>
        </main>
      )}
      {dataList?.length > 0 && !loading && (
        <main className="w-full flex flex-col justify-center items-center">
          <section className="w-full max-w-[1520px] xl:max-w-[1720px]">
            <NewViewEvaluationList course_id={Number(id)} />
            {/* <TableEvaluationList course_id={Number(id)} /> */}
            {/* <TableEvaluacion dataList={dataList} /> */}
          </section>
        </main>
      )}
      {dataList?.length === 0 && !loading && (
        <main className="flex flex-col justify-center items-center min-h-96">
          <CloudUpload size={64} className="text-gable-green-500" />
          <h1 className="font-bold">Importar lista de estudiantes</h1>
          <p className="text-xs text-gray-500 max-w-2xl">
            Para poder realizar la evaluación de los estudiantes, primero debes
            importar la lista de estudiantes.
          </p>
          <Link
            href={`/teacher/evaluaciones/${id}/import?${level_id}&${degree}`}
          >
            <Button className="mt-4">Importar lista</Button>
          </Link>
        </main>
      )}

      <DialogConfirmacion
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Enviar evaluación"
        description="¿Está seguro de enviar la evaluación?, Este proceso no se puede revertir."
        aceppLabel="Enviar evaluación"
        cancelLabel="Mejor no"
        onSubmitConfirm={() => sendEvaluation(dataDefault)}
      />
    </>
  );
};
