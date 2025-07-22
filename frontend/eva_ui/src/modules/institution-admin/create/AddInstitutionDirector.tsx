"use client";

import { directoresFunctionsApi, personaFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCustom, LayoutFrmHorizontal } from "@/modules/core";
import AcceptDialog from "@/modules/core/components/dialogos/aceptedmodal";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { detailInstitution, person } from "@/types";
import { IPersonPost } from "@/types/core/IPerson";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IProps {
  institutionData: detailInstitution.IDetailInstitutionList[];
}

export const AddInstitutionDirector = (props: IProps) => {
  const { institutionData } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const { createOrUpdatePerson } = personaFunctionsApi;
  const { createNewDirector } = directoresFunctionsApi;
  const router = useRouter();

  const methods = useForm<person.IPersonList>();

  const onSubmit = () => {
    setIsOpen(true);
  };

  const handleReload = () => {
    setIsOpenModal(true);
  };

  const handleRedirect = () => {
    router.push("/institution/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleBack = () => {
    router.push("/director/manage-teachers");
  };

  const handleSubmit: SubmitHandler<person.IPersonList> = async (
    data: person.IPersonList
  ) => {
    setIsOpen(false);
    setIsLoading(true);

    const newData: IPersonPost = {
      num_document: data.num_document,
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
    };

    try {
      const res = await createOrUpdatePerson(newData);
      if (res.ok) {
        const data: person.IPersonList = await res.json();

        const dataTeacher = {
          is_active: true,
          person: data.id,
          detailinstitution: institutionData[0].id,
        };
        const resDirector = await createNewDirector(dataTeacher);
        if (resDirector.ok) {
          handleReload();
        } else {
          const errorData = await resDirector.json();
          setErrors(errorData);
          toast.error("Error al crear el docente");
        }
      } else {
        const errorData = await res.json();
        setErrors(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container space-y-4 mx-auto">
      <AlertCustom
        title="Crear Director"
        content="Si la persona que desea asignar como director NO existe en la plataforma, cree un nuevo docente."
        color="danger"
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {errors && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <ul className="list-disc pl-5">
                {Object.keys(errors).map((key, index) => (
                  <li key={index}>{errors[key]}</li>
                ))}
              </ul>
            </div>
          )}

          <section className="p-6 bg-white">
            <LayoutFrmHorizontal
              title="Datos Personales"
              subtitle="Ingrese los datos personales del docente"
            >
              <div>
                <Label htmlFor="num_document">N° de Documento</Label>
                <Input
                  id="num_document"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese su n° de documento"
                  required
                  {...methods.register("num_document")}
                />
              </div>
              <div>
                <Label htmlFor="name">Nombres</Label>
                <Input
                  id="name"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese sus nombres"
                  required
                  {...methods.register("name")}
                />
              </div>
              <div>
                <Label htmlFor="last_name">Apellidos</Label>
                <Input
                  id="last_name"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese sus apellidos"
                  required
                  {...methods.register("last_name")}
                />
              </div>
            </LayoutFrmHorizontal>
          </section>
          <section className="p-6 bg-white">
            <LayoutFrmHorizontal
              title="Datos de Contacto"
              subtitle="Ingrese el correo y un celular de contacto, asegurence de que los datos sean reales"
            >
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese su Teléfono"
                  required
                  {...methods.register("phone")}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-10"
                  placeholder="Ingrese su Email"
                  required
                  {...methods.register("email")}
                />
              </div>
            </LayoutFrmHorizontal>
          </section>
          <section className="flex justify-end items-center gap-4 p-4 bg-white">
            <Button
              variant={"outline"}
              className="h-10 border-green-800 text-green-800 bg-green-800/10"
              type="button"
              onClick={handleBack}
            >
              Cancelar
            </Button>
            <Button className="h-10" disabled={isLoading}>
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Guardar datos
            </Button>
          </section>
        </form>
      </FormProvider>
      <DialogConfirmacion
        aceppLabel="Aceptar"
        cancelLabel="Cancelar"
        description="¿Está seguro de crear la asignación de director?"
        tittleConfirm="Confirmación"
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        onSubmitConfirm={() => handleSubmit(methods.getValues())}
      />
      <AcceptDialog
        isOpenConfirm={isOpenModal}
        tittleConfirm="Felicidades"
        description="Has creado la asignación de director correctamente."
        aceppLabel="Aceptar"
        onSubmitConfirm={() => handleRedirect()}
      />
    </main>
  );
};
