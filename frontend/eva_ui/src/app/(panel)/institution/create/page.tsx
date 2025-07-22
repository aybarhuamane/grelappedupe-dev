import { detailsInstitutionApi } from "@/api";
import { DynamicTabs } from "@/components/custom/dynamic-tabs";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData, HeaderSection } from "@/modules/core";
import { AddInstitutionDirector } from "@/modules/institution-admin/create/AddInstitutionDirector";
import { DirectorSelector } from "@/modules/institution-admin/create/DirectorSelector";
import { detailInstitution, response } from "@/types";

export default async function Page() {
  const user = await functionsGetUserData.getUser();
  const detail_institution_id = user.detail_institution_id;
  const { fetchDetailInstitutionList } = detailsInstitutionApi;

  const institutionAssigned = (await fetcher<
    response.IResApi<detailInstitution.IDetailInstitutionList>
  >(
    () =>
      fetchDetailInstitutionList({
        modular_code: user.institution_modular_code,
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  const tabsData = [
    {
      label: "Asignar director",
      value: "asignar",
      content: <DirectorSelector codigo={detail_institution_id} />,
    },
    {
      label: "Crear director",
      value: "crear",
      content: (
        <AddInstitutionDirector institutionData={institutionAssigned.results} />
      ),
    },
  ];

  return (
    <>
      <HeaderSection
        title="Asignar Director"
        subtitle="Formulario para asignar un director"
        disableAddButton
        hrefBack="/institution"
        showBackButton
      />
      <DynamicTabs tabs={tabsData} defaultValue="asignar" />
    </>
  );
}
