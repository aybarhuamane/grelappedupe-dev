/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DataTable } from "@/modules/core";
import { person } from "@/types";
import { useEffect, useState } from "react";

import { usePersonAction } from "@/modules/admin/hooks/usePersonAction";
import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns"

export const personColumns: ColumnDef<person.IPersonListActions>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'N°',
  // },
  {
    accessorKey: "name",
    header: "NOMBRE",
  },
  {
    accessorKey: "last_name",
    header: "APELLIDO",
  },
  {
    accessorKey: "num_document",
    header: "DOCUMENTO",
  },
  // {
  //   accessorKey: 'email',
  //   header: 'CORREO',
  // },
  // {
  //   accessorKey: 'phone',
  //   header: 'TELÉFONO',
  // },
  // {
  //   accessorKey: 'user',
  //   header: 'USUARIO',
  //   cell: ({ row }) => {
  //     return row.original.user === null ? 'No asignado' : `Usuario: ${row.original.user}`
  //   },
  // },
];

interface IProps<T> {
  onSelected?: (value: T) => void;
}

export const PersonsListAction = (props: IProps<person.IPersonList>) => {
  const { onSelected } = props;
  const { getPerson, listPerson, loading } = usePersonAction();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState(15);

  useEffect(() => {
    getPerson({
      page: search ? 1 : page,
      search,
    });
  }, [search, page]);

  const dataList: person.IPersonListActions[] =
    listPerson.results?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        last_name: item.last_name,
        num_document: item.num_document,
        email: item.email,
        phone: item.phone,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user: item.user,
      };
    }) || [];

  return (
    <main className="">
      <DataTable
        isLoading={loading}
        columns={personColumns}
        data={dataList}
        hasPagination={true}
        searchPlaceholder="Buscar por documento"
        paginationProps={{
          page: page,
          count: listPerson.count,
          onPageChange: (page) => setPage(page),
          onPageSizeChange: (pageSize) => setSizePage(pageSize),
          pageSize: sizePage,
        }}
        hasSearch={true}
        valueSearch={search}
        onValueSearch={(value) => {
          setSearch(value);
        }}
        onValueSelectedChange={(value) =>
          onSelected && onSelected(value as person.IPersonList)
        }
      />
    </main>
  );
};
