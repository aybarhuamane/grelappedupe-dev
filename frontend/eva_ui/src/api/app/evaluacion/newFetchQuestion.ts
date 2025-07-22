"use server";

import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { IQuestionAnswersPost } from "@/types/evaluacion/IQuestions";
import { revalidatePath } from "next/cache";

const apiBaseAnswers = apiUrl.evaluacion.questionswithanswers;
const apiBaseUpdateAnswers = apiUrl.evaluacion.updatequestionswithanswers;

export async function newCreateOrUpdateQuestionWithAnswers(
  data: IQuestionAnswersPost,
  id?: number,
  revalidate?: string
) {
  const url = id ? `${apiBaseUpdateAnswers}` : apiBaseAnswers;
  const method = "POST";
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error en la respuesta del servidor:", errorData);
    throw new Error("Error en la creación o actualización de la pregunta.");
  }

  const result = await response.json(); // Asegurarte de obtener un objeto plano

  if (revalidate) {
    revalidatePath(revalidate);
  }

  return result; // Retornar un objeto plano
}
