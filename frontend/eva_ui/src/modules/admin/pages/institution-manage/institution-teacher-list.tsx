/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DataTable, HeaderSection } from "@/modules/core";
import { useTeacher } from "@/modules/director";
import { Suspense, useEffect, useState } from "react";

import { teacherColumns } from "@/modules/admin/pages/institution-manage/teacher-columns";

interface IInstitutionTeacherListProps {
  id: string;
  headerSection?: boolean;
}

export const InstitutionTeacherList = (props: IInstitutionTeacherListProps) => {
  const { id, headerSection = true } = props;
  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(15);
  const [search, setSearch] = useState("");

  const {
    getTeacherAssigmentSchoolAction,
    listTeacherAssigmentSchool,
    loading,
  } = useTeacher();

  useEffect(() => {
    getTeacherAssigmentSchoolAction({
      page,
      detail_institution: Number(id),
      search: search,
      page_size: sizePage,
    });
  }, [page, search, sizePage, id]);

  return (
    <main className="flex flex-col gap-6">
      <Suspense
        fallback={<div className="container mx-auto p-4">Cargando...</div>}
      >
        {headerSection && (
          <HeaderSection
            title="Gestionar Docentes"
            subtitle="Añadir los docentes que están disponibles para realizar las evaluaciones"
            labelAddButton="Agregar Docente"
          />
        )}
        <section className="container">
          <DataTable
            columns={teacherColumns}
            data={listTeacherAssigmentSchool.results}
            paginationProps={{
              page: page,
              count: listTeacherAssigmentSchool.count,
              pageSize: sizePage,
              onPageChange: (page) => setPage(page),
              onPageSizeChange: (size) => setSizePage(size),
            }}
            isLoading={loading}
            hasSearch
            valueSearch={search}
            onValueSearch={(value) => setSearch(value)}
          />
        </section>
      </Suspense>
    </main>
  );
};
