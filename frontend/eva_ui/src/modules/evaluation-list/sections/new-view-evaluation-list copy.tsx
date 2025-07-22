// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { assessments, courseEvaluation } from "@/types";
// import { ColumnDef } from "@tanstack/react-table";
// import { Suspense, useEffect, useState } from "react";

// import { assessmentsFuntions } from "@/api";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useFilterFromUrl } from "@/modules/core";
// import { DataTableStudent } from "@/modules/core/components/DataTable/table/data-table-second";
// import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
// import { useCourseEvaluation, useEvaluationContext } from "@/modules/teacher";
// import { LoaderCircle, Plus, Save, UserPen } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// interface IColumnsTableEvaluationList {
//   id: number;
//   full_name: string;
//   age: string;
//   gender: string;
//   progress: number;
//   evaluated: boolean;
// }

// const columns: ColumnDef<IColumnsTableEvaluationList>[] = [
//   {
//     accessorKey: "edit",
//     header: "EDITAR",
//     size: 20,
//     cell: ({ row }) => (
//       <section className="w-full justify-center items-center flex flex-col z-50">
//         <Button asChild size="icon" variant="secondary">
//           <Link href={`?edit=${row.original.id}`}>
//             <UserPen size={16} />
//           </Link>
//         </Button>
//       </section>
//     ),
//   },
//   {
//     accessorKey: "number",
//     header: "N°",
//     size: 10,
//   },
//   {
//     accessorKey: "full_name",
//     header: "APELLIDOS Y NOMBRES",
//   },
//   //   {
//   //     accessorKey: "progress",
//   //     header: "PROGRESO DE EVALUACIÓN",
//   //     cell: ({ row }) => (
//   //       <section className="w-full justify-center items-center grid grid-cols-1">
//   //         <section className="flex gap-3 items-center">
//   //           <div className="h-4 rounded-full border w-52 min-w-52 bg-gray-200">
//   //             <div
//   //               className={`h-full rounded-sm`}
//   //               style={{
//   //                 width: `${row.original.progress}%`,
//   //                 backgroundColor:
//   //                   row.original.progress === null || row.original.progress === 0
//   //                     ? "#D4D4D8"
//   //                     : row.original.progress > 0 && row.original.progress <= 25
//   //                     ? "#F54180"
//   //                     : row.original.progress > 25 && row.original.progress <= 50
//   //                     ? "#F7B750"
//   //                     : row.original.progress > 50 && row.original.progress < 100
//   //                     ? "#F5A524"
//   //                     : "#17C964",
//   //               }}
//   //             ></div>
//   //           </div>
//   //           <p className="text-sm text-gray-500 w-full">
//   //             {row.original.progress}% (
//   //             {row.original.progress === 100 ? "completado" : "en progreso"})
//   //           </p>
//   //         </section>
//   //       </section>
//   //     ),
//   //   },
//   //   {
//   //     accessorKey: "evaluated",
//   //     header: "",
//   //     size: 20,
//   //     cell: ({ row }) => (
//   //       <section className="w-full justify-center items-center flex flex-col max-w-sm">
//   //         <Button size="sm">
//   //           {row.original.evaluated ? "Ver detalles" : "Evaluar"}
//   //         </Button>
//   //       </section>
//   //     ),
//   //   },
// ];

// interface IProps {
//   course_id: number;
// }

// const calcPercentage = (data: courseEvaluation.ICourseEvaluationScore[]) => {
//   const total = data?.length;
//   const completed = data?.filter((item) => item.student_answer !== null).length;
//   return Math.round((completed / total) * 100);
// };

// export default function NewViewEvaluationList(props: IProps) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { course_id } = props;
//   const { getParams, updateFilter } = useFilterFromUrl();

//   const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
//   const { data: evaluationData } = useEvaluationContext();

//   const router = useRouter();
//   const pathname = usePathname();

//   const evaluted = getParams("evaluated", "");
//   const edit = getParams("edit", "");
//   const add = getParams("add", "");

//   const isBlocked = evaluationData.is_active;

//   const handleRowClick = (id: number) => {
//     router.push(`${pathname}?evaluated=${id}`);
//   };

//   useEffect(() => {
//     getCoursesEvaluation({
//       course_assignment_id: Number(course_id),
//     });
//     setLoading(false);
//   }, [course_id, evaluted, edit, add]);

//   const data: IColumnsTableEvaluationList[] = courseEvaluationData?.map(
//     (evaluation, index) => ({
//       id: evaluation?.student?.id,
//       number: index + 1,
//       evaluated: evaluationData?.is_sent,
//       age: evaluation?.evaluation[0]?.student_age?.toString() || "N/A",
//       full_name: `${evaluation?.student?.last_name} ${evaluation?.student?.name}`,
//       gender: evaluation?.student?.gender === "M" ? "Masculino" : "Femenino",
//       progress: calcPercentage(evaluation?.evaluation),
//     })
//   );

