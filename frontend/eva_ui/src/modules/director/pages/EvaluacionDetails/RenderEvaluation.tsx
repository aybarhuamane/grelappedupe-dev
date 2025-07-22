"use client";
import { courseAssignmentsFunctionsApi } from "@/api";
import { deleteCourseAssigmanet } from "@/api/app/educativa/fetchCourseAssigments";
import { Button } from "@/components/ui/button";
import { HeaderSection, ToastCustom } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { ResumeTeacherEvaluationTable } from "@/modules/teacher/pages/resumen/resume-teacher-evaluation-table";
import { courseAssignment, courseEvaluation } from "@/types";
import { CheckCircle, Trash, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  dataDefault: courseAssignment.ICourseAssignmentList;
  headerEvaluation?: courseEvaluation.IEvaluationHeaders[];
}

export const RenderEvaluation = (props: IProps) => {
  const { createOrUpdateCourseAssigmanet } = courseAssignmentsFunctionsApi;
  const { dataDefault } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [IsOpenRefresh, setIsOpenRefresh] = useState(false);
  const [IsOpenDelete, setIsOpenDelete] = useState(false);
  const router = useRouter();

  const openDialog = () => {
    setIsOpen(true);
  };
  const openDialogRefresh = () => {
    setIsOpenRefresh(true);
  };
  const openDialogDelete = () => {
    setIsOpenDelete(true);
  };

  const handleValidation = async (
    data: courseAssignment.ICourseAssignmentList
  ) => {
    setIsOpen(false);
    try {
      const res = await createOrUpdateCourseAssigmanet(
        {
          ...data,
          is_validated: !data.is_validated,
        },
        data.id
      );

      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Evaluación validada"
            message="La evaluación ha sido validada correctamente."
          />
        );
        setTimeout(() => refreshWindow(), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleRefreshValidation = async (
    data: courseAssignment.ICourseAssignmentList
  ) => {
    setIsOpenRefresh(false);
    try {
      const res = await createOrUpdateCourseAssigmanet(
        {
          ...data,
          is_validated: false,
          is_sent: false,
        },
        data.id
      );

      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Evaluación Restaurada"
            message="La evaluación ha sido restaurada correctamente."
          />
        );
        setTimeout(() => refreshWindow(), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshWindow = () => {
    window.location.reload();
  };

  const handleDeleteEvaluation = async (id: number) => {
    setIsOpenDelete(false);
    try {
      const res = await deleteCourseAssigmanet(id);
      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Evaluación eliminada"
            message="La evaluación ha sido eliminada correctamente."
          />
        );
        router.push("/director/evaluations");
      } else {
        toast.error(
          <ToastCustom
            title="Error"
            message="La evaluación no ha sido eliminada correctamente."
          />
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex flex-col gap-2">
      <HeaderSection
        title={`${dataDefault.course?.name} - ${
          dataDefault.degree?.degree_number
        } (${dataDefault.degree?.degree_text.toLowerCase()}) ${
          dataDefault?.degree?.section
        }`}
        subtitle={`Estado de revisión: ${
          dataDefault.is_validated ? "Validado" : "Pendiente"
        }`}
        subtitleClassName={`${
          dataDefault.is_validated
            ? "text-green-600 bg-green-100 rounded-full w-[236px] px-4 font-semibold"
            : "text-red-600 bg-red-100 rounded-full w-[236px] px-4 font-semibold"
        }`}
        disableAddButton
        showBackButton
        renderLeftSection={<InstitutionDetails {...dataDefault} />}
        renderRightSection={
          <section className="flex gap-2">
            {dataDefault?.is_sent && !dataDefault?.is_validated && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={openDialog}
                disabled={!dataDefault.is_sent}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Validar evaluación
              </Button>
            )}
            {dataDefault?.is_sent && (
              <Button
                className="flex gap-3 items-center"
                onClick={openDialogRefresh}
                disabled={!dataDefault.is_sent}
                variant="destructive"
              >
                <Undo2 size={16} />
                Restaurar evaluación
              </Button>
            )}
            <Button
              className="flex gap-3 items-center"
              onClick={openDialogDelete}
              variant="destructive"
            >
              <Trash size={16} />
              Eliminar evaluación
            </Button>
          </section>
        }
      />
      {/* <TableEvaluacionSection /> */}
      <ResumeTeacherEvaluationTable showHeader={false} />
      <DialogConfirmacion
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Validación de envío"
        description="¿Está seguro de validar la evaluación? Una vez validada no podrá realizar cambios."
        aceppLabel="Enviar evaluación"
        cancelLabel="Mejor no"
        onSubmitConfirm={() => handleValidation(dataDefault)}
      />
      <DialogConfirmacion
        isOpenConfirm={IsOpenRefresh}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Restaurar evaluación"
        description="¿Está seguro de restaurar la evaluación?"
        aceppLabel="Restaurar evaluación"
        cancelLabel="Mejor no"
        onSubmitConfirm={() => handleRefreshValidation(dataDefault)}
      />
      <DialogConfirmacion
        isOpenConfirm={IsOpenDelete}
        onCloseConfirm={() => setIsOpenDelete(false)}
        tittleConfirm="Eliminar evaluación"
        description="¿Está seguro de eliminar la evaluación? Recuerda que esta acción es irreversible. Solo se va eliminar la asignación de la evaluación. Si la evaluación ya fue enviada, NO se eliminará el envío ni los resultados de la evaluación. Si continua, cerciórate de que sea una evaluación que no se va a utilizar o asignado por error."
        aceppLabel="Eliminar evaluación"
        cancelLabel="Mejor no"
        onSubmitConfirm={() => handleDeleteEvaluation(dataDefault.id)}
      />
    </main>
  );
};

const InstitutionDetails = (
  dataDefault: courseAssignment.ITeacherAssignmentList
) => {
  return (
    <div className="border-l px-4">
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>I.E: </h1>
        <p>
          {dataDefault?.degree?.detail_institution?.institution?.name} -{" "}
          {dataDefault?.degree?.detail_institution?.level.name} -{" "}
          {dataDefault?.degree?.detail_institution?.category?.name} -{" "}
          {dataDefault?.degree?.detail_institution?.modular_code}
        </p>
      </div>
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>Ubicación: </h1>
        <p>
          {dataDefault?.degree?.detail_institution.institution?.ubigeo?.code} -{" "}
          {dataDefault?.degree?.detail_institution.institution?.ubigeo?.region}{" "}
          -{" "}
          {
            dataDefault?.degree?.detail_institution.institution?.ubigeo
              ?.province
          }{" "}
          -{" "}
          {
            dataDefault?.degree?.detail_institution.institution?.ubigeo
              ?.district
          }
        </p>
      </div>
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>Director: </h1>
        <p>
          {dataDefault?.degree.detail_institution?.director?.person?.last_name}{" "}
          {dataDefault?.degree.detail_institution?.director?.person?.name}
        </p>
      </div>
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>Docente: </h1>
        <p>
          {dataDefault?.teaching?.person?.name}{" "}
          {dataDefault?.teaching?.person?.last_name}{" "}
        </p>
      </div>
    </div>
  );
};
