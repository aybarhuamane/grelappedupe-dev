import { courseAssignmentsFunctionsApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { RenderEvaluation } from "@/modules/director/pages/EvaluacionDetails/RenderEvaluation";
import { courseAssignment, response } from "@/types";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Page(props: IProps) {
  const { params } = props;
  const { fetchCourseAssigmanetList } = courseAssignmentsFunctionsApi;

  const listData = (await fetcher<
    response.IResApi<courseAssignment.ICourseAssignmentList>
  >(
    () =>
      fetchCourseAssigmanetList({
        id: Number(params.id),
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  return (
    <main>
      {listData?.results?.length > 0 && (
        <RenderEvaluation dataDefault={listData.results[0]} />
      )}
    </main>
  );
}
