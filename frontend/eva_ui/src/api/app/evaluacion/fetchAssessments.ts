import { fetchCore } from '@/api/core'
import { apiUrl } from '@/config'
import { assessments } from '@/types'

const apiBase = apiUrl.evaluacion.assessments

export async function fetchAssessmentalList(
  filters: assessments.IAssessmentFilter
) {
  const {
    id,
    course_assignment__id,
    date,
    score,
    period__id,
    student__id,
    student_age,
    student_age__gte,
    student_age__lte,
    ordering,
    page,
    question__capacity__competence__course__id,
    question__capacity__competence__id,
    question__capacity__id,
    question__id,
  } = filters

  const params = new URLSearchParams()

  if (id) params.append('id', id.toString())
  if (course_assignment__id)
    params.append('course_assignment__id', course_assignment__id.toString())
  if (date) params.append('date', date)
  if (score) params.append('score', score)
  if (period__id) params.append('period__id', period__id.toString())
  if (student__id) params.append('student__id', student__id.toString())
  if (student_age) params.append('student_age', student_age.toString())
  if (student_age__gte)
    params.append('student_age__gte', student_age__gte.toString())
  if (student_age__lte)
    params.append('student_age__lte', student_age__lte.toString())
  if (ordering) params.append('ordering', ordering)
  if (page) params.append('page', page.toString())
  if (question__capacity__competence__course__id)
    params.append(
      'question__capacity__competence__course__id',
      question__capacity__competence__course__id.toString()
    )
  if (question__capacity__competence__id)
    params.append(
      'question__capacity__competence__id',
      question__capacity__competence__id.toString()
    )
  if (question__capacity__id)
    params.append('question__capacity__id', question__capacity__id.toString())
  if (question__id) params.append('question__id', question__id.toString())

  const response = await fetchCore(`${apiBase}/?${params.toString()}`, {
    method: 'GET',
  })

  return response
}

export async function createOrUpdateAssessment(
  data: assessments.IAssessmentPost,
  id?: number
) {
  const url = id ? `${apiBase}/${id}` : apiBase
  const method = id ? 'PUT' : 'POST'
  const response = await fetchCore(url, {
    method,
    body: JSON.stringify(data),
  })
  return response
}

export async function createOrUpdateAssessmentBulks(
  data: assessments.IAssessmentPost[]
) {
  const url = apiBase
  const response = await fetchCore(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return response
}
