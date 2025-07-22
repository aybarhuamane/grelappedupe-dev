import { cursosFunctionsApi, detailsInstitutionApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData } from "@/modules/core";
import { InstitutionHome } from "@/modules/institution-admin/home/InstitutionHome";
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
        modular_code: user.institution_modular_code,
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
    <InstitutionHome
      data={institutionAssigned?.results[0] || null}
      courses={courseList.results || []}
    />
  );
}
