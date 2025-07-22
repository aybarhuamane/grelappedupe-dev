/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Label } from "@/components/ui/label";
import { LayoutFrmHorizontal } from "@/modules/core";
import { institution } from "@/types";

interface IProps {
  institution: institution.IDetailsInstitutionList;
}

export const InstitutionInfo = ({ institution }: IProps) => {
  return (
    <>
      <section className="bg-white container mx-auto p-6 rounded-lg shadow-sm">
        <LayoutFrmHorizontal
          title="Institución"
          subtitle="Información básica de la institución"
        >
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem label="Nombre" value={institution.institution.name} />
            <DetailItem label="Área" value={institution.area.name} />
            <DetailItem
              label="Dirección"
              value={institution.institution.address}
            />
            <DetailItem
              label="Región"
              value={institution.institution.ubigeo.region}
            />
            <DetailItem
              label="Provincia"
              value={institution.institution.ubigeo.province}
            />
            <DetailItem
              label="Distrito"
              value={institution.institution.ubigeo.district}
            />
            <DetailItem
              label="Latitud"
              value={institution.institution.latitude}
            />
            <DetailItem
              label="Longitud"
              value={institution.institution.longitude}
            />
          </section>
        </LayoutFrmHorizontal>
      </section>

      <section className="bg-white container mx-auto p-6 rounded-lg shadow-sm">
        <LayoutFrmHorizontal
          title="Detalles de la institución"
          subtitle="Ubicación geográfica de la institución"
        >
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem
              label="Código modular"
              value={institution.modular_code}
            />
            <DetailItem label="Código local" value={institution.local_code} />
            <DetailItem label="Nivel" value={institution.level.name} />
            <DetailItem
              label="Modalidad"
              value={institution.level.modality.name}
            />
            <DetailItem
              label="Director"
              value={
                institution.director
                  ? `${institution.director.person.name} ${institution.director.person.last_name}`
                  : "Sin director"
              }
            />
          </section>
        </LayoutFrmHorizontal>
      </section>
    </>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col bg-gray-50 p-4 rounded-md border border-gray-200">
    <Label className="text-xs text-gray-500 uppercase font-semibold">
      {label}
    </Label>
    <p className="text-sm font-medium text-gray-900">{value}</p>
  </div>
);
