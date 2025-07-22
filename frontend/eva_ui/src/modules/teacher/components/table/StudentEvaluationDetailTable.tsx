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

interface QuestionResult {
  questionId: number;
  label: string; // P1, P2, ...
  questionText: string;
  result: "✔" | "✗" | "—";
}

export interface NewStudentDetail {
  id: number;
  full_name: string;
  asistencia: "PRESENTE" | "AUSENTE";
  questions: QuestionResult[];
  adecuadas: number;
  inadecuadas: number;
  omitidas: number;
  porcentaje_adecuadas: number;
  porcentaje_inadecuadas: number;
  porcentaje_omitidas: number;
}

export interface GroupedQuestions {
  capacity: {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
    competence: {
      id: number;
      name: string;
      code: string;
      course: number;
    };
  };
  questions: { label: string; questionText: string; questionId: number }[];
}

interface Props {
  students: NewStudentDetail[];
  groupedQuestions: GroupedQuestions[];
  hideQuestions: boolean;
  hidePercentages: boolean;
  hideTotals: boolean;
  hideSubHeader: boolean;
}

export const StudentEvaluationDetailTable = ({
  students,
  groupedQuestions,
  hideQuestions,
  hidePercentages,
  hideTotals,
  hideSubHeader,
}: Props) => {
  const [showQuestions, setShowQuestions] = useState(!hideQuestions);
  const [showPercentages, setShowPercentages] = useState(!hidePercentages);
  const [showTotals, setShowTotals] = useState(!hideTotals);
  const [showSubHeader, setShowSubHeader] = useState(!hideSubHeader);

  // Anchos fijos para sticky
  const widthN = 48;
  const widthName = 200;
  const widthAsistencia = 100;
  const widthStat = 64;
  const totalQuestions = groupedQuestions.reduce(
    (acc, g) => acc + g.questions.length,
    0
  );

  // Calculamos las posiciones right dinámicamente según las columnas visibles
  const getRightPosition = (index: number) => {
    let position = 0;
    let visibleColumns = 0;

    // Primero contamos cuántas columnas están visibles
    if (showTotals) visibleColumns += 3;
    if (showPercentages) visibleColumns += 3;

    // Calculamos la posición basada en el índice y las columnas visibles
    if (showTotals) {
      if (index === 0) return (visibleColumns - 1) * widthStat; // Adecuadas
      if (index === 1) return (visibleColumns - 2) * widthStat; // Inadecuadas
      if (index === 2) return (visibleColumns - 3) * widthStat; // Omitidas
    }
    if (showPercentages) {
      const offset = showTotals ? 3 : 0;
      if (index === offset) return (visibleColumns - 4) * widthStat; // Adecuadas %
      if (index === offset + 1) return (visibleColumns - 5) * widthStat; // Inadecuadas %
      if (index === offset + 2) return (visibleColumns - 6) * widthStat; // Omitidas %
    }
    return 0;
  };

  // Ajustamos el right para el nivel para que sea sticky
  const rightNivel = 0;

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
        ASISTENCIA: student.asistencia,
      };

      // Agregar las preguntas
      if (showQuestions) {
        student.questions.forEach((q) => {
          row[q.label] = q.result;
        });
      }

      // Agregar totales
      if (showTotals) {
        row["Adecuadas"] = student.adecuadas;
        row["Inadecuadas"] = student.inadecuadas;
        row["Omitidas"] = student.omitidas;
      }

      // Agregar porcentajes
      if (showPercentages) {
        row["Adecuadas %"] = `${student.porcentaje_adecuadas}%`;
        row["Inadecuadas %"] = `${student.porcentaje_inadecuadas}%`;
        row["Omitidas %"] = `${student.porcentaje_omitidas}%`;
      }

      // Agregar nivel
      row["Nivel"] = getNivel(student.porcentaje_adecuadas);

      return row;
    });

    // Crear hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Crear libro
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Evaluación");

    // Generar archivo y descargar
    XLSX.writeFile(wb, "evaluacion_estudiantes.xlsx");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">
            Tabla de Evaluación por Pregunta
            <span className="text-sm text-gray-500 font-normal ml-2">
              ({students.length} estudiantes)
            </span>
          </h2>
          <p className="text-sm text-gray-500">
            Esta tabla muestra el desempeño de cada estudiante en cada pregunta
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
            option={showQuestions}
            text={showQuestions ? "Ocultar preguntas" : "Mostrar preguntas"}
            onClick={() => setShowQuestions(!showQuestions)}
          />

          {!hideSubHeader && (
            <ShowHideButton
              option={showSubHeader}
              text={
                showSubHeader
                  ? "Ocultar subencabezado"
                  : "Mostrar subencabezado"
              }
              onClick={() => setShowSubHeader(!showSubHeader)}
            />
          )}

          {!hideTotals && (
            <ShowHideButton
              option={showTotals}
              text={showTotals ? "Ocultar totales" : "Mostrar totales"}
              onClick={() => setShowTotals(!showTotals)}
            />
          )}

          {!hidePercentages && (
            <ShowHideButton
              option={showPercentages}
              text={
                showPercentages ? "Ocultar porcentajes" : "Mostrar porcentajes"
              }
              onClick={() => setShowPercentages(!showPercentages)}
            />
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Ver leyenda
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Leyenda de la tabla de evaluación</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[500px]">
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Símbolos de respuestas:
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <span className="text-green-700 font-bold">✔</span>:
                        Respuesta adecuada (correcta)
                      </li>
                      <li>
                        <span className="text-red-700 font-bold">✗</span>:
                        Respuesta inadecuada (incorrecta)
                      </li>
                      <li>
                        <span className="text-gray-500 font-bold">—</span>:
                        Pregunta omitida (no respondida)
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
                    <h3 className="font-semibold mb-2">
                      Información interactiva:
                    </h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <span className="font-bold">Códigos de capacidad:</span>{" "}
                        Los códigos en los encabezados de columna representan
                        las diferentes capacidades evaluadas. Pase el cursor
                        sobre ellos para ver el nombre completo.
                      </li>
                      <li>
                        <span className="font-bold">Preguntas:</span> Los
                        códigos P1, P2, etc. representan las preguntas
                        individuales. Pase el cursor sobre ellos para ver el
                        texto completo de la pregunta.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Porcentajes:</h3>
                    <p className="text-sm text-gray-600">
                      Los porcentajes mostrados representan la proporción de
                      respuestas adecuadas, inadecuadas y omitidas respecto al
                      total de preguntas de la evaluación.
                    </p>
                  </div>
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">
                      Capacidades evaluadas:
                    </h4>
                    <ul className="space-y-1">
                      {groupedQuestions.map((group) => (
                        <li key={group.capacity.id} className="text-sm">
                          <span className="font-bold">
                            {group.capacity.code}:
                          </span>{" "}
                          {group.capacity.name}
                        </li>
                      ))}
                    </ul>
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
                  rowSpan={3}
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
                  rowSpan={3}
                >
                  APELLIDOS Y NOMBRES
                </TableHead>
                {!hideSubHeader && (
                  <TableHead
                    className="px-2 py-1 border sticky z-20 bg-green-200 text-xs"
                    style={{
                      left: widthN + widthName,
                      width: widthAsistencia,
                      minWidth: widthAsistencia,
                      maxWidth: widthAsistencia,
                    }}
                    rowSpan={3}
                  >
                    ASISTENCIA
                  </TableHead>
                )}
                {/* Agrupación por capacidad */}
                {showQuestions &&
                  groupedQuestions.map((group) => (
                    <TableHead
                      key={group.capacity.id}
                      colSpan={group.questions.length}
                      className="text-center bg-green-300 border text-xs text-foreground"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-bold text-xs">
                              {group.capacity.code}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs text-xs"
                          >
                            {group.capacity.name}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                  ))}
                {/* Sticky right columns */}
                {showTotals && (
                  <>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: getRightPosition(0),
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={3}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Adecuadas</span>
                        <span className="text-xs text-green-700">(✔)</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: getRightPosition(1),
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={3}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Inadecuadas</span>
                        <span className="text-xs text-red-700">(✗)</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: getRightPosition(2),
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={3}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Omitidas</span>
                        <span className="text-xs text-gray-500">(—)</span>
                      </div>
                    </TableHead>
                  </>
                )}
                {showPercentages && (
                  <>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: getRightPosition(3),
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={3}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Adecuadas %</span>
                        <span className="text-xs">(%)</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: getRightPosition(4),
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={3}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Inadecuadas %</span>
                        <span className="text-xs">(%)</span>
                      </div>
                    </TableHead>
                    <TableHead
                      className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                      style={{
                        right: getRightPosition(5),
                        width: widthStat,
                        minWidth: widthStat,
                        maxWidth: widthStat,
                      }}
                      rowSpan={3}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">Omitidas %</span>
                        <span className="text-xs">(%)</span>
                      </div>
                    </TableHead>
                  </>
                )}

                <TableHead
                  className="px-2 py-1 border sticky z-20 bg-green-200 text-xs text-center text-foreground"
                  style={{
                    right: rightNivel,
                    width: widthStat,
                    minWidth: widthStat,
                    maxWidth: widthStat,
                  }}
                  rowSpan={3}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Nivel</span>
                    <span className="text-xs">(Nivel)</span>
                  </div>
                </TableHead>
              </TableRow>
              {!hideSubHeader && (
                <TableRow>
                  <TableHead
                    className="px-2 py-1 border bg-green-200 text-xs text-center text-foreground"
                    style={{ minWidth: 48, width: 48, maxWidth: 48 }}
                  >
                    Competencia
                  </TableHead>
                  {groupedQuestions.map((group) => (
                    <TableHead
                      key={`comp-${group.capacity.id}`}
                      colSpan={group.questions.length}
                      className="text-center bg-green-400 border text-xs"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-bold text-xs">
                              {group.capacity.competence.code}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs text-xs"
                          >
                            {group.capacity.competence.name}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                  ))}
                </TableRow>
              )}
              {showQuestions && (
                <TableRow>
                  {/* Sub-encabezado: códigos de pregunta */}
                  {groupedQuestions.flatMap((group) =>
                    group.questions.map((q) => (
                      <TooltipProvider key={q.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <TableHead
                              className="px-2 py-1 border bg-green-200 text-xs text-center text-foreground"
                              style={{ minWidth: 48, width: 48, maxWidth: 48 }}
                            >
                              {q.label}
                            </TableHead>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs text-xs"
                          >
                            {q.questionText}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))
                  )}
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
                  {/* Preguntas agrupadas por capacidad */}
                  {showQuestions &&
                    groupedQuestions.flatMap((group) =>
                      group.questions.map((q) => {
                        const answer = student.questions.find(
                          (qq) => qq.questionId === q.questionId
                        );
                        return (
                          <TableCell
                            key={q.questionId}
                            className="border px-2 py-1"
                            style={{ minWidth: 48, width: 48, maxWidth: 48 }}
                            title={q.questionText}
                          >
                            {answer?.result === "✔" && (
                              <span className="text-green-600 font-bold">
                                ✔
                              </span>
                            )}
                            {answer?.result === "✗" && (
                              <span className="text-red-600 font-bold">✗</span>
                            )}
                            {answer?.result === "—" && (
                              <span className="text-gray-400 font-bold">—</span>
                            )}
                          </TableCell>
                        );
                      })
                    )}
                  {/* Sticky right columns */}
                  {showTotals && (
                    <>
                      <TableCell
                        className="border px-2 py-1 text-green-700 font-semibold sticky z-10 bg-white"
                        style={{
                          right: getRightPosition(0),
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.adecuadas}
                      </TableCell>
                      <TableCell
                        className="border px-2 py-1 text-red-700 font-semibold sticky z-10 bg-white"
                        style={{
                          right: getRightPosition(1),
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.inadecuadas}
                      </TableCell>
                      <TableCell
                        className="border px-2 py-1 text-gray-500 font-semibold sticky z-10 bg-white"
                        style={{
                          right: getRightPosition(2),
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.omitidas}
                      </TableCell>
                    </>
                  )}
                  {showPercentages && (
                    <>
                      <TableCell
                        className="border px-2 py-1 font-medium sticky z-10 bg-white"
                        style={{
                          right: getRightPosition(3),
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.porcentaje_adecuadas}%
                      </TableCell>
                      <TableCell
                        className="border px-2 py-1 font-medium sticky z-10 bg-white"
                        style={{
                          right: getRightPosition(4),
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.porcentaje_inadecuadas}%
                      </TableCell>
                      <TableCell
                        className="border px-2 py-1 font-medium sticky z-10 bg-white"
                        style={{
                          right: getRightPosition(5),
                          width: widthStat,
                          minWidth: widthStat,
                          maxWidth: widthStat,
                        }}
                      >
                        {student.porcentaje_omitidas}%
                      </TableCell>
                    </>
                  )}
                  {/* Nivel */}
                  <TableCell
                    className={`border px-2 py-1 font-bold sticky z-10 ${getNivelBg(
                      getNivel(student.porcentaje_adecuadas)
                    )}`}
                    style={{
                      right: rightNivel,
                      width: widthStat,
                      minWidth: widthStat,
                      maxWidth: widthStat,
                    }}
                  >
                    {getNivel(student.porcentaje_adecuadas)}
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
