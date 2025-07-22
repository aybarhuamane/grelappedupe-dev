import { fetchCapacityList, fetchCapacityListAction } from "@/api/app/educativa/fetchCapacities";
import { fetchCompetenceListByCourseId } from "@/api/app/educativa/fetchCompetencesByCourse";
import { fetchCourseList } from "@/api/app/educativa/fetchCourses";
import { IResApi } from "@/types/core/IResApi";
import { capacity, competences, course, questions } from "@/types";
import { fetchQuestionsList, fetchQuestionsListAction } from "@/api/app/evaluacion/fetchQuestions";

export async function fetchCourseData(id?: string, competences?: string, capacities?: string, questions?: string) {
    let courseDetails: IResApi<course.ICourse> | undefined = undefined;
    let competenciesData: IResApi<competences.ICompetences> | undefined = undefined;
    let capacitiesData: IResApi<capacity.ICapacityList> | undefined = undefined;
    let questionsData: IResApi<questions.IQuestionListAction> | undefined = undefined;

    try {
        if (id) {
            const courseDetailsResponse = await fetchCourseList({ id: Number(id) });
            if (courseDetailsResponse.ok) {
                courseDetails = await courseDetailsResponse.json();
            }
        }
    } catch (error) {
        console.error("Error fetching course details:", error);
    }

    try {
        const competenciesResponse = await fetchCompetenceListByCourseId({
            course__id: Number(id),
            search: competences,
        });
        if (competenciesResponse.ok) {
            competenciesData = await competenciesResponse.json();
        }
    } catch (error) {
        console.error("Error fetching competencies:", error);
    }

    try {
        const capacitiesResponse = await fetchCapacityListAction({
            competence__course__id: Number(id),
            search: capacities,
        });
        if (capacitiesResponse.ok) {
            capacitiesData = await capacitiesResponse.json();
        }
    } catch (error) {
        console.error("Error fetching capacities:", error);
    }

    try {
        const questionsResponse = await fetchQuestionsListAction({
            capacity__competence__course__id: Number(id),
            search: questions,
        });
        if (questionsResponse.ok) {
            questionsData = await questionsResponse.json();
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }

    return { courseDetails, competenciesData, capacitiesData, questionsData };
}
