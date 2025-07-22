import { courseAssignmentsFunctionsApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { EvaluacionesHistorial } from "@/modules/teacher";
import { auth, courseAssignment, response } from "@/types";

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page(props: IProps) {
  const {
    searchParams: { date, validated, page, is_active },
  } = props;
  const { fetchTeacherAssigmanetList } = courseAssignmentsFunctionsApi;
  const { getUser } = functionsGetUserData;

  const user: auth.IUserAuth = await getUser();

  const listData = (await fetcher<
    response.IResApi<courseAssignment.ITeacherAssignmentList>
  >(
    () =>
      fetchTeacherAssigmanetList({
        teaching__person__id: user.persona_id,
        is_active:
          is_active === "true"
            ? true
            : is_active === "false"
            ? false
            : undefined,
        date: date as string,
        is_validated:
          validated === "true"
            ? true
            : validated === "false"
            ? false
            : undefined,
        page: page ? Number(page) : 1,
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  return <EvaluacionesHistorial disableAlert data={listData} />;
}
