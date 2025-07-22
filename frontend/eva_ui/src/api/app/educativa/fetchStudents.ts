import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { student } from "@/types";
import { revalidatePath } from "next/cache";

const apiBase = apiUrl.educativa.students;
const apiPost = apiUrl.educativa.postStudent;

export async function fetchStudentList(filters: student.IStudentFilter) {
  const { name__icontains, ordering, page } = filters;

  const params = new URLSearchParams();

  if (name__icontains) params.append("name__icontains", name__icontains);
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());

  const response = await fetchCore(`${apiBase}/?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

// export async function createOrUpdateStudent(
//   data: student.IStudentPost,
//   id?: number
// ) {
//   const url = id ? `${apiBase}${id}/` : apiBase
//   const method = id ? 'PUT' : 'POST'
//   const response = await fetchCore(url, {
//     method,
//     body: JSON.stringify(data),
//   })
//   return response
// }

export async function fetchStudent(id: number) {
  const response = await fetchCore(`${apiBase}${id}/`, {
    method: "GET",
    cache: "no-store",
  });
  return response;
}

export async function updateStudent(data: student.IStudentUpdate, id?: number) {
  const url = `${apiBase}${id}/`;
  const method = "PUT";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  return response;
}

export async function createStudent(data: student.IStudentPost) {
  const url = `${apiPost}`;
  const method = "POST";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  });
  return response;
}
