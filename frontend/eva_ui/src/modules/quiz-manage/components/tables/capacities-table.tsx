/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GenericDialog } from "@/components/custom/generic-dialog";
import { SearchFilter } from "@/components/custom/search-filter";
import { capacity } from "@/types";
import { useEffect, useState } from "react";
import CreateCapacitiesForm from "../../forms/create-capacities-form";
import { useCapacitiesAction } from "../../hooks/use-capacities";
import { TabsLayout } from "../tabs-layout";
import { capacitiesColumns } from "./capacities-columns";
import { CustomDataTable } from "./custom-data-table";

interface IProps {
  courseId?: string;
  search?: string;
}

export default function CapacitiesTable(props: IProps) {
  const { courseId, search } = props;

  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState(15);
  const { getCapacitiesAction, listCapacities, loadingCapacities } =
    useCapacitiesAction();

  useEffect(() => {
    getCapacitiesAction({
      competence__course__id: Number(courseId),
      page,
      search: search,
      page_size: sizePage,
    });
  }, [page, search]);

  const data: capacity.ICapacityList[] =
    listCapacities?.results.map((capacity) => ({
      status: capacity.is_active ? "Activo" : "Inactivo",
      email: capacity.code,
      amount: capacity.name,
      id: capacity.id,
      name: capacity.name,
      is_active: capacity.is_active,
      code: capacity.code,
      competence: capacity.competence,
    })) || [];

  const competenceId = listCapacities?.results[0]?.competence?.id;

  return (
    <TabsLayout
      title="Lista de capacidades"
      infoTitle="Capacidades"
      infoDescription="Capacidades asignadas a la competencia."
    >
      <div className="container bg-white mx-auto space-y-4 pb-6">
        <div className="flex justify-between items-center gap-4">
          <SearchFilter icon queryKey="capacities" />
          <GenericDialog
            title="Agregar capacidad"
            triggerLabel="Agregar capacidad"
            variant="default"
          >
            <div>
              <CreateCapacitiesForm
                courseId={courseId}
                competenceId={competenceId?.toString()}
              />
            </div>
          </GenericDialog>
        </div>
        <CustomDataTable
          columns={capacitiesColumns}
          data={data}
          paginationProps={{
            page,
            onPageChange: (page) => {
              setPage(page);
            },
            count: listCapacities.count,
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
