import { fetchCourseData } from "@/modules/quiz-manage/actions/fetch-course-data";
import { CourseDetails } from "@/modules/quiz-manage/course-details-section";

type Params = { id: string };

export default async function page({ params }: { params: Params }) {
    const id = params.id;

    const { courseDetails } = await fetchCourseData(id as string);
    return (
        <div>
            <CourseDetails course={courseDetails} />
        </div>
    )
}
