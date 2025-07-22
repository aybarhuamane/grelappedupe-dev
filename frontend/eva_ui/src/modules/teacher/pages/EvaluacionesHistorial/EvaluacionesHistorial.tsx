import { AlertCustom, HeaderSection, LayoutAsideSection } from "@/modules/core";
import { AsideTeacher, TeacherTable } from "@/modules/teacher";
import { courseAssignment, response } from "@/types";
import { Suspense } from "react";

interface IProps {
  data: response.IResApi<courseAssignment.ITeacherAssignmentList>;
  disabledHeader?: boolean;
  disableAlert?: boolean;
}

export const EvaluacionesHistorial = (props: IProps) => {
  const { data, disabledHeader, disableAlert } = props;

  const titleAlert =
    data.count === 0
      ? "No hay evaluaciones abiertas"
      : "Tiene evaluaciones abiertas";
  const descriptionAlert =
    data.count === 0
      ? "No hay evaluaciones disponibles por el momento, si desea puede ver el historial de las evaluaciones"
      : "Tiene evaluaciones disponibles. No olvides completarlas antes de la fecha límite";

  return (
    <div className="flex flex-col gap-5">
      {!disabledHeader && (
        <HeaderSection
          title="Historial de evaluaciones"
          subtitle="Registro de evaluaciones ya registradas (activas e inactivas) durante diferentes periodos"
          disableAddButton
        />
      )}

      {!disableAlert && (
        <section className={`container ${data.count === 0 ? "mt-0" : "mt-2"}`}>
          <AlertCustom
            title={titleAlert}
            content={descriptionAlert}
            color={data.count === 0 ? "info" : "warning"}
          />
        </section>
      )}
      <Suspense fallback={<div>Cargando...</div>}>
        <LayoutAsideSection aside={<AsideTeacher />} asidePosition="left">
          <TeacherTable data={data} />
        </LayoutAsideSection>
      </Suspense>
    </div>
  );
};
