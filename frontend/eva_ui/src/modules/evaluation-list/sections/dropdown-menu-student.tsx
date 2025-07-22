'use client";';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilterFromUrl } from "@/modules/core";
import { Minus, Pen, UserPen } from "lucide-react";

interface IProps {
  row: {
    original: {
      id: number;
    };
  };
}

export const DropdownMenuStudent = (props: IProps) => {
  const { row } = props;

  const { updateFilter } = useFilterFromUrl();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            size="icon"
            aria-label="Acciones"
          >
            <UserPen size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1">
          <DropdownMenuLabel>
            <span className="text-sm font-semibold">Acciones</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              onClick={() => {
                updateFilter("edit", row.original.id.toString());
              }}
              variant="secondary"
              className="w-full flex items-center justify-start gap-2"
            >
              <Pen size={16} /> Editar
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              onClick={() => {
                updateFilter("remove", row.original.id.toString());
              }}
              variant="destructive"
              className="w-full flex items-center justify-start gap-2"
            >
              <Minus size={16} /> Remover
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
