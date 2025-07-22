/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useInstitutionsAction } from "@/modules/admin/hooks/useIntitutionsAction";
import { DataTable, HeaderSection, LayoutAsideSection } from "@/modules/core";
import { institution } from "@/types";
import { useEffect, useState } from "react";
import { AsideIndications } from "../../directorManange";
import { institutionsColumns } from "./InstitutionColumns";

const indications = [
  "Este es el listado de instituciones registrados en la plataforma",
];

export const InstitutionTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const { listInstitution, getInstitutions, loading } = useInstitutionsAction();
  const [sizePage, setSizePage] = useState(15);

  useEffect(() => {
    getInstitutions({
      page,
      page_size: sizePage,
      search: search,
    });
  }, [page, search, sizePage]);

  const data: institution.IDetailsInstitutionTableAction[] =
    listInstitution.results.map((item) => {
      return {
        id: item.institution.id,
        institution: item.institution,
        modular_code: item.modular_code,
        local_code: item.local_code,
        director: item.director
          ? item.director.person.name + " " + item.director.person.last_name
          : " --- ",
        area: item.area.name,
        category: item.category ? item.category.name : " --- ",
        level: item.level?.name,
        user: item.user?.username,
        detail_institution: item.id,
      };
    }) || [];

  return (
    <main className="flex flex-col w-full gap-4">
      <HeaderSection
        title="Instituciones"
        subtitle="Listado de instituciones registrados en la plataforma"
        hrefAddButton="/admin/institution-manage/create"
        labelAddButton="Agregar Institución"
        hrefBack="/admin/institution-manage"
      />
      <LayoutAsideSection
        aside={<AsideIndications indications={indications} />}
      >
        <DataTable
          columns={institutionsColumns}
          data={data}
          hasSearch={true}
          searchPlaceholder="Buscar.."
          valueSearch={search}
          onValueSearch={(value) => setSearch(value)}
          isLoading={loading}
          hasPagination={true}
          paginationProps={{
            page,
            count: listInstitution.count,
            pageSize: sizePage,
            onPageChange: (page) => {
              setPage(page);
            },
            onPageSizeChange: (sizePage) => {
              setSizePage(sizePage);
            },
          }}
        />
      </LayoutAsideSection>
    </main>
  );
};
