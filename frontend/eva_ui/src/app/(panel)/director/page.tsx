import { cursosFunctionsApi, detailsInstitutionApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { DirectorHome } from "@/modules/director";
import { course, detailInstitution, response } from "@/types";

export default async function Page() {
  const user = await functionsGetUserData.getUser();
  const { fetchDetailInstitutionList } = detailsInstitutionApi;
  const { fetchCourseList } = cursosFunctionsApi;

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

  const courseList = (await fetcher<response.IResApi<course.ICourse>>(
    () =>
      fetchCourseList({
        page_size: 20,
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  return (
    <DirectorHome
      data={institutionAssigned?.results || null}
      courses={courseList.results || []}
    />
  );
}
