"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChartIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsProps {
  editHref?: string;
  detailsHref?: string;
  resumeLabel?: string;
  editLabel?: string;
}

export function DataTableRowActionsEvaluationHistory({
  editHref,
  detailsHref,
  resumeLabel = "Resumen",
  editLabel = "Evaluar",
}: DataTableRowActionsProps) {
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
          {editHref && (
            <DropdownMenuItem asChild>
              <Link
                href={editHref}
                className="flex items-center gap-2 w-full justify-start"
              >
                <PencilIcon className="h-4 w-4" />
                {editLabel}
              </Link>
            </DropdownMenuItem>
          )}
          {detailsHref && (
            <DropdownMenuItem asChild>
              <Link
                href={detailsHref}
                className="flex items-center gap-2 w-full justify-start"
              >
                <BarChartIcon className="h-4 w-4" />
                {resumeLabel}
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
