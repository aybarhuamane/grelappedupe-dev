export interface IStudent {
  id: number
  name: string
  last_name: string
  num_document: string
  gender: 'M' | 'F'
  age?: string
}

export interface IStudentUpdate {
  name: string
  last_name: string
  num_document: string
  gender: 'M' | 'F'
}

export interface IStudentPost {
  name: string
  last_name: string
  num_document: string
  gender: 'M' | 'F'
  age: number
  course_assignment_id: number
  level_id: number
  degree_number: string
}
export interface IStudentFilter {
  id?: number
  name?: string
  name__icontains?: string
  last_name?: string
  last_name__icontains?: string
  num_document?: string
  num_document__icontains?: string
  page?: number
  ordering?: string
}
