"use client";
import { teacher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTableRowActionsTeacher } from "@/modules/director/pages/DocentesList/DataTableRowTeacher";

export const teacherColumns: ColumnDef<teacher.ITeacherAssigmentSchoolList>[] =
  [
    {
      id: "index",
      header: "N°",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return pageIndex * pageSize + row.index + 1;
      },
    },
    {
      accessorKey: "name",
      header: "NOMBRE",
      cell: ({ row }) => `${row.original.teaching.person.name} `,
    },
    {
      accessorKey: "last_name",
      header: "APELLIDO",
      cell: ({ row }) => `${row.original.teaching.person.last_name} `,
    },
    {
      accessorKey: "num_document",
      header: "DOCUMENTO",
      cell: ({ row }) => `${row.original.teaching.person.num_document} `,
    },
    {
      accessorKey: "email",
      header: "CORREO",
      cell: ({ row }) => `${row.original.teaching.person.email} `,
    },
    {
      accessorKey: "phone",
      header: "TELÉFONO",
      cell: ({ row }) => `${row.original.teaching.person.phone} `,
    },
    {
      accessorKey: "status",
      header: "ESTADOS",
      cell: ({ row }) => (
        <section>
          <Badge
            className={`inline-flex items-center rounded-full text-xs font-medium ${
              row.original.is_active
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
          >
            {row.original.is_active ? "Activo" : "Inactivo"}
          </Badge>
        </section>
      ),
    },
    {
      accessorKey: "actions",
      header: "ACCIONES",
      cell: ({ row }) => (
        <>
          <DataTableRowActionsTeacher
            url={`/admin/institution-manage/${row.original.detail_institution.id}/teachers/${row.original.teaching.person.id}`}
            id={row.original.id.toString()}
          />
        </>
      ),
    },
  ];
