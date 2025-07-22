/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { institutionsFunctionsApi } from "@/api";
import { DynamicTabs, ITabContent } from "@/components/custom/dynamic-tabs";
import { HeaderSection } from "@/modules/core";
import { institution, response } from "@/types";
import { useEffect, useState } from "react";
import {
  InstitutionDetailsSkeleton,
  InstitutionSkeleton,
} from "./DataSkeleton";
import { EvaluationsInfo } from "./evaluation-info";
import { InstitutionInfo } from "./institution-info";
import { TeachersInfo } from "./teacher-info";

interface IProps {
  id: string;
  detail_institution: string;
}

export const InstitutionDetailList = ({ id, detail_institution }: IProps) => {
  const [institution, setInstitution] =
    useState<institution.IDetailsInstitutionList | null>(null);

  const getDetailsInstitution = async () => {
    const res =
      await institutionsFunctionsApi.fetchDetailsInstitutionListActions({
        institution__id: Number(id),
      });

    if (res.ok) {
      const data: response.IResApi<institution.IDetailsInstitutionList> =
        await res.json();
      setInstitution(data.results[0]);
    }
  };

  useEffect(() => {
    getDetailsInstitution();
  }, []);

  const tabs: ITabContent[] = [
    {
      label: "Información",
      value: "info",
      content: institution ? (
        <InstitutionInfo institution={institution} />
      ) : (
        <div className="container mx-auto flex flex-col gap-4">
          <InstitutionSkeleton />
          <InstitutionDetailsSkeleton />
        </div>
      ),
    },
    {
      label: "Docentes",
      value: "teachers",
      content: <TeachersInfo id={detail_institution} />,
    },
    {
      label: "Evaluaciones",
      value: "evaluations",
      content: (
        <EvaluationsInfo institutionsAssigned={Number(detail_institution)} />
      ),
    },
  ];

  return (
    <main className="flex flex-col w-full gap-8">
      <HeaderSection
        title={
          institution
            ? `Institución: ${institution.institution.name}`
            : "Institución"
        }
        subtitle={
          institution
            ? `Código modular: ${institution.modular_code}`
            : "Código modular"
        }
        hrefBack="/admin/institution-manage"
        disableAddButton
        showBackButton
      />

      <DynamicTabs tabs={tabs} defaultValue="info" />
    </main>
  );
};
