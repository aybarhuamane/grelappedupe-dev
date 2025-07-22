"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import Link from "next/link";

interface MenuOption {
  label: string;
  option?: string;
  url?: string;
  icon?: React.ReactNode;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  menuOptions: MenuOption[];
}

export function DataTableRowActions<TData>({
  row,
  menuOptions,
}: DataTableRowActionsProps<TData>) {
  return (
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
        {menuOptions.map((option, index) => (
          <DropdownMenuItem key={index}>
            {option.url ? (
              <Link
                href={option.url}
                className="w-full flex items-center gap-2"
              >
                {option.icon}
                {option.label}
              </Link>
            ) : (
              <span className="w-full flex items-center gap-2">
                {option.icon}
                {option.label}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
