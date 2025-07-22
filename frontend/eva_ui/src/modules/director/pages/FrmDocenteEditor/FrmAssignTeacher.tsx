"use client";

import { AlertCustom, LayoutFrmHorizontal } from "@/modules/core";
import { TeacherSectionSelector } from "../../components/FrmCourseAsignedEditor/sections/TeacherSectionSelector";

export const FrmAssignTeacher = () => {
  return (
    <>
      <main className="container mx-auto">
        <AlertCustom
          title="Asignar docente"
          content="Si el docente se encuentra registrado, puede seleccionarlo de la lista."
          color="warning"
        />
        <section className="p-6 bg-white">
          <LayoutFrmHorizontal
            title="Selecciona un docente"
            subtitle="Si el docente ya se encuentra registrado, selecciónelo"
          >
            <div className="w-full">
              <TeacherSectionSelector />
            </div>
          </LayoutFrmHorizontal>
        </section>
      </main>
    </>
  );
};
