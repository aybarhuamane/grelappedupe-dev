"use client";

import { person } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActionsPerson } from "./columnPerson";
import { Badge } from "@/components/ui/badge";

export const personColumns: ColumnDef<person.IPersonList>[] = [
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
  // {
  //   accessorKey: "role",
  //   header: "ROL",
  //   cell: ({ row }) => {
  //     const groupName = row.original.user?.groups
  //       ?.map((group) => group.name)
  //       .join(", ");

  //     console.log("groupName😍😍😍", groupName);
  //     return (
  //       <div className="flex gap-2">
  //         {groupName?.includes("ADMINISTRADOR") && (
  //           <Badge className="bg-red-500">{"ADMINISTRADOR"}</Badge>
  //         )}
  //         {groupName?.includes("DIRECTOR") && (
  //           <Badge className="bg-green-500">{"DIRECTOR"}</Badge>
  //         )}
  //         {groupName?.includes("DOCENTE") && (
  //           <Badge className="bg-blue-500">{"DOCENTE"}</Badge>
  //         )}
  //         {groupName?.includes("ESTUDIANTE") && (
  //           <Badge className="bg-yellow-500">{"ESTUDIANTE"}</Badge>
  //         )}
  //         {!groupName && <Badge className="bg-purple-500">{"SIN ROL"}</Badge>}
  //       </div>
  //     );
  //   },
  // },
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
