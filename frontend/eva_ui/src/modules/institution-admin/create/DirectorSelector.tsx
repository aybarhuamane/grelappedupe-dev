/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { directoresFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { AlertCustom, LayoutFrmHorizontal, ToastCustom } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { IDirectorPost } from "@/types/educativa/IDirector";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { DirectorSectionPerson } from "@/modules/admin/components/institutionManage/AsignDirector/AsignDirectorPersona";
import AcceptDialog from "@/modules/core/components/dialogos/aceptedmodal";

interface IProps {
  codigo: number;
}

export const DirectorSelector = (props: IProps) => {
  const { codigo } = props;

  const { createOrUpdateDirector, createNewDirector } = directoresFunctionsApi;

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errors, serErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<IDirectorPost>();

  const onSubmit = () => {
    setOpen(true);
  };

  const handleReload = () => {
    setOpenModal(true);
  };

  const handleRedirect = () => {
    router.push("/institution/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleOnSubmit: SubmitHandler<IDirectorPost> = async (data) => {
    setOpen(false);
    setIsLoading(true);

    try {
      // const res = await createOrUpdateDirector(data)
      const dataTeacher = {
        is_active: true,
        person: data.person,
        detailinstitution: codigo,
      };

      const res = await createNewDirector(dataTeacher);

      if (res.ok) {
        // window.location.reload()
        toast.success(
          <ToastCustom
            title="Asignación de director"
            message="La asignación de director se ha realizado correctamente"
          />
        );
        handleReload();
      } else {
        const dataError = await res.json();
        toast.error(
          <ToastCustom
            title="Asignación de director"
            message={
              dataError.message || "Ha ocurrido un error al asignar el director"
            }
          />
        );
      }
    } catch (error) {
      toast.error(
        <ToastCustom
          title="Asignación de director"
          message="Ha ocurrido un error al asignar el director"
        />
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/institution/");
  };

  return (
    <main className="container mx-auto space-y-4">
      <AlertCustom
        title="Asignar director"
        content="Si la persona que desea asignar como director ya existe en la plataforma, selecciónela."
        color="warning"
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 bg-white p-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <LayoutFrmHorizontal
            title="Seleccionar una persona"
            subtitle="Seleccione una persona para asignarla como director de la institución"
          >
            {/* <DirectorSection /> */}
            <DirectorSectionPerson />
          </LayoutFrmHorizontal>

          <footer className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleBack}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Asignar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <DialogConfirmacion
        isOpenConfirm={open}
        onCloseConfirm={() => setOpen(false)}
        description="¿Está seguro de asignar el rol de director a esta persona?"
        tittleConfirm="Confirmar asignación"
        aceppLabel="Asignar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() => handleOnSubmit(methods.getValues())}
      />
      <AcceptDialog
        isOpenConfirm={openModal}
        tittleConfirm="Felicidades"
        description="Has creado la asignación de director correctamente."
        aceppLabel="Aceptar"
        onSubmitConfirm={() => handleRedirect()}
      />
    </main>
  );
};
