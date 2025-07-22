"use client";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/modules/core";
import { NavBar } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ItemLink, MenuSection, RolesSection } from "./sections";

export const NavBarCustom = (props: NavBar.INavBarCustomProps) => {
  const { disabledItemsFooter, menuFooter, menuNavbar, user, customContent } =
    props;
  const pathname = usePathname();
  return (
    <nav className="bg-white sticky top-0 z-50">
      <main className="container flex justify-between py-2 items-center min-h-16 h-16 max-h-16">
        <section className="flex gap-4 items-center">
          <div id="section-brand" className="w-full">
            <Link href={"/dashboard"}>
              <Image
                src="/images/bannerGREL.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <hr className="h-10 w-0.5 bg-gray-300" />
          <div id="user-roles" className="w-full flex min-w-[180px]">
            {user && user.roles.length > 0 && (
              <div className="w-full flex gap-4 items-center justify-start">
                <RolesSection options={user?.roles} />
                {customContent && customContent}
              </div>
            )}
          </div>
        </section>
        <section className="flex gap-6 items-center">
          {menuNavbar && <MenuSection menuNavbar={menuNavbar} />}
          <hr className="h-10 w-0.5 bg-gray-300" />
          {user && user.roles.length > 0 ? (
            <UserDropdown
              user={user.name}
              description={
                user.email ||
                (user.persona_nombres && user.persona_apellido) ||
                ""
              }
            />
          ) : (
            <Button size="sm">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
        </section>
      </main>
      {!disabledItemsFooter && (
        <footer className="flex border-b container">
          {menuFooter?.map((item) => (
            <ItemLink
              key={item.label}
              {...item}
              isActived={pathname === item.href}
            />
          ))}
        </footer>
      )}
    </nav>
  );
};
