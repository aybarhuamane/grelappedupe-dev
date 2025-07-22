import { courseAssignmentsFunctionsApi, periodoFunctionsApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { EvaluacionesActive } from "@/modules/teacher";
import { auth, courseAssignment, period, response } from "@/types";

export default async function Page() {
  const { fetchTeacherAssigmanetList } = courseAssignmentsFunctionsApi;
  const { getUser } = functionsGetUserData;
  const { fetchPeriodoList } = periodoFunctionsApi;

  const user: auth.IUserAuth = await getUser();

  const listData = (await fetcher<
    response.IResApi<courseAssignment.ITeacherAssignmentList>
  >(
    () =>
      fetchTeacherAssigmanetList({
        teaching__person__id: user.persona_id,
        is_active: true,
        is_validated: false,
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  const periodData = (await fetcher<response.IResApi<period.IPeriodList>>(
    () => fetchPeriodoList({ page: 1, is_active: true }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  return <EvaluacionesActive dataPeriodo={periodData} data={listData} />;
}
