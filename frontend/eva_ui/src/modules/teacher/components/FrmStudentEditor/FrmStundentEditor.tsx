"use client";
import { studentsFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastCustom, useFilterFromUrl } from "@/modules/core";
import { student } from "@/types";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormStudentEditor {
  defaultData?: student.IStudent;
}

export const FrmStundentEditor = (props: IFormStudentEditor) => {
  const [loading, setLoading] = useState(false);
  const { removeFilters } = useFilterFromUrl();
  const { defaultData } = props;
  const { createStudent, updateStudent } = studentsFunctionsApi;
  const { id } = useParams();
  const params = useSearchParams();

  const level_id = Number(params.get("level_id"));
  const degree_number = Number(params.get("degree_number"));

  const methods = useForm<student.IStudent>({
    defaultValues: {
      ...defaultData,
      gender: defaultData?.gender,
    },
  });

  const errors = methods.formState.errors;

  const handleBack = () => {
    removeFilters({ edit: "", add: "" });
  };

  const onSubmit: SubmitHandler<student.IStudent> = async (data) => {
    setLoading(true);
    const isUpdate = Boolean(defaultData?.id);
    const title = isUpdate ? "actualizado" : "creado";

    try {
      const res = isUpdate
        ? await updateStudent(data, defaultData?.id)
        : await createStudent({
            age: Number(data?.age),
            course_assignment_id: Number(id),
            gender: data?.gender,
            name: data?.name,
            num_document: data?.num_document,
            last_name: data?.last_name,
            degree_number: String(degree_number),
            level_id: level_id,
          });

      if (res.status === 400) {
        const errorData = await res.json();
        let messages: string[] = [];

        for (const key in errorData) {
          const value = errorData[key];
          if (Array.isArray(value)) {
            messages.push(`${value.join(", ")}`);
          } else if (typeof value === "string") {
            messages.push(value);
          }
        }

        const errorMessage = messages.length
          ? messages.join(" | ")
          : "Error desconocido";

        toast.error(<ToastCustom title="Estudiante" message={errorMessage} />);
        setLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        const description = `El estudiante ha sido ${title} correctamente`;

        toast.success(<ToastCustom title="Estudiante" message={description} />);

        if (isUpdate) {
          window.location.reload(); // recarga solo si se actualiza
        } else {
          removeFilters({ edit: "", add: "" }); // solo redirige si se creó
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        <ToastCustom
          title="Estudiante"
          message={`Ha ocurrido un error al ${title} el estudiante`}
        />
      );
    }
    setLoading(false);
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <header className="flex gap-5 items-center">
            <Button size="icon" variant="secondary" onClick={handleBack}>
              <ArrowLeft size={16} />
            </Button>

            <section>
              <h1 className="font-bold">
                {defaultData ? "Editar" : "Crear"} estudiante
              </h1>
              <p className="text-sm text-gray-500">
                Los campos marcados con * son obligatorios
              </p>
            </section>
          </header>
        </DialogHeader>
        <main>
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <section className="grid grid-cols-1 gap-4">
                {/* Nombres */}
                <div className="grid grid-cols-1 gap-1">
                  <Label htmlFor="name" className="flex flex-col gap-3">
                    Nombre completo*
                    <Input
                      id="name"
                      type="text"
                      // name="name"
                      placeholder="Ingrese el nombre completo"
                      className="w-full"
                      {...methods.register("name", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                  </Label>
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                {/* Apellidos */}
                <div className="grid grid-cols-1 gap-1">
                  <Label htmlFor="name" className="flex flex-col gap-3">
                    Apellidos completo*
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Ingrese el nombre completo"
                      className="w-full"
                      {...methods.register("last_name", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                  </Label>
                  {errors.last_name && (
                    <span className="text-red-500 text-xs">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
                {/* Documento */}
                <div className="grid grid-cols-1 gap-1">
                  <Label htmlFor="name" className="flex flex-col gap-3">
                    N° de documento*
                    <Input
                      id="num_document"
                      type="text"
                      // name="last_name"
                      placeholder="Ingrese el N° de documento"
                      className="w-full"
                      {...methods.register("num_document", {
                        required: "Este campo es obligatorio",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "Solo se permiten números y letras",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "El número de documento no puede ser mayor a 20 dígitos",
                        },
                      })}
                    />
                  </Label>
                  {errors.num_document && (
                    <span className="text-red-500 text-xs">
                      {errors.num_document.message}
                    </span>
                  )}
                </div>
                {/* Edad */}

                {!defaultData?.id && (
                  <section className="grid grid-cols-1">
                    <Label htmlFor="age" className="flex flex-col gap-3">
                      Edad*
                      <Input
                        id="age"
                        type="text"
                        placeholder="Ingrese la edad"
                        className="w-full"
                        {...methods.register("age", {
                          required: "Este campo es obligatorio",
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Solo se permiten números",
                          },
                          maxLength: {
                            value: 2,
                            message: "La edad no puede ser mayor a 2 dígitos",
                          },
                          max: {
                            value: 99,
                            message: "La edad no puede ser mayor a 99 años",
                          },
                          min: {
                            value: 1,
                            message: "La edad no puede ser menor a 1 año",
                          },
                        })}
                      />
                    </Label>
                    {errors.age && (
                      <span className="text-red-500 text-xs">
                        {errors.age.message}
                      </span>
                    )}
                  </section>
                )}

                <Label className="flex flex-col gap-3">
                  Sexo*
                  <div className="w-full flex gap-4">
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2 cursor-pointer">
                      <input
                        type="radio"
                        id="sexo-m"
                        value="M"
                        className="mr-2"
                        {...methods.register("gender")}
                      />
                      <label htmlFor="sexo-m" className="cursor-pointer">
                        Masculino (M)
                      </label>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2 cursor-pointer">
                      <input
                        type="radio"
                        id="sexo-f"
                        value="F"
                        className="mr-2"
                        {...methods.register("gender")}
                      />
                      <label htmlFor="sexo-f" className="cursor-pointer">
                        Femenino (F)
                      </label>
                    </div>
                  </div>
                </Label>
              </section>
              <footer className="flex items-center justify-end gap-4">
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <LoaderCircle className="animate-spin" />}
                  {defaultData ? "Actualizar" : "Crear"}
                </Button>
              </footer>
            </form>
          </FormProvider>
        </main>
      </DialogContent>
    </Dialog>
  );
};
