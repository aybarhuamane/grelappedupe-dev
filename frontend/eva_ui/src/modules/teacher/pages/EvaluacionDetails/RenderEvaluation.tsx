"use client";
import { courseAssignment, courseEvaluation, period, response } from "@/types";
import { EvaluationProvider } from "../../providers";
import { TableEvaluacionSection } from "./TableEvaluacionSection";

interface IProps {
  dataDefault: courseAssignment.ITeacherAssignmentList;
  headerEvaluation: courseEvaluation.IEvaluationHeaders[];
  dataPeriodo: response.IResApi<period.IPeriodList>;
}

export const RenderEvaluation = (props: IProps) => {
  const { dataDefault, dataPeriodo, headerEvaluation } = props;

  return (
    <EvaluationProvider dataDefault={dataDefault} dataPeriodo={dataPeriodo}>
      <TableEvaluacionSection isBlocked={dataDefault?.is_sent} />
    </EvaluationProvider>
  );
};
