"use client";
import {
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useFilterFromUrl } from "@/modules/core";
import { useCoursesContext } from "@/modules/dashboard";
import { LabelFilterBar } from "./label-filter";

export const CompetenceFilterBar = () => {
  const { getParams, updateFilters } = useFilterFromUrl();

  const competenceSelected = getParams("competence", "");

  const { competencesList } = useCoursesContext();

  const selectedCompetence = competencesList?.results.find(
    (competence) => competence.id === Number(competenceSelected)
  );

  const selectedCompetenceName = selectedCompetence
    ? selectedCompetence.code
    : "";

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 p-0">
          <LabelFilterBar
            label="Competencia"
            selectedName={selectedCompetenceName}
          />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={competenceSelected}>
            {competencesList &&
              competencesList.results.map((competence) => (
                <MenubarRadioItem
                  key={competence.id}
                  value={competence.id.toString()}
                  onClick={() =>
                    updateFilters({
                      competence: competence.id.toString(),
                      capacity: "",
                    })
                  }
                  className={`${
                    competence.id === Number(competenceSelected)
                      ? "bg-green-100"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs">{competence.code}</p>
                    <p className="text-sm">{competence.name}</p>
                  </div>
                </MenubarRadioItem>
              ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};
