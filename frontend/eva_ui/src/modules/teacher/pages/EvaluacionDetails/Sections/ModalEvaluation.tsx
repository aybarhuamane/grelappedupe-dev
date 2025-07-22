/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { assessmentsFuntions } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToastCustom, useFilterFromUrl } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { useEvaluationContext } from "@/modules/teacher";
import { useCourseEvaluation } from "@/modules/teacher/hooks";
import { assessments, courseEvaluation } from "@/types";
import { ArrowLeft, Check, LoaderCircle, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const options = [
  {
    label: "Alternativa 1",
    value: 0,
    color: "#F31260",
  },
  {
    label: "Alternativa 2",
    value: 1,
    color: "#17C964",
  },
  {
    label: "Alternativa 3",
    value: 2,
    color: "#F5A524",
  },
  {
    label: "Alternativa 4",
    value: 3,
    color: "#D4D4D8",
  },
];

export const ModalTeacherEvaluation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isAdvance, setIsAdvance] = useState(false);
  const [listEvaluation, setListEvaluation] = useState<
    courseEvaluation.ICourseEvaluationScore[]
  >([]);

  const [dataEvaluation, setDataEvaluation] = useState<
    assessments.IAssessmentPost[]
  >([]);

  const { updateFilters, getParams } = useFilterFromUrl();
  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const { createOrUpdateAssessmentBulks } = assessmentsFuntions;
  const { dataPeriodo, data: detailsEvaluation } = useEvaluationContext();
  const { id } = useParams();

  const id_student = getParams("evaluated", "");

  const level_number = detailsEvaluation.degree.detail_institution.level.id;
  const degree__number = detailsEvaluation.degree.degree_number;

  const dataStudent: courseEvaluation.ICourseEvaluationItem =
    courseEvaluationData[0] || {};

  const handleClose = () => {
    updateFilters({ evaluated: "" });
  };

  async function getCoursesEvaluationData() {
    setIsLoading(true);
    await getCoursesEvaluation({
      student_id: Number(id_student),
    });

    setIsLoading(false);
  }

  useEffect(() => {
    if (id_student) {
      getCoursesEvaluationData();
    }
  }, [id_student]);

  useEffect(() => {
    if (courseEvaluationData.length > 0) {
      const data = courseEvaluationData[0].evaluation || [];
      setListEvaluation(data);
    }
  }, [courseEvaluationData]);

  // Función para manejar el guardado
  const handleSaveData = async (
    dataList: assessments.IAssessmentPost[],
    isReload?: boolean
  ) => {
    setIsLoading(true);
    setIsLoadingSave(true);
    setIsOpen(false);
    try {
      const res = await createOrUpdateAssessmentBulks(dataList);
      if (res.ok) {
        toast.success(
          <ToastCustom
            title={`${isReload ? "Actualización" : "Guardado"} exitoso`}
            message="La evaluación se guardó correctamente"
          />
        );

        if (isReload) {
          getCoursesEvaluationData();
          setIsAdvance(true);

          setTimeout(() => {
            setIsAdvance(false);
          }, 2000);
        } else {
          handleClose();
        }
      } else {
        toast.error(
          <ToastCustom
            title="Error al guardar"
            message="Ocurrió un error al guardar la evaluación"
          />
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        <ToastCustom
          title="Error al guardar"
          message="Ocurrió un error al guardar la evaluación"
        />
      );
    }
    setIsLoadingSave(false);
  };

  const handleDataAllNull = () => {
    if (isAllNull) {
      setListEvaluation((prev) =>
        prev.map((item) => ({ ...item, score: null }))
      );
    } else {
      const data = listEvaluation.map((item) => {
        const dataItem: assessments.IAssessmentPost = {
          id: item.id,
          course_assignment: Number(id),
          question: item.question.id,
          student: Number(id_student),
          score: 3,
          student_age: dataStudent.student_age,
          period: dataPeriodo.results[0]?.id,
        };
        return dataItem;
      });
      setDataEvaluation(data);
      setListEvaluation((prev) => prev.map((item) => ({ ...item, score: 3 })));
    }
  };

  //Verifica si hay periodos activos
  const isPeriodActive = dataPeriodo.results.length > 0;
  const isBlocked = detailsEvaluation?.is_sent;

  //Verificar si todas las preguntas son opción NSP (3)
  const isAllNull = listEvaluation.every((item) => item.score === 3);

  return (
    <main>
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-6xl h-full max-h-[calc(100vh-64px)] flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between items-center gap-4 sm:max-w-6xl">
                <section className="w-full">
                  {isLoading && (
                    <main className="flex flex-col w-full gap-1">
                      <div className="w-full h-5 rounded-sm bg-gray-200 max-w-3xl"></div>
                      <div className="w-1/2 h-5 rounded-s-sm bg-gray-200 rounded-sm"></div>
                    </main>
                  )}
                  {!isLoading && (
                    <main className="grid grid-cols-1 gap-1 w-full">
                      <section className="flex gap-4 justify-start">
                        <div>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleClose}
                          >
                            <ArrowLeft size={16} />
                          </Button>
                        </div>
                        <div>
                          <h1 className="text-xl font-semibold">
                            {dataStudent?.student?.num_document}
                            {" - "}
                            {dataStudent?.student?.name}{" "}
                            {dataStudent?.student?.last_name}
                          </h1>
                          <p className="text-xs font-normal">
                            Responde las siguientes preguntas de acuerdo a la
                            evaluación realizada al estudiante.
                          </p>
                        </div>
                      </section>
                      {!isBlocked && (
                        <section className="px-3 pt-2">
                          <div
                            className="flex items-center space-x-2"
                            onClick={handleDataAllNull}
                          >
                            <Checkbox
                              id="notPresent"
                              name="notPresent"
                              checked={isAllNull}
                            />
                            <label
                              htmlFor="notPresent"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Limpiar y Marcar como no presentado
                            </label>
                          </div>
                        </section>
                      )}
                    </main>
                  )}
                </section>
                <section className="flex items-center gap-3">
                  {isAdvance && (
                    <p className="text-xs text-green-600 w-full min-w-fit">
                      {`Guardado exitoso`}
                    </p>
                  )}
                  <div>
                    <Button
                      size="icon"
                      onClick={() => handleSaveData(dataEvaluation, true)}
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
                      {!isLoadingSave && <Save size={16} />}
                    </Button>
                  </div>
                </section>
              </div>
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <main className="w-full flex flex-col items-center overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-100">
                <tr className="border-b bg-muted/50 uppercase">
                  <th className="p-6 text-left font-medium">Preguntas</th>
                  {options?.map((option) => (
                    <th
                      key={option.value}
                      className="p-2 text-center font-medium w-28 min-w-32"
                    >
                      {option.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {listEvaluation.map((evaluation, idx) => (
                  <tr key={idx} className="border p-2">
                    <td className="p-2 text-left font-semibold uppercase ">
                      {evaluation.question.code} -{" "}
                      {evaluation.question.question}
                    </td>
                    {options?.map((option) => (
                      <td
                        key={option.value}
                        className="w-24 min-w-24 max-w-24 h-24 p-2 text-center border"
                        style={{
                          backgroundColor:
                            option.value === evaluation.score
                              ? option.color
                              : "",
                        }}
                        {...(!isBlocked && {
                          onClick: () => {
                            const score = option.value;
                            const dataItem: assessments.IAssessmentPost = {
                              id: evaluation.id,
                              course_assignment: Number(id),
                              question: evaluation.question.id,
                              student: Number(id_student),
                              score: Number(score),
                              student_age: dataStudent.student_age,
                              period: dataPeriodo.results[0]?.id,
                            };
                            setDataEvaluation((prev) => [
                              ...prev.filter(
                                (item) => item.id !== evaluation.id
                              ),
                              dataItem,
                            ]);

                            setListEvaluation((prev) =>
                              prev.map((item) =>
                                item.id === evaluation.id
                                  ? { ...item, score: score }
                                  : item
                              )
                            );
                          },
                        })}
                      >
                        <div className="flex items-center justify-center">
                          {option.value === evaluation.score && (
                            <Check size={44} className="text-white" />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
          {!isBlocked && (
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={() => setIsOpen(true)}
                disabled={
                  isLoadingSave ||
                  !isPeriodActive ||
                  dataEvaluation.length === 0
                }
              >
                Guardar y salir
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
      <DialogConfirmacion
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Guardar evaluación"
        description="¿Estás seguro de guardar la evaluación?"
        aceppLabel="Guardar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() => handleSaveData(dataEvaluation)}
      />
    </main>
  );
};

// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { assessmentsFuntions } from "@/api";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useFilterFromUrl } from "@/modules/core";
// import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
// import { useEvaluationContext } from "@/modules/teacher";
// import { useCourseEvaluation } from "@/modules/teacher/hooks";
// import { assessments, courseEvaluation } from "@/types";
// import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export const ModalTeacherEvaluation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingSave, setIsLoadingSave] = useState(false);
//   const [isAdvance, setIsAdvance] = useState(false);
//   const [listEvaluation, setListEvaluation] = useState<
//     courseEvaluation.ICourseEvaluationScore[]
//   >([]);

//   const [dataEvaluation, setDataEvaluation] = useState<
//     assessments.IAssessmentPost[]
//   >([]);

//   const { updateFilters, getParams } = useFilterFromUrl();
//   const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
//   const { createOrUpdateAssessmentBulks } = assessmentsFuntions;
//   const { dataPeriodo, data: detailsEvaluation } = useEvaluationContext();
//   const { id } = useParams();

//   const id_student = getParams("evaluated", "");

//   const level_number = detailsEvaluation.degree.detail_institution.level.id;
//   const degree__number = detailsEvaluation.degree.degree_number;

//   const dataStudent: courseEvaluation.ICourseEvaluationItem =
//     courseEvaluationData[0] || {};

//   const handleClose = () => {
//     updateFilters({ evaluated: "" });
//   };

//   async function getCoursesEvaluationData() {
//     setIsLoading(true);
//     await getCoursesEvaluation({
//       student_id: Number(id_student),
//     });

//     setIsLoading(false);
//   }

//   useEffect(() => {
//     if (id_student) {
//       getCoursesEvaluationData();
//     }
//   }, [id_student]);

//   useEffect(() => {
//     if (courseEvaluationData.length > 0) {
//       const data = courseEvaluationData[0].evaluation || [];
//       setListEvaluation(data);
//     }
//   }, [courseEvaluationData]);

//   const handleSaveData = async (
//     dataList: assessments.IAssessmentPost[],
//     isReload?: boolean
//   ) => {
//     console.log("dataList", dataList);
//     setIsLoading(true);
//     setIsLoadingSave(true);
//     setIsOpen(false);
//     try {
//       const res = await createOrUpdateAssessmentBulks(dataList);
//       if (res.ok) {
//         console.log("Guardado exitoso");
//         if (isReload) {
//           getCoursesEvaluationData();
//           setIsAdvance(true);

//           setTimeout(() => {
//             setIsAdvance(false);
//           }, 2000);
//         } else {
//           handleClose();
//         }
//       } else {
//         console.error("Error al guardar");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setIsLoadingSave(false);
//   };

//   const handleSelectAnswer = (evaluationId: number, answerId: number) => {
//     const updatedEvaluations = listEvaluation.map((evaluation) => {
//       if (evaluation.id === evaluationId) {
//         return {
//           ...evaluation,
//           student_answer: answerId,
//         };
//       }
//       return evaluation;
//     });

//     setListEvaluation(updatedEvaluations);

//     const dataItem: assessments.IAssessmentPost = {
//       id: evaluationId,
//       course_assignment: Number(id),
//       question: updatedEvaluations.find((e) => e.id === evaluationId)!.question
//         .id,
//       student: Number(id_student),
//       student_answer: answerId, // Enviamos el ID de la alternativa seleccionada
//       student_age: dataStudent.student_age,
//       period: dataPeriodo.results[0]?.id,
//     };

//     setDataEvaluation((prev) => [
//       ...prev.filter((item) => item.id !== evaluationId),
//       dataItem,
//     ]);
//   };

//   const isPeriodActive = dataPeriodo.results.length > 0;
//   const isBlocked = detailsEvaluation?.is_sent;

//   return (
//     <main>
//       <Dialog open onOpenChange={handleClose}>
//         <DialogContent className="sm:max-w-6xl h-full max-h-[calc(100vh-64px)] flex flex-col gap-6">
//           <DialogHeader>
//             <DialogTitle>
//               <div className="flex justify-between items-center gap-4 sm:max-w-6xl">
//                 <section className="w-full">
//                   {isLoading && (
//                     <main className="flex flex-col w-full gap-1">
//                       <div className="w-full h-5 rounded-sm bg-gray-200 max-w-3xl"></div>
//                       <div className="w-1/2 h-5 rounded-s-sm bg-gray-200 rounded-sm"></div>
//                     </main>
//                   )}
//                   {!isLoading && (
//                     <main className="grid grid-cols-1 gap-1 w-full">
//                       <section className="flex gap-4 justify-start">
//                         <div>
//                           <Button
//                             size="sm"
//                             variant="secondary"
//                             onClick={handleClose}
//                           >
//                             <ArrowLeft size={16} />
//                           </Button>
//                         </div>
//                         <div>
//                           <h1 className="text-xl font-semibold">
//                             {dataStudent?.student?.num_document}
//                             {" - "}
//                             {dataStudent?.student?.name}{" "}
//                             {dataStudent?.student?.last_name}
//                           </h1>
//                           <p className="text-xs font-normal">
//                             Responde las siguientes preguntas de acuerdo a la
//                             evaluación realizada al estudiante.
//                           </p>
//                         </div>
//                       </section>
//                     </main>
//                   )}
//                 </section>
//                 <section className="flex items-center gap-3">
//                   {isAdvance && (
//                     <p className="text-xs text-green-600 w-full min-w-fit">
//                       Guardado exitoso
//                     </p>
//                   )}
//                   <div>
//                     <Button
//                       size="icon"
//                       onClick={() => handleSaveData(dataEvaluation, true)}
//                       disabled={
//                         dataEvaluation.length === 0 ||
//                         isLoadingSave ||
//                         !isPeriodActive ||
//                         isBlocked
//                       }
//                     >
//                       {isLoadingSave && (
//                         <LoaderCircle size={16} className="animate-spin" />
//                       )}
//                       {!isLoadingSave && <Save size={16} />}
//                     </Button>
//                   </div>
//                 </section>
//               </div>
//             </DialogTitle>
//             <DialogClose />
//           </DialogHeader>
//           <main className="w-full flex flex-col items-center overflow-y-auto">
//             {listEvaluation.map((evaluation) => (
//               <div key={evaluation.id} className="w-full mb-6">
//                 <h3 className="font-semibold text-lg mb-2">
//                   {evaluation.question.code} - {evaluation.question.question}
//                 </h3>
//                 <div className="space-y-2">
//                   {evaluation.question?.answers?.map((answer) => (
//                     <div
//                       key={answer.id}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="radio"
//                         id={`answer-${answer.id}`}
//                         name={`question-${evaluation.id}`}
//                         value={answer.id}
//                         checked={evaluation.student_answer === answer.id}
//                         onChange={() =>
//                           handleSelectAnswer(evaluation.id, answer.id)
//                         }
//                         disabled={isBlocked}
//                       />
//                       <label htmlFor={`answer-${answer.id}`}>
//                         {answer.option}. {answer.answer}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </main>
//           {!isBlocked && (
//             <DialogFooter>
//               <Button variant="outline" onClick={handleClose}>
//                 Cancelar
//               </Button>
//               <Button
//                 variant="default"
//                 onClick={() => setIsOpen(true)}
//                 disabled={
//                   isLoadingSave ||
//                   !isPeriodActive ||
//                   dataEvaluation.length === 0
//                 }
//               >
//                 Guardar y salir
//               </Button>
//             </DialogFooter>
//           )}
//         </DialogContent>
//       </Dialog>
//       <DialogConfirmacion
//         isOpenConfirm={isOpen}
//         onCloseConfirm={() => setIsOpen(false)}
//         tittleConfirm="Guardar evaluación"
//         description="¿Estás seguro de guardar la evaluación?"
//         aceppLabel="Guardar"
//         cancelLabel="Cancelar"
//         onSubmitConfirm={() => handleSaveData(dataEvaluation)}
//       />
//     </main>
//   );
// };
