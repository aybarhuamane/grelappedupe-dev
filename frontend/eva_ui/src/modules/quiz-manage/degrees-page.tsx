"use client";

import { CommandFilter, IData } from "@/components/custom/command-filter";
import { useParamsFilters } from "@/lib/filter-url";
import { GraduationCap } from "lucide-react";
import { LayoutAsideSection } from "../core";
import { CardContentDegree } from "./components/card-contend-degree";

export const primaryDegrees = [
  { value: "1", numberText: "1", text: "PRIMERO" },
  { value: "2", numberText: "2", text: "SEGUNDO" },
  { value: "3", numberText: "3", text: "TERCERO" },
  { value: "4", numberText: "4", text: "CUARTO" },
  { value: "5", numberText: "5", text: "QUINTO" },
  { value: "6", numberText: "6", text: "SEXTO" },
];

export const secondaryDegrees = [
  { value: "1", numberText: "1", text: "PRIMERO" },
  { value: "2", numberText: "2", text: "SEGUNDO" },
  { value: "3", numberText: "3", text: "TERCERO" },
  { value: "4", numberText: "4", text: "CUARTO" },
  { value: "5", numberText: "5", text: "QUINTO" },
];

interface IProps {
  levelsData: IData[];
}

export default function DegreesPageList(props: IProps) {
  const { levelsData } = props;

  const { getParams } = useParamsFilters();

  const newLevel = getParams({ key: "nivel", value: "" });

  return (
    <>
      <LayoutAsideSection
        aside={
          <>
            <div className="flex flex-col justify-center items-start gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Seleccione el nivel
              </h2>
              <CommandFilter
                filterKey="nivel"
                data={levelsData}
                className="max-w-sm"
                popclassName="w-64"
                defaultValue="1"
              />
            </div>
          </>
        }
        asidePosition="left"
      >
        <main className="space-y-4 container mx-auto px-4 md:px-8">
          <h2 className="text-lg font-semibold text-gray-800">
            Seleccione el grado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
            {newLevel === "1"
              ? primaryDegrees.map((degree) => (
                  <CardContentDegree
                    key={degree.value}
                    title={degree.text}
                    icon={<GraduationCap size={24} />}
                    labelButton="Ver preguntas"
                    hrefButton={`grados/questions?degree=${degree.value}&level=${newLevel}`}
                  />
                ))
              : secondaryDegrees.map((degree) => (
                  <CardContentDegree
                    key={degree.value}
                    title={degree.text}
                    icon={<GraduationCap size={24} />}
                    labelButton="Ver preguntas"
                    hrefButton={`grados/questions?degree=${degree.value}&level=${newLevel}`}
                  />
                ))}
          </div>
        </main>
      </LayoutAsideSection>
    </>
  );
}
