/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AlertCustom, DataTable, HeaderSection } from "@/modules/core";
import { useCourseAsigned } from "@/modules/director";
import { evaluationColumns } from "@/modules/director/pages/EvaluacionesList/EvaluacionColumns";
import { SectionBannerEvaluation } from "@/modules/director/pages/EvaluacionesList/SectionBannerEvaluation";
import { courseAssignment, period, response } from "@/types";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const indications = [
  "Para ver el detalle de la evaluación registrada, haga clic en la fila de la tabla.",
  "Activos: Indica las evaluaciones activas durante el periodo de evaluación.",
  "Validados: Indica las evaluaciones que han sido validadas por el director.",
  "Estados: Indica las evaluaciones enviadas por el docente listas para ser revisadas por el director.",
];

interface EvaluacionesListProps {
  institution_id: string;
  periodoData: response.IResApi<period.IPeriodList>;
}

export const EvaluacionesList = (props: EvaluacionesListProps) => {
  const { periodoData, institution_id } = props;
  const [sizePage, setSizePage] = useState(15);
  const { listCursosAssigned, getCursosAssigned, loading } = useCourseAsigned();
  const router = useRouter();

  const [page, setPage] = useState(1);

  useEffect(() => {
    getCursosAssigned({
      degree__detail_institution__id: Number(institution_id),
      page: Number(page),
      page_size: Number(sizePage),
    });
  }, [institution_id, page, sizePage]);

  const dataList: courseAssignment.ICourseAssignmentTable[] =
    listCursosAssigned.results.map((item) => ({
      id: Number(item.id),
      course: item.course.name,
      degree: `${item.degree.degree_number} - ${item.degree.degree_text} - ${item.degree.section}`,
      teacher: `${item.teaching?.person.num_document} - ${item?.teaching.person.name} ${item?.teaching?.person?.last_name}`,
      is_active: item.is_active,
      is_validated: item.is_validated,
      is_sent: item.is_sent,
      date: item.date,
    })) || [];

  const handleRedirect = (id: number) => {
    router.push(
      `/admin/institution-manage/${institution_id}/evaluations/${id}`
    );
  };

  return (
    <main className="flex flex-col">
      <HeaderSection
        title="Evaluaciones registradas"
        subtitle="Registro de evaluaciones ya registradas durante por lor docentes"
        disableAddButton
      />
      {periodoData.results.length > 0 && (
        <SectionBannerEvaluation dataPeriodo={periodoData.results[0]} />
      )}
      <section className="container pt-3">
        <AlertCustom
          title="Indicaciones"
          content={
            <main>
              <ul className="list-disc list-inside font-semibold text-sm">
                {indications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </main>
          }
        />
      </section>

      <Suspense fallback={<div>Cargando...</div>}>
        <section className="container pt-5">
          <DataTable
            columns={evaluationColumns}
            data={dataList}
            isLoading={loading}
            paginationProps={{
              page: page - 1,
              pageSize: sizePage,
              count: listCursosAssigned.count,
              onPageChange: (page) => {
                setPage(page + 1);
              },
              onPageSizeChange: (size) => {
                setSizePage(size);
              },
            }}
            hasSearch={false}
            onValueSelectedChange={(row) => {
              handleRedirect(Number(row?.id));
            }}
          />
        </section>
      </Suspense>
    </main>
  );
};
