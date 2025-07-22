/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataTable, HeaderSection, LayoutAsideSection } from "@/modules/core";
import { person } from "@/types";
import { Suspense, useEffect, useState } from "react";
import { AsidePeriodFilter } from "../../periodManange";
import { usePersonAction } from "@/modules/admin/hooks/usePersonAction";
import { personColumnsActions } from "./PersonColumnsAction";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const options = [
  { value: "id", label: "Id" },
  { value: "name", label: "Nombre" },
  { value: "last_name", label: "Apellido" },
  { value: "num_document", label: "Documento" },
  { value: "email", label: "Correo" },
  { value: "phone", label: "Teléfono" },
];

export const PersonTable = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<string>("");
  const { listPerson, getPerson, loading } = usePersonAction();
  const [sizePage, setSizePage] = useState(15);

  useEffect(() => {
    getPerson({
      page,
      page_size: sizePage,
      search: search,
      ordering,
    });
  }, [page, search, ordering, sizePage]);

  const data: person.IPersonListActions[] =
    listPerson.results.map((item) => {
      return {
        id: Number(item?.id),
        name: item?.name,
        last_name: item?.last_name,
        num_document: item?.num_document,
        email: item?.email,
        phone: item?.phone,
        user: item?.user,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      };
    }) || [];

  return (
    <main className="flex flex-col w-full gap-4">
      <Suspense fallback={<div>Cargando ...</div>}>
        <HeaderSection
          title="Personas"
          subtitle="Listado de personas registradas en el sistema"
          hrefAddButton="/admin/person-manange/create"
          labelAddButton="Agregar Persona"
          renderRightSection={
            <section>
              <Link href={`/admin/person-manange/import`} passHref>
                <Button className="border border-gable-green-800 bg-white text-gable-green700 hover:bg-gable-green-500 hover:text-white">
                  Importar Personas
                </Button>
              </Link>
            </section>
          }
        />
        <LayoutAsideSection
          aside={
            <AsidePeriodFilter setOrdering={setOrdering} options={options} />
          }
        >
          <DataTable
            columns={personColumnsActions}
            data={data}
            paginationProps={{
              page,
              onPageChange: (page) => {
                setPage(page);
              },
              count: listPerson.count,
              pageSize: sizePage,
              onPageSizeChange: (sizePage) => {
                setSizePage(sizePage);
              },
            }}
            hasSearch={true}
            valueSearch={search}
            onValueSearch={(value) => setSearch(value)}
            isLoading={loading}
            searchPlaceholder="Buscar..."
          />
        </LayoutAsideSection>
      </Suspense>
    </main>
  );
};
