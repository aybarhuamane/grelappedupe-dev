"use client";
import { useState } from "react";
import { teacher, response } from "@/types";
import { teachersFunctionsApi } from "@/api";

export const useTeacher = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listTeacher, setTeacher] = useState<
    response.IResApi<teacher.ITeacherList>
  >({
    count: 0,
    results: [],
    next: null,
    previous: null,
  });
  const [listTeacherAssigmentSchool, setTeacherAssigmentSchool] = useState<
    response.IResApi<teacher.ITeacherAssigmentSchoolList>
  >({
    count: 0,
    results: [],
    next: null,
    previous: null,
  });

  const getTeacherAction = async (query: teacher.ITeacherFilter) => {
    setLoading(true);

    try {
      const res = await teachersFunctionsApi.fetchTeacherListAction(query);

      if (res.ok) {
        const data: response.IResApi<teacher.ITeacherList> = await res.json();
        setTeacher(data);
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getTeacher = async (query: teacher.ITeacherFilter) => {
    setLoading(true);

    try {
      const res = await teachersFunctionsApi.fetchTeacherList(query, true);

      if (res.ok) {
        const data: response.IResApi<teacher.ITeacherList> = await res.json();
        setTeacher(data);
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getTeacherAssigmentSchool = async (
    query: teacher.ITeacherAssigmentSchoolFilter
  ) => {
    setLoading(true);

    try {
      const res = await teachersFunctionsApi.fetchTeacherAssigmentSchoolList(
        query
      );

      if (res.ok) {
        const data: response.IResApi<teacher.ITeacherAssigmentSchoolList> =
          await res.json();
        setTeacherAssigmentSchool(data);
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getTeacherAssigmentSchoolAction = async (
    query: teacher.ITeacherAssigmentSchoolFilter
  ) => {
    setLoading(true);

    try {
      const res =
        await teachersFunctionsApi.fetchTeacherAssigmentSchoolListAction(query);

      if (res.ok) {
        const data: response.IResApi<teacher.ITeacherAssigmentSchoolList> =
          await res.json();
        setTeacherAssigmentSchool(data);
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return {
    getTeacher,
    listTeacher,
    loading,
    getTeacherAssigmentSchool,
    listTeacherAssigmentSchool,
    getTeacherAction,
    getTeacherAssigmentSchoolAction,
  };
};
