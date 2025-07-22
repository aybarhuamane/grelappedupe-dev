"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeaderCustom } from "@/modules/director/pages/DirectorHome/sections/TableHeader";
import { DataTablePagination } from "../sections/data-table-pagination";
import { IPriorityOption, IStatusOption } from "../sections/data-table-toolbar";

interface IDataTablePaginationProps {
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasPagination?: boolean;
  hasToolbar?: boolean;
  statusOptions?: IStatusOption[] | undefined;
  priorityOptions?: IPriorityOption[] | undefined;
  hasColumnFilters?: boolean;
  hasSearch?: boolean;
  paginationProps?: IDataTablePaginationProps;
  valueSearch?: string;
  onValueSearch?: (value: string) => void;
  onValueSelectedChange?: (value: TData | undefined) => void;
  isLoading?: boolean;
  searchPlaceholder?: string;
  selectedRowId?: number | string; // Nuevo prop para el ID de la fila seleccionada
}

export function DataTableStudent<TData, TValue>({
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
  isLoading = false,
  searchPlaceholder,
  selectedRowId, // Recibimos el ID de la fila seleccionada
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState<TData | undefined>(
    undefined
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
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
  });

  // Efecto para sincronizar la fila seleccionada con el ID proporcionado
  React.useEffect(() => {
    if (selectedRowId !== undefined) {
      const row = data.find((row: any) => row.id === selectedRowId);
      setSelectedRow(row);
    }
  }, [selectedRowId, data]);

  // Función para manejar la selección de una fila al hacer clic
  const handleRowClick = (row: TData) => {
    setSelectedRow(row);
    if (onValueSelectedChange) {
      onValueSelectedChange(row);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white">
      {hasToolbar && (
        <TableHeaderCustom
          hasSearch={hasSearch}
          onValueSearch={onValueSearch}
          valueSearch={valueSearch}
          placeholder={searchPlaceholder}
        />
      )}
      <ScrollArea className="h-[calc(100vh-13rem)]">
        <Table className="w-full border-collapse border">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 border-l-bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: columns.length }, (_, i) => (
                      <TableCell key={i}>
                        <div className="animate-pulse w-full rounded-md bg-gray-100 h-5" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const isSelected =
                  (row.original as any).id === Number(selectedRowId);
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected && "selected"}
                    className={`hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer ${
                      isSelected
                        ? "border-l-8 border-l-primary border-b-2 text-foreground"
                        : ""
                      // isSelected ? "!bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        {...(cell.column.id !== "edit" && {
                          onClick: () => handleRowClick(row.original),
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {hasPagination && paginationProps && (
        <DataTablePagination {...paginationProps} />
      )}
    </div>
  );
}
