import { detailsInstitutionApi } from "@/api";
import { functionsGetUserData, HeaderSection } from "@/modules/core";
import { AddInstitutionDirector } from "@/modules/institution-admin/create/AddInstitutionDirector";
import { detailInstitution, response } from "@/types";

export default async function page() {
  const user = await functionsGetUserData.getUser();
  const { fetchDetailInstitutionList } = detailsInstitutionApi;

  let institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList> =
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

  try {
    const res = await fetchDetailInstitutionList({
      modular_code: user.institution_modular_code,
    });
    if (res.ok) {
      const data: response.IResApi<detailInstitution.IDetailInstitutionList> =
        await res.json();
      institutionAssigned = data;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <HeaderSection
        title="Asignar Director"
        subtitle="Formulario para asignar un director"
        disableAddButton
        hrefBack="/institution"
        showBackButton
      />

      <AddInstitutionDirector institutionData = {institutionAssigned.results} />
    </main>
  );
}
