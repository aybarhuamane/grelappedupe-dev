import { detailsInstitutionApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { DocentesList } from "@/modules/director";
import { detailInstitution } from "@/types";
import { IResApi } from "@/types/core/IResApi";

export default async function Page() {
  const { getUser } = functionsGetUserData;
  const { fetchDetailInstitutionList } = detailsInstitutionApi;
  const user = await getUser();

  const institutionsAssigned = (await fetcher<
    IResApi<detailInstitution.IDetailInstitutionList>
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
  )) ?? { count: 0, next: "", previous: "", results: [] };

  return <DocentesList institutionsAssigned={institutionsAssigned.results} />;
}
