"use client";
import { courseAssignmentsFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { LayoutFrmHorizontal, ToastCustom } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { courseAssignment, detailInstitution, response } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CourseSection, DegreeSection, TeacherSection } from "./sections";

interface IAsignedCursoListProps {
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>;
}

export const FrmCourseASignedEditor = (props: IAsignedCursoListProps) => {
  const { institutionAssigned } = props;
  const [open, setOpen] = useState(false);
  const [errors, serErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { createOrUpdateCourseAssigmanet } = courseAssignmentsFunctionsApi;

  const methods = useForm<courseAssignment.ICourseAssignmentList>();
  const router = useRouter();

  const { isDirty } = methods.formState;

  const onSubmit = () => {
    setOpen(true);
  };

  const handleOnSubmit: SubmitHandler<
    courseAssignment.ICourseAssignmentList
  > = async (data) => {
    setOpen(false);
    setIsLoading(true);

    try {
      const res = await createOrUpdateCourseAssigmanet(data);

      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Asignación de curso"
            message="La asignación de curso se ha realizado correctamente"
          />
        );
        router.push("/director/evaluations");
      } else {
        const dataError = await res.json();
        toast.error(
          <ToastCustom
            title="Asignación de curso"
            message="Ha ocurrido un error al asignar el curso"
          />
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        serErrors([error.message]);
      }
      toast.error(
        <ToastCustom
          title="Asignación de curso"
          message="Ha ocurrido un error al asignar el curso"
        />
      );
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    router.push("/director/evaluations");
  };

  return (
    <main className="bg-white p-4 rounded-md">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-5"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <LayoutFrmHorizontal
            title="Seleccionar un profesor"
            subtitle="Seleccione un profesor para asignar al curso"
          >
            <TeacherSection institutionAssigned={institutionAssigned} />
          </LayoutFrmHorizontal>

          <LayoutFrmHorizontal
            title="Seleccionar un curso"
            subtitle="Seleccione un curso para asignar al profesor"
          >
            <CourseSection />
          </LayoutFrmHorizontal>

          <LayoutFrmHorizontal
            title="Seleccionar un grado | sección"
            subtitle="Seleccione un grado para asignar al profesor. De los grados disponibles en la Institución educativa"
          >
            <DegreeSection institutionAssigned={institutionAssigned} />
          </LayoutFrmHorizontal>

          <footer className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={handleBack}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !isDirty}>
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
        description="¿Está seguro de asignar el curso al profesor?"
        tittleConfirm="Confirmar asignación"
        aceppLabel="Asignar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() => handleOnSubmit(methods.getValues())}
      />
    </main>
  );
};
