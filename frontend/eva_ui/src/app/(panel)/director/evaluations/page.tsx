import { detailsInstitutionApi, periodoFunctionsApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { EvaluacionesList } from "@/modules/director";
import { detailInstitution, period, response } from "@/types";

export default async function Page() {
  const user = await functionsGetUserData.getUser();
  const { fetchDetailInstitutionList } = detailsInstitutionApi;
  const { fetchPeriodoList } = periodoFunctionsApi;

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

  const periodData = (await fetcher<response.IResApi<period.IPeriodList>>(
    () =>
      fetchPeriodoList({
        page: 1,
        is_active: true,
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  return (
    <EvaluacionesList
      periodoData={periodData}
      institutionsAssigned={institutionAssigned}
    />
  );
}
