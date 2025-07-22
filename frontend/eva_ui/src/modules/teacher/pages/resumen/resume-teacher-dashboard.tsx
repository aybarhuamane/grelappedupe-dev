/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChartSkeleton } from "@/modules/director/pages/DirectorHome/sections/bar-chart-skeleton";
import Image from "next/image";
import { useResumeDashboardTeacher } from "../../hooks/user-dashboard-teacher";

// Lazy load the chart component
const LazyResumeTeacherBarchart = lazy(() =>
  import("./resume-teacher-barchart").then((mod) => ({
    default: mod.ResumeTeacherBarchart,
  }))
);

interface IProps {
  course_assignment_id: number;
}

type Competence = {
  id: number;
  competence: string;
};

export const ResumeTeacherDashboard = (props: IProps) => {
  const { course_assignment_id } = props;
  const { data, loading, getTeacherResumeDashboard } =
    useResumeDashboardTeacher();

  const [competenceSelected, setCompetenceSelected] = useState<number>(0);

  // Memoize competence list to prevent unnecessary recalculations
  const competenceList = useMemo(
    () =>
      data.flatMap((item) =>
        item.competencias.map((item) => ({
          id: Number(item[0]),
          competence: String(item[1]),
        }))
      ),
    [data]
  );

  useEffect(() => {
    getTeacherResumeDashboard({
      course_assignment_id: course_assignment_id,
      competence_id: competenceSelected === 0 ? undefined : competenceSelected,
    });
  }, [course_assignment_id, competenceSelected]);

  return (
    <section className="bg-white rounded-md shadow">
      <section className="p-4 flex gap-2">
        <Select
          value={competenceSelected.toString()}
          onValueChange={(value) => setCompetenceSelected(Number(value))}
        >
          <SelectTrigger className="w-[320px]">
            <SelectValue placeholder="Seleccionar competencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0">Todas las competencias</SelectItem>
              {competenceList.map((competence) => (
                <SelectItem
                  key={competence.id}
                  value={competence.id.toString()}
                >
                  {competence.competence}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      {loading ? (
        <BarChartSkeleton />
      ) : data && data.length > 0 ? (
        <Suspense fallback={<BarChartSkeleton />}>
          <LazyResumeTeacherBarchart
            dataChart={data}
            loadingFilter={loading}
            competenceSelected={competenceSelected}
          />
        </Suspense>
      ) : (
        <section className="flex flex-col items-center justify-center p-8">
          <Image
            src="/svg/no-data.svg"
            alt="No hay datos"
            width={300}
            height={200}
            priority // Prioritize loading the image
          />
          <h1 className="text-sm text-center mt-4">
            Aún no se han registrado evaluaciones
          </h1>
        </section>
      )}
    </section>
  );
};
