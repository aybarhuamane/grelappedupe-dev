/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useFilterFromUrl } from "../core";
import { useFilterEvaluacion } from "./components/Filters/useFilterEvaluacion";
import { ChartSection } from "./sections/ChartSection";
import { MapSection } from "./sections/MapSection";
import TableSection from "./sections/TableSection";

export const HomePage = () => {
  const { getCompleteFilter, loadingFilter, listFilter } =
    useFilterEvaluacion();
  const { getParams, updateFilters } = useFilterFromUrl();
  const region = getParams("region", "");
  const province = getParams("province", "");
  const curso = getParams("curso_id", "");
  const district = getParams("district", "");
  const codigo_local = getParams("codigo_local", "");
  const codigo_modular = getParams("codigo_modular", "");
  const competencia_id = getParams("competencia_id", "");
  const periodo_id = getParams("periodo_id", "");

  useEffect(() => {
    getCompleteFilter({
      region: region,
      province: province,
      curso_id: curso,
      district: district,
      competencia_id: competencia_id,
      codigo_local: codigo_local,
      period_id: periodo_id,
      codigo_modular: codigo_modular,
    });
  }, [region, curso, district, codigo_local, codigo_modular, periodo_id]);

  const allEvaluacionesNonEmpty = listFilter?.every((item) =>
    item.competencia.every((competencia) => competencia.logros.length > 0)
  );

  return (
    <main className="w-full flex flex-col gap-4">
      <Suspense
        fallback={
          <>
            <ReloadIcon className="w-10 h-10 animate-spin" />
          </>
        }
      >
        <section id="body-home" className="flex gap-5">
          <section className="w-full">
            {loadingFilter ? (
              <div className="h-96">Cargando...</div>
            ) : (
              <>
                {curso !== "" ? (
                  <>
                    {listFilter && listFilter?.length > 0 ? (
                      <>
                        {allEvaluacionesNonEmpty ? (
                          <ChartSection
                            listFilter={listFilter}
                            loadingFilter={loadingFilter}
                          />
                        ) : (
                          <section className="flex flex-col items-center justify-center">
                            <Image
                              src="svg/no-data.svg"
                              alt="IE"
                              width={300}
                              height={200}
                            />
                            <h1 className="text-sm text-center">
                              Aún no se han registrado evaluaciones
                            </h1>
                          </section>
                        )}
                      </>
                    ) : (
                      <section className="flex flex-col items-center justify-center">
                        <Image
                          src="/svg/no-data.svg"
                          alt="IE"
                          width={300}
                          height={200}
                        />
                        <h1 className="text-sm text-center">No hay datos</h1>
                      </section>
                    )}
                  </>
                ) : (
                  <section className="flex flex-col items-center justify-center">
                    <Image
                      src="/svg/research.svg"
                      alt="IE"
                      width={300}
                      height={200}
                    />
                    <h1 className="text-sm text-center">
                      Seleccione una curso
                    </h1>
                  </section>
                )}
              </>
            )}
          </section>
          <section className="w-full max-w-md z-10">
            <MapSection />
          </section>
        </section>
        <header className="w-full p-4 bg-green-600 rounded-md text-white">
          <h1 className="text-lg font-bold">
            Resultados de instituciones educativas
            {region && <span> - {region}</span>}
            {province && <span> - {province}</span>}
            {district && <span> - {district}</span>}
            {/* {listColegio && <span> - {listColegio.count} colegios</span>} */}
          </h1>
        </header>

        <section id="table" className="flex flex-col gap-2">
          <section id="search" className="flex gap-1"></section>
          <section id="table">
            <TableSection />
          </section>
        </section>
      </Suspense>
    </main>
  );
};
