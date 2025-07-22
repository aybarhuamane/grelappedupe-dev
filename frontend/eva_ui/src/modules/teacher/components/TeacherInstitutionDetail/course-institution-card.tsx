import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseAssignment } from "@/types";
import { BookOpen, CheckCircle, School, XCircle } from "lucide-react";

export const CoursesInstitutionCard = ({
  assigment,
}: {
  assigment?: courseAssignment.ITeacherAssignmentList;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-600 font-semibold border-b-2 pb-2">
          <BookOpen className="inline h-4 w-4 mr-2 text-purple-500" />
          {assigment?.course.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <span className="text-gray-500">Grados a cargo: </span>
          {assigment?.degree?.degree_number +
            " " +
            assigment?.degree?.degree_text}
        </p>
        <p>
          <span className="text-gray-500">Estado: </span>
          {assigment?.course.is_active ? (
            <CheckCircle className="inline h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="inline h-4 w-4 text-red-500" />
          )}
        </p>
        <p>
          <School className="inline h-4 w-4 mr-2 text-blue-500" />
          {assigment?.degree?.detail_institution?.institution?.name}
        </p>
      </CardContent>
    </Card>
  );
};
