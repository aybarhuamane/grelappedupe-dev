import { HeaderSection } from "@/modules/core";
import { CoursesList } from "@/modules/quiz-manage/CoursesList";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <HeaderSection
        title="Gestionar recursos"
        subtitle="Listado de recursos"
        hrefAddButton="/admin/quiz-manage/create"
        labelAddButton="Agregar curso"
      />
      <Suspense
        fallback={
          <div className="container flex items-center justify-center mt-4">
            <ReloadIcon className="animate-spin h-6 w-6" />
            Cargando...
          </div>
        }
      >
        <CoursesList />
      </Suspense>
    </>
  );
}
