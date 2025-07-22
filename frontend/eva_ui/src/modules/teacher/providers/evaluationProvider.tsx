"use client";
import { courseAssignment, period, response } from "@/types";
import { createContext, useContext, useState } from "react";

export const EvaluationContext = createContext<{
  data: courseAssignment.ITeacherAssignmentList;
  dataPeriodo: response.IResApi<period.IPeriodList>;
  progressData: Record<number, number>; // { studentId: progress }
  updateProgress: (studentId: number, progress: number) => void;
}>({
  data: {} as courseAssignment.ITeacherAssignmentList,
  dataPeriodo: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  progressData: {},
  updateProgress: () => {},
});

export const EvaluationProvider = ({
  children,
  dataDefault,
  dataPeriodo,
}: {
  children: React.ReactNode;
  dataDefault: courseAssignment.ITeacherAssignmentList;
  dataPeriodo: response.IResApi<period.IPeriodList>;
}) => {
  const [progressData, setProgressData] = useState<Record<number, number>>({});

  const updateProgress = (studentId: number, progress: number) => {
    setProgressData((prev) => ({
      ...prev,
      [studentId]: progress,
    }));
  };

  return (
    <EvaluationContext.Provider
      value={{
        data: dataDefault,
        dataPeriodo,
        progressData,
        updateProgress,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluationContext = () => useContext(EvaluationContext);
