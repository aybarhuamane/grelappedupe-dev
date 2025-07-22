"use client";

import { useInstitutionStore } from "@/store/use-institution-store";
import { detailInstitution } from "@/types";
import { Building, CodeSquare, Map, MapPin, User } from "lucide-react";

interface IProps {
  data: detailInstitution.IDetailInstitutionList[] | null;
}

export const IfoInstitutionSection = ({ data }: IProps) => {
  const { selectedInstitution } = useInstitutionStore();
  const newData = data?.find((inst) => inst.id === Number(selectedInstitution));

  if (!newData) {
    return (
      <p className="text-center text-gray-500">No se encontró la institución</p>
    );
  }

  const {
    level,
    area,
    category,
    director,
    modular_code,
    local_code,
    institution,
  } = newData;

  const info = [
    {
      label: "Nivel | Modalidad",
      value: `${level?.name || "No registrado"} - ${
        level?.modality?.name || "No registrado"
      }`,
      icon: <Building size={16} />,
    },
    {
      label: "Código modular",
      value: modular_code || "No registrado",
      icon: <CodeSquare size={16} />,
    },
    {
      label: "Código local",
      value: local_code || "No registrado",
      icon: <CodeSquare size={16} />,
    },
    {
      label: "Director",
      value: `${director?.person?.num_document} - ${director?.person?.name} ${director?.person?.last_name}`,
      icon: <User size={16} />,
    },
    {
      label: "Localidad",
      value: `${institution?.ubigeo?.region || ""} - ${
        institution?.ubigeo?.province || ""
      } - ${institution?.ubigeo?.district || ""}`,
      icon: <Map size={16} />,
    },
    {
      label: "Dirección",
      value: institution?.address || "Sin dirección",
      icon: <MapPin size={16} />,
    },
    {
      label: "Cod. Ubigeo",
      value: institution?.ubigeo?.code,
      icon: <MapPin size={16} />,
    },
    {
      label: "Área",
      value: area?.name || "No registrado",
      icon: <Building size={16} />,
    },
    {
      label: "Categoría",
      value: category?.name || "No asignado",
      icon: <Building size={16} />,
    },
  ];
  return (
    <>
      <section className="grid grid-cols-1 gap-4 text-sm text-gray-700">
        {info.map(({ label, value, icon }, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b last:border-b-0 pb-2"
          >
            <span className="text-gray-500">{icon}</span>
            <span className="w-1/3 font-medium">{label}:</span>
            <span className="w-2/3 text-gray-800">{value}</span>
          </div>
        ))}
      </section>
    </>
  );
};
