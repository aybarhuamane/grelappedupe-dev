import { fetchCourseData } from "@/modules/quiz-manage/actions/fetch-course-data";
import { CourseDetails } from "@/modules/quiz-manage/course-details-section";

type SearchParams = { [key: string]: string | string[] | undefined };
type Params = { id: string };

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const { capacities, competences, questions } = searchParams;
  const id = params.id;

  const { courseDetails, competenciesData, capacitiesData, questionsData } =
    await fetchCourseData(
      id as string,
      competences as string,
      capacities as string,
      questions as string
    );

  return (
    <>
      <div>
        <CourseDetails course={courseDetails} />
      </div>
    </>
  );
}
