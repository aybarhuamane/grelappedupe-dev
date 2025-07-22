import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { degree } from "@/types";

const apiBase = apiUrl.educativa.degrees;

export async function fetchDegreeList(filters: degree.IDegreeFilter) {
  const {
    is_active,
    id,
    ordering,
    page,
    degree_number,
    detail_institution__id,
    detail_institution__institution__id,
    section,
    section__icontains,
    page_size,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (degree_number) params.append("degree_number", degree_number);
  if (detail_institution__id)
    params.append("detail_institution__id", detail_institution__id.toString());
  if (detail_institution__institution__id)
    params.append(
      "detail_institution__institution__id",
      detail_institution__institution__id.toString()
    );
  if (section) params.append("section", section);
  if (section__icontains)
    params.append("section__icontains", section__icontains);
  if (is_active !== undefined) params.append("is_active", is_active.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

export async function fetchDegree(id: number) {
  const response = await fetchCore(`${apiBase}${id}/`, {
    method: "GET",
  });
  return response;
}

export async function createOrUpdateDegree(
  data: degree.IDegreePost,
  id?: number
) {
  const url = id ? `${apiBase}${id}/` : apiBase;
  const method = id ? "PUT" : "POST";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteDegree(id: number) {
  const response = await fetchCore(`${apiBase}${id}/`, {
    method: "DELETE",
  });
  return response;
}
