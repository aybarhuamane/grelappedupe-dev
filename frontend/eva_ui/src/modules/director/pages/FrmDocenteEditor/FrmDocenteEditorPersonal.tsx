"use client";
import { personaFunctionsApi, teachersFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCustom, LayoutFrmHorizontal } from "@/modules/core";
import { person } from "@/types";
import { IPersonPost } from "@/types/core/IPerson";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

//Change next to import
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { TeacherSectionSelector } from "../../components/FrmCourseAsignedEditor/sections/TeacherSectionSelector";

interface IFrmDocenteEditorPersonalProps {
  personData?: person.IPersonList;
  idDocente?: number;
}

export const FrmDocenteEditorPersonal = (
  props: IFrmDocenteEditorPersonalProps
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );

  const { idDocente, personData } = props;
  const { createOrUpdatePerson } = personaFunctionsApi;
  const { createOrUpdateTeacher, createTeacherAssigmentSchool } =
    teachersFunctionsApi;
  const router = useRouter();
  const params = useSearchParams();

  const detail_institution = params.get("detail_institution");

  const methods = useForm<person.IPersonList>({
    defaultValues: personData,
  });

  const onSubmit = () => {
    setIsOpen(true);
  };
  const handleBack = () => {
    router.push("/director/manage-teachers");
  };

  const handleSubmit: SubmitHandler<person.IPersonList> = async (
    data: person.IPersonList
  ) => {
    setIsOpen(false);

    const newData: IPersonPost = {
      num_document: data.num_document,
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
    };

    try {
      if (idDocente) {
        const res = await createOrUpdatePerson(newData, idDocente);
      } else {
        const res = await createOrUpdatePerson(newData);
        if (res.ok) {
          const data: person.IPersonList = await res.json();

          const dataTeacher = {
            is_active: true,
            person: data.id,
          };
          const resTeacher = await createOrUpdateTeacher(dataTeacher);
          if (resTeacher.ok) {
            const dataTeacher = await resTeacher.json();
            if (dataTeacher) {
              router.push("/director/manage-teachers");
            }
            const asignarInstitution = await createTeacherAssigmentSchool({
              is_active: true,
              detail_institution: Number(detail_institution),
              teaching: dataTeacher.id,
            });
            if (asignarInstitution.ok) {
              const data = await asignarInstitution.json();
              if (data) {
                router.push("/director/manage-teachers");
              }
            } else {
              const data = await asignarInstitution.json();
              if (data) {
                setErrors(data);
              }
            }
          } else {
            const data = await resTeacher.json();
            if (data) {
              setErrors(data);
            }
          }
        } else {
          const data = await res.json();
          if (data) {
            setErrors(data);
          }
        }
      }
    } catch (error) {
      console.error("este es el error", error);
    }
  };

  return (
    <main className="container">
      <AlertCustom
        title="Crear docente"
        content="Si el docente no se encuentra registrado, puede agregarlo a la plataforma."
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
                <Label htmlFor="text">N° de Documento</Label>
                <Input
                  id="text"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese su n° de documento"
                  required
                  {...methods.register("num_document")}
                />
              </div>
              <div>
                <Label htmlFor="text">Nombres</Label>
                <Input
                  id="text"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese sus nombres"
                  // required
                  {...methods.register("name")}
                />
                {methods?.formState.errors?.name && (
                  <span className="text-red-500 text-xs">
                    {methods.formState.errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="text">Apellidos</Label>
                <Input
                  id="text"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese su apellido completo"
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
                <Label htmlFor="text">Teléfono</Label>
                <Input
                  id="text"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese su Teléfono"
                  required
                  {...methods.register("phone")}
                />
              </div>
              <div>
                <Label htmlFor="text">Email</Label>
                <Input
                  id="text"
                  type="text"
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
            <Button className="h-10">Guardar datos</Button>
          </section>
        </form>
      </FormProvider>
      <DialogConfirmacion
        tittleConfirm="Confirmar operación"
        description="¿Está seguro de guardar los datos del docente?"
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        onSubmitConfirm={() => handleSubmit(methods.getValues())}
        aceppLabel="Guardar"
        cancelLabel="Cancelar"
      />
    </main>
  );
};