//   const columsData = !isBlocked
//     ? columns.filter(
//         (item: ColumnDef<IColumnsTableEvaluationList> | any) =>
//           item.accessorKey !== "edit"
//       )
//     : columns;

//   return (
//     <div className="bg-white py-4 w-full">
//       {loading && (
//         <div>
//           <p>Cargando</p>
//         </div>
//       )}
//       <Suspense fallback={<div>Loading...</div>}>
//         <div className="grid grid-cols-4 gap-4">
//           {/* Columna de la lista de estudiantes */}
//           <div className="mx-4 w-full col-span-1 border border-gray-200 rounded shadow-lg">
//             <DataTableStudent
//               columns={columsData}
//               data={data}
//               hasToolbar={false}
//               onValueSelectedChange={(row) => handleRowClick(Number(row?.id))}
//             />
//             {!isBlocked && (
//               <section className="flex items-center gap-6 px-14">
//                 <div className="flex-shrink-0 pl-6">
//                   <Button
//                     size="icon"
//                     onClick={() => {
//                       updateFilter("add", "true");
//                     }}
//                     disabled={isBlocked}
//                   >
//                     <Plus size={16} />
//                   </Button>
//                 </div>
//                 <div className="flex gap-4 flex-grow">
//                   <div className="h-10 w-full bg-gray-100 rounded-md"></div>
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* Columna de preguntas y respuestas */}
//           <div className="col-span-3 px-4">
//             {evaluted && (
//               <EvaluationQuestions studentId={evaluted} courseId={course_id} />
//             )}
//           </div>
//         </div>
//       </Suspense>
//     </div>
//   );
// }

// // /* Componente para mostrar las preguntas y respuestas */
// // const EvaluationQuestions = ({
// //   studentId,
// //   courseId,
// // }: {
// //   studentId: string;
// //   courseId: number;
// // }) => {
// //   const [listEvaluation, setListEvaluation] = useState<
// //     courseEvaluation.ICourseEvaluationScore[]
// //   >([]);
// //   const [dataEvaluation, setDataEvaluation] = useState<
// //     assessments.IAssessmentPost[]
// //   >([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isLoadingSave, setIsLoadingSave] = useState(false);
// //   const [isAdvance, setIsAdvance] = useState(false);
// //   const [isOpen, setIsOpen] = useState(false);

// //   const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
// //   const { dataPeriodo, data: detailsEvaluation } = useEvaluationContext();
// //   const { createOrUpdateAssessmentBulks } = assessmentsFuntions;

// //   const dataStudent: courseEvaluation.ICourseEvaluationItem =
// //     courseEvaluationData[0] || {};

// //   useEffect(() => {
// //     if (studentId) {
// //       getCoursesEvaluation({
// //         student_id: Number(studentId),
// //       });
// //     }
// //   }, [studentId]);

// //   useEffect(() => {
// //     if (courseEvaluationData.length > 0) {
// //       const data = courseEvaluationData[0].evaluation || [];
// //       setListEvaluation(data);
// //     }
// //   }, [courseEvaluationData]);

// //   const handleSaveData = async (
// //     dataList: assessments.IAssessmentPost[],
// //     isReload?: boolean
// //   ) => {
// //     console.log("dataList", dataList);
// //     setIsLoading(true);
// //     setIsLoadingSave(true);
// //     setIsOpen(false);
// //     try {
// //       const res = await createOrUpdateAssessmentBulks(dataList);
// //       if (res.ok) {
// //         console.log("Guardado exitoso");
// //         if (isReload) {
// //           getCoursesEvaluation({
// //             student_id: Number(studentId),
// //           });
// //           setIsAdvance(true);

// //           setTimeout(() => {
// //             setIsAdvance(false);
// //           }, 2000);
// //         }
// //       } else {
// //         console.error("Error al guardar");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //     }
// //     setIsLoadingSave(false);
// //   };

// //   const handleSelectAnswer = (evaluationId: number, answerId: number) => {
// //     const updatedEvaluations = listEvaluation.map((evaluation) => {
// //       if (evaluation.id === evaluationId) {
// //         return {
// //           ...evaluation,
// //           student_answer: answerId,
// //         };
// //       }
// //       return evaluation;
// //     });

// //     setListEvaluation(updatedEvaluations);

// //     const dataItem: assessments.IAssessmentPost = {
// //       id: evaluationId,
// //       course_assignment: Number(courseId),
// //       question: updatedEvaluations.find((e) => e.id === evaluationId)!.question
// //         .id,
// //       student: Number(studentId),
// //       student_answer: answerId,
// //       student_age: dataStudent.student_age,
// //       period: dataPeriodo.results[0]?.id,
// //     };

