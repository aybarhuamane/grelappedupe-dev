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

export const CoursesFilterBar = () => {
  const { getParams, updateFilters } = useFilterFromUrl();

  const cursoSelected = getParams("curso", "");

  const { listCoursesApi } = useCoursesContext();

  const selectedCourse = listCoursesApi?.results.find(
    (course) => course.id === Number(cursoSelected)
  );

  const selectedCourseName = selectedCourse ? selectedCourse.name : "";

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 p-0">
          <LabelFilterBar label="Curso" selectedName={selectedCourseName} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={cursoSelected}>
            {listCoursesApi &&
              listCoursesApi.results.map((course) => (
                <MenubarRadioItem
                  key={course.id}
                  value={course.id.toString()}
                  onClick={() =>
                    updateFilters({
                      curso: course.id.toString(),
                      competence: "",
                      capacity: "",
                    })
                  }
                  className={`${
                    course.id === Number(cursoSelected) ? "bg-green-100" : ""
                  }`}
                >
                  {course.name}
                </MenubarRadioItem>
              ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};
