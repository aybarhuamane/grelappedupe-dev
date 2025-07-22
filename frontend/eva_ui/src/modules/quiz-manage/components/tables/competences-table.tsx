/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GenericDialog } from "@/components/custom/generic-dialog";
import { SearchFilter } from "@/components/custom/search-filter";
import { competences } from "@/types";
import { useEffect, useState } from "react";
import CreateCompetencesForm from "../../forms/create-competences-form";
import { useCompetences } from "../../hooks/use-competencies";
import { TabsLayout } from "../tabs-layout";
import { competencesColumns } from "./competence-columns";
import { CustomDataTable } from "./custom-data-table";

interface IProps {
  courseId: string;
  search?: string;
}

export default function CompetencesTable(props: IProps) {
  const { courseId, search } = props;

  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState(15);
  const { getCompetences, listCompetences, loadingCompetences } =
    useCompetences();

  useEffect(() => {
    getCompetences({
      course__id: Number(courseId),
      page,
      search: search,
      page_size: sizePage,
    });
  }, [page, search]);

  const data: competences.ICompetences[] =
    listCompetences?.results.map((competence) => ({
      id: competence.id,
      name: competence.name,
      course: competence.course.id,
      is_active: competence.is_active,
      code: competence.code,
      status: competence.is_active ? "Activo" : "Inactivo",
    })) || [];

  return (
    <TabsLayout
      title="Lista de competencias"
      infoTitle="Competencias"
      infoDescription="Competencias asignadas al curso."
    >
      <div className="container bg-white mx-auto space-y-4 pb-6">
        <div className="flex justify-between items-center gap-4">
          <SearchFilter icon queryKey="competences" />
          <GenericDialog
            title="Agregar competencia"
            triggerLabel="Agregar competencia"
            variant="default"
          >
            <CreateCompetencesForm courseId={courseId} />
          </GenericDialog>
        </div>
        <CustomDataTable
          columns={competencesColumns}
          data={data}
          paginationProps={{
            page,
            onPageChange: (page) => {
              setPage(page);
            },
            count: listCompetences.count,
            pageSize: sizePage,
            onPageSizeChange: (sizePage) => {
              setSizePage(sizePage);
            },
          }}
        />
      </div>
    </TabsLayout>
  );
}