// //     setDataEvaluation((prev) => [
// //       ...prev.filter((item) => item.id !== evaluationId),
// //       dataItem,
// //     ]);
// //   };

// //   const isPeriodActive = dataPeriodo.results.length > 0;
// //   const isBlocked = detailsEvaluation?.is_sent;

// //   return (
// //     <div className="p-6 space-y-4 border border-gray-200 rounded shadow-lg">
// //       <header className="mb-4 flex justify-between items-center">
// //         <section>
// //           <h2 className="text-xl font-semibold">
// //             Evaluación de {dataStudent?.student?.name}{" "}
// //             {dataStudent?.student?.last_name}
// //           </h2>
// //           <p className="text-sm font-normal">
// //             Responde las siguientes preguntas de acuerdo a la evaluación
// //             realizada al estudiante.
// //           </p>
// //         </section>
// //         <section className="flex items-center gap-3">
// //           {isAdvance && (
// //             <p className="text-xs text-green-600 w-full min-w-fit">
// //               Guardado exitoso
// //             </p>
// //           )}
// //           <div>
// //             <Button
// //               size="icon"
// //               onClick={() => handleSaveData(dataEvaluation, true)}
// //               disabled={
// //                 dataEvaluation.length === 0 ||
// //                 isLoadingSave ||
// //                 !isPeriodActive ||
// //                 isBlocked
// //               }
// //             >
// //               {isLoadingSave && (
// //                 <LoaderCircle size={16} className="animate-spin" />
// //               )}
// //               {!isLoadingSave && <Save size={16} />}
// //             </Button>
// //           </div>
// //         </section>
// //       </header>

// //       <hr />

// //       <div className="space-y-4">
// //         <ScrollArea className="h-[600px]">
// //           {listEvaluation.map((evaluation) => (
// //             <div key={evaluation.id} className="w-full mb-6">
// //               <h3 className="font-semibold text-lg mb-2">
// //                 {evaluation.question.code} - {evaluation.question.question}
// //               </h3>
// //               <div className="space-y-2">
// //                 {evaluation.question?.answers?.map((answer) => (
// //                   <div key={answer.id} className="flex items-center space-x-2">
// //                     <input
// //                       type="radio"
// //                       id={`answer-${answer.id}`}
// //                       name={`question-${evaluation.id}`}
// //                       value={answer.id}
// //                       checked={evaluation.student_answer === answer.id}
// //                       onChange={() =>
// //                         handleSelectAnswer(evaluation.id, answer.id)
// //                       }
// //                       disabled={isBlocked}
// //                     />
// //                     <label htmlFor={`answer-${answer.id}`}>
// //                       {answer.option}. {answer.answer}
// //                     </label>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </ScrollArea>
// //       </div>
// //       {!isBlocked && (
// //         <div className="mt-4 w-full flex justify-end border-t pt-4">
// //           <Button
// //             onClick={() => setIsOpen(true)}
// //             disabled={
// //               dataEvaluation.length === 0 ||
// //               isLoadingSave ||
// //               !isPeriodActive ||
// //               isBlocked
// //             }
// //             className="w-full max-w-[200px]"
// //           >
// //             <Save size={16} className="mr-2" />
// //             {isLoadingSave ? "Guardando..." : "Finalizar"}
// //           </Button>
// //         </div>
// //       )}
// //       <DialogConfirmacion
// //         isOpenConfirm={isOpen}
// //         onCloseConfirm={() => setIsOpen(false)}
// //         tittleConfirm="Finalizar evaluación"
// //         description="¿Estás seguro de guardar la evaluación?"
// //         aceppLabel="Finalizar"
// //         cancelLabel="Cancelar"
// //         onSubmitConfirm={() => handleSaveData(dataEvaluation)}
// //       />
// //     </div>
// //   );
// // };

// const options = [
//   { label: "", value: 0 },
//   { label: "", value: 1 },
//   { label: "", value: 2 },
//   { label: "", value: 3 },
// ];

// const EvaluationQuestions = ({
//   studentId,
//   courseId,
// }: {
//   studentId: string;
//   courseId: number;
// }) => {
//   const [listEvaluation, setListEvaluation] = useState<
//     courseEvaluation.ICourseEvaluationScore[]
//   >([]);
//   const [dataEvaluation, setDataEvaluation] = useState<
//     assessments.IAssessmentPost[]
//   >([]);
//   const [isLoadingSave, setIsLoadingSave] = useState(false);
//   const [isAdvance, setIsAdvance] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
//   const { dataPeriodo, data: detailsEvaluation } = useEvaluationContext();
//   const { createOrUpdateAssessmentBulks } = assessmentsFuntions;

