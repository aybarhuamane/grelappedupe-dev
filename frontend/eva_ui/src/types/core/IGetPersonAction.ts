export interface IGetPersonList {
  id:           number;
  created_at:   Date;
  updated_at:   Date;
  name:         string;
  last_name:    string;
  num_document: string;
  email:        string;
  phone:        string;
  user:         IGetUser;
}

export interface IGetUser {
  id:               number;
  password:         string;
  last_login:       null;
  is_superuser:     boolean;
  username:         string;
  first_name:       string;
  last_name:        string;
  email:            string;
  is_staff:         boolean;
  is_active:        boolean;
  date_joined:      Date;
  groups:           IGetGroup[];
  user_permissions: any[];
}

export interface IGetGroup {
  id:          number;
  name:        string;
  permissions: any[];
}

export interface IGetPersonFilter {
  id?: number
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