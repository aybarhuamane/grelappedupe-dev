"use client";

import { DataTableSections } from "@/modules/core";
import { courseAssignment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarCheck, CalendarOff, CheckCheck, X } from "lucide-react";
import { DataTableRowActionsEvaluationHistory } from "./DataTableRowEvaluationHistory";
const { DataTableRowActions } = DataTableSections;

export const teacherColumns: ColumnDef<courseAssignment.ITeacherAssignmentTable>[] =
  [
    // {
    //   accessorKey: 'id',
    //   header: 'ID',
    // },
    {
      accessorKey: "date",
      header: "Fecha de evaluación",
    },
    {
      accessorKey: "grade",
      header: "Grado",
    },
    {
      accessorKey: "section",
      header: "Seccion",
    },
    {
      accessorKey: "number",
      header: "Número",
    },
    {
      accessorKey: "course",
      header: "Curso",
    },
    {
      accessorKey: "institution",
      header: "Institución",
    },
    {
      accessorKey: "modular_code",
      header: "Cod. modular",
    },
    {
      accessorKey: "local_code",
      header: "Cod. local",
    },

    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <section>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
            ${
              row.original.is_active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
            `}
          >
            {row.original.is_active ? (
              <CalendarCheck className="mr-1 h-4 w-4" />
            ) : (
              <CalendarOff className="mr-1 h-4 w-4" />
            )}
            {row.original.is_active ? "Activo" : "Inactivo"}
          </span>
        </section>
      ),
    },
    {
      accessorKey: "validation",
      header: "Validación",
      cell: ({ row }) => (
        <section>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            ${
              row.original.is_validated
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }
            `}
          >
            {row.original.is_validated ? (
              <CheckCheck className="mr-1 h-4 w-4" />
            ) : (
              <X className="mr-1 h-4 w-4" />
            )}
            {row.original.is_validated ? "Validado" : "No validado"}
          </span>
        </section>
      ),
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <DataTableRowActionsEvaluationHistory
          editHref={`/teacher/evaluaciones/${row.original.id}`}
          detailsHref={`/teacher/evaluaciones-historial/${row.original.id}/resumen`}
        />
      ),
    },
  ];
