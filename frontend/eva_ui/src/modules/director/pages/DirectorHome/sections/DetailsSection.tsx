"use client";
import { useInstitutionStore } from "@/store/use-institution-store";
import { detailInstitution } from "@/types";
import dynamic from "next/dynamic";
import { IfoInstitutionSection } from "./ifo-institution-section";

const MapSection = dynamic(
  () => import("./MapSection").then((mod) => mod.MapSection),
  { ssr: false }
);

interface IDetailsSectionProps {
  data: detailInstitution.IDetailInstitutionList[] | null;
}

export const DetailsSection = ({ data }: IDetailsSectionProps) => {
  const { selectedInstitution } = useInstitutionStore();
  const newData = data?.find((inst) => inst.id === Number(selectedInstitution));

  if (!newData) {
    return (
      <p className="text-center text-gray-500">No se encontró la institución</p>
    );
  }

  const { institution } = newData;

  return (
    <main className="bg-white shadow rounded p-6 w-full">
      <section className="mb-6">
        <p className="text-sm text-gray-500">Detalles de colegio</p>
        <h1 className="font-bold text-xl uppercase text-gray-800">
          {institution?.name} - {institution?.ubigeo?.code}
        </h1>
      </section>

      <IfoInstitutionSection data={data} />

      <section className="mt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Ubicación</p>
        <div className="border rounded-lg overflow-hidden aspect-[16/9]">
          <MapSection
            data={{
              lat: Number(institution?.latitude) || 0,
              lng: Number(institution?.longitude) || 0,
            }}
          />
        </div>
      </section>
    </main>
  );
};
