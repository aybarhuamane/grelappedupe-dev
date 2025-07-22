import { student, questions, course, competences, capacity } from '@/types'
export interface ICourseEvaluationFilter {
  course_assignment_id?: number
  student_id?: number
}

export interface ICourseEvaluationItem {
  course_assignment: number
  date: string
  period: number
  student_age: number
  student: student.IStudent
  evaluation: ICourseEvaluationScore[]
}

export interface ICourseEvaluationScore {
  id: number
  question: questions.IQuestionDetail
  score: number | null
  student_answer?: number | null
  student_age?: number
}

export interface IEvaluationHeadersFilter {
  course_id: number
  degree_number: number
  level_id: number
}

export interface IEvaluationHeaders {
  course: course.ICourse
  data: IDataHeader[]
}

export interface IDataHeader {
  competence: competences.ICompetences
  capacity: {
    capacity: capacity.ICapacity
    questions: questions.IQuestionDetail[]
  }[]
}

export interface ICourseEvaluationTable {
  id: number
  full_name: string
  gender: string
  age: string
  document: string
  progress: number
  // isNotPresent: boolean
  results: {
    label: string
    quantity: number
    percentage: string
    color: string
  }[]
}
