import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";

export interface IDeleteStudentEvaluation {
  course_assignment_id: number;
  student_id: number;
}

const apiBase = apiUrl.evaluacion.deleteStudentFromEvaluation;

export async function deleteStudentEvaluation(data: IDeleteStudentEvaluation) {
  try {
    const response = await fetchCore(apiBase, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error deleting student evaluation:", error);
    throw error;
  }
}
