/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { resetPasswordFunctionApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { functionsGetUserData } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { auth } from "@/types";
import { deleteCookie } from "@/utils/funtions";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const APP_NAME = process.env.APP_NAME;

interface ForgotPasswordForm {
  password: string;
  confirm_password: string;
}

export const ForgotPassword = () => {
  const { control, handleSubmit, watch, formState } =
    useForm<ForgotPasswordForm>({
      defaultValues: {
        password: "",
        confirm_password: "",
      },
    });
  const router = useRouter();
  const { modifyPassword } = resetPasswordFunctionApi;
  const { getUser } = functionsGetUserData;

  const { errors } = formState;

  const [user, setUser] = useState<auth.IUserAuth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleSubmitForm = async (data: ForgotPasswordForm) => {
    setIsConfirmOpen(true);
  };

  const handleLogout = () => {
    deleteCookie(`${APP_NAME}_user`);
    localStorage.removeItem("institution");
    router.push("/login");
  };

  const handleConfirmChangePassword = async (data: ForgotPasswordForm) => {
    setIsLoading(true);

    try {
      const newUser = {
        user_id: user?.user.id,
        password: data.password,
        confirm_password: data.confirm_password,
      };
      const response = await modifyPassword(newUser);
      if (response.ok) {
        toast.success("Contraseña actualizada correctamente");
        handleLogout();
      } else {
        const error = await response.json();
        toast.error(error.message);
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    setIsConfirmOpen(false);
  };

  return (
    <div className="w-full pb-8">
      <section className="w-full max-w-lg mx-auto p-8 bg-white border">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Modificar contraseña
            </h2>
            <p className="text-sm text-gray-600">
              Por favor, ingresa tu nueva contraseña para continuar.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <Input
              name="email"
              type="email"
              className="w-full max-w-md bg-gray-100 cursor-not-allowed"
              placeholder="Correo electrónico"
              readOnly
              value={user?.user.username || ""}
              disabled
            />

            <div>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número",
                  },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className={`w-full max-w-md ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } p-4`}
                      placeholder="Nueva contraseña"
                      aria-describedby="password-error"
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
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                name="confirm_password"
                control={control}
                defaultValue=""
                rules={{
                  required: "La confirmación de la contraseña es requerida",
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                }}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      className={`w-full max-w-md ${
                        errors.confirm_password
                          ? "border-red-500"
                          : "border-gray-300"
                      } p-4`}
                      placeholder="Confirmar contraseña"
                      aria-describedby="confirm-password-error"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-gray-500 h-5" />
                      ) : (
                        <Eye className="text-gray-500 h-5" />
                      )}
                    </button>
                  </div>
                )}
              />
              {errors.confirm_password && (
                <p
                  id="confirm-password-error"
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full max-w-md"
              disabled={isLoading}
            >
              {isLoading && <LoaderIcon className="animate-spin mr-2" />}
              Actualizar contraseña
            </Button>
          </form>
        </div>

        <DialogConfirmacion
          tittleConfirm="¿Estás seguro de actualizar tu contraseña?"
          description="Si continúas, tu contraseña será actualizada."
          onSubmitConfirm={() => handleConfirmChangePassword(watch())} // Al confirmar, se realiza el cambio de contraseña
          onCloseConfirm={() => setIsConfirmOpen(false)} // Al cerrar, se cierra el diálogo
          aceppLabel="Aceptar"
          cancelLabel="Cancelar"
          isOpenConfirm={isConfirmOpen}
        />
      </section>
    </div>
  );
};
