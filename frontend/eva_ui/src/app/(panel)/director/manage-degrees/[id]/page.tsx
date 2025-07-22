import { degreesFunctionsApi, detailsInstitutionApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { FrmGradoEditor } from "@/modules/director";
import { degree, detailInstitution, response } from "@/types";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Page(props: IProps) {
  const { params } = props;
  const { id } = params;
  const user = await functionsGetUserData.getUser();
  const { fetchDetailInstitutionList } = detailsInstitutionApi;

  const defaultData =
    (await fetcher<degree.IDegree>(
      () => degreesFunctionsApi.fetchDegree(Number(id)),
      {
        timeoutMs: 10000,
        retries: 3,
        retryDelayMs: 1000,
      }
    )) ?? undefined;

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

  return (
    <main>
      {defaultData && (
        <FrmGradoEditor
          institutionAssigned={institutionAssigned.results}
          defaultData={defaultData}
        />
      )}
    </main>
  );
}
