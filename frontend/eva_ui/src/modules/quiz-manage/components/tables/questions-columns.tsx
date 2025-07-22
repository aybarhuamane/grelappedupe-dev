"use client";

import { questions } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const questionsColumns = (
  competenceId: number,
  degree: string,
  level: string
): ColumnDef<questions.IQuestionListAction>[] => [
  {
    accessorKey: "code",
    header: "Codigo",
  },
  {
    accessorKey: "question",
    header: "Pregunta",
  },
  {
    accessorKey: "degree_number",
    header: "Grado",
    cell: ({ row }) => {
      const grade = row.original.degree_number;
      return <div>{grade}</div>;
    },
  },
  {
    accessorKey: "level",
    header: "Nivel",
    cell: ({ row }) => {
      const level = row.original.level.name;
      return (
        <>
          {level ? (
            <Badge variant={level === "Primaria" ? "outline" : "secondary"}>
              {level}
            </Badge>
          ) : (
            <Badge variant={"outline"}> --- </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: "Capacidad",
    cell: ({ row }) => {
      return <div>{row.original.capacity.code}</div>;
    },
  },
  {
    accessorKey: "is_active",
    header: () => <div className="text-right">Activo</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Badge variant={row.original.is_active ? "default" : "destructive"}>
            {row.original.is_active ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`questions/${id}/edit?competence=${competenceId}&degree=${degree}&level=${level}`}
                >
                  Editar
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
