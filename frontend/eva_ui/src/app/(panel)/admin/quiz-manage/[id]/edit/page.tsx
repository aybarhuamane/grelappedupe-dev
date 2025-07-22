import { cursosFunctionsApi } from "@/api"
import CreateCourseForm from "@/modules/quiz-manage/create-course-form"
import { course } from "@/types"
import { IResApi } from "@/types/core/IResApi"

export default async function page({
    params,
}: {
    params: { id: string }
}) {
    const id = params.id

    let courseDetails: IResApi<course.ICourse> | undefined = undefined

    try {
        if (id) {
            const { fetchCourseList } = cursosFunctionsApi
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
            <CreateCourseForm initialValues={courseDetails?.results} />
        </>
    )
}


