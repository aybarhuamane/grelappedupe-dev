/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DataTable } from "@/modules/core";
import { useTeacher } from "@/modules/director";
import { useInstitutionStore } from "@/store/use-institution-store";
import { detailInstitution, response, teacher } from "@/types";
import { useEffect, useState } from "react";
import { TeacherColumns } from "./TeacherColumns";

interface ITeacherListProps<T> {
  onSelected?: (value: T) => void;
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>;
}

export const TeacherList = (
  props: ITeacherListProps<teacher.ITeacherTable>
) => {
  const { onSelected, institutionAssigned } = props;
  const { loading, getTeacherAssigmentSchool, listTeacherAssigmentSchool } =
    useTeacher();
  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(15);
  const [search, setSearch] = useState("");
  const [isLetter, setIsLetter] = useState(false);

  // const idInstitution = institutionAssigned.results[0].id
  const { selectedInstitution } = useInstitutionStore();

  useEffect(() => {
    getTeacherAssigmentSchool({
      page: page,
      detail_institution: Number(selectedInstitution),
      teaching__person__num_document__icontains: !isLetter ? search : undefined,
      teaching__person__last_name__icontains: isLetter ? search : undefined,
      page_size: sizePage,
    });
  }, [search]);

  const dataList: teacher.ITeacherAssigmentSchoolList[] =
    listTeacherAssigmentSchool.results?.map((item) => {
      return {
        id: item.teaching.id,
        status: item.is_active ? "Activo" : "Inactivo",
        name: item.teaching.person.name,
        last_name: item.teaching.person.last_name,
        num_document: item.teaching.person.num_document,
        email: item.teaching.person.email,
        phone: item.teaching.person.phone,
        teaching: item.teaching,
        detail_institution: item.detail_institution,
        is_active: item.is_active,
      };
    }) || [];

  const handleSearch = (value: string) => {
    if (!isNaN(Number(value))) {
      setIsLetter(false);
    } else if (/^[a-zA-Z]+$/.test(value)) {
      setIsLetter(true);
    } else {
      setIsLetter(false);
    }
    setSearch(value);
  };

  return (
    <main className="">
      <DataTable
        columns={TeacherColumns}
        data={dataList}
        paginationProps={{
          page: page,
          count: listTeacherAssigmentSchool.count,
          pageSize: sizePage,
          onPageChange: (page) => {
            setPage(page);
          },
          onPageSizeChange: (size) => {
            setSizePage(size);
          },
        }}
        onValueSelectedChange={(value) =>
          onSelected &&
          onSelected({
            id: value?.teaching.id ?? 0,
            name: value?.teaching.person.name ?? "",
            last_name: value?.teaching.person.last_name ?? "",
          } as teacher.ITeacherTable)
        }
        isLoading={loading}
        hasSearch
        valueSearch={search}
        onValueSearch={(value) => handleSearch(value)}
      />
    </main>
  );
};
