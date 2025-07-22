/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Label } from "@/components/ui/label";
import { useCourse } from "@/modules/director";
import { courseAssignment } from "@/types";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const CourseSection = () => {
  const { getCursos, listCursos } = useCourse();
  const {
    control,
    formState: { errors },
  } = useFormContext<courseAssignment.ICourseAssignmentList>();

  useEffect(() => {
    getCursos({});
  }, []);

  return (
    <main className="flex flex-col gap-1">
      <Label className="font-semibold">Curso</Label>
      <Controller
        control={control}
        name="course"
        rules={{
          required: "Seleccione un curso",
        }}
        render={({ field: { value, onChange } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar el curso
            </label>
            <div className="space-y-2">
              {listCursos.results.map((curso) => (
                <div
                  key={curso.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    value?.id === curso?.id
                      ? "border-indigo-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => onChange(curso)}
                >
                  <input
                    type="radio"
                    id={`curso-${curso.id}`}
                    name="course"
                    value={curso?.id?.toString()}
                    onChange={() => onChange(curso)}
                    checked={value?.id === curso?.id}
                    className="form-radio h-4 w-4 text-indigo-600"
                    required
                  />
                  <label
                    htmlFor={`curso-${curso.id}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {curso.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      />
      {errors && (
        <span className="text-xs text-red-500">{errors.course?.message}</span>
      )}
    </main>
  );
};
