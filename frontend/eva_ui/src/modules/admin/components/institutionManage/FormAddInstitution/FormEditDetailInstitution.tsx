"use client";

import { detailsInstitutionApi } from "@/api";
import { useArea } from "@/modules/admin/hooks/useArea";
import { LayoutFrmHorizontal } from "@/modules/core";
import { useCategories, useLevels } from "@/modules/director";
import { institution, response } from "@/types";
import { useEffect } from "react";
import { DetailForm } from "./DetailForm";

interface IProps {
  institution_id: number;
  detailsData:
    | response.IResApi<institution.IDetailsInstitutionList>
    | undefined;
}

export const FormEditDetailInstitution = (props: IProps) => {
  const { institution_id, detailsData } = props;

  const { updateDetailInstitution } = detailsInstitutionApi;
  const { getLevels, listLevels } = useLevels();
  const { getCategories, listCategories } = useCategories();
  const { getAreas, listArea } = useArea();

  const results = detailsData?.results || [];

  useEffect(() => {
    getLevels({});
    getCategories({});
    getAreas({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container mx-auto p-8 bg-white">
      <LayoutFrmHorizontal
        title="Editar detalles de institución"
        subtitle="Formulario para editar detalles de una institución"
      >
        {results.map((result) => (
          <DetailForm
            key={result.id}
            result={result}
            institution_id={institution_id}
            updateDetailInstitution={updateDetailInstitution}
            listLevels={listLevels}
            listCategories={listCategories}
            listArea={listArea}
          />
        ))}
      </LayoutFrmHorizontal>
    </main>
  );
};
