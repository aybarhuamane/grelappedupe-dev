import { ubigeo } from "@/types";
import { IDirectorList } from "./IDirector";
import { IArea } from "./IArea";
import { ICategory } from "./ICategory";
import { IEducationalLevelList } from "./IEducationalLevel";
import { IUser } from "../auth/IAuth";

export interface IInstitutionList {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  ubigeo: ubigeo.IUbigeoList;
}
export interface IInstitution {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  ubigeo: number;
}

export interface IInstitutionPost {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  ubigeo: number;
}
export interface IInstitutionFilter {
  id?: number;
  institution__id?: number;
  name__icontains?: string;
  institution__name__icontains?: string;
  ubigeo__id?: number;
  ubigeo__region__icontains?: string;
  ubigeo__region?: string;
  ubigeo__province__icontains?: string;
  ubigeo__province?: string;
  ubigeo__district__icontains?: string;
  ubigeo__district?: string;
  ordering?: string;
  modular_code__icontains?: string;
  page?: number;
  page_size?: number;
  search?: string;
}

export interface IInstitutionTable {
  id: number;
  name: string;
  codigo_modular: string;
  codigo_local: string;
  address: string;
  level: string;
  evaluation: string;
}

export interface IDetailsInstitutionList {
  id: number;
  local_code: string;
  modular_code: string;
  institution: IInstitutionList;
  director: IDirectorList | null;
  level: IEducationalLevelList;
  category: ICategory | null;
  area: IArea;
  user: IUser;
}

export interface IDetailsInstitutionTable {
  id: number;
  local_code: string;
  modular_code: string;
  institution: string;
  director: string | null;
  level: string;
  category: string | null;
  area: string;
  user: string;
}

export interface IDetailsInstitutionTableAction {
  id: number;
  local_code: string;
  modular_code: string;
  institution: IInstitutionList;
  director: string | null;
  level: string;
  category: string | null;
  area: string;
  user: string;
  detail_institution?: number;
}

export interface IInstitutionListAction {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  ubigeo: Ubigeo;
  educational_levels: EducationalLevel[];
}

export interface EducationalLevel {
  id: number;
  name: Name;
  is_active: boolean;
  modality: number;
}

export enum Name {
  Primaria = "Primaria",
  Secundaria = "Secundaria",
}

export interface Ubigeo {
  id: number;
  code: string;
  region: Province;
  province: Province;
  district: string;
}

export enum Province {
  Loreto = "Loreto",
  Maynas = "Maynas",
}
