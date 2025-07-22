/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AlertCustom, DataTable, HeaderSection } from "@/modules/core";
import { useCourseAsigned } from "@/modules/director";
import { useInstitutionStore } from "@/store/use-institution-store";
import { courseAssignment, detailInstitution, period, response } from "@/types";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { InstitutionSeleted } from "../DocentesList/InstitutionSeleted";
import { evaluationColumns } from "./EvaluacionColumns";
import { SectionBannerEvaluation } from "./SectionBannerEvaluation";

const indications = [
  "Para ver el detalle de la evaluación registrada, haga clic en la fila de la tabla.",
  "Activos: Indica las evaluaciones activas durante el periodo de evaluación.",
  "Validados: Indica las evaluaciones que han sido validadas por el director.",
  "Estados: Indica las evaluaciones enviadas por el docente listas para ser revisadas por el director.",
];

interface EvaluacionesListProps {
  institutionsAssigned?: response.IResApi<detailInstitution.IDetailInstitutionList>;
  periodoData?: response.IResApi<period.IPeriodList>;
  detailInstitution?: number;
  isDirector?: boolean;
  adminRedirect?: string;
}

export const EvaluacionesList = (props: EvaluacionesListProps) => {
  const {
    institutionsAssigned,
    periodoData,
    detailInstitution,
    isDirector = false,
    adminRedirect,
  } = props;
  const [sizePage, setSizePage] = useState(15);
  const { listCursosAssigned, getCursosAssigned, loading } = useCourseAsigned();
  const [page, setPage] = useState(1);
  const { selectedInstitution } = useInstitutionStore();
  const router = useRouter();

  useEffect(() => {
    getCursosAssigned({
      degree__detail_institution__id: selectedInstitution
        ? Number(selectedInstitution)
        : Number(detailInstitution),
      page: Number(page),
      page_size: Number(sizePage),
    });
  }, [selectedInstitution, detailInstitution, page, sizePage]);

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
    if (adminRedirect) {
      router.push(`${adminRedirect}/${id}`);
    } else {
      router.push(`/director/evaluations/${id}`);
    }
  };

  return (
    <main className="flex flex-col">
      {isDirector && (
        <HeaderSection
          title="Evaluaciones registradas"
          subtitle="Registro de evaluaciones ya registradas durante por lor docentes"
          disableAddButton
          renderLeftSection={
            <InstitutionSeleted
              institutionsAssigned={institutionsAssigned?.results || []}
            />
          }
        />
      )}
      {periodoData?.results.length && periodoData?.results.length > 0 && (
        <SectionBannerEvaluation dataPeriodo={periodoData.results[0]} />
      )}
      {isDirector && (
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
      )}

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
