import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { teacher } from "@/types";

const apiBase = apiUrl.educativa;

export async function fetchTeacherListAction(filters: teacher.ITeacherFilter) {
  const {
    is_active,
    person,
    person__id,
    person__last_name__icontains,
    person__name__icontains,
    person__num_document,
    person__num_document__icontains,
    ordering,
    page,
    page_size,
    search,
  } = filters;

  const params = new URLSearchParams();

  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (person) params.append("person", person.toString());
  if (person__id) params.append("person__id", person__id.toString());
  if (person__last_name__icontains)
    params.append("person__last_name__icontains", person__last_name__icontains);
  if (person__name__icontains)
    params.append("person__name__icontains", person__name__icontains);
  if (person__num_document)
    params.append("person__num_document", person__num_document);
  if (person__num_document__icontains)
    if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (search) params.append("search", search);

  const url = apiBase.teachingsListAction;

  const response = await fetchCore(`${url}?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

export async function fetchTeacherList(
  filters: teacher.ITeacherFilter,
  isList?: boolean
) {
  const {
    is_active,
    person,
    person__id,
    person__last_name__icontains,
    person__name__icontains,
    person__num_document,
    person__num_document__icontains,
    ordering,
    page,
    page_size,
    search,
  } = filters;

  const params = new URLSearchParams();

  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (person) params.append("person", person.toString());
  if (person__id) params.append("person__id", person__id.toString());
  if (person__last_name__icontains)
    params.append("person__last_name__icontains", person__last_name__icontains);
  if (person__name__icontains)
    params.append("person__name__icontains", person__name__icontains);
  if (person__num_document)
    params.append("person__num_document", person__num_document);
  if (person__num_document__icontains)
    if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (search) params.append("search", search);

  const url = isList ? apiBase.teachingsList : apiBase.teachings;

  const response = await fetchCore(`${url}?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

export async function fetchTeacher(id: number) {
  const response = await fetchCore(`${apiBase.teachings}${id}/`, {
    method: "GET",
  });
  return response;
}

export async function createOrUpdateTeacher(
  data: teacher.ITeacherPost,
  id?: number
) {
  const url = id ? `${apiBase.teachings}/${id}/` : apiBase.teachings;
  const method = id ? "PUT" : "POST";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  });
  return response;
}

export async function fetchTeacherAssigmentSchoolList(
  filters: teacher.ITeacherAssigmentSchoolFilter
) {
  const {
    detail_institution,
    detail_institution__modular_code,
    detail_institution__modular_code__icontains,
    id,
    is_active,
    ordering,
    page,
    page_size,
    teaching,
    teaching__person__last_name,
    teaching__person__last_name__icontains,
    teaching__person__name,
    teaching__person__name__icontains,
    teaching__person__num_document,
    teaching__person__num_document__icontains,
    search,
  } = filters;

  const params = new URLSearchParams();

  if (detail_institution)
    params.append("detail_institution", detail_institution.toString());
  if (detail_institution__modular_code)
    params.append(
      "detail_institution__modular_code",
      detail_institution__modular_code
    );
  if (detail_institution__modular_code__icontains)
    params.append(
      "detail_institution__modular_code__icontains",
      detail_institution__modular_code__icontains
    );
  if (id) params.append("id", id.toString());
  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (teaching) params.append("teaching", teaching.toString());
  if (teaching__person__last_name)
    params.append("teaching__person__last_name", teaching__person__last_name);
  if (teaching__person__last_name__icontains)
    params.append(
      "teaching__person__last_name__icontains",
      teaching__person__last_name__icontains
    );
  if (teaching__person__name)
    params.append("teaching__person__name", teaching__person__name);
  if (teaching__person__name__icontains)
    params.append(
      "teaching__person__name__icontains",
      teaching__person__name__icontains
    );
  if (teaching__person__num_document)
    params.append(
      "teaching__person__num_document",
      teaching__person__num_document
    );
  if (teaching__person__num_document__icontains)
    params.append(
      "teaching__person__num_document__icontains",
      teaching__person__num_document__icontains
    );

  if (search) params.append("search", search);

  const url = `${apiBase.teacherassignmentSchoolList}`;

  return await fetchCore(`${url}?${params.toString()}`, {
    method: "GET",
  });
}

export async function fetchTeacherAssigmentSchoolListAction(
  filters: teacher.ITeacherAssigmentSchoolFilter
) {
  const {
    detail_institution,
    detail_institution__modular_code,
    detail_institution__modular_code__icontains,
    id,
    is_active,
    ordering,
    page,
    page_size,
    teaching,
    teaching__person__last_name,
    teaching__person__last_name__icontains,
    teaching__person__name,
    teaching__person__name__icontains,
    teaching__person__num_document,
    teaching__person__num_document__icontains,
    search,
  } = filters;

  const params = new URLSearchParams();

  if (detail_institution)
    params.append("detail_institution", detail_institution.toString());
  if (detail_institution__modular_code)
    params.append(
      "detail_institution__modular_code",
      detail_institution__modular_code
    );
  if (detail_institution__modular_code__icontains)
    params.append(
      "detail_institution__modular_code__icontains",
      detail_institution__modular_code__icontains
    );
  if (id) params.append("id", id.toString());
  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (teaching) params.append("teaching", teaching.toString());
  if (teaching__person__last_name)
    params.append("teaching__person__last_name", teaching__person__last_name);
  if (teaching__person__last_name__icontains)
    params.append(
      "teaching__person__last_name__icontains",
      teaching__person__last_name__icontains
    );
  if (teaching__person__name)
    params.append("teaching__person__name", teaching__person__name);
  if (teaching__person__name__icontains)
    params.append(
      "teaching__person__name__icontains",
      teaching__person__name__icontains
    );
  if (teaching__person__num_document)
    params.append(
      "teaching__person__num_document",
      teaching__person__num_document
    );
  if (teaching__person__num_document__icontains)
    params.append(
      "teaching__person__num_document__icontains",
      teaching__person__num_document__icontains
    );

  if (search) params.append("search", search);

  const url = `${apiBase.teacherassignmentSchoolListAction}`;

  return await fetchCore(`${url}?${params.toString()}`, {
    method: "GET",
  });
}

export async function createTeacherAssigmentSchool(
  data: teacher.ITeacherAssigmentSchoolPost
) {
  const response = await fetchCore(`${apiBase.teacherassignmentSchool}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

export async function updateTeacherAssigmentSchool(
  data: teacher.ITeacherAssigmentSchoolPost,
  id: number
) {
  const response = await fetchCore(`${apiBase.teacherassignmentSchool}${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
}

export async function createTeacherAssigmentSchoolAction(
  data: teacher.ITeacherAssigmentSchoolPostAction
) {
  const response = await fetchCore(`${apiBase.teacherassignmentSchoolAction}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteTeacherAssigmentSchool(id: number) {
  const response = await fetchCore(`${apiBase.teacherassignmentSchool}${id}/`, {
    method: "DELETE",
  });
  return response;
}
