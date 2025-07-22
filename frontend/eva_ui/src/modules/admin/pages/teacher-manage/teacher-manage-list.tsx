"use client";

import { Suspense } from "react";
import { TeacherManageTable } from "../../components/teacher-manage/teacher-manage-table";

export const TeacherManageList = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TeacherManageTable />
      </Suspense>
    </div>
  );
};
