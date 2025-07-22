import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { institution } from "@/types";

const apiBase = apiUrl.educativa.institutions;
const apiDetails = apiUrl.educativa.detailinstitutionslist;
const apiDetailsActions = apiUrl.educativa.detailinstitutionsactions;
const apiInstitutionList = apiUrl.educativa.institutionlist;

export async function fetchInstitutionList(
  filters: institution.IInstitutionFilter
) {
  const {
    id,
    name__icontains,
    ubigeo__district,
    ubigeo__province,
    ubigeo__district__icontains,
    ubigeo__id,
    ubigeo__province__icontains,
    ubigeo__region,
    ubigeo__region__icontains,
    ordering,
    page,
    page_size,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (name__icontains) params.append("name__icontains", name__icontains);
  if (ubigeo__district) params.append("ubigeo__district", ubigeo__district);
  if (ubigeo__province) params.append("ubigeo__province", ubigeo__province);
  if (ubigeo__district__icontains)
    params.append("ubigeo__district__icontains", ubigeo__district__icontains);
  if (ubigeo__id) params.append("ubigeo__id", ubigeo__id.toString());
  if (ubigeo__province__icontains)
    params.append("ubigeo__province__icontains", ubigeo__province__icontains);
  if (ubigeo__region) params.append("ubigeo__region", ubigeo__region);
  if (ubigeo__region__icontains)
    params.append("ubigeo__region__icontains", ubigeo__region__icontains);
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

export async function createOrUpdateInstitution(
  data: institution.IInstitutionPost,
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

export async function institutionGetId(id: number) {
  const response = await fetchCore(`${apiBase}${id}`, {
    method: "GET",
    cache: "no-store",
  });

  return response;
}

export async function fetchDetailsInstitutionList(
  filters: institution.IInstitutionFilter
) {
  const {
    id,
    name__icontains,
    ubigeo__district,
    ubigeo__province,
    ubigeo__district__icontains,
    ubigeo__id,
    ubigeo__province__icontains,
    ubigeo__region,
    ubigeo__region__icontains,
    ordering,
    page,
    institution__name__icontains,
    modular_code__icontains,
    page_size,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (name__icontains) params.append("name__icontains", name__icontains);
  if (ubigeo__district) params.append("ubigeo__district", ubigeo__district);
  if (ubigeo__province) params.append("ubigeo__province", ubigeo__province);
  if (ubigeo__district__icontains)
    params.append("ubigeo__district__icontains", ubigeo__district__icontains);
  if (ubigeo__id) params.append("ubigeo__id", ubigeo__id.toString());
  if (ubigeo__province__icontains)
    params.append("ubigeo__province__icontains", ubigeo__province__icontains);
  if (ubigeo__region) params.append("ubigeo__region", ubigeo__region);
  if (ubigeo__region__icontains)
    params.append("ubigeo__region__icontains", ubigeo__region__icontains);
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (institution__name__icontains)
    params.append("institution__name__icontains", institution__name__icontains);
  if (modular_code__icontains)
    params.append("modular_code__icontains", modular_code__icontains);
  if (page_size) params.append("page_size", page_size.toString());

  const response = await fetchCore(`${apiDetails}?${params.toString()}`, {
    method: "GET",
    // cache: "no-store",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });
  return response;
}

export async function fetchDetailsInstitutionListActions(
  filters: institution.IInstitutionFilter
) {
  const {
    id,
    institution__id,
    name__icontains,
    ubigeo__district,
    ubigeo__province,
    ubigeo__district__icontains,
    ubigeo__id,
    ubigeo__province__icontains,
    ubigeo__region,
    ubigeo__region__icontains,
    ordering,
    page,
    institution__name__icontains,
    modular_code__icontains,
    page_size,
    search,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (institution__id)
    params.append("institution__id", institution__id.toString());
  if (name__icontains) params.append("name__icontains", name__icontains);
  if (ubigeo__district) params.append("ubigeo__district", ubigeo__district);
  if (ubigeo__province) params.append("ubigeo__province", ubigeo__province);
  if (ubigeo__district__icontains)
    params.append("ubigeo__district__icontains", ubigeo__district__icontains);
  if (ubigeo__id) params.append("ubigeo__id", ubigeo__id.toString());
  if (ubigeo__province__icontains)
    params.append("ubigeo__province__icontains", ubigeo__province__icontains);
  if (ubigeo__region) params.append("ubigeo__region", ubigeo__region);
  if (ubigeo__region__icontains)
    params.append("ubigeo__region__icontains", ubigeo__region__icontains);
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (institution__name__icontains)
    params.append("institution__name__icontains", institution__name__icontains);
  if (modular_code__icontains)
    params.append("modular_code__icontains", modular_code__icontains);
  if (page_size) params.append("page_size", page_size.toString());
  if (search) params.append("search", search.toString());

  const response = await fetchCore(
    `${apiDetailsActions}?${params.toString()}`,
    {
      method: "GET",
      // cache: "no-store",
      next: { revalidate: 180 }, // Revalidate every 3 minutes
    }
  );
  return response;
}

export async function fetchInstitutionListAction(
  filters: institution.IInstitutionFilter
) {
  const {
    id,
    institution__id,
    name__icontains,
    ubigeo__district,
    ubigeo__province,
    ubigeo__district__icontains,
    ubigeo__id,
    ubigeo__province__icontains,
    ubigeo__region,
    ubigeo__region__icontains,
    ordering,
    page,
    institution__name__icontains,
    modular_code__icontains,
    page_size,
    search,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (institution__id)
    params.append("institution__id", institution__id.toString());
  if (name__icontains) params.append("name__icontains", name__icontains);
  if (ubigeo__district) params.append("ubigeo__district", ubigeo__district);
  if (ubigeo__province) params.append("ubigeo__province", ubigeo__province);
  if (ubigeo__district__icontains)
    params.append("ubigeo__district__icontains", ubigeo__district__icontains);
  if (ubigeo__id) params.append("ubigeo__id", ubigeo__id.toString());
  if (ubigeo__province__icontains)
    params.append("ubigeo__province__icontains", ubigeo__province__icontains);
  if (ubigeo__region) params.append("ubigeo__region", ubigeo__region);
  if (ubigeo__region__icontains)
    params.append("ubigeo__region__icontains", ubigeo__region__icontains);
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (institution__name__icontains)
    params.append("institution__name__icontains", institution__name__icontains);
  if (modular_code__icontains)
    params.append("modular_code__icontains", modular_code__icontains);
  if (page_size) params.append("page_size", page_size.toString());
  if (search) params.append("search", search.toString());

  const response = await fetchCore(
    `${apiInstitutionList}?${params.toString()}`,
    {
      method: "GET",
      // cache: "no-store",
      next: { revalidate: 180 }, // Revalidate every 3 minutes
    }
  );
  return response;
}
