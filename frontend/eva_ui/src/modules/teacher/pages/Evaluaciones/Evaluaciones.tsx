import { AlertCustom, CardGroup, HeaderSection } from "@/modules/core";
import { BannerPeriodo } from "@/modules/teacher";
import { courseAssignment, period, response } from "@/types";
import { Suspense } from "react";

interface IProps {
  data: response.IResApi<courseAssignment.ITeacherAssignmentList>;
  dataPeriodo: response.IResApi<period.IPeriodList>;
}

export const EvaluacionesActive = async (props: IProps) => {
  const { data, dataPeriodo } = props;
  const coursesList = data.results || [];

  const titleAlert =
    data.count === 0
      ? "No hay evaluaciones abiertas"
      : "Tiene evaluaciones abiertas";
  const descriptionAlert =
    data.count === 0
      ? "No hay evaluaciones disponibles por el momento, si desea puede ver el historial de las evaluaciones"
      : "Tiene evaluaciones disponibles. No olvides completarlas antes de la fecha límite";

  return (
    <div className="flex flex-col ">
      <HeaderSection
        title="Evaluaciones activas"
        subtitle="No olvides revisar las evaluaciones activas y completarlas antes de la fecha límite"
        disableAddButton
      />
      {dataPeriodo?.count > 0 && (
        <BannerPeriodo dataPeriodo={dataPeriodo?.results[0]} />
      )}
      <section className="container pt-6">
        <AlertCustom
          title={titleAlert}
          content={descriptionAlert}
          color={data.count === 0 ? "info" : "warning"}
        />
      </section>

      <Suspense fallback={<div>Cargando...</div>}>
        <main className="grid grid-cols-4 gap-6 container w-full py-6">
          {coursesList.length > 0 &&
            coursesList?.map((courseAssigned) => (
              <CardGroup
                key={courseAssigned.id}
                labelRef={
                  courseAssigned.is_validated || courseAssigned.is_sent
                    ? "Ver evaluación"
                    : "Evaluar alumnos"
                }
                title={`${courseAssigned.course.name} - ${courseAssigned.degree.degree_number} ${courseAssigned.degree.section}`}
                description={`${courseAssigned?.degree?.detail_institution?.level?.name} - ${courseAssigned?.degree?.detail_institution?.level.modality.name}`}
                progress={10}
                states={courseAssigned.is_validated}
                href={`/teacher/evaluaciones/${courseAssigned.id}`}
              />
            ))}
          {coursesList.length === 0 && (
            <section className="flex flex-col justify-center items-center col-span-4">
              <h2 className="font-bold">No hay evaluaciones activas</h2>
              <p className="text-sm">
                No tienes evaluaciones activas en este momento.
              </p>
            </section>
          )}
        </main>
      </Suspense>
    </div>
  );
};
