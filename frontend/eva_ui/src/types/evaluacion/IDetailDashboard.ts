export interface IDetailDashboard {
  colegios: number;
  evaluaciones: number;
  evaluaciones_faltantes: number;
  ultima_evaluacion: string;
}

export interface IInsitutionEvaluatedFilter {
  colegio_id?: number; // Required
  curso_id?: number; // Required
  competencia_id?: number;
  grado_id?: number;
  period_id?: number;
  //new filter
  page?: number;
  page_size?: number;
  drel?: string;
  ugel?: string;
  distrito?: string;
  codigo_local?: string;
  codigo_modular?: string;
  colegio_nombre?: string;
  evaluacion: "evaluado" | "no evaluado" | "en proceso" | "all";
}

export interface IDashboardFilter {
  curso_id: number;
  drel?: string;
  ugel?: string;
  distrito?: string;
  codigo_local?: string;
  codigo_modular?: string;
  period_id?: number;
  competencia_id?: number;
  evaluacion?: "evaluado" | "no evaluado" | "en proceso" | "all";
}

export interface IDashboardData {
  curso: string;
  competencia: Competencia[];
}

export interface Competencia {
  id: number;
  competencia: string;
  logros?: Logro[];
  capacidades?: ICapacityByCompetence[];
}

export interface Logro {
  id: number;
  logro: string;
  valor: number;
}

// Types for capacity for competences
export interface IDashboardCapacity {
  competencia: ICapacityData[];
  curso: string;
}

export interface ICapacityData {
  id: number;
  competencia: string;
  capacidades: ICapacityByCompetence[];
}

export interface ICapacityByCompetence {
  id: number;
  capacidad: string;
  logros: Logro[];
}

export interface IDirectorResumeDashboard {
  curso: string;
  data: IDashboardDatum[];
}

export interface IDashboardDatum {
  id: number;
  competencia: string;
  capacidades: IDashboardCapacity[];
  logros: Logro[];
}

export interface IDashboardCapacity {
  id: number;
  capacidad: string;
  logros: IDashboardLogro[];
}

export interface IDashboardLogro {
  id: number;
  logro: string;
  valor: number;
  total_alumnos: number;
}
