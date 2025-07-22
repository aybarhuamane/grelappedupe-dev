import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { questions } from "@/types";

const apiBase = apiUrl.evaluacion.questions;
const apiBaseAnswers = apiUrl.evaluacion.questionswithanswers;
const apiBaseUpdateAnswers = apiUrl.evaluacion.updatequestionswithanswers;
const apiBaseAction = apiUrl.evaluacion.questionslist;

export async function fetchQuestionsList(filters: questions.IQuestionFilter) {
  const {
    capacity__competence__course__id,
    capacity__id,
    code,
    code__icontains,
    capacity__competence__id,
    id,
    is_active,
    ordering,
    page,
    question,
    question__icontains,
    degree_number,
    level__id,
  } = filters;

  const params = new URLSearchParams();

  if (capacity__competence__course__id)
    params.append(
      "capacity__competence__course__id",
      capacity__competence__course__id.toString()
    );
  if (capacity__id) params.append("capacity__id", capacity__id.toString());
  if (code) params.append("code", code);
  if (code__icontains) params.append("code__icontains", code__icontains);
  if (capacity__competence__id)
    params.append(
      "capacity__competence__id",
      capacity__competence__id.toString()
    );
  if (id) params.append("id", id.toString());
  if (is_active) params.append("is_active", is_active.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (question) params.append("question", question);
  if (question__icontains)
    params.append("question__icontains", question__icontains);
  if (degree_number) params.append("degree_number", degree_number.toString());
  if (level__id) params.append("level__id", level__id.toString());

  const response = await fetchCore(`${apiBase}?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

export async function createOrUpdateQuestion(
  data: questions.IQuestionPost,
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

export async function createOrUpdateQuestionWithAnswers(
  data: questions.IQuestionAnswersPost,
  id?: number
) {
  const url = id ? `${apiBaseUpdateAnswers}` : apiBaseAnswers;
  const method = "POST";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  });
  return response;
}

export async function fetchQuestionsListAction(
  filters: questions.IQuestionFilter
) {
  const {
    capacity__competence__course__id,
    capacity__id,
    code,
    code__icontains,
    capacity__competence__id,
    id,
    is_active,
    ordering,
    page,
    question,
    question__icontains,
    degree_number,
    level__id,
    search,
    page_size,
  } = filters;

  const params = new URLSearchParams();

  if (capacity__competence__course__id)
    params.append(
      "capacity__competence__course__id",
      capacity__competence__course__id.toString()
    );
  if (capacity__id) params.append("capacity__id", capacity__id.toString());
  if (code) params.append("code", code);
  if (code__icontains) params.append("code__icontains", code__icontains);
  if (capacity__competence__id)
    params.append(
      "capacity__competence__id",
      capacity__competence__id.toString()
    );
  if (id) params.append("id", id.toString());
  if (is_active) params.append("is_active", is_active.toString());
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (question) params.append("question", question);
  if (question__icontains)
    params.append("question__icontains", question__icontains);
  if (degree_number) params.append("degree_number", degree_number.toString());
  if (level__id) params.append("level__id", level__id.toString());
  if (search) params.append("search", search.toString());
  if (page_size) params.append("page_size", page_size.toString());

  const response = await fetchCore(`${apiBaseAction}?${params.toString()}`, {
    method: "GET",
  });
  return response;
}

export async function deleteQuestion(id: number) {
  try {
    const url = `${apiBase}${id}/`;
    const response = await fetchCore(url, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
