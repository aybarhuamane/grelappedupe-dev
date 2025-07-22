/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useDirector } from "@/modules/admin/hooks/useDirector";
import { DataTable } from "@/modules/core";
import { director } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export const personColumns: ColumnDef<director.IDirectorTable>[] = [
  {
    accessorKey: "id",
    header: "N°",
  },
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
];

interface IProps<T> {
  onSelected?: (value: T) => void;
}

export const DirectorsListAction = (props: IProps<director.IDirectorList>) => {
  const { onSelected } = props;
  const { getDirectorAction, listDirector, loading } = useDirector();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    getDirectorAction({
      page,
      person__name__icontains: search,
    });
  }, [search, page]);

  const dataList: director.IDirectorTable[] =
    listDirector.results?.map((item) => {
      return {
        id: Number(item.id),
        person: item.person,
        created_at: item.created_at,
        updated_at: item.updated_at,
        is_active: item.is_active ? "Activo" : "Inactivo",
        name: item.person.name,
        last_name: item.person.last_name,
        num_document: item.person.num_document,
        email: item.person.email,
        phone: item.person.phone, // Added phone property
        status: item.is_active ? "Activo" : "Inactivo",
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
          page: page - 1,
          count: listDirector.count,
          onPageChange: (page) => setPage(page + 1),
          onPageSizeChange: () => {},
          pageSize: 15,
        }}
        hasSearch={true}
        valueSearch={search}
        onValueSearch={(value) => setSearch(value)}
        onValueSelectedChange={(value) =>
          onSelected && onSelected(value as unknown as director.IDirectorList)
        }
      />
    </main>
  );
};
