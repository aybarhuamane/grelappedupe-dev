export interface IDashboardTeacher {
  curso: string;
  competencia: ICompetence[];
}

export interface ICompetence {
  id: number;
  competencia: string;
  logros: ILogro[];
}

export interface ICapacity {
  id: number;
  capacidad: string;
  logros: ILogro[];
}

export interface ILogro {
  id: number;
  logro: string;
  valor: number;
}

export interface IDashboardTeacherFilter {
  colegio_id?: number;
  curso_id: number;
  competencia_id?: number;
  grado_id?: number;
  periodo_id?: number;
}

export interface IResumeResponseDashboardFilter {
  course_assignment_id: number;
  competence_id?: number;
}
