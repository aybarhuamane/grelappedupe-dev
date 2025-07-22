import { MenuItems, auth } from "@/types";

export interface IMenuSectionProps {
  menuNavbar: MenuItems.IMenuItem[];
}

export interface IRolesSectionProps {
  options: auth.IRole[];
}

export interface INavBarCustomProps {
  disabledItemsFooter?: boolean;
  menuFooter?: MenuItems.IMenuItem[];
  menuNavbar?: MenuItems.IMenuItem[];
  user?: {
    name: string;
    email?: string;
    roles: auth.IRole[];
    persona_nombres?: string;
    persona_apellido?: string;
  };
  customContent?: React.ReactNode;
}
