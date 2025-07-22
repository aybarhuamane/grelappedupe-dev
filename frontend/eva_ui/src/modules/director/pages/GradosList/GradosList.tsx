/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  DataTable,
  HeaderSection,
  LayoutAsideSection,
  useFilterFromUrl,
} from "@/modules/core";
import { useInstitutionStore } from "@/store/use-institution-store";
import { degree, detailInstitution, response } from "@/types";
import { Suspense, useEffect, useState } from "react";
import { useGrados } from "../../hooks";
import { AsideGradoFilter } from "./AsideGradoFilter";
import { gradoColumns } from "./GradoColumns";

interface IGradosListProps {
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>;
}

export const GradosList = (props: IGradosListProps) => {
  const { institutionAssigned } = props;
  const { getGrados, listGrados } = useGrados();
  const { getParams, updateFilters } = useFilterFromUrl();
  const { selectedInstitution } = useInstitutionStore();

  const [sizePage, setSizePage] = useState(15);
  const [page, setPage] = useState(1);

  const isActived = getParams("is_actived", "all");
  // const institution = getParams(
  //   'institution',
  //   `${institutionAssigned?.results[0]?.id || ''}`
  // )
  // const page = getParams('page', '1')

  useEffect(() => {
    getGrados({
      detail_institution__id: Number(selectedInstitution),
      is_active: isActived !== "all" ? isActived === "true" : undefined,
      // page: Number(page),
      page: page,
      page_size: sizePage,
    });
  }, [institutionAssigned, page, sizePage]);

  const listGradosData: degree.IDegreeTable[] =
    listGrados.results?.map((item) => {
      return {
        id: item.id,
        degree_number: item.degree_number,
        degree_text: item.degree_text,
        is_active: item.is_active ? "Activo" : "Inactivo",
        section: item.section,
      };
    }) || [];

  const hanledPageChange = (page: number) => {
    setPage(page);
    updateFilters({ page: page.toString() });

    // const pageUrl = page + 1
    // updateFilters({ page: pageUrl.toString() })
  };

  return (
    <main className="flex flex-col gap-6">
      <HeaderSection
        title="Grados Asignados"
        subtitle="Lista de grados asignados a la institución educativa"
        hrefAddButton="/director/manage-degrees/create"
        labelAddButton="Agregar Grado"
      />
      <Suspense fallback={<div>Cargando...</div>}>
        <LayoutAsideSection
          aside={
            <AsideGradoFilter
              institutionAssigned={institutionAssigned?.results || []}
            />
          }
        >
          <DataTable
            hasSearch={false}
            hasColumnFilters={false}
            columns={gradoColumns}
            data={listGradosData}
            paginationProps={{
              page: page,
              pageSize: sizePage,
              count: Number(listGrados.count),
              onPageChange: hanledPageChange,
              onPageSizeChange: (size) => {
                setSizePage(size);
              },
            }}
          />
        </LayoutAsideSection>
      </Suspense>
    </main>
  );
};
