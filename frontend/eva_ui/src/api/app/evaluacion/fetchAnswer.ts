import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { answers } from "@/types";

const apiBase = apiUrl.evaluacion.answers;
const apiBaseDelete = apiUrl.evaluacion.deleteanswer;

export async function fetchAnswerList(filters: answers.IAnswerFilter) {
  const {
    id,
    answer,
    question__id,
    orderinganswer__icontains,
    is_correct,
    ordering,
    page,
    page_size,
  } = filters;

  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());
  if (answer) params.append("answer", answer);
  if (question__id) params.append("question__id", question__id.toString());
  if (orderinganswer__icontains)
    params.append("orderinganswer__icontains", orderinganswer__icontains);
  if (is_correct) params.append("is_correct", is_correct.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });
  return response;
}

export async function createOrUpdateAnswer(
  data: answers.IAnswerPost,
  id?: number
) {
  const url = id ? `${apiBase}/${id}/` : apiBase;
  const method = id ? "PUT" : "POST";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteAnswer(id: number) {
  const response = await fetchCore(`${apiBaseDelete}${id}/`, {
    method: "DELETE",
  });
  return response;
}
