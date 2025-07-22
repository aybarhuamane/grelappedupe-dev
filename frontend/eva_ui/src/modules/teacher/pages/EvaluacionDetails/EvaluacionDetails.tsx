import { courseAssignment, courseEvaluation, period, response } from "@/types";
import { RenderEvaluation } from "./RenderEvaluation";

interface IProps {
  dataDefault: courseAssignment.ITeacherAssignmentList;
  headerEvaluation: courseEvaluation.IEvaluationHeaders[];
  dataPeriodo: response.IResApi<period.IPeriodList>;
}

export const EvaluacionDetails = (props: IProps) => {
  const { dataDefault, headerEvaluation, dataPeriodo } = props;

  return (
    <RenderEvaluation
      dataDefault={dataDefault}
      headerEvaluation={headerEvaluation}
      dataPeriodo={dataPeriodo}
    />
  );
};
