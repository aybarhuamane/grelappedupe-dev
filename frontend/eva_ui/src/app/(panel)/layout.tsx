/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { NavBarCustom, functionsGetUserData } from "@/modules/core";
import { InstitutionSelector } from "@/modules/director/pages/DirectorHome/sections/institution-selector";
import { FooterPage } from "@/modules/home/Landing/footer-page";
import { MenuItems, auth } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItemsTeacher: MenuItems.IMenuItem[] = [
  {
    label: "Inicio",
    href: "/teacher",
  },
  {
    label: "Evaluaciones Activas",
    href: "/teacher/evaluaciones",
  },
  {
    label: "Historial de Evaluaciones",
    href: "/teacher/evaluaciones-historial",
  },
  {
    label: "Perfil",
    href: "/teacher/profile",
  },
];

const menuItemsDirector: MenuItems.IMenuItem[] = [
  {
    label: "Inicio",
    href: "/director",
  },
  {
    label: "Gestionar Grados y Secciones",
    href: "/director/manage-degrees",
  },
  {
    label: "Gestionar Docentes",
    href: "/director/manage-teachers",
  },
  {
    label: "Asignar Evaluaciones",
    href: "/director/evaluations/assign-evaluations",
  },
  {
    label: "Evaluaciones",
    href: "/director/evaluations",
  },
  {
    label: "Perfil",
    href: "/director/profile",
  },
];

const menuItemsAdmin: MenuItems.IMenuItem[] = [
  {
    label: "Inicio",
    href: "/admin",
  },
  {
    label: "Gestionar Personas",
    href: "/admin/person-manange",
  },
  {
    label: "Gestionar Periodos",
    href: "/admin/period-manange",
  },
  // {
  //   label: 'Gestionar Categorias',
  //   href: '/admin/category-manage',
  // },
  {
    label: "Institutiones educativas",
    href: "/admin/institution-manage",
  },
  // {
  //   label: 'Gestionar Director',
  //   href: '/admin/director-manage',
  // },
  {
    label: "Gestionar Docentes",
    href: "/admin/teacher-manage",
  },
  {
    label: "Gestionar recursos",
    href: "/admin/quiz-manage",
  },
  {
    label: "Actualizar datos",
    href: "/admin/update-data",
  },
  {
    label: "Perfil",
    href: "/admin/profile",
  },
];

const menuItemsInstitution: MenuItems.IMenuItem[] = [
  {
    label: "Detalles",
    href: "/institution",
  },
  // {
  //   label: 'Director',
  //   href: '/institution/director',
  // },
  // {
  //   label: 'Gestionar Docentes',
  //   href: '/institution/manage-teachers',
  // },
  // {
  //   label: 'Gestionar Grados y Secciones',
  //   href: '/institution/manage-degrees',
  // },

  // {
  //   label: 'Evaluaciones',
  //   href: '/institution/evaluations',
  // },
];

function getMenuItems(role: string): MenuItems.IMenuItem[] {
  switch (role) {
    case "TEACHER":
      return menuItemsTeacher;
    case "DIRECTOR":
      return menuItemsDirector;
    case "ADMIN":
      return menuItemsAdmin;
    case "INSTITUTION":
      return menuItemsInstitution;
    default:
      return [];
  }
}

export default function Layout(props: LayoutProps) {
  const [user, setUser] = useState<auth.IUserAuth | null>(null);
  const [rolesUser, setRolesUser] = useState<auth.IRole[] | null>(null);

  const { getUser, getRolesUser } = functionsGetUserData;

  const { children } = props;
  const pathname = usePathname();
  const initialPath = pathname.split("/")[1];
  const role = initialPath.toLocaleUpperCase();

  const menuItems = getMenuItems(role);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const roles = getRolesUser(user.groups);
      setRolesUser(roles);
    }
  }, [user]);

  const userId = user?.persona_id || 0;

  const userRole = user?.groups.map((group) => group.name);

  const isDirector = userRole?.includes("DIRECTOR");

  return (
    <main className="flex flex-col h-full min-h-screen">
      <NavBarCustom
        customContent={
          isDirector ? (
            <InstitutionSelector userId={userId} />
          ) : (
            <div className="hidden"></div>
          )
        }
        menuFooter={menuItems}
        user={{
          name: `${user?.user.username.toUpperCase()}`,
          email:
            `${user?.user.email}` ||
            `${user?.persona_nombres || ""} ${
              user?.persona_apellidos || ""
            }`.trim() ||
            "",
          roles: rolesUser || ([] as auth.IRole[]),
        }}
      />
      <article className="flex-grow w-full h-full">{children}</article>
      <FooterPage />
    </main>
  );
}
