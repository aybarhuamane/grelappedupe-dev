export interface IEvaluationCourse {
  student: IStudent;
  result: IEvaluationResult;
}

export interface IEvaluationResult {
  adecuadas: number;
  inadecuadas: number;
  omitidas: number;
  omitidas_porcentaje: number;
  adecuadas_porcentaje: number;
  inadecuadas_porcentaje: number;
  total: number;
  nsp: boolean;
}

export interface IStudent {
  id: number;
  name: string;
  last_name: string;
  num_document: string;
  gender: IGender;
  age: number;
}

export enum IGender {
  F = "F",
  M = "M",
}

export interface IEvaluationCourseFilter {
  id?: number;
  date?: string;
  period__id?: number;
  course_assignment_id?: number;
  course_assignment__id__in?: string;
  course_assignment__degree__detail_institution__id?: number;
  student__id?: number;
  student_age?: number;
  student_age__gte?: number;
  student_age__lte?: number;
  question__id?: number;
  question__capacity__id?: number;
  question__capacity__competence__id?: number;
  question__capacity__competence__course__id?: number;
}
export interface IEvaluationCourseTable extends IStudent {
  full_name: string;
  results: IEvaluationResult;
}
