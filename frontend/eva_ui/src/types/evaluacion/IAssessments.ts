import { period, courseAssignment, student, questions } from "@/types";

interface IAssessmentBase {
  id: number;
  date: string;
  score: string;
  student_age: number;
}

export interface IAssessmentList extends IAssessmentBase {
  period: period.IPeriodList;
  course_assignment: courseAssignment.ICourseAssignment;
  student: student.IStudent;
}

export interface IAssessment extends IAssessmentBase {
  period: number;
  course_assignment: number;
  student: number;
  question: number;
}

export interface IAssessmentPost {
  id?: number;
  score?: number;
  student_age: number;
  period?: number;
  course_assignment: number;
  student: number;
  question: number;
  student_answer?: number | null;
}

export interface IAssessmentFilter {
  id?: number;
  date?: string;
  score?: string;
  period__id?: number;
  course_assignment__id?: number;
  student__id?: number;
  student_age?: number;
  student_age__gte?: number;
  student_age__lte?: number;
  question__id?: number;
  question__capacity__id?: number;
  question__capacity__competence__id?: number;
  question__capacity__competence__course__id?: number;
  page?: number;
  ordering?: string;
}
