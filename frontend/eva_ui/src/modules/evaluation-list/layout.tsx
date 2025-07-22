import { EvaluationList } from "@/modules/teacher/pages/EvaluacionDetails/new-evaluation-list";
import { ReactNode } from "react";

export default function EvaluationLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Columna de la lista de estudiantes */}
      <div className="col-span-1 border border-gray-200 rounded shadow-lg">
        <EvaluationList id={params.id} />
      </div>

      {/* Columna de preguntas y respuestas */}
      <div className="col-span-2">{children}</div>
    </div>
  );
}
