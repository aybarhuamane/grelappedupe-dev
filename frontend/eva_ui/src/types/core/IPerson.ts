export interface IPersonList {
  id: number
  created_at: string
  updated_at: string
  name: string
  last_name: string
  num_document: string
  email: string
  phone: string
  user?: number
  groups?: Array<string>
}

export interface IPersonFilter {
  name__icontains?: string
  last_name__icontains?: string
  num_document?: string
  num_document__icontains?: string
  email__icontains?: string
  phone__icontains?: string
  page?: number
  ordering?: string
  page_size?: number
  search?: string
}

export interface IPersonPost {
  name: string
  last_name: string
  num_document: string
  email: string
  phone: string
  groups?: Array<string>
}

export interface IPersonListActions {
  id: number
  created_at: string
  updated_at: string
  name: string
  last_name: string
  num_document: string
  email: string
  phone: string
  user?: IUserAction
  groups?: string
}
export interface IUserAction {
  id:               number;
  password:         string;
  last_login:       Date | null;
  is_superuser:     boolean;
  username:         string;
  first_name:       string;
  last_name:        string;
  email:            string;
  is_staff:         boolean;
  is_active:        boolean;
  date_joined:      Date;
  groups:           IGroupAction[] | null;
  user_permissions: any[];
}

export interface IGroupAction {
  id:          number;
  name:        string;
  permissions: any[];
}

export enum Name {
  Administrador = "ADMINISTRADOR",
  Director = "DIRECTOR",
  Docente = "DOCENTE",
}