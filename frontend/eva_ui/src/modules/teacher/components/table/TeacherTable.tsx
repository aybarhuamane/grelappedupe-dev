"use client";

import { DataTable } from "@/modules/core";
import { courseAssignment, response } from "@/types";
import { teacherColumns } from "./TeacherColumns";

interface IProps {
  data: response.IResApi<courseAssignment.ITeacherAssignmentList>;
}

export default function TeacherTable(props: IProps) {
  const { data } = props;

  const listEvaluaciones: courseAssignment.ITeacherAssignmentTable[] =
    data.results.map((item) => {
      return {
        id: Number(item?.id),
        date: item?.date,
        grade: item?.degree?.degree_text,
        section: item?.degree?.section,
        number: Number(item?.degree?.degree_number),
        course: item?.course.name,
        institution: item?.degree?.detail_institution?.institution.name,
        modular_code: item?.degree?.detail_institution?.modular_code,
        local_code: item?.degree?.detail_institution?.local_code,
        is_active: item.is_active,
        is_validated: item.is_validated,
      };
    }) || [];

  return (
    <div>
      <DataTable
        columns={teacherColumns}
        data={listEvaluaciones}
        hasPagination={false}
        hasToolbar={false}
      />
    </div>
  );
}
