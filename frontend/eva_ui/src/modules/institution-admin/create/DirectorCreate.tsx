// "use client";

import { DynamicTabs } from "@/components/custom/dynamic-tabs";
import { HeaderSection } from "../../core";
import { DirectorSelector } from "./DirectorSelector";

interface IProps {
  detail_institution_id: number;
}

export const InstitutionDirectorCreate = (props: IProps) => {
  const { detail_institution_id } = props;

  const tabsData = [
    {
      label: "Asignar docente",
      value: "asignar",
      content: (
        <div className="bg-white container py-4">
          <DirectorSelector codigo={detail_institution_id} />
        </div>
      ),
    },
    {
      label: "Crear docente",
      value: "crear",
      content: (
        <div className="bg-white container py-4">
          hola
        </div>
      ),
    },
  ];

  return (
    <main className="flex flex-col">
      <HeaderSection
        title="Asignar Director"
        subtitle="Formulario para asignar un director"
        disableAddButton
        hrefBack="/institution"
        showBackButton
      />
      <DynamicTabs
        tabs={tabsData}
        defaultValue="asignar"
      />
    </main>
  );
};
