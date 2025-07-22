/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DataTable, useFilterFromUrl } from "@/modules/core";
import { useDegreeAsigned } from "@/modules/director";
import { useQuestionTableAction } from "@/modules/quiz-manage/hooks/use-question-table-action";
import { useInstitutionStore } from "@/store/use-institution-store";
import { course, degree, detailInstitution, response } from "@/types";
import { useEffect, useState } from "react";
import { DegreeColumns } from "./DegreeColumns";

interface ITeacherListProps<T> {
  onSelected?: (value: T) => void;
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>;
  selectedCourse?: course.ICourse;
}

export const DegreeList = (props: ITeacherListProps<degree.IDegreeTable>) => {
  const { onSelected, institutionAssigned, selectedCourse } = props;
  const { listGrados, getGradosAsigned, loading } = useDegreeAsigned();
  const { getParams } = useFilterFromUrl();
  const { selectedInstitution } = useInstitutionStore();

  const [isLetter, setIsLetter] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { getQuestionsList, listQuestions } = useQuestionTableAction();

  useEffect(() => {
    getQuestionsList({
      capacity__competence__course__id: selectedCourse?.id,
    });
  }, []);

  // const detailInstitutionId = institutionAssigned.results[0]?.id;
  const degreeNumber = getParams("degree_number", "");
  const degreeSection = getParams("section", "");

  const getGrados = async () => {
    await getGradosAsigned({
      detail_institution__id: Number(selectedInstitution),
      degree_number: degreeNumber,
      section: degreeSection,
      page,
    });
  };

  useEffect(() => {
    getGrados();
  }, [search, page]);

  // Filtrar grados que tienen preguntas asociadas
  // const filteredDegrees = listGrados.results?.filter((grado) => {
  //   return listQuestions.results.some(
  //     (question) => question.degree_number === grado.degree_number
  //   );
  // });

  const dataList: degree.IDegreeTable[] =
    listGrados.results?.map((item) => {
      return {
        id: item.id,
        degree_text: item.degree_text,
        degree_number: item.degree_number,
        section: item.section,
        is_active: item.is_active ? "Activo" : "Inactivo",
        fullname: `${item.degree_number} - ${item.degree_text} ${item.section}`,
      };
    }) || [];
  // const dataList: degree.IDegreeTable[] =
  //   filteredDegrees?.map((item) => {
  //     return {
  //       id: item.id,
  //       degree_text: item.degree_text,
  //       degree_number: item.degree_number,
  //       section: item.section,
  //       is_active: item.is_active ? "Activo" : "Inactivo",
  //       fullname: `${item.degree_number} - ${item.degree_text} ${item.section}`,
  //     };
  //   }) || [];

  return (
    <main className="">
      <DataTable
        columns={DegreeColumns}
        data={dataList}
        paginationProps={{
          page,
          count: listGrados.count,
          onPageChange: (page) => setPage(page),
          onPageSizeChange: (pageSize) => pageSize,
          pageSize: 15,
        }}
        onValueSelectedChange={(value) =>
          onSelected && onSelected(value as degree.IDegreeTable)
        }
      />
    </main>
  );
};
