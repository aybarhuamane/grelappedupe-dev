/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { fetchCompetenceListByCourseId } from "@/api/app/educativa/fetchCompetencesByCourse";
import { useDashboardCollege } from "@/modules/director";
import { competences, course, detailInstitution, response } from "@/types";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx"; // Importar la biblioteca Excel

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInstitutionStore } from "@/store/use-institution-store";
import { Download } from "lucide-react";
import Image from "next/image";
import { NewRenderDirectorChart } from "./NewDirectorBarcharRender";

interface ITableProps {
  courses: course.ICourse[];
  institutionDetails?: detailInstitution.IDetailInstitutionList[] | null;
}

export const TableSectionResume = (props: ITableProps) => {
  const { courses, institutionDetails } = props;
  const {
    getDirectorDashboardCollege,
    dataDashboardDirector,
    loadingDirector,
    timeoutError,
  } = useDashboardCollege();
  const { selectedInstitution } = useInstitutionStore();

  const [selectedCourse, setSelectedCourse] = useState<number>(courses[0]?.id);
  const [competenceSelected, setCompetenceSelected] = useState<number>(0);
  const [competenceList, setCompetenceList] = useState<
    response.IResApi<competences.ICompetencesList>
  >({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDirectorDashboardCollege({
      colegio_id: Number(selectedInstitution),
      curso_id: selectedCourse,
      competencia_id: competenceSelected,
    });
  }, [selectedCourse, competenceSelected]);

  useEffect(() => {
    if (selectedCourse) {
      getCompetences();
    }
  }, [selectedCourse, setCompetenceList]);

  const getCompetences = async () => {
    try {
      const res = await fetchCompetenceListByCourseId({
        course__id: selectedCourse,
      });
      if (res.ok) {
        const data: response.IResApi<competences.ICompetencesList> =
          await res.json();
        setCompetenceList(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Versión alternativa para exportar en el formato específico que mencionaste
  const exportFormattedExcel = () => {
    if (!dataDashboardDirector || dataDashboardDirector.length === 0) return;

    const courseData = dataDashboardDirector[0]?.cursos[0];
    if (!courseData) return;

    // Obtener datos de la institución
    const institutionData = institutionDetails?.find(
      (inst) => inst.id === Number(selectedInstitution)
    );

    // Preparar los datos para Excel
    const excelData = [
      // Datos de la institución
      ["INFORMACIÓN DE LA INSTITUCIÓN"],
      ["Nombre:", institutionData?.institution?.name || ""],
      ["Código Modular:", institutionData?.modular_code || ""],
      [
        "Director:",
        `${institutionData?.director?.person?.name || ""} ${
          institutionData?.director?.person?.last_name || ""
        }`,
      ],
      ["Código Ubigeo:", institutionData?.institution?.ubigeo?.code || ""],
      [
        "Nivel:",
        `${institutionData?.level?.name || ""} - ${
          institutionData?.level?.modality?.name || ""
        }`,
      ],
      ["Área:", institutionData?.area?.name || ""],
      [""], // Línea en blanco para separar
      // Datos del curso
      [
        `${institutionData?.level?.name.toUpperCase()} (${courseData.name.toUpperCase()})`,
        "",
        "PROMEDIO",
      ],
      [""],
      ["COMPETENCIAS", "PI", "I", "P", "S"],
    ];

    // Agregar datos de competencias
    courseData.data.forEach((competence) => {
      const row = [
        competence.competencia,
        String(competence.logros[0]?.valor || "#¡DIV/0!"),
        String(competence.logros[1]?.valor || "#¡DIV/0!"),
        String(competence.logros[2]?.valor || "#¡DIV/0!"),
        String(competence.logros[3]?.valor || "#¡DIV/0!"),
      ];
      excelData.push(row);
    });

    // Crear libro de Excel
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resumen");

    // Descargar archivo
    XLSX.writeFile(wb, "resumen_competencias.xlsx");
  };

  return (
    <section className="bg-white rounded-md shadow">
      <section className="p-4 flex gap-2 justify-between items-center">
        <div className="flex gap-2">
          <div className="">
            <Select
              value={selectedCourse.toString()}
              onValueChange={(value) => {
                setSelectedCourse(Number(value));
                setCompetenceSelected(0);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={competenceSelected.toString()}
              onValueChange={(value) => setCompetenceSelected(Number(value))}
            >
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Seleccionar competencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Todas las competencias</SelectItem>
                  {competenceList.results.map((competence) => (
                    <SelectItem
                      key={competence.id}
                      value={competence.id.toString()}
                    >
                      {competence.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={exportFormattedExcel}
          disabled={
            !dataDashboardDirector || dataDashboardDirector.length === 0
          }
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exportar a Excel
        </Button>
      </section>
      {timeoutError ? (
        <section className="flex flex-col items-center justify-center">
          <Image
            src="/svg/timeout.svg"
            alt="Timeout"
            width={300}
            height={200}
          />
          <h1 className="text-sm text-center">
            La petición está tardando más de lo esperado. Por favor, intente
            nuevamente más tarde.
          </h1>
        </section>
      ) : dataDashboardDirector && dataDashboardDirector.length > 0 ? (
        <div ref={chartRef}>
          <NewRenderDirectorChart
            dataChart={dataDashboardDirector}
            loadingFilter={loadingDirector}
            selectedCompetenceId={competenceSelected}
          />
        </div>
      ) : (
        <section className="flex flex-col items-center justify-center">
          <Image src="/svg/no-data.svg" alt="IE" width={300} height={200} />
          <h1 className="text-sm text-center">
            Aún no se han registrado evaluaciones
          </h1>
        </section>
      )}
    </section>
  );
};
