/* eslint-disable react-hooks/exhaustive-deps */
" use client";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/modules/core";
import { useDrelLocation, useLocationContext } from "@/modules/dashboard";
import { dashboardData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { TopFilterTable } from "./TopFilterTable";

interface IInstitutionEvaluated extends dashboardData.IInstitutionEvaluated {}

const columns: ColumnDef<IInstitutionEvaluated>[] = [
  {
    accessorKey: "modular_code",
    header: "Cod. Modular",
    cell: ({ row }) => row.original.modular_code,
  },
  {
    accessorKey: "level",
    header: "Nivel",
    cell: ({ row }) =>
      `${row.original.level.name} - ${row.original.level.modality?.name}`,
  },
  {
    accessorKey: "institution",
    header: "Institución Educativa",
    cell: ({ row }) => row.original.institution.name,
  },
  {
    accessorKey: "local_code",
    header: "Cod. Local",
    cell: ({ row }) => row.original.local_code || "No disponible",
  },
  {
    accessorKey: "institution.ubigeo",
    header: "Ubicación",
    cell: ({ row }) =>
      `${row.original.institution.ubigeo.region}, ${row.original.institution.ubigeo.province}, ${row.original.institution.ubigeo.district}`,
  },
  {
    accessorKey: "area.name",
    header: "Zona",
    cell: ({ row }) => {
      const name = row.original.area.name;
      return name === "Urbana" ? (
        <Badge className="text-blue-800" variant="secondary">
          {name}
        </Badge>
      ) : (
        <Badge className="text-green-800" variant="secondary">
          {name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "evaluacion",
    header: "Estado Evaluación",
    cell: ({ row }) => (
      <section className="flex items-center">
        <span
          className={`
          inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            row.original.evaluacion === "evaluado"
              ? "bg-green-100 text-green-800"
              : row.original.evaluacion === "en proceso"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.evaluacion === "evaluado"
            ? "Evaluado"
            : row.original.evaluacion === "en proceso"
            ? "En proceso"
            : "No evaluado"}
        </span>
      </section>
    ),
  },
];

export const TableSection = () => {
  const { listColegioApi, getColegio, loading } = useDrelLocation();
  const { selectedValues } = useLocationContext();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [typeFilter, setTypeFilter] = useState("name");
  const [status, setStatus] = useState<
    "evaluado" | "en proceso" | "no evaluado" | "all"
  >("all");
  const [period, setPeriod] = useState("");

  const region = selectedValues.drel;
  const province = selectedValues.province;
  const distrito = selectedValues.district;

  useEffect(() => {
    getColegio({
      page,
      page_size: pageSize,
      distrito: distrito === "all" ? undefined : distrito.replace(/'+'/, " "),
      ugel: province === "all" ? undefined : province.replace(/'+'/, " "),
      colegio_nombre: typeFilter === "name" ? query : undefined,
      codigo_local: typeFilter === "code_local" ? query : undefined,
      codigo_modular: typeFilter === "code_modular" ? query : undefined,
      evaluacion: status,
      period_id: period === "all" ? undefined : Number(period),
    });
  }, [page, pageSize, query, status, distrito, period, typeFilter, province]);

  const data: IInstitutionEvaluated[] =
    listColegioApi?.results?.map((teacher) => ({
      id: teacher.id,
      area: teacher.area,
      category: teacher.category,
      director: teacher.director || null,
      evaluacion: teacher.evaluacion,
      institution: {
        id: teacher.institution.id,
        address: teacher.institution.address,
        latitude: teacher.institution.latitude,
        longitude: teacher.institution.longitude,
        ubigeo: teacher.institution.ubigeo,
        name: teacher.institution.name,
      },
      level: teacher.level,
      local_code: teacher.local_code,
      modular_code: teacher.modular_code,
    })) || [];

  return (
    <>
      <header className="w-full p-4 bg-green-600 rounded-t-md text-white">
        <h1 className="text-lg font-medium">
          Resultados de instituciones educativas
          {region && <span> - {region}</span>}
          {province && province !== "all" && <span> - {province}</span>}
          {distrito && distrito !== "all" && <span> - {distrito}</span>}
        </h1>
      </header>
      <div className="bg-white py-5">
        <TopFilterTable
          valueSearch={query}
          handleSearch={(value) => setQuery(value)}
          statusValue={status}
          handleStatus={(value) =>
            setStatus(
              value as "evaluado" | "en proceso" | "no evaluado" | "all"
            )
          }
          typeFilterSelect={typeFilter}
          setTypeFilter={(value) => setTypeFilter(value)}
          periodValue={period}
          handlePeriod={(value) => setPeriod(value)}
        />
        <DataTable
          columns={columns}
          data={data}
          hasSearch={false}
          paginationProps={{
            page,
            onPageChange: (page) => setPage(page),
            count: listColegioApi?.count || 0,
            pageSize: pageSize,
            onPageSizeChange: (pageSize) => setPageSize(pageSize),
          }}
          isLoading={loading}
        />
      </div>
    </>
  );
};
