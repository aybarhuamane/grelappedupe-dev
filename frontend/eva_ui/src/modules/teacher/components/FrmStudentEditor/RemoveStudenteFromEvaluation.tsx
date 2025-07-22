"use client";

import { deleteStudentEvaluation } from "@/api/app/educativa/delete-student-evaluation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useFilterFromUrl } from "@/modules/core";
import { student } from "@/types";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  courseAssignmentId: number;
  studentData?: student.IStudent;
}

export const RemoveStudenteFromEvaluation = (props: Props) => {
  const { courseAssignmentId, studentData } = props;
  const { updateFilters, removeFilter } = useFilterFromUrl();

  const handleBack = () => {
    updateFilters({ remove: "", add: "", edit: "" });
  };

  const handleRemoveStudent = async () => {
    const data = {
      course_assignment_id: courseAssignmentId,
      student_id: studentData!.id,
    };

    const response = await deleteStudentEvaluation(data);

    if (response.status === 200) {
      toast.success("Estudiante removido de la evaluación correctamente.");
      removeFilter("remove");
    } else {
      toast.error("Error al remover el estudiante de la evaluación.");
    }
  };

  return (
    <>
      <Dialog open>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <header className="flex gap-5 items-center">
              <Button size="icon" variant="secondary" onClick={handleBack}>
                <ArrowLeft size={16} />
              </Button>

              <section className="flex flex-col gap-2">
                <h1 className="font-bold">
                  Remover estudiante de la evaluación
                </h1>
              </section>
            </header>
          </DialogHeader>
          <section className="flex flex-col gap-2">
            <p className="text-sm">
              ¿Estás seguro de que deseas remover al estudiante de la
              evaluación?
            </p>
            {props.studentData && (
              <span className="text-lg font-bold">
                {props.studentData?.name} {props.studentData?.last_name}
              </span>
            )}
            <p className="text-sm ">
              Tendra que volver a agregar al estudiante a la evaluación para que
              pueda ser evaluado nuevamente.
            </p>
          </section>
          <section className="flex gap-5 items-center justify-end mt-4">
            <Button variant="secondary" onClick={handleBack}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRemoveStudent}>
              Remover estudiante
            </Button>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};
