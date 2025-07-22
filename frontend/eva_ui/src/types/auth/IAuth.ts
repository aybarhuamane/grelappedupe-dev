export interface ICredentials {
  email: string
  password: string
}

export interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  username: string
  last_login: string
}

export interface IGroup {
  id: number
  name: string
}

export interface IUserAuth {
  user: IUser
  token: string
  persona_apellidos: string
  persona_nombres: string
  persona_numero_documento: string
  persona_id: number
  groups: IGroup[]
  detail_institution_id:    number;
  institution_name:         string;
  institution_id:           number;
  institution_modular_code: string;
  institution_local_code:   string;
  institution_level:        string;
  institution_area:         string;
}

export interface IRole {
  id: number
  key: string
  name: string
  pathUrl: string
}

export interface IResetPassword {
  user_id: number | undefined
  password: string
  confirm_password: string
}
