/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { assessmentsFuntions } from "@/api";
import { CircularProgress } from "@/components/custom/circular-progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCustom, useFilterFromUrl } from "@/modules/core";
import { DataTableStudent } from "@/modules/core/components/DataTable/table/data-table-second";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { useCourseEvaluation, useEvaluationContext } from "@/modules/teacher";
import { assessments, courseEvaluation } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, LoaderCircle, Plus, Save } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DropdownMenuStudent } from "./dropdown-menu-student";

interface IColumnsTableEvaluationList {
  id: number;
  full_name: string;
  age: string;
  gender: string;
  progress: number;
  evaluated: boolean;
}

interface IProps {
  course_id: number;
}

const calcPercentage = (data: courseEvaluation.ICourseEvaluationScore[]) => {
  const total = data?.length;
  const completed = data?.filter((item) => item.student_answer !== null).length;
  return Math.round((completed / total) * 100);
};

export default function NewViewEvaluationList(props: IProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { course_id } = props;
  const { getParams, updateFilter } = useFilterFromUrl();

  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const {
    data: evaluationData,
    progressData,
    updateProgress,
  } = useEvaluationContext();

  const router = useRouter();
  const pathname = usePathname();

  const evaluted = getParams("evaluated", "");
  const edit = getParams("edit", "");
  const add = getParams("add", "");
  const remove = getParams("remove", "");

  const isBlocked = evaluationData.is_active;
  const isSent = evaluationData.is_sent;
  const isFinalized = evaluationData.is_validated;

  const columns: ColumnDef<IColumnsTableEvaluationList>[] = [
    {
      accessorKey: "edit",
      header: "EDITAR",
      size: 20,
      cell: ({ row }) => {
        return (
          <section className="w-full justify-center items-center flex flex-col z-50">
            <DropdownMenuStudent row={row} />
          </section>
        );
      },
    },
    {
      accessorKey: "number",
      header: "N°",
      size: 10,
    },
    {
      accessorKey: "full_name",
      header: "APELLIDOS Y NOMBRES",
    },
    {
      accessorKey: "progress",
      header: "",
      cell: ({ row }) => (
        <section className="w-full justify-center items-center grid grid-cols-1">
          <section className="flex flex-col gap-3 items-center">
            <CircularProgress value={row.original.progress} />
          </section>
        </section>
      ),
    },
  ];

  const handleRowClick = (id: number) => {
    router.push(`${pathname}?evaluated=${id}`, { scroll: false });
  };

  useEffect(() => {
    getCoursesEvaluation({
      course_assignment_id: Number(course_id),
    });
    setLoading(false);

    // Inicializar el progreso en el contexto
    courseEvaluationData?.forEach((evaluation) => {
      const studentId = evaluation?.student?.id;
      const progress = calcPercentage(evaluation?.evaluation);
      updateProgress(studentId, progress);
    });
  }, [course_id, evaluted, edit, add, remove]);

  // Inicializar progressData cuando courseEvaluationData cambie
  useEffect(() => {
    if (courseEvaluationData && courseEvaluationData.length > 0) {
      courseEvaluationData.forEach((evaluation) => {
        const studentId = evaluation?.student?.id;
        const progress = calcPercentage(evaluation?.evaluation);
        updateProgress(studentId, progress);
      });
    }
  }, [courseEvaluationData]); // Dependencia de courseEvaluationData

  const data: IColumnsTableEvaluationList[] = courseEvaluationData?.map(
    (evaluation, index) => ({
      id: evaluation?.student?.id,
      number: index + 1,
      evaluated: evaluationData?.is_sent,
      age: evaluation?.evaluation[0]?.student_age?.toString() || "N/A",
      full_name: `${evaluation?.student?.last_name} ${evaluation?.student?.name}`,
      gender: evaluation?.student?.gender === "M" ? "Masculino" : "Femenino",
      progress: progressData[evaluation?.student?.id] || 0, // Obtener el progreso del contexto
    })
  );

  const columsData = !isBlocked
    ? columns.filter(
        (item: ColumnDef<IColumnsTableEvaluationList> | any) =>
          item.accessorKey !== "edit"
      )
    : columns;

  return (
    <div className="bg-white py-4 w-full">
      {loading && (
        <div>
          <p>Cargando</p>
        </div>
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="grid grid-cols-4 gap-4">
          {/* Columna de la lista de estudiantes */}
          <div className="mx-4 w-full col-span-1 border border-gray-200 rounded shadow-md">
            <DataTableStudent
              columns={columsData}
              data={data}
              hasToolbar={false}
              onValueSelectedChange={(row) => handleRowClick(Number(row?.id))}
              selectedRowId={evaluted}
            />
            {!isBlocked && (
              <section className="flex items-center gap-6 px-14">
                <div className="flex-shrink-0 pl-6">
                  <Button
                    size="icon"
                    onClick={() => {
                      updateFilter("add", "true");
                    }}
                    disabled={isBlocked}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex gap-4 flex-grow">
                  <div className="h-10 w-full bg-gray-100 rounded-md"></div>
                </div>
              </section>
            )}
          </div>

          {/* Columna de preguntas y respuestas */}
          <div className="col-span-3 px-4">
            {evaluted ? (
              <EvaluationQuestions studentId={evaluted} courseId={course_id} />
            ) : (
              <>
                {isSent && (
                  <AlertCustom
                    title="Evaluación enviada"
                    content="No puedes realizar cambios en la evaluación porque ya ha sido enviada"
                    color="warning"
                  />
                )}

                {isFinalized && (
                  <AlertCustom
                    title="Evaluación finalizada"
                    content="No puedes realizar cambios en la evaluación porque ya ha sido finalizada"
                    color="warning"
                  />
                )}

                {evaluted === "" && (
                  <AlertCustom
                    title={"Evaluación"}
                    content={
                      "Seleccione un estudiante para evaluarlo y complete las preguntas de la evaluación"
                    }
                    color="info"
                  />
                )}

                {evaluted === "" && (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">Seleccione un estudiante</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

const EvaluationQuestions = ({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: number;
}) => {
  const [listEvaluation, setListEvaluation] = useState<
    courseEvaluation.ICourseEvaluationScore[]
  >([]);
  const [dataEvaluation, setDataEvaluation] = useState<
    assessments.IAssessmentPost[]
  >([]);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isAdvance, setIsAdvance] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotPresent, setIsNotPresent] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const {
    dataPeriodo,
    data: detailsEvaluation,
    updateProgress,
  } = useEvaluationContext();
  const { createOrUpdateAssessmentBulks } = assessmentsFuntions;

  const dataStudent: courseEvaluation.ICourseEvaluationItem =
    courseEvaluationData[0] || {};

  useEffect(() => {
    if (studentId) {
      getCoursesEvaluation({
        student_id: Number(studentId),
        course_assignment_id: Number(courseId),
      });
    }
  }, [studentId]);

  useEffect(() => {
    if (courseEvaluationData.length > 0) {
      const data = courseEvaluationData[0].evaluation || [];
      setListEvaluation(data);
    }
  }, [courseEvaluationData]);

  const sortedEvaluations = [...listEvaluation].sort(
    (a, b) => a.question.id - b.question.id
  );

  const handleSaveData = async (
    dataList: assessments.IAssessmentPost[],
    isReload?: boolean
  ) => {
    setIsLoadingSave(true);
    setIsOpen(false);
    setIsUpdate(false);
    try {
      const res = await createOrUpdateAssessmentBulks(dataList);
      if (res.ok) {
        if (isReload) {
          getCoursesEvaluation({
            student_id: Number(studentId),
            course_assignment_id: Number(courseId),
          });
          setIsAdvance(true);

          // Calcular el nuevo progreso
          const newProgress = calcPercentage(listEvaluation);

          // Actualizar el progreso en el contexto
          updateProgress(Number(studentId), newProgress);

          setTimeout(() => {
            setIsAdvance(false);
          }, 2000);
          toast.success("Progreso guardado correctamente");
        }
      } else {
        console.error("Error al guardar");
        toast.error("Error al guardar el progreso");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar el progreso");
    }
    setIsLoadingSave(false);
  };

  const handleMarkAsNotPresent = async () => {
    setIsNotPresent(true);
    setIsOpen(false);

    // Marcar todas las preguntas como "No presentado" (student_answer: 0)
    const updatedEvaluations = listEvaluation.map((evaluation) => ({
      ...evaluation,
      student_answer: 0, // Marcar como no presentado
    }));

    // Actualizar el estado local
    setListEvaluation(updatedEvaluations);

    // Preparar los datos para enviar al backend
    const dataList: assessments.IAssessmentPost[] = updatedEvaluations.map(
      (evaluation) => ({
        id: evaluation.id,
        course_assignment: Number(courseId),
        question: evaluation.question.id,
        student: Number(studentId),
        student_answer: 0, // Enviar 0 como respuesta
        student_age: dataStudent.student_age,
        period: dataPeriodo.results[0]?.id,
      })
    );

    // Actualizar el estado de dataEvaluation
    setDataEvaluation(dataList);

    // Guardar los cambios en el backend
    setIsLoadingSave(true);
    try {
      const res = await createOrUpdateAssessmentBulks(dataList);
      if (res.ok) {
        // Calcular el nuevo progreso (debería ser 0% porque todas las respuestas son "No presentado")
        const newProgress = calcPercentage(updatedEvaluations);

        // Actualizar el progreso en el contexto
        updateProgress(Number(studentId), newProgress);

        // Mostrar un mensaje de éxito
        setIsAdvance(true);
        setTimeout(() => setIsAdvance(false), 2000);
      } else {
        console.error("Error al guardar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoadingSave(false);

    // Cerrar el modal de confirmación
    setIsNotPresent(false);
  };

  const handleSelectAnswer = (evaluationId: number, answerId: number) => {
    const updatedEvaluations = listEvaluation.map((evaluation) => {
      if (evaluation.id === evaluationId) {
        return {
          ...evaluation,
          student_answer: answerId,
        };
      }
      return evaluation;
    });

    setListEvaluation(updatedEvaluations);

    const dataItem: assessments.IAssessmentPost = {
      id: evaluationId,
      course_assignment: Number(courseId),
      question: updatedEvaluations.find((e) => e.id === evaluationId)!.question
        .id,
      student: Number(studentId),
      student_answer: answerId,
      student_age: dataStudent.student_age,
      period: dataPeriodo.results[0]?.id,
    };

    setDataEvaluation((prev) => [
      ...prev.filter((item) => item.id !== evaluationId),
      dataItem,
    ]);
  };

  const handleFinalizeEvaluation = async () => {
    setIsFinalized(true);
    setIsOpen(false);
    setIsLoadingSave(true);
    setIsNotPresent(false);

    try {
      // Marcar preguntas sin respuesta con student_answer: 0
      const updatedEvaluations = listEvaluation.map((evaluation) => ({
        ...evaluation,
        student_answer: evaluation.student_answer || null,
      }));

      // Preparar los datos para enviar al backend
      const dataList: assessments.IAssessmentPost[] = updatedEvaluations.map(
        (evaluation) => ({
          id: evaluation.id,
          course_assignment: Number(courseId),
          question: evaluation.question.id,
          student: Number(studentId),
          student_answer: evaluation.student_answer,
          student_age: dataStudent.student_age,
          period: dataPeriodo.results[0]?.id,
        })
      );

      // Guardar los cambios en el backend
      const res = await createOrUpdateAssessmentBulks(dataList);
      if (res.ok) {
        // Calcular el nuevo progreso
        const newProgress = calcPercentage(updatedEvaluations);

        // Actualizar el progreso en el contexto
        updateProgress(Number(studentId), newProgress);

        // Mostrar un mensaje de éxito
        setIsAdvance(true);
        setTimeout(() => setIsAdvance(false), 2000);
        toast.success("Estudiante evaluado correctamente");
      } else {
        console.error("Error al guardar");
        toast.error("Error al finalizar la evaluación");
      }
    } catch (error) {
      console.error("Error al finalizar la evaluación:", error);
      toast.error("Error al finalizar la evaluación");
    }
    setIsLoadingSave(false);
    setIsFinalized(false);
  };

  const isPeriodActive = dataPeriodo.results.length > 0;
  const isBlocked = detailsEvaluation?.is_sent;

  return (
    <div className="p-6 space-y-4 border border-gray-200 rounded shadow-md">
      <header className="mb-4 flex justify-between items-center">
        <section>
          <h2 className="text-xl font-semibold">
            {dataStudent?.student ? (
              `${dataStudent?.student?.last_name} ${dataStudent?.student?.name}`
            ) : (
              <ReloadIcon className="animate-spin" />
            )}
          </h2>
          <p className="text-sm font-normal">
            Responde las siguientes preguntas de acuerdo a la evaluación
            realizada al estudiante.
          </p>
        </section>
        <section className="flex items-center gap-3">
          {isAdvance && (
            <p className="text-xs text-green-600 w-full min-w-fit">
              Guardado exitoso
            </p>
          )}

          <div>
            <Button
              size="sm"
              onClick={() => {
                // Verificar si el porcentaje es 100%
                const currentProgress = calcPercentage(listEvaluation);
                if (currentProgress === 100) {
                  setIsUpdate(true);
                } else {
                  handleSaveData(dataEvaluation, true);
                }
              }}
              disabled={
                dataEvaluation.length === 0 ||
                isLoadingSave ||
                !isPeriodActive ||
                isBlocked
              }
            >
              {isLoadingSave && (
                <LoaderCircle size={16} className="animate-spin" />
              )}
              {!isLoadingSave && (
                <div className="flex items-center gap-2">
                  <Save size={16} />
                  Guardar progreso
                </div>
              )}
            </Button>
          </div>
        </section>
      </header>

      <hr />

      <div className="space-y-4">
        <ScrollArea className="h-[600px]">
          <div className="w-full">
            <div className="sticky top-0 bg-gray-100 p-4 border-b">
              <div className="flex items-center">
                <div className="flex-1 font-medium">
                  Preguntas
                  {sortedEvaluations.length > 0 &&
                    ` (${sortedEvaluations.length})`}
                </div>
                <span>
                  {isBlocked ? (
                    <span className="text-red-500">Finalizado</span>
                  ) : (
                    <span className="text-green-500">En progreso</span>
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {sortedEvaluations.map((evaluation, idx) => (
                <div key={idx} className="border p-4 rounded-md">
                  {/* Pregunta */}
                  <h2 className="text-md font-semibold mb-4 uppercase">
                    {evaluation.question.code} - {evaluation.question.question}
                  </h2>

                  {/* Opciones */}
                  <div className="flex flex-col gap-2">
                    {evaluation?.question?.answers?.map((answer) => {
                      const isSelected =
                        evaluation.student_answer === answer.id;

                      return (
                        <div
                          key={answer.id}
                          className="flex items-center gap-2"
                        >
                          {/* Checkbox estilo [**] */}
                          <div
                            className={`w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer transition ${
                              isSelected
                                ? "bg-green-600 text-white"
                                : "bg-transparent text-black"
                            }`}
                            {...(!isBlocked && {
                              onClick: () =>
                                handleSelectAnswer(evaluation.id, answer.id),
                            })}
                            aria-label={`Opción ${answer.option}`}
                          >
                            <span className="uppercase text-sm">
                              {answer.option}
                            </span>
                          </div>

                          {/* Respuesta */}
                          <p className="text-sm font-medium">{answer.answer}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {!isBlocked && (
        <div className="mt-4 w-full flex justify-end border-t pt-4 gap-3">
          <div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setIsNotPresent(true)}
              disabled={!isPeriodActive || isBlocked || isLoadingSave}
            >
              <AlertCircle size={16} className="mr-2" />
              No se presentó
            </Button>
          </div>
          <Button
            onClick={() => setIsFinalized(true)}
            disabled={isLoadingSave || !isPeriodActive || isBlocked}
            className="w-full max-w-[200px]"
          >
            <Save size={16} className="mr-2" />
            {isLoadingSave ? "Guardando..." : "Finalizar"}
          </Button>
        </div>
      )}

      {isBlocked && (
        <AlertCustom
          title="Evaluación finalizada"
          content="No puedes realizar cambios en la evaluación porque ya ha sido finalizada."
          color="warning"
        />
      )}

      <DialogConfirmacion
        isOpenConfirm={isNotPresent}
        onCloseConfirm={() => setIsNotPresent(false)}
        tittleConfirm="No se presentó"
        description="¿Estás seguro de marcar como no presentado?"
        aceppLabel="Marcar"
        cancelLabel="Cancelar"
        onSubmitConfirm={handleMarkAsNotPresent}
      />

      <DialogConfirmacion
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Finalizar evaluación"
        description="¿Estás seguro de guardar la evaluación?"
        aceppLabel="Finalizar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() => handleSaveData(dataEvaluation, true)}
      />

      <DialogConfirmacion
        isOpenConfirm={isFinalized}
        onCloseConfirm={() => setIsFinalized(false)}
        tittleConfirm="Finalizar evaluación"
        description="¿Estás seguro de guardar la evaluación? Esta acción marcará la evaluación como finalizada aunque haya preguntas sin responder."
        aceppLabel="Finalizar"
        cancelLabel="Cancelar"
        onSubmitConfirm={handleFinalizeEvaluation}
      />

      <DialogConfirmacion
        isOpenConfirm={isUpdate}
        onCloseConfirm={() => setIsUpdate(false)}
        tittleConfirm="Actualizar evaluación"
        description="El estudiante ya ha sido evaluado al 100%. ¿Estás seguro de actualizar la evaluación?"
        aceppLabel="Actualizar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() => handleSaveData(dataEvaluation, true)}
      />
    </div>
  );
};
