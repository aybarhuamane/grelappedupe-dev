"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/modules/core/components/DataTable/sections"
import React from "react"

export interface IStatusOption {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export type IPriorityOption = IStatusOption

interface IDataTablePaginationProps {
    page: number
    pageSize: number
    count: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    hasPagination?: boolean
    hasToolbar?: boolean
    statusOptions?: IStatusOption[] | undefined
    priorityOptions?: IPriorityOption[] | undefined
    hasColumnFilters?: boolean
    hasSearch?: boolean
    paginationProps?: IDataTablePaginationProps
    valueSearch?: string
    onValueSearch?: (value: string) => void
    onValueSelectedChange?: (value: TData | undefined) => void
    isLoading?: boolean
    searchPlaceholder?: string
}

export function CustomDataTable<TData, TValue>({
    columns,
    data,
    hasPagination = true,
    hasToolbar = true,
    statusOptions = [],
    hasColumnFilters = false,
    hasSearch = true,
    paginationProps,
    onValueSelectedChange,
    onValueSearch,
    valueSearch,
    isLoading = false, // Prop para controlar el estado de carga
    searchPlaceholder,
}: DataTableProps<TData, TValue>) {
    // const table = useReactTable({
    //     data,
    //     columns,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    // })

    const [rowSelection, setRowSelection] = React.useState({})
    const [selectedRow, setSelectedRow] = React.useState<TData | undefined>(
        undefined
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const paginatedData = React.useMemo(() => {
        if (paginationProps) {
            return data
        }
        return data
    }, [data, paginationProps])

    const table = useReactTable({
        data: paginatedData, // Usa los datos paginados manualmente
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end items-center gap-4">
                {hasPagination && paginationProps && paginationProps.page !== undefined && paginationProps.pageSize !== undefined && paginationProps.count !== undefined && (
                    <DataTablePagination {...paginationProps} />
                )}
            </div>
        </>
    )
}
