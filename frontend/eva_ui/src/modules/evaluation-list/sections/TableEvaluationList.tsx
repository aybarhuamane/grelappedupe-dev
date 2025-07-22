/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { courseEvaluation } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable, useFilterFromUrl } from "@/modules/core";
import { useCourseEvaluation, useEvaluationContext } from "@/modules/teacher";
import { ModalAnswerTeacherEvaluation } from "@/modules/teacher/pages/EvaluacionDetails/Sections/answer-modal-evaluetion";
import { Plus, UserPen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface IColumnsTableEvaluationList {
  id: number;
  full_name: string;
  age: string;
  gender: string;
  progress: number;
  evaluated: boolean;
}

const columns: ColumnDef<IColumnsTableEvaluationList>[] = [
  {
    accessorKey: "edit",
    header: "",
    size: 20,
    cell: ({ row }) => (
      <section className="w-full justify-center items-center flex flex-col z-50">
        <Button asChild size="icon" variant="secondary">
          <Link href={`?edit=${row.original.id}`}>
            <UserPen size={16} />
          </Link>
        </Button>
      </section>
    ),
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
  // {
  //   accessorKey: "gender",
  //   header: "SEXO",
  //   size: 40,
  // },
  // {
  //   accessorKey: "age",
  //   header: "EDAD",
  //   size: 20,
  // },
  {
    accessorKey: "progress",
    header: "PROGRESO DE EVALUACIÓN",
    cell: ({ row }) => (
      <section className="w-full justify-center items-center grid grid-cols-1">
        <section className="flex gap-3 items-center">
          <div className="h-4 rounded-full border w-52 min-w-52 bg-gray-200">
            <div
              className={`h-full rounded-sm`}
              style={{
                width: `${row.original.progress}%`, // El ancho basado en el progreso
                backgroundColor:
                  row.original.progress === null || row.original.progress === 0
                    ? "#D4D4D8" // Gris si es null o 0%
                    : row.original.progress > 0 && row.original.progress <= 25
                    ? "#F54180" // Rojo de 1% a 25%
                    : row.original.progress > 25 && row.original.progress <= 50
                    ? "#F7B750" // Naranja de 26% a 50%
                    : row.original.progress > 50 && row.original.progress < 100
                    ? "#F5A524" // Amarillo de 51% a 99%
                    : "#17C964", // Verde para 100%
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 w-full">
            {row.original.progress}% (
            {row.original.progress === 100 ? "completado" : "en progreso"})
          </p>
        </section>
      </section>
    ),
  },
  {
    accessorKey: "evaluated",
    header: "",
    size: 20,
    cell: ({ row }) => (
      <section className="w-full justify-center items-center flex flex-col max-w-sm">
        <Button size="sm">
          {row.original.evaluated ? "Ver detalles" : "Evaluar"}
        </Button>
      </section>
    ),
  },
];

interface IProps {
  course_id: number;
}

const calcPercentage = (data: courseEvaluation.ICourseEvaluationScore[]) => {
  const total = data?.length;
  const completed = data?.filter((item) => item.student_answer !== null).length;
  return Math.round((completed / total) * 100);
};

export default function TableEvaluationList(props: IProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { course_id } = props;
  const { getParams, updateFilter } = useFilterFromUrl();

  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const { data: evaluationData } = useEvaluationContext();

  const router = useRouter();
  const pathname = usePathname();

  const evaluted = getParams("evaluated", "");
  const edit = getParams("edit", "");
  const add = getParams("add", "");

  const isBlocked = evaluationData.is_active;

  const handleRowClick = (id: number) => {
    router.push(`${pathname}?evaluated=${id}`);
  };

  useEffect(() => {
    getCoursesEvaluation({
      course_assignment_id: Number(course_id),
    });
    setLoading(false);
  }, [course_id, evaluted, edit, add]);

  const data: IColumnsTableEvaluationList[] = courseEvaluationData?.map(
    (evaluation, index) => ({
      id: evaluation?.student?.id,
      number: index + 1,
      evaluated: evaluationData?.is_sent,
      age: evaluation?.evaluation[0]?.student_age?.toString() || "N/A",
      full_name: `${evaluation?.student?.last_name} ${evaluation?.student?.name}`,
      gender: evaluation?.student?.gender === "M" ? "Masculino" : "Femenino",
      progress: calcPercentage(evaluation?.evaluation),
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
      {evaluted && <ModalAnswerTeacherEvaluation />}
      {loading && (
        <div>
          <p>Cargando</p>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          columns={columsData}
          data={data}
          hasToolbar={false}
          onValueSelectedChange={(row) => handleRowClick(Number(row?.id))}
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
      </Suspense>
    </div>
  );
}
