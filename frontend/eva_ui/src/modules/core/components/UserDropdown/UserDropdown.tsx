"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "@/utils/funtions";
import { LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const APP_NAME = process.env.APP_NAME;
interface IUserDropdownProps {
  image?: string;
  user: string;
  description: string;
}

export const UserDropdown = (props: IUserDropdownProps) => {
  const { image, user, description } = props;
  const router = useRouter();
  const pathname = usePathname();

  const startPath = pathname.split("/")[1];

  const handleLogout = () => {
    deleteCookie(`${APP_NAME}_user`);
    localStorage.removeItem("institution");
    router.push("/login");
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return "";

    const words = fullName.split(" ");
    const firstName = words[0];
    const lastName = words.find(
      (word, index) =>
        index > 0 && !["de", "la", "los"].includes(word.toLowerCase())
    );

    return `${firstName?.charAt(0) ?? ""}${
      lastName?.charAt(0) ?? ""
    }`.toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-0 m-0">
        <section className="flex items-start gap-3">
          <div>
            <Avatar>
              {image ? (
                <AvatarImage src={image} alt={user} />
              ) : (
                <AvatarFallback>{getInitials(description)}</AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-semibold">{user}</h3>
            <h2 className="text-xs text-gray-500">{description}</h2>
          </div>
        </section>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full p-0 bg-transparent">
          <Link href={`/${startPath}/profile`}>
            <Button
              variant="outline"
              className="w-full flex justify-start px-2"
            >
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            onClick={handleLogout}
            className="w-full"
            variant="destructive"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
