import { fetchCourseList } from "@/api/app/educativa/fetchCourses"
import { HeaderSection } from "@/modules/core"
import { CourseDetails } from "@/modules/quiz-manage/course-details-section"
import { course } from "@/types"
import { IResApi } from "@/types/core/IResApi"

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function CourseDetailsPage({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    const { id } = searchParams

    let courseDetails: IResApi<course.ICourse> | undefined = undefined

    try {
        if (id) {
            const courseDetailsResponse = await fetchCourseList({
                id: Number(id),
            })
            if (courseDetailsResponse.ok) {
                courseDetails = await courseDetailsResponse.json()
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }

    return (
        <>
            <HeaderSection
                title={id ? "Detalles de curso" : "Crear curso"}
                subtitle="Detalles de cursos"
                disableAddButton
                showBackButton
            />
            <CourseDetails course={courseDetails} />
        </>
    )
}


