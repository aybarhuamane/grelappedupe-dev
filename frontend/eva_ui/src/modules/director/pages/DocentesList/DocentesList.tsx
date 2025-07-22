/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { DataTable, HeaderSection } from "@/modules/core";
import { useTeacher } from "@/modules/director";
import { detailInstitution } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { useInstitutionStore } from "@/store/use-institution-store";
import { docentesCoulmns } from "./docentes-columns";
import { InstitutionSeleted } from "./InstitutionSeleted";

interface IDocentesListProps {
  institutionsAssigned: detailInstitution.IDetailInstitutionList[];
}

export const DocentesList = (props: IDocentesListProps) => {
  const { institutionsAssigned } = props;

  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(15);
  const [search, setSearch] = useState("");
  const [isLetter, setIsLetter] = useState(false);

  const { selectedInstitution } = useInstitutionStore();

  const pathname = usePathname();
  const {
    getTeacherAssigmentSchoolAction,
    listTeacherAssigmentSchool,
    loading,
  } = useTeacher();
  const urlAdd = `${pathname}/create?detail_institution=${selectedInstitution}`;

  useEffect(() => {
    if (selectedInstitution) {
      getTeacherAssigmentSchoolAction({
        page,
        detail_institution: Number(selectedInstitution),
        search: search,
        // teaching__person__last_name__icontains: search,
        page_size: sizePage,
      });
    }
  }, [page, search, sizePage, isLetter, selectedInstitution]);

  return (
    <main className="flex flex-col gap-6">
      <Suspense
        fallback={<div className="container mx-auto p-4">Cargando...</div>}
      >
        <HeaderSection
          title="Gestionar Docentes"
          subtitle="Añadir los docentes que están disponibles para realizar las evaluaciones"
          labelAddButton="Agregar Docente"
          hrefAddButton={urlAdd}
          renderRightSection={
            <section>
              <Link
                href={`/director/manage-teachers/import?detail_institution_id=${selectedInstitution}`}
                passHref
              >
                <Button className="border border-gable-green-800 bg-white text-gable-green700 hover:bg-gable-green-500 hover:text-white">
                  Importar Docentes
                </Button>
              </Link>
            </section>
          }
          renderLeftSection={
            <InstitutionSeleted institutionsAssigned={institutionsAssigned} />
          }
        />
        <section className="container">
          <DataTable
            columns={docentesCoulmns}
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
