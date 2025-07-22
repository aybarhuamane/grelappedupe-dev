"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { competences } from "@/types"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const competencesColumns: ColumnDef<competences.ICompetences>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "code",
        header: "Codigo",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "is_active",
        header: () => (
            <div className="text-right">
                Activo
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <Badge variant={row.original.is_active ? 'default' : 'destructive'}>
                        {row.original.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                </div>
            )
        }
    },
    {
        id: "actions",
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const competence = row.original

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <DotsHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                            >
                                <Link
                                    href={`competences/${competence.id}/edit`}
                                    className="w-full" >
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
