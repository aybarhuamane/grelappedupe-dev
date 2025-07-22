"use client";
import { fetchExport } from "@/api/app/evaluacion/fetchDashboard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { usePeriod } from "@/modules/admin/hooks/usePeriod";
import { useFilterFromUrl } from "@/modules/core";
import { useCoursesContext, useLocationContext } from "@/modules/dashboard";
interface ITopFilterTable {
  valueSearch: string;
  handleSearch: (value: string) => void;
  statusValue?: string;
  handleStatus?: (value: string) => void;
  typeFilterSelect?: string;
  setTypeFilter?: (value: string) => void;
  periodValue?: string;
  handlePeriod?: (value: string) => void;
}

const options = [
  {
    value: "name",
    label: "Inst. educativa",
    placeholder: "Digite el nombre de la institución",
  },
  {
    value: "code_modular",
    label: "Código modular",
    placeholder: "Digite el código modular",
  },
  {
    value: "code_local",
    label: "Código local",
    placeholder: "Digite el código local",
  },
];

const statusOptions = [
  {
    value: "all",
    label: "Todos los estados",
  },
  {
    value: "evaluado",
    label: "Evaluado",
  },
  {
    value: "en proceso",
    label: "En proceso",
  },
  {
    value: "no evaluado",
    label: "No evaluado",
  },
];

const zoneOptions = [
  {
    value: "all",
    label: "Todos",
  },
  {
    value: "rural",
    label: "Rural",
  },
  {
    value: "urbano",
    label: "Urbano",
  },
];

export const TopFilterTable = (props: ITopFilterTable) => {
  const [loading, setLoading] = useState(false);
  const {
    valueSearch,
    handleSearch,
    statusValue,
    handleStatus,
    typeFilterSelect,
    setTypeFilter,
    periodValue,
    handlePeriod,
  } = props;

  const { getParams } = useFilterFromUrl();
  const { selectedValues } = useLocationContext();
  const { listCoursesApi } = useCoursesContext();
  const { getPeriods, listPeriods } = usePeriod();

  const typeFilter = options.find(
    (option) => option.value === typeFilterSelect
  );

  const onChangeHandler = (value: string) => {
    setTypeFilter && setTypeFilter(value);
  };

  const handleStatusChange = (value: string) => {
    handleStatus && handleStatus(value);
  };

  const handlePeriodChange = (value: string) => {
    handlePeriod && handlePeriod(value);
  };

  const courseSelected =
    listCoursesApi?.results[0].id && listCoursesApi?.results[0].id;

  const competencia_id = getParams("competencia_id", "");

  useEffect(() => {
    getPeriods({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const periods = listPeriods.results;

  const handleExport = async () => {
    setLoading(true);
    const response = await fetchExport({
      curso_id: Number(courseSelected),
      competencia_id: Number(competencia_id),
      drel: selectedValues.drel !== "all" ? selectedValues.drel : undefined,
      ugel:
        selectedValues.province !== "all" ? selectedValues.province : undefined,
      distrito:
        selectedValues.district !== "all" ? selectedValues.district : undefined,
      evaluacion: statusValue as
        | "evaluado"
        | "en proceso"
        | "no evaluado"
        | "all",
      period_id: Number(periodValue),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Resumen de datos.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  return (
    <section className="px-4 flex items-center justify-between">
      <main className=" flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Select
            value={typeFilter?.value}
            onValueChange={(value) => onChangeHandler(value)}
          >
            <SelectTrigger className="w-[180px] h-10 bg-gray-100">
              <SelectValue placeholder="Seleccionar filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo filtro</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <section className="flex items-center space-x-2 border rounded-md border-gray-200 p-1 px-3 max-w-sm">
            <div>
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder={`${typeFilter?.placeholder} ...`}
              value={valueSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-8 w-[240px] lg:w-[290px] focus:outline-none"
            />
          </section>
        </div>
        <div>
          <Select
            value={statusValue}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={periodValue}
            onValueChange={(value) => handlePeriodChange(value)}
          >
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Seleccione un periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Periodos</SelectLabel>
                <SelectItem value="all">Todos los periodos</SelectItem>
                {periods?.map((option) => (
                  <SelectItem key={option.id} value={option.id.toString()}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </main>
      <section>
        <Button onClick={handleExport} disabled={loading}>
          {loading ? (
            <LoaderCircle className="w-6 h-6 mr-2 animate-spin" />
          ) : (
            <Download className="w-6 h-6 mr-2" />
          )}
          Exportar
        </Button>
      </section>
    </section>
  );
};
