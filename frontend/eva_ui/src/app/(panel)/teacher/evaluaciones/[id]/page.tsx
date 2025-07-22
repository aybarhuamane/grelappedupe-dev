import {
  courseAssignmentsFunctionsApi,
  courseEvaluationFuntionsApi,
  periodoFunctionsApi,
  studentsFunctionsApi,
} from "@/api";
import { fetcher } from "@/lib/fetcher";
import { EvaluacionDetails, FrmStundentEditor } from "@/modules/teacher";
import { RemoveStudenteFromEvaluation } from "@/modules/teacher/components/FrmStudentEditor/RemoveStudenteFromEvaluation";
import {
  courseAssignment,
  courseEvaluation,
  period,
  response,
  student,
} from "@/types";

export interface IParams {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page(props: IParams) {
  const {
    params,
    searchParams: { edit, add, remove },
  } = props;
  const { fetchTeacherAssigmanetList } = courseAssignmentsFunctionsApi;
  const { fetchStudent } = studentsFunctionsApi;
  const { fetchPeriodoList } = periodoFunctionsApi;

  const listData = (await fetcher<
    response.IResApi<courseAssignment.ITeacherAssignmentList>
  >(
    () =>
      fetchTeacherAssigmanetList({
        is_active: true,
        id: Number(params.id),
      }),
    {
      timeoutMs: 10000,
      retries: 3,
      retryDelayMs: 1000,
    }
  )) ?? { count: 0, next: null, previous: null, results: [] };

  let evaluationHeaders: courseEvaluation.IEvaluationHeaders[] = [];

  if (listData?.results?.length > 0) {
    evaluationHeaders =
      (await fetcher<courseEvaluation.IEvaluationHeaders[]>(
        () =>
          courseEvaluationFuntionsApi.fetchEvaluationHeaders({
            course_id: listData?.results[0]?.course?.id,
            level_id:
              listData?.results[0]?.degree?.detail_institution?.level?.id,
            degree_number: Number(listData?.results[0]?.degree?.degree_number),
          }),
        {
          timeoutMs: 10000,
          retries: 3,
          retryDelayMs: 1000,
        }
      )) ?? [];
  }

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

  let studentData: student.IStudent = {} as student.IStudent;

  if (edit || remove) {
    studentData =
      (await fetcher<student.IStudent>(
        () => fetchStudent(Number(edit || remove)),
        {
          timeoutMs: 10000,
          retries: 3,
          retryDelayMs: 1000,
        }
      )) ?? ({} as student.IStudent);
  }

  return (
    <>
      {listData?.results?.length > 0 && (
        <EvaluacionDetails
          headerEvaluation={evaluationHeaders}
          dataDefault={listData?.results[0]}
          dataPeriodo={periodData}
        />
      )}
      {edit && <FrmStundentEditor defaultData={studentData} />}
      {add && <FrmStundentEditor />}
      {remove && (
        <RemoveStudenteFromEvaluation
          courseAssignmentId={Number(params.id)}
          studentData={studentData}
        />
      )}
    </>
  );
}
