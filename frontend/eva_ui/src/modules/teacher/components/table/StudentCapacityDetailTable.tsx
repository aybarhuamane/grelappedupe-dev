import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, HelpCircle } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { ShowHideButton } from "./ShowHideButton";

interface CapacityResult {
  capacityId: number;
  capacityName: string;
  capacityCode: string;
  adecuadas: number;
  inadecuadas: number;
  omitidas: number;
  total: number;
  porcentaje_adecuadas: number;
}

export interface StudentCapacityDetail {
  id: number;
  full_name: string;
  capacities: CapacityResult[];
  total_adecuadas: number;
  total_inadecuadas: number;
  total_omitidas: number;
  total_porcentaje_adecuadas: number;
}

interface Props {
  students: StudentCapacityDetail[];
  hideCapacities: boolean;
  hideTotal: boolean;
}

export const StudentCapacityDetailTable = ({
  students,
  hideCapacities,
  hideTotal,
}: Props) => {
  const [showCapacities, setShowCapacities] = useState(!hideCapacities);
  const [showTotal, setShowTotal] = useState(!hideTotal);

  // Anchos fijos para sticky
  const widthN = 48;
  const widthName = 200;
  const widthStat = 64;

  const getNivel = (porcentaje: number) => {
    if (porcentaje >= 85) return "S";
    if (porcentaje >= 70) return "P";
    if (porcentaje >= 50) return "I";
    return "PI";
  };

  const getNivelBg = (nivel: string) => {
    switch (nivel) {
      case "PI":
        return `bg-[#FF0000] text-white`;
      case "I":
        return `bg-[#FFA500] text-white`;
      case "P":
        return `bg-[#17C964] text-white`;
      case "S":
        return `bg-[#0E8AAA] text-white`;
      default:
        return "";
    }
  };

  const exportToExcel = () => {
    // Preparar los datos para Excel
    const excelData = students.map((student, index) => {
      const row: any = {
        "N°": index + 1,
        "APELLIDOS Y NOMBRES": student.full_name,
      };

      // Agregar las capacidades
      if (showCapacities) {
        student.capacities.forEach((capacity) => {
          row[`${capacity.capacityCode} - Adecuadas`] = capacity.adecuadas;
          row[`${capacity.capacityCode} - Inadecuadas`] = capacity.inadecuadas;
          row[`${capacity.capacityCode} - Omitidas`] = capacity.omitidas;
          row[
            `${capacity.capacityCode} - %`
          ] = `${capacity.porcentaje_adecuadas}%`;
        });
      }

      // Agregar totales
      if (showTotal) {
        row["Total Adecuadas"] = student.total_adecuadas;
        row["Total Inadecuadas"] = student.total_inadecuadas;
        row["Total Omitidas"] = student.total_omitidas;
      }

      // Agregar nivel total
      row["Nivel Total"] = getNivel(student.total_porcentaje_adecuadas);

      return row;
    });

    // Crear hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Crear libro
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Evaluación por Capacidad");

    // Generar archivo y descargar
    XLSX.writeFile(wb, "evaluacion_capacidades.xlsx");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">
            Tabla de Evaluación por Capacidad
            <span className="text-sm text-gray-500 font-normal ml-2">
              ({students.length} estudiantes)
            </span>
          </h2>
          <p className="text-sm text-gray-500">
            Esta tabla muestra el desempeño de cada estudiante en cada capacidad
            evaluada.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={exportToExcel}
          >
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>

          <ShowHideButton
            option={showCapacities}
            text={
              showCapacities ? "Ocultar capacidades" : "Mostrar capacidades"
            }
            onClick={() => setShowCapacities(!showCapacities)}
          />
          <ShowHideButton
            option={showTotal}
            text={showTotal ? "Ocultar totales" : "Mostrar totales"}
            onClick={() => setShowTotal(!showTotal)}
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Ver leyenda
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Leyenda de la tabla de capacidades</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[500px]">
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Símbolos de respuestas:
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <span className="text-green-700 font-bold">
                          Adecuadas (✔):
                        </span>{" "}
                        Respuestas correctas.
                      </li>
                      <li>
                        <span className="text-red-700 font-bold">
                          Inadecuadas (✗):
                        </span>{" "}
                        Respuestas incorrectas.
                      </li>
                      <li>
                        <span className="text-gray-500 font-bold">
                          Omitidas (—):
                        </span>{" "}
                        Preguntas no respondidas.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Niveles de rendimiento:
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <span className="bg-[#0E8AAA] text-white px-1">S</span>:
                        Sobresaliente
                      </li>
                      <li>
                        <span className="bg-[#17C964] text-white px-1">P</span>:
                        Progreso
                      </li>
                      <li>
                        <span className="bg-[#FFA500] text-white px-1">I</span>:
                        Inicio
                      </li>
                      <li>
                        <span className="bg-[#FF0000] text-white px-1">PI</span>
                        : Pre-inicio
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Porcentajes:</h3>
                    <p className="text-sm text-gray-600">
                      Los porcentajes mostrados representan la proporción de
                      respuestas adecuadas sobre el total de preguntas de cada
                      capacidad. El porcentaje total se calcula considerando
                      todas las capacidades.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Códigos de capacidad:
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Los códigos en los encabezados de columna representan las
                      diferentes capacidades evaluadas. Pase el cursor sobre
                      ellos para ver el nombre completo de la capacidad.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-2">
                        Capacidades evaluadas:
                      </h4>
                      <ul className="space-y-1">
                        {students[0]?.capacities.map((capacity) => (
                          <li key={capacity.capacityId} className="text-sm">
                            <span className="font-bold">
                              {capacity.capacityCode}:
                            </span>{" "}
                            {capacity.capacityName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card className="overflow-x-auto">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-200">
              <TableRow>
                {/* Sticky left columns */}
                <TableHead
                  className="px-2 py-1 border sticky left-0 z-20 bg-green-200 text-xs text-center text-foreground"
                  style={{ width: widthN, minWidth: widthN, maxWidth: widthN }}
                  rowSpan={2}
                >
                  N°
                </TableHead>
                <TableHead
                  className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                  style={{
                    left: widthN,
                    width: widthName,
                    minWidth: widthName,
                    maxWidth: widthName,
                  }}
                  rowSpan={2}
                >
                  APELLIDOS Y NOMBRES
                </TableHead>
                {/* Header principal por capacidad */}
                {showCapacities &&
                  students[0]?.capacities.map((capacity) => (
                    <TableHead
                      key={capacity.capacityId}
                      className="text-center bg-green-300 border text-xs text-foreground"
                      colSpan={4}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-bold text-xs">
                              {capacity.capacityCode}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs text-xs"
                          >
                            {capacity.capacityName}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                  ))}
                {/* Totales */}
                {showTotal && (
                  <>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: widthStat * 3,
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={2}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">
                          Total Adecuadas
                        </span>
                        <span className="text-xs">(✔)</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: widthStat * 2,
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={2}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">
                          Total Inadecuadas
                        </span>
                        <span className="text-xs">(✗)</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: widthStat,
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={2}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">
                          Total Omitidas
                        </span>
                        <span className="text-xs">(—)</span>
                      </div>
                    </TableHead>
                  </>
                )}
                <TableHead
                  className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                  style={{
                    right: 0,
                    width: widthStat,
                    minWidth: widthStat,
                    maxWidth: widthStat,
                  }}
                  rowSpan={2}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Nivel Total</span>
                    <span className="text-xs">(Nivel)</span>
                  </div>
                </TableHead>
              </TableRow>
              {showCapacities && (
                <TableRow>
                  {/* Subheaders por capacidad */}
                  {students[0]?.capacities.flatMap((capacity) => [
                    <TableHead
                      key={capacity.capacityId + "-a"}
                      className="border bg-green-100 text-green-700 font-bold text-xs text-center"
                    >
                      Adecuadas (✔)
                    </TableHead>,
                    <TableHead
                      key={capacity.capacityId + "-i"}
                      className="border bg-green-100 text-red-700 font-bold text-xs text-center"
                    >
                      Inadecuadas (✗)
                    </TableHead>,
                    <TableHead
                      key={capacity.capacityId + "-o"}
                      className="border bg-green-100 text-gray-500 font-bold text-xs text-center"
                    >
                      Omitidas (—)
                    </TableHead>,
                    <TableHead
                      key={capacity.capacityId + "-p"}
                      className="border bg-green-100 font-bold text-xs text-center"
                    >
                      %
                    </TableHead>,
                  ])}
                </TableRow>
              )}
            </TableHeader>
            <TableBody>
              {students.map((student, idx) => (
                <TableRow key={student.id} className="text-center">
                  {/* Sticky left columns */}
                  <TableCell
                    className="border px-2 py-1 sticky left-0 z-10 bg-white"
                    style={{
                      width: widthN,
                      minWidth: widthN,
                      maxWidth: widthN,
                    }}
                  >
                    {idx + 1}
                  </TableCell>
                  <TableCell
                    className="border px-2 py-1 text-left sticky z-10 bg-white"
                    style={{
                      left: widthN,
                      width: widthName,
                      minWidth: widthName,
                      maxWidth: widthName,
                    }}
                  >
                    {student.full_name}
                  </TableCell>
                  {/* Resultados por capacidad */}
                  {showCapacities &&
                    student.capacities.flatMap((capacity) => [
                      <TableCell
                        key={student.id + "-" + capacity.capacityId + "-a"}
                        className="border px-2 py-1 text-green-700 font-bold"
                      >
                        {capacity.adecuadas}
                      </TableCell>,
                      <TableCell
                        key={student.id + "-" + capacity.capacityId + "-i"}
                        className="border px-2 py-1 text-red-700 font-bold"
                      >
                        {capacity.inadecuadas}
                      </TableCell>,
                      <TableCell
                        key={student.id + "-" + capacity.capacityId + "-o"}
                        className="border px-2 py-1 text-gray-500 font-bold"
                      >
                        {capacity.omitidas}
                      </TableCell>,
                      <TableCell
                        key={student.id + "-" + capacity.capacityId + "-p"}
                        className="border px-2 py-1"
                      >
                        <span
                          className="text-xs font-bold rounded"
                          style={{
                            backgroundColor:
                              capacity.porcentaje_adecuadas > 0
                                ? "#b9fbc0"
                                : "#f8f9fa",
                            color:
                              capacity.porcentaje_adecuadas > 0
                                ? "#1b5e20"
                                : "#888",
                            padding: "2px 4px",
                            display: "inline-block",
                            fontWeight: 700,
                          }}
                        >
                          {capacity.porcentaje_adecuadas}%
                        </span>
                      </TableCell>,
                    ])}
                  {/* Totales */}
                  {showTotal && (
                    <>
                      <TableCell
                        className="border px-2 py-1 text-green-700 font-semibold sticky z-10 bg-white"
                        style={{
                          right: widthStat * 3,
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.total_adecuadas}
                      </TableCell>
                      <TableCell
                        className="border px-2 py-1 text-red-700 font-semibold sticky z-10 bg-white"
                        style={{
                          right: widthStat * 2,
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.total_inadecuadas}
                      </TableCell>
                      <TableCell
                        className="border px-2 py-1 text-gray-500 font-semibold sticky z-10 bg-white"
                        style={{
                          right: widthStat,
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.total_omitidas}
                      </TableCell>
                    </>
                  )}
                  {/* Nivel Total */}
                  <TableCell
                    className={`border px-2 py-1 font-bold sticky z-10 ${getNivelBg(
                      getNivel(student.total_porcentaje_adecuadas)
                    )}`}
                    style={{
                      right: 0,
                      width: widthStat,
                      minWidth: widthStat,
                      maxWidth: widthStat,
                    }}
                  >
                    {getNivel(student.total_porcentaje_adecuadas)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
