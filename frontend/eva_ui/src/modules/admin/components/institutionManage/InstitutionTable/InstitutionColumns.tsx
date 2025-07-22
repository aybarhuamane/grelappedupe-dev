"use client";

import { Badge } from "@/components/ui/badge";
import { DataTableSections } from "@/modules/core";
import { institution } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
const { DataTableRowActions } = DataTableSections;

export const institutionsColumns: ColumnDef<institution.IDetailsInstitutionTableAction>[] =
  [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "institution",
      header: "Nombres",
      cell: ({ row }) => {
        const institution = row.original.institution;

        return <>{institution.name}</>;
      },
    },
    {
      accessorKey: "modular_code",
      header: "Código Modular",
    },
    {
      accessorKey: "local_code",
      header: "Código Local",
    },
    {
      accessorKey: "director",
      header: "Director",
    },
    {
      accessorKey: "area",
      header: "Área",
      cell: ({ row }) => {
        const area = row.original.area;

        return (
          <>
            {area ? (
              <Badge
                className={
                  area === "Rural"
                    ? "bg-red-800 hover:bg-red-700"
                    : "bg-orange-500 text-white hover:bg-orange-400"
                }
              >
                {area}
              </Badge>
            ) : (
              <Badge className="bg-primary-foreground text-muted-foreground hover:bg-slate-300">
                {" "}
                ---{" "}
              </Badge>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "level",
      header: "Nivel",
      cell: ({ row }) => {
        const level = row.original.level;

        return (
          <>
            {level ? (
              <Badge
                className={
                  level === "Primaria"
                    ? "bg-primary"
                    : "bg-blue-800 text-white hover:bg-blue-600"
                }
              >
                {level}
              </Badge>
            ) : (
              <Badge className="bg-primary-foreground text-muted-foreground hover:bg-slate-300">
                {" "}
                ---{" "}
              </Badge>
            )}
          </>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const detail_institution = row.original.detail_institution;

        return (
          <DataTableRowActions
            row={row}
            menuOptions={[
              {
                label: "Editar",
                url: `/admin/institution-manage/${row.original.id}`,
                icon: <Pencil className="w-4 h-4" />,
              },
              {
                label: "Detalles",
                url: `/admin/institution-manage/${row.original.id}/details?detail_institution=${detail_institution}`,
                icon: <Eye className="w-4 h-4" />,
              },
            ]}
          />
        );
      },
    },
  ];
