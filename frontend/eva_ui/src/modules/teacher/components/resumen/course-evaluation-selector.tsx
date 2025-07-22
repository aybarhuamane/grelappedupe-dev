"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterFromUrl } from "@/modules/core";
import { courseAssignment } from "@/types";

interface IProps {
  coursesAssignments: courseAssignment.ITeacherAssignmentList[];
}

export const CourseEvaluationSelector = (props: IProps) => {
  const { coursesAssignments } = props;

  const { getParams, updateFilter } = useFilterFromUrl();

  const selectedCourse = getParams("course", "");

  const handleChange = (value: string) => {
    updateFilter("course", value);
  };

  return (
    <Select defaultValue={selectedCourse} onValueChange={handleChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Selecciona una evaluación" />
      </SelectTrigger>
      <SelectContent className="w-[300px]">
        {coursesAssignments.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.course.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
