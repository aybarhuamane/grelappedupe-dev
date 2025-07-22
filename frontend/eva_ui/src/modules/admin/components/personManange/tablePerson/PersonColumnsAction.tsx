"use client";

import { person } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsPerson } from "./columnPerson";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

export const personColumnsActions: ColumnDef<person.IPersonListActions>[] = [
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
  {
    accessorKey: "email",
    header: "CORREO",
  },
  {
    accessorKey: "phone",
    header: "TELÉFONO",
  },
  {
    accessorKey: "role",
    header: "ROL",
    cell: ({ row }) => {
      const groupName = row.original.user?.groups
        ?.map((group) => group.name)
        .join(", ");

      return (
        <div className="flex gap-2">
          {groupName?.includes("ADMINISTRADOR") && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className="border  border-blue-400">Ad</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-blue-400 text-primary-foreground">
                    <p>Administrador</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {groupName?.includes("DIRECTOR") && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className="border  border-green-400">Di</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-green-400 text-primary-foreground">
                    <p>Director</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {groupName?.includes("DOCENTE") && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className="border  border-yellow-400">Do</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-yellow-400 text-primary-foreground">
                    <p>Docente</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {groupName?.includes("ESTUDIANTE") && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className="border  border-purple-400">Es</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-purple-400 text-primary-foreground">
                    <p>Estudiante</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>  
          )}
          {!groupName && 
            <span>---</span>
          }
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'user',
  //   header: 'USUARIO',
  //   cell: ({ row }) => {
  //     return row.original.user === null ? 'No asignado' : `Usuario: ${row.original.user}`
  //   },
  // },
  // {
  //   accessorKey: 'created_at',
  //   header: 'FECH.CREACIÓN',
  //   cell: ({ row }) => {
  //     return format(row.original.created_at, 'dd/MM/yyyy')
  //   },
  // },
  {
    id: "actions",
    header: "ACCIONES",
    cell: ({ row }) => (
      <DataTableRowActionsPerson path={row.original.id.toString()} />
    ),
  },
];
