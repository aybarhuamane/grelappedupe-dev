import { Badge } from "@/components/ui/badge";
import { teacher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const TeacherManageColumns: ColumnDef<teacher.ITeacherList>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "person.name",
    header: "Nombre",
  },
  {
    accessorKey: "person.last_name",
    header: "Apellido",
  },
  {
    accessorKey: "person.num_document",
    header: "N° Documento",
  },
  {
    accessorKey: "is_active",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.is_active ? "default" : "destructive"}>
          {row.original.is_active ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Fecha de creación",
    cell: ({ row }) => {
      return <span>{format(row.original.created_at, "dd/MM/yyyy")}</span>;
    },
  },
];
