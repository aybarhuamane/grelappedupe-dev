/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InputSelect } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { teachersFunctionsApi } from "@/api";
import { person, teacher } from "@/types";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { TeacherSelectorSection } from "@/modules/director/pages/FrmDocenteEditor/TeacherSelectorSection";
import { toast } from "react-toastify";
import { PersonsListAction } from "@/modules/admin/components/directorManange/AsignDirector/PersonsListAction";

interface CreateAssign {
  is_active: boolean;
  detail_institution: number;
  teaching: number;
}

export const TeacherSectionSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] =
    useState<teacher.ITeacherList | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const [selectedPerson, setSelectedPerson] =
    useState<person.IPersonList | null>(null);

  const detail_institution = params.get("detail_institution");

  const { createTeacherAssigmentSchool, createTeacherAssigmentSchoolAction } = teachersFunctionsApi;

  const methods = useForm<CreateAssign>({
    defaultValues: {
      is_active: true,
      detail_institution: Number(detail_institution),
      teaching: 0,
    },
  });

  const handleSubmit: SubmitHandler<CreateAssign> = async (data) => {
    setIsOpen(false);

    if (!selectedPerson) {
      alert("Debe seleccionar un docente antes de guardar.");
      return;
    }

    try {
      const res = await createTeacherAssigmentSchoolAction({
        ...data,
        detail_institution: Number(detail_institution),
        person: selectedPerson.id,
      });

      if (res.ok) {
        router.push("/director/manage-teachers");
        toast.success("Docente asignado correctamente");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error al asignar el docente", error);
      toast.error(
        "Ocurrió un error al asignar el docente. Intente nuevamente."
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <main>
        <div className="grid grid-cols-1 gap-1">
          <InputSelect
            label="Selecciona un profesor"
            labelButton="Seleccionar"
            placeholder="Seleccionar un profesor..."
            onPressButton={() => setOpen(true)}
            value={
              selectedPerson
                ? `${selectedPerson.name} ${selectedPerson.last_name}`
                : ""
            }
            onChange={() => {}}
            errorMensagem=""
          />
        </div>

        <div>
          <section className="flex justify-end items-center gap-4 p-4 bg-white">
            <Button
              variant={"outline"}
              className="h-10 border-green-800 text-green-800 bg-green-800/10"
              type="button"
              onClick={() => router.push("/director/manage-teachers")}
            >
              Cancelar
            </Button>
            <Button
              className="h-10"
              onClick={methods.handleSubmit(handleSubmit)}
            >
              Agregar
            </Button>
          </section>

          <DialogConfirmacion
            tittleConfirm="Confirmar operación"
            description="¿Está seguro de guardar los datos del docente?"
            isOpenConfirm={isOpen}
            onCloseConfirm={() => setIsOpen(false)}
            onSubmitConfirm={methods.handleSubmit(handleSubmit)}
            aceppLabel="Guardar"
            cancelLabel="Cancelar"
          />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            className="w-[420px]"
            style={{
              minWidth: "720px",
            }}
          >
            <SheetHeader>
              <SheetTitle>Selecciona un profesor</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <hr />
            {/* <TeacherSelectorSection
              onSelected={(value: teacher.ITeacherList) => {
                setOpen(false);
                setSelectedTeacher(value);
              }}
            /> */}
            <PersonsListAction
            onSelected={(value: person.IPersonList) => {
              setOpen(false);
              setSelectedPerson(value);
            }}
          />
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </main>
    </FormProvider>
  );
};
