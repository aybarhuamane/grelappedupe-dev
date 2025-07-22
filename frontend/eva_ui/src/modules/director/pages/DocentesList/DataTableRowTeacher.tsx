"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { deleteTeacherAssigmentSchool } from "@/api/app/educativa/fetchTeachers";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface DataTableRowActionsProps {
  url: string;
  id: string;
}

export function DataTableRowActionsTeacher({
  url,
  id,
}: DataTableRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await deleteTeacherAssigmentSchool(Number(id));
      if (res.ok) {
        toast.success("Docente eliminado correctamente");
        window.location.reload();
      } else {
        toast.error("Error al eliminar el docente");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el docente");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link
              href={url}
              className="flex items-center gap-2 w-full justify-start"
            >
              <PencilIcon className="h-4 w-4" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="destructive"
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 w-full justify-start"
              disabled={loading}
            >
              <Trash2Icon className="h-4 w-4" />
              Eliminar
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogConfirmacion
        isOpenConfirm={open}
        onCloseConfirm={() => setOpen(false)}
        onSubmitConfirm={() => handleDelete(id)}
        tittleConfirm="Eliminar docente de la institución"
        description="¿Estás seguro de querer eliminar este docente de la institución?"
      />
    </>
  );
}
