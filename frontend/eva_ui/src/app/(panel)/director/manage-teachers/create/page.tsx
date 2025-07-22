"use client";
import { DynamicTabs } from "@/components/custom/dynamic-tabs";
import { HeaderSection } from "@/modules/core";
import { FrmDocenteEditorPersonal } from "@/modules/director";
import { FrmAssignTeacher } from "@/modules/director/pages/FrmDocenteEditor/FrmAssignTeacher";
import { Suspense } from "react";

const tabsData = [
  {
    label: "Crear docente",
    value: "crear",
    content: (
      <Suspense fallback={<div>Cargando...</div>}>
        <FrmDocenteEditorPersonal />
      </Suspense>
    ),
  },
  {
    label: "Asignar docente",
    value: "asignar",
    content: (
      <Suspense fallback={<div>Cargando...</div>}>
        <FrmAssignTeacher />
      </Suspense>
    ),
  },
];

export default function Create() {
  return (
    <main>
      <HeaderSection
        title="Agregar docente"
        subtitle="Agrega un nuevo docente a la plataforma o asigne un docente existente a la institución"
        disableAddButton
        showBackButton
      />
      <DynamicTabs tabs={tabsData} defaultValue="crear" />
    </main>
  );
}
