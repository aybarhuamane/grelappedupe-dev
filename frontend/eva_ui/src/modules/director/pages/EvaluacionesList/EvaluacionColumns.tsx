"use client";
import { Badge } from "@/components/ui/badge";
import { courseAssignment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  CalendarCheck,
  CalendarOff,
  CheckCheck,
  CircleDot,
  CircleDotDashed,
  X,
} from "lucide-react";

export const evaluationColumns: ColumnDef<courseAssignment.ICourseAssignmentTable>[] =
  [
    // {
    //   accessorKey: 'id',
    //   header: 'ID',
    //   // size: 20,
    // },
    {
      accessorKey: "degree",
      header: "Grado",
      // size: 40,
    },
    {
      accessorKey: "course",
      header: "Curso",
      // size: 40,
    },
    {
      accessorKey: "teacher",
      header: "Docente",
    },
    {
      accessorKey: "date",
      header: "Fecha",
      // size: 80,
    },
    {
      accessorKey: "is_active",
      header: "Activo",
      // size: 20,
      cell: ({ row }) => (
        <section>
          <Badge
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
            ${
              row.original.is_active
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
            `}
          >
            {row.original.is_active ? (
              <CalendarCheck className="mr-1 h-4 w-4" />
            ) : (
              <CalendarOff className="mr-1 h-4 w-4" />
            )}
            {row.original.is_active ? "Activo" : "Inactivo"}
          </Badge>
        </section>
      ),
    },
    {
      id: "pending",
      header: "Evaluado",
      // size: 20,
      cell: ({ row }) => (
        <section>
          <Badge
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            ${
              !row.original.is_sent
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            }
            `}
          >
            {row.original.is_sent ? (
              <CircleDot className="mr-1 h-4 w-4" />
            ) : (
              <CircleDotDashed className="mr-1 h-4 w-4 animate-spin" />
            )}
            {row.original.is_sent ? "Recibido" : "Pendiente"}
          </Badge>
        </section>
      ),
    },
    {
      accessorKey: "is_validated",
      header: "Validado",
      // size: 20,
      cell: ({ row }) => (
        <section>
          <Badge
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
            ${
              row.original.is_validated
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
            `}
          >
            {row.original.is_validated ? (
              <CheckCheck className="mr-1 h-4 w-4" />
            ) : (
              <X className="mr-1 h-4 w-4" />
            )}
            {row.original.is_validated ? "Validado" : "No validado"}
          </Badge>
        </section>
      ),
    },

    // {
    //   id: 'actions',
    //   header: 'Accion',
    //   size: 20,
    //   cell: ({ row }) => (
    //     <section className="flex gap-2">
    //       <Button size="sm">
    //         {row.original.is_validated ? 'Ver evaluación' : 'Validar '}
    //       </Button>
    //     </section>
    //   ),
    // },
  ];
