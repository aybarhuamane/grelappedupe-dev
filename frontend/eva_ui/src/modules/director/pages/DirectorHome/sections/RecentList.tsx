/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/modules/core";
import { useCourseAsigned } from "@/modules/director/hooks";
import { useInstitutionStore } from "@/store/use-institution-store";
import { courseAssignment, detailInstitution } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import { evaluationColumns } from "../../EvaluacionesList/EvaluacionColumns";
interface IDirectorHomeProps {
  data: detailInstitution.IDetailInstitutionList[] | null;
}

export const RecentList = (props: IDirectorHomeProps) => {
  const { data } = props;
  const { listCursosAssigned, getCursosAssigned, loading } = useCourseAsigned();
  const { selectedInstitution } = useInstitutionStore();

  useEffect(() => {
    getCursosAssigned({
      degree__detail_institution__id: Number(selectedInstitution),
      page_size: 5,
    });
  }, []);

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

  return (
    <div className="pb-6">
      <main className="flex flex-col gap-6 bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <section>
            <h3 className="">Evaluaciones asignadas recientes</h3>
            <p className="text-sm text-gray-500">
              Revisa la lista general de evaluaciones asignadas recientemente.
            </p>
          </section>
          <Button asChild size="sm">
            <Link
              href="/director/evaluations"
              className="text-sm text-blue-500"
            >
              Ver todos
            </Link>
          </Button>
        </div>
        <DataTable
          columns={evaluationColumns}
          data={dataList}
          isLoading={loading}
          hasSearch={false}
          hasToolbar={false}
        />
      </main>
    </div>
  );
};
