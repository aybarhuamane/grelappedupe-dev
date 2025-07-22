import { courseAssignment } from "@/types";

export const InstitutionDetails = (
  dataDefault: courseAssignment.ITeacherAssignmentList
) => {
  const { detail_institution } = dataDefault.degree;

  const categoryName = detail_institution.category?.name;

  return (
    <div className="border-l px-4">
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>I.E: </h1>
        <p>
          {`${detail_institution?.institution?.name} - ${
            detail_institution?.level?.name
          } ${categoryName ? categoryName : ""} - ${
            detail_institution?.modular_code
          }`}
        </p>
      </div>
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>Ubicación: </h1>
        <p>
          {detail_institution?.institution?.ubigeo?.code} -{" "}
          {detail_institution?.institution?.ubigeo?.region} -{" "}
          {detail_institution?.institution?.ubigeo?.province} -{" "}
          {detail_institution?.institution?.ubigeo?.district}
        </p>
      </div>
      <div className="flex gap-1 text-sm text-gray-500">
        <h1>Director: </h1>
        <p>
          {detail_institution?.director?.person?.last_name}{" "}
          {detail_institution?.director?.person?.name}
        </p>
      </div>
    </div>
  );
};
