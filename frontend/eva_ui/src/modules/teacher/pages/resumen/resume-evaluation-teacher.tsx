import { HeaderSection } from "@/modules/core";
import { courseAssignment } from "@/types";
import { ResumeTeacherEvaluationTable } from "./resume-teacher-evaluation-table";

export const ResumeEvaluationTeacher = ({
  listData,
}: {
  listData?: courseAssignment.ITeacherAssignmentList;
}) => {
  return (
    <>
      <HeaderSection
        title="Resultados de Evaluación"
        subtitle="Análisis detallado de los resultados de la evaluación"
        disableAddButton
        showBackButton
      />
      <div className="container mx-auto px-4 py-8">
        <ResumeTeacherEvaluationTable listData={listData} />
      </div>
    </>
  );
};
