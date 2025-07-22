/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataTable } from "@/modules/core";
import { useTeacher } from "@/modules/director";
import { teacher } from "@/types";
import { useEffect, useState } from "react";
import { TeacherManageColumns } from "./teacher-manage-columns";

export const TeacherManageTable = () => {
  const { loading, listTeacher, getTeacherAction } = useTeacher();
  const [page, setPage] = useState(1);
  const [sizePage, setSizePage] = useState(15);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTeacherAction({
      page,
      page_size: sizePage,
      search: search,
    });
  }, [search, page]);

  const dataList: teacher.ITeacherList[] =
    listTeacher.results?.map((item) => {
      return {
        id: item.id,
        status: item.is_active ? "Activo" : "Inactivo",
        person: {
          id: item.person.id,
          name: item.person.name,
          last_name: item.person.last_name,
          num_document: item.person.num_document,
          email: item.person.email,
          phone: item.person.phone,
          created_at: item.person.created_at,
          updated_at: item.person.updated_at,
        },
        is_active: item.is_active,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    }) || [];

  return (
    <main className="container mx-auto">
      <DataTable
        columns={TeacherManageColumns}
        data={dataList}
        paginationProps={{
          page: page,
          count: listTeacher.count,
          pageSize: sizePage,
          onPageChange: (page) => setPage(page),
          onPageSizeChange: (size) => setSizePage(size),
        }}
        isLoading={loading}
        hasSearch
        valueSearch={search}
        onValueSearch={(value) => setSearch(value)}
      />
    </main>
  );
};
