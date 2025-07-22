import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { courseEvaluation, donaEvaluation, studentEvaluation } from "@/types";

const apiBase = apiUrl.evaluacion;

export async function fetchCourseEvaluation(
  filters: courseEvaluation.ICourseEvaluationFilter
) {
  const { course_assignment_id, student_id } = filters;

  const params = new URLSearchParams();
  if (course_assignment_id)
    params.append("course_assignment_id", course_assignment_id.toString());
  if (student_id) params.append("student_id", student_id.toString());

  const response = await fetchCore(
    `${apiBase.courseEvaluations}?${params.toString()}`,
    {
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 180 }, // Revalidate every 3 minutes
    }
  );

  return response;
}

export async function fetchEvaluationHeaders(
  filter: courseEvaluation.IEvaluationHeadersFilter
) {
  const { course_id, degree_number, level_id } = filter;

  const params = new URLSearchParams();
  if (course_id) params.append("course_id", course_id.toString());
  if (degree_number) params.append("degree_number", degree_number.toString());
  if (level_id) params.append("level_id", level_id.toString());

  const url = `${apiBase.evaluationHeaders}?${params.toString()}`;

  const response = await fetchCore(`${url}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });

  return response;
}

export async function fetchEvaluationCourseBulk(
  filter: studentEvaluation.IEvaluationCourseFilter
) {
  const { id, period__id, course_assignment_id } = filter;

  const params = new URLSearchParams();
  if (id) params.append("id", id.toString());
  if (period__id) params.append("period__id", period__id.toString());
  if (course_assignment_id)
    params.append("course_assignment_id", course_assignment_id.toString());

  const url = `${apiBase.validationAssessmentList}?${params.toString()}`;
  const response = await fetchCore(`${url}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });

  return response;
}

export async function fetDonaEvaluation(filter: donaEvaluation.IDonaFilter) {
  const { course_assignment_id } = filter;

  const params = new URLSearchParams();
  if (course_assignment_id)
    params.append("course_assignment_id", course_assignment_id.toString());

  const url = `${apiBase.graphicAssessmentList}?${params.toString()}`;
  const response = await fetchCore(`${url}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });

  return response;
}
