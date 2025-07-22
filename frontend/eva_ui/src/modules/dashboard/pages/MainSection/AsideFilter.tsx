import {
  CapacitiesSection,
  CompetenceSection,
  CourseSection,
} from "./sections";
import { PeriodSection } from "./sections/period-section";

export const AsideFilter = () => {
  return (
    <main className="w-full grid grid-cols-1 gap-4">
      <section className="grid grid-cols-1 gap-3">
        <header>
          <h2 className="text-sm font-semibold">Periodos disponibles</h2>
          <p className="text-xs text-gray-500">Seleccione un periodo</p>
        </header>
        <main>
          <PeriodSection />
        </main>
      </section>
      <section className="grid grid-cols-1 gap-3">
        <header>
          <h2 className="text-sm font-semibold">Cursos disponibles</h2>
          <p className="text-xs text-gray-500">Seleccione un curso</p>
        </header>
        <main>
          <CourseSection />
        </main>
      </section>
      <section className="grid grid-cols-1 gap-3">
        <header>
          <h2 className="text-sm font-semibold">Competencias</h2>
          <p className="text-xs text-gray-500">Seleccione una competencia</p>
        </header>
        <main>
          <CompetenceSection />
        </main>
      </section>
      <section className="grid grid-cols-1 gap-3">
        <header>
          <h2 className="text-sm font-semibold">Capacidades</h2>
          <p className="text-xs text-gray-500">Seleccione una competencia</p>
        </header>
        <main>
          <CapacitiesSection />
        </main>
      </section>
    </main>
  );
};
