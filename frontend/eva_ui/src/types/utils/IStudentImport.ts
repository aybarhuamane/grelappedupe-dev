export interface IStudentImport {
  course_assigned_id: number
  file: File[]
  level_id: number
  degree_number: string
}

export interface ITeacherImport {
  file: File[]
  detail_institution_id: number
}

export interface IPersonImport {
  file: File[]
}