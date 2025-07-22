"use client";

import { Badge } from "@/components/ui/badge";
import { degree } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsGrado } from "./DataTableRowGrado";

export const gradoColumns: ColumnDef<degree.IDegreeTable>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'N°',
  // },
  {
    id: "grado_y_numero",
    header: "GRADOS",
    cell: ({ row }) => (
      <span>
        {row.original.degree_number} - {row.original.degree_text}
      </span>
    ),
  },
  {
    accessorKey: "section",
    header: "SECCIONES",
  },
  {
    accessorKey: "is_active",
    header: "ESTADOS",
    cell: ({ row }) => (
      <Badge
        className={`inline-flex items-center rounded-full text-xs font-medium ${
          row.original.is_active === "Activo"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-red-100 text-red-800 hover:bg-red-200"
        }`}
      >
        {row.original.is_active}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "ACCIONES",
    cell: ({ row }) => (
      <DataTableRowActionsGrado
        path={row.original.id.toString()}
        id={row.original.id.toString()}
      />
    ),
  },
];
