import { courseAssignmentsFunctionsApi } from "@/api";
import { fetcher } from "@/lib/fetcher";
import { ResumeEvaluationTeacher } from "@/modules/teacher/pages/resumen/resume-evaluation-teacher";
import { courseAssignment, response } from "@/types";

interface IProps {
  params: {
    id: string;
  };
}

export default async function ResumePage(props: IProps) {
  const { params } = props;

  const id = Number(params.id);

  const { fetchCourseAssigmanetList } = courseAssignmentsFunctionsApi;

  const listData =
    (await fetcher<response.IResApi<courseAssignment.ITeacherAssignmentList>>(
      () => fetchCourseAssigmanetList({ id: id }),
      {
        timeoutMs: 10000,
        retries: 3,
        retryDelayMs: 1000,
      }
    )) ?? null;

  if (!listData) {
    return <div>No se encontraron datos</div>;
  }

  return (
    <>
      <ResumeEvaluationTeacher listData={listData.results[0]} />
    </>
  );
}
