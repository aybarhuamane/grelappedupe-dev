import { detailsInstitutionApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { GradosList } from "@/modules/director";
import { detailInstitution, response } from "@/types";

export default async function Page() {
  const user = await functionsGetUserData.getUser();
  const { fetchDetailInstitutionList } = detailsInstitutionApi;

  const institutionAssigned = (await fetcher<
    response.IResApi<detailInstitution.IDetailInstitutionList>
  >(
    () =>
      fetchDetailInstitutionList({
        director__person__id: user.persona_id,
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  return <GradosList institutionAssigned={institutionAssigned} />;
}
