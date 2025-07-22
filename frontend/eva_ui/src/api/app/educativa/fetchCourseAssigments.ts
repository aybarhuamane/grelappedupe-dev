import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { courseAssignment } from "@/types";

const apiBase = apiUrl.educativa.courseassignmentsList;
const urlBase = apiUrl.educativa;
const apiTeacher = apiUrl.educativa.teacherassignmentslist;

export async function fetchCourseAssigmanetList(
  filters: courseAssignment.ICourseAssignmentFilter
) {
  const {
    is_active,
    id,
    ordering,
    page,
    page_size,
    degree__detail_institution__id,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (degree__detail_institution__id)
    params.append(
      "degree__detail_institution__id",
      degree__detail_institution__id.toString()
    );

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });
  return response;
}
export async function fetchTeacherAssigmanetList(
  filters: courseAssignment.ITeacherAssignmentFilter
) {
  const {
    is_active,
    id,
    ordering,
    page,
    is_validated,
    teaching__id,
    course__id,
    date,
    date__gt,
    date__lt,
    degree__id,
    teaching__person__id,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (is_validated !== undefined)
    params.append("is_validated", is_validated.toString());
  if (ordering) params.append("ordering", ordering);
  if (teaching__id) params.append("teaching__id", teaching__id.toString());
  if (teaching__person__id)
    params.append("teaching__person__id", teaching__person__id.toString());
  if (course__id) params.append("course__id", course__id.toString());
  if (date) params.append("date", date);
  if (date__gt) params.append("date__gt", date__gt);
  if (date__lt) params.append("date__lt", date__lt);
  if (degree__id) params.append("degree__id", degree__id.toString());
  if (page) params.append("page", page.toString());

  const response = await fetchCore(`${apiTeacher}?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  return response;
}

export async function createOrUpdateCourseAssigmanet(
  data: courseAssignment.ICourseAssignmentList,
  id?: number
) {
  const url = id
    ? `${urlBase.courseassignments}${id}/`
    : urlBase.courseassignments;
  const method = id ? "PUT" : "POST";

  const newdata: courseAssignment.ICourseAssignmentPost = {
    is_active: id ? data.is_active : true,
    is_validated: id ? data.is_validated : false,
    is_sent: id ? data.is_sent : false,
    course: data.course.id,
    degree: data.degree.id,
    teaching: data.teaching.id,
  };

  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(newdata),
  });
  return response;
}

export async function createOrUpdateCourseAssigmanetTeach(
  data: courseAssignment.ICourseAssignmentList,
  id?: number
) {
  const url = id
    ? `${urlBase.courseassignments}${id}/`
    : urlBase.courseassignments;
  const method = id ? "PUT" : "POST";

  const newdata: courseAssignment.ICourseAssignmentPost = {
    is_active: id ? data.is_active : true,
    is_validated: id ? data.is_validated : false,
    is_sent: id ? data.is_sent : false,
    course: data.course.id,
    degree: data.degree.id,
    teaching: data.teaching.id,
  };

  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(newdata),
  });
  return response;
}

export async function deleteCourseAssigmanet(id: number) {
  const url = `${urlBase.courseassignments}${id}/`;
  const method = "DELETE";

  const response = await fetchCore(url, { method });
  return response;
}
