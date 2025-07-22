"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authentication } from "@/api";
import { functionsGetUserData, ToastCustom } from "@/modules/core";
import { auth } from "@/types";
import { createCookie, deleteCookie } from "@/utils/funtions";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const app_name = process.env.APP_NAME;

interface LoginIProps {
  goTo: string;
}

export const LoginComponent = ({ goTo = "/" }: LoginIProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<auth.ICredentials>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<auth.ICredentials> = async (data) => {
    setIsLoading(true);

    try {
      deleteCookie(`${app_name}_user`);
      const response = await authentication.fetchLogin(data);
      if (response.ok) {
        const newData: auth.IUserAuth =
          (await response.json()) as auth.IUserAuth;

        const cookieValue = await JSON.stringify(newData);

        await createCookie(`${app_name}_user`, cookieValue);

        const roles = functionsGetUserData.getRolesUser(newData.groups || []);
        router.push(roles[0].pathUrl);

        const grupo = newData.groups[0].name;

        toast.success(
          <ToastCustom
            title="Bienvenido"
            message={`Bienvenido ${
              grupo === "USERIE"
                ? newData.institution_name
                : newData.persona_nombres
                ? newData.persona_nombres
                : ""
            } ${newData.persona_apellidos ? newData.persona_apellidos : ""}`}
          />
        );
      } else {
        toast.error(
          <ToastCustom
            title="Error"
            message="Usuario o contraseña incorrectos. Intente de nuevo."
          />
        );
      }
    } catch (error) {
      toast.error(
        <ToastCustom
          title="Error inesperado"
          message="Ocurrió un error inesperado, por favor intente de nuevo."
        />
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-[65%] relative bg-muted">
        <Image
          src="/images/foto1.jpg"
          alt="Image"
          layout="fill"
          objectFit="cover"
          className="dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col w-[35%] items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex w-full items-center justify-center">
            <Image
              src="/images/bannerGREL.png"
              alt="logo"
              width={220}
              height={300}
            />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="fixed bottom-4 left-24 w-full text-white font-bold">
              Creado con Dall-E
            </h1>
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <p className="text-balance text-muted-foreground">
              Ingrese sus credenciales por favor
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 px-16">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="text">Usuario</Label>
                <Controller
                  name="email"
                  rules={{
                    required: "Ingrese su usuario",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      id="email"
                      type="text"
                      className="h-10"
                      placeholder="Ingrese su usuario"
                      value={value || ""}
                      onChange={onChange}
                      required
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Controller
                  name="password"
                  rules={{
                    required: "Ingrese su contraseña",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingrese su contraseña"
                        value={value || ""}
                        onChange={onChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="text-gray-500 h-5" />
                        ) : (
                          <Eye className="text-gray-500 h-5" />
                        )}
                      </button>
                    </div>
                  )}
                />
                <br />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Iniciar Sesión
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="text-center">
          <Link href={goTo} className="underline text-green-800">
            Volver a inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
