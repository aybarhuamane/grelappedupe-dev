// app/teacher/evaluation/_components/EvaluationList.tsx
"use client";
import { DataTableStudent } from "@/modules/core/components/DataTable/table/data-table-second";
import { useCourseEvaluation, useEvaluationContext } from "@/modules/teacher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function EvaluationList(props: { id: string }) {
  const { getCoursesEvaluation, courseEvaluationData } = useCourseEvaluation();
  const { data: evaluationData } = useEvaluationContext();
  const router = useRouter();

  useEffect(() => {
    getCoursesEvaluation({
      course_assignment_id: Number(props.id), // Reemplaza con el ID del curso dinámico
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (id: number) => {
    router.push(`/teacher/evaluation/${id}`);
  };

  const data = courseEvaluationData?.map((evaluation, index) => ({
    id: evaluation?.student?.id,
    number: index + 1,
    full_name: `${evaluation?.student?.last_name} ${evaluation?.student?.name}`,
  }));

  return (
    <DataTableStudent
      columns={[
        {
          accessorKey: "number",
          header: "N°",
        },
        {
          accessorKey: "full_name",
          header: "APELLIDOS Y NOMBRES",
        },
      ]}
      data={data}
      onValueSelectedChange={(row) => handleRowClick(Number(row?.id))}
    />
  );
}
