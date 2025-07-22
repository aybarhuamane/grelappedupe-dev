'use client'
import { ColumnDef } from '@tanstack/react-table'
import { courseEvaluation } from '@/types'
import { Loader, CheckCircle } from 'lucide-react'

export const columnsDataEvaDirector: ColumnDef<courseEvaluation.ICourseEvaluationTable>[] =
  [
    {
      accessorKey: 'number',
      header: 'N°',
    },
    {
      accessorKey: 'full_name',
      header: 'APELLIDOS Y NOMBRES',
    },
    {
      accessorKey: 'document',
      header: 'N° DOCUMENTO',
    },
    {
      accessorKey: 'gender',
      header: 'SEXO',
    },
    {
      accessorKey: 'age',
      header: 'EDAD',
    },
    {
      accessorKey: 'progress',
      header: 'ESTADO',
      cell: ({ row }) => (
        <section className="w-36">
          {row.original.progress === 100 ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-4 w-4" />
              Completado
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Loader className="mr-1 h-4 w-4 animate-spin" />
              En progreso
            </span>
          )}
        </section>
      ),
    },
    {
      accessorKey: 'results',
      header: 'RESULTADOS',
      cell: ({ row }) => {
        const results = row.original.results
        // Verificar si todos los resultados son 'NSP'
        const isAllNSP = results.every(
          (result) => result.label.toUpperCase() === 'NSP'
        )
        if (isAllNSP) {
          return (
            <section className="flex flex-col items-center justify-center p-2 rounded-md bg-gray-100 text-gray-800 w-full">
              <h2 className="text-sm w-full text-center">No se presentó</h2>
              <h2 className="text-sm w-full text-center">(0 %)</h2>
              <h3 className="text-xs font-bold text-center">NSP</h3>
            </section>
          )
        }

        return (
          <section className="grid grid-cols-3 w-full max-w-96">
            {results
              .filter((result) => result.label.toUpperCase() !== 'NSP')
              .map((result) => (
                <section
                  key={result?.label}
                  className={`flex flex-col items-center justify-center p-2 rounded-md bg-${result?.color}-100 text-${result?.color}-800 `}
                >
                  <h2 className="text-sm w-full text-center">{`${result?.quantity} `}</h2>
                  <h2 className="text-sm w-full text-center">{`(${result?.percentage} %)`}</h2>
                  <h3 className="text-xs font-bold text-center">
                    {result?.label}
                  </h3>
                </section>
              ))}
          </section>
        )
      },
    },
  ]