//   const dataStudent: courseEvaluation.ICourseEvaluationItem =
//     courseEvaluationData[0] || {};

//   useEffect(() => {
//     if (studentId) {
//       getCoursesEvaluation({
//         student_id: Number(studentId),
//       });
//     }
//   }, [studentId]);

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
//     setIsLoadingSave(true);
//     setIsOpen(false);
//     try {
//       const res = await createOrUpdateAssessmentBulks(dataList);
//       if (res.ok) {
//         console.log("Guardado exitoso");
//         if (isReload) {
//           getCoursesEvaluation({
//             student_id: Number(studentId),
//           });
//           setIsAdvance(true);

//           setTimeout(() => {
//             setIsAdvance(false);
//           }, 2000);
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
//       course_assignment: Number(courseId),
//       question: updatedEvaluations.find((e) => e.id === evaluationId)!.question
//         .id,
//       student: Number(studentId),
//       student_answer: answerId,
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
//     <div className="p-6 space-y-4 border border-gray-200 rounded shadow-lg">
//       <header className="mb-4 flex justify-between items-center">
//         <section>
//           <h2 className="text-xl font-semibold">
//             Evaluación de {dataStudent?.student?.name}{" "}
//             {dataStudent?.student?.last_name}
//           </h2>
//           <p className="text-sm font-normal">
//             Responde las siguientes preguntas de acuerdo a la evaluación
//             realizada al estudiante.
//           </p>
//         </section>
//         <section className="flex items-center gap-3">
//           {isAdvance && (
//             <p className="text-xs text-green-600 w-full min-w-fit">
//               Guardado exitoso
//             </p>
//           )}
//           <div>
//             <Button
//               size="icon"
//               onClick={() => handleSaveData(dataEvaluation, true)}
//               disabled={
//                 dataEvaluation.length === 0 ||
//                 isLoadingSave ||
//                 !isPeriodActive ||
//                 isBlocked
//               }
//             >
//               {isLoadingSave && (
//                 <LoaderCircle size={16} className="animate-spin" />
//               )}
//               {!isLoadingSave && <Save size={16} />}
//             </Button>
//           </div>
//         </section>
//       </header>

//       <hr />

//       <div className="space-y-4">
//         <ScrollArea className="h-[600px]">
//           <table className="w-full">
//             <thead className="sticky top-0 bg-gray-100">
//               <tr className="border-b bg-muted/50 uppercase">
//                 <th className="p-6 text-left font-medium">Preguntas</th>
//                 {options?.map((option) => (
//                   <th
//                     key={option.value}
//                     className="p-2 text-center font-medium w-28 min-w-32"
//                   >
//                     {option.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {listEvaluation.map((evaluation, idx) => (
//                 <tr key={idx} className="border p-2">
//                   <td className="p-2 text-sm text-left font-semibold uppercase">
//                     {evaluation.question.code} - {evaluation.question.question}
//                   </td>
//                   {evaluation?.question?.answers?.map((answer) => (
//                     <td
//                       key={answer.id}
//                       className="w-24 min-w-24 max-w-24 h-16 p-2 text-center border"
//                       style={{
//                         backgroundColor:
//                           evaluation.student_answer === answer.id
//                             ? "#17C964" // Color único para la alternativa seleccionada
//                             : "transparent",
//                       }}
//                       {...(!isBlocked && {
//                         onClick: () =>
//                           handleSelectAnswer(evaluation.id, answer.id),
//                       })}
//                     >
//                       <div className="flex items-center justify-center uppercase">
//                         {answer.option}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </ScrollArea>
//       </div>

//       {!isBlocked && (
//         <div className="mt-4 w-full flex justify-end border-t pt-4">
//           <Button
//             onClick={() => setIsOpen(true)}
//             disabled={
//               dataEvaluation.length === 0 ||
//               isLoadingSave ||
//               !isPeriodActive ||
//               isBlocked
//             }
//             className="w-full max-w-[200px]"
//           >
//             <Save size={16} className="mr-2" />
//             {isLoadingSave ? "Guardando..." : "Finalizar"}
//           </Button>
//         </div>
//       )}

//       <DialogConfirmacion
//         isOpenConfirm={isOpen}
//         onCloseConfirm={() => setIsOpen(false)}
//         tittleConfirm="Finalizar evaluación"
//         description="¿Estás seguro de guardar la evaluación?"
//         aceppLabel="Finalizar"
//         cancelLabel="Cancelar"
//         onSubmitConfirm={() => handleSaveData(dataEvaluation)}
//       />
//     </div>
//   );
// };
