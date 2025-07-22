export interface INewDirectorResumeDashboard {
  institution: INewInstitution;
  detailinstitution: INewDetailinstitution;
  cursos: INewCurso[];
}

export interface INewCurso {
  id: number;
  name: string;
  course_assignment_id: number;
  data: INewDatum[];
}

export interface INewDatum {
  id: number;
  competencia: string;
  capacidades: INewCapacidade[];
  logros: INewLogroElement[];
}

export interface INewCapacidade {
  id: number;
  capacidad: string;
  logros: INewLogroElement[];
}

export interface INewLogroElement {
  id: number;
  logro: INewLogroEnum;
  valor: number;
  total_alumnos: number;
}

export enum INewLogroEnum {
  Inicio = "Inicio",
  PrevioInicio = "Previo Inicio",
  Proceso = "Proceso",
  Satisfactorio = "Satisfactorio",
}

export interface INewDetailinstitution {
  id: number;
  local_code: string;
  modular_code: string;
  institution: number;
  director: number;
  level: number;
  category: null;
  area: number;
  user: number;
}

export interface INewInstitution {
  id: number;
  name: string;
  address: string;
}
