"use client";
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
import { courseAssignment, degree, detailInstitution, response } from "@/types";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DegreeList } from "./DegreeList";

interface IAsignedCursoListProps {
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>;
}

export const DegreeSection = (props: IAsignedCursoListProps) => {
  const { institutionAssigned } = props;
  const [open, setOpen] = useState(false);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<courseAssignment.ICourseAssignmentList>();

  const selectedCourse = control._formValues.course;

  return (
    <main>
      <div className="grid grid-cols-1 gap-1">
        <Controller
          control={control}
          name="degree"
          rules={{
            required: "Seleccione un grado | sección",
          }}
          render={({ field: { value, onChange } }) => (
            <InputSelect
              label="Asignar grado y sección disponible"
              labelButton="Seleccionar"
              placeholder="Seleccionar un grado..."
              onPressButton={() => setOpen(true)}
              value={
                value
                  ? `${value?.degree_number} - ${value?.degree_text} ${value?.section} `
                  : ""
              }
              onChange={onChange}
              errorMensagem={errors?.degree?.message}
            />
          )}
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="w-[420px]"
          style={{
            minWidth: "520px",
          }}
        >
          <SheetHeader>
            <SheetTitle>Selecciona un grado y sección</SheetTitle>
            <SheetDescription>
              Aqui solo se muestran los grados y secciones que tienen preguntas
              asociadas al curso seleccionado.
            </SheetDescription>
          </SheetHeader>
          <hr />
          <DegreeList
            selectedCourse={selectedCourse}
            institutionAssigned={institutionAssigned}
            onSelected={(value: degree.IDegreeTable) => {
              setOpen(false);
              const data: degree.IDegreeList = {
                id: value.id,
                degree_number: value.degree_number,
                degree_text: value.degree_text,
                is_active: true,
                section: value.section,
                detail_institution:
                  {} as detailInstitution.IDetailInstitutionList,
              };
              setValue("degree", data);
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
  );
};
