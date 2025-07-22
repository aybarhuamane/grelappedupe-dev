"use client";
import { StudentCircularProgress } from "@/components/custom/circular-progress-student";
import { studentEvaluation } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const studentEvaluationColumn: ColumnDef<studentEvaluation.IEvaluationCourseTable>[] =
  [
    {
      accessorKey: "number",
      header: "N°",
      cell: ({ row }) => {
        return (
          <section className="">
            <h2 className="text-sm w-full text-start">{row.index + 1}</h2>
          </section>
        );
      },
    },
    {
      accessorKey: "full_name",
      header: "APELLIDOS Y NOMBRES",
    },
    {
      accessorKey: "num_document",
      header: "N° DOCUMENTO",
    },
    {
      accessorKey: "gender",
      header: "SEXO",
    },
    {
      accessorKey: "age",
      header: "EDAD",
    },
    {
      accessorKey: "results",
      header: () => <div className="text-right px-6 w-full">RESULTADOS</div>,
      cell: ({ row }) => {
        const results = row.original.results;
        // Verificar si todos los resultados son 'NSP'
        const isAllNSP = results.nsp === true;

        if (isAllNSP) {
          return (
            <div className="text-right h-12 flex justify-end items-center px-6">
              <span className="font-semibold text-gray-500">
                No se presentó
              </span>
            </div>
          );
        }

        return (
          <div className="flex flex-row gap-4 justify-end items-center px-6">
            <section className="flex flex-row gap-2">
              <StudentCircularProgress
                value={results.adecuadas_porcentaje}
                color="green"
                label="Adecuadas"
                count={results.adecuadas}
              />
              <StudentCircularProgress
                value={results.inadecuadas_porcentaje}
                color="red"
                label="Inadecuadas"
                count={results.inadecuadas}
              />
              <StudentCircularProgress
                value={results.omitidas_porcentaje}
                color="gray"
                label="Omitidas"
                count={results.omitidas}
              />
            </section>
            <section>
              <h2 className="text-base font-bold w-full text-center">
                {results.total}
              </h2>
              <p className="text-sm text-gray-600 font-semibold w-full text-center">
                Total de respuestas
              </p>
            </section>
          </div>
        );
      },
    },
  ];
