"use client"

import { capacity } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const capacitiesColumns: ColumnDef<capacity.ICapacityList>[] = [
    {
        accessorKey: "code",
        header: "Codigo",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: 'competence',
        header: "Competencia",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.competence.code}
                </div>
            )
        },
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
            const capacity = row.original
            const courseId = row.original.competence.course

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
                                    href={`capacities/${capacity.id}/edit?curso=${courseId}`}
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
