"use client";

import { DynamicTabsUrl, ITab } from "@/components/custom/dynamic-tabs-url";
import { HeaderSection } from "@/modules/core";
import { useCourse } from "@/modules/director";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function QuizManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const pathname = usePathname();
  const { getCursos, listCursos } = useCourse();

  useEffect(() => {
    getCursos({ id: Number(id) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courseName = listCursos.results[0];

  const tabs: ITab[] = [
    {
      label: "Detalles",
      value: "details",
      redirectTo: `/admin/quiz-manage/${id}`,
    },
    {
      label: "Competencias",
      value: "competences",
      redirectTo: `/admin/quiz-manage/${id}/competences`,
    },
    {
      label: "Capacidades",
      value: "capacities",
      redirectTo: `/admin/quiz-manage/${id}/capacities`,
    },
    {
      label: "Preguntas",
      value: "questions",
      redirectTo: `/admin/quiz-manage/${id}/grados`,
    },
  ];

  const activeTab =
    tabs.find((tab) => pathname.endsWith(tab.value))?.value || "details";

  return (
    <>
      <HeaderSection
        title={courseName?.name || "Detalles del curso"}
        subtitle="Detalles de cursos"
        disableAddButton
        showBackButton
      />

      <DynamicTabsUrl defaultValue={activeTab} tabs={tabs} />

      <div className="p-4">{children}</div>
    </>
  );
}
