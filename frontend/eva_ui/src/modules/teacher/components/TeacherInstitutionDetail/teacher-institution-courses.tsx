import { course, degree, institution } from "@/types";

interface IProps {
  courses: course.ICourse[];
  degrees: degree.IDegreeList[];
  institutions: institution.IInstitutionList[];
}

export const TeacherInstitutionCourses = ({
  courses,
  degrees,
  institutions,
}: IProps) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-4 w-full">
      <header>
        <h3 className="text-lg font-bold text-gray-800">Cursos a cargo</h3>
        <p className="text-gray-500">
          Aquí puedes ver los cursos que has registrado en la institución.
        </p>
      </header>
      <hr />

      {institutions.length > 0 ? (
        <ul className="space-y-4">
          {institutions.map((institution) => (
            <li key={institution.id} className="">
              <div className="mt-2">
                <h5 className="text-gray-600 font-semibold">📚 Cursos:</h5>
                <ul className="list-disc pl-4 text-gray-500 text-sm">
                  {courses.map((course, i) => (
                    <li key={i}>{course.name}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <h5 className="text-gray-600 font-semibold">🎓 Grados:</h5>
                <ul className="list-disc pl-4 text-gray-500 text-sm">
                  {degrees.map((degree, i) => (
                    <li key={i}>
                      {degree.degree_number} {degree.degree_text}{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay historial disponible.</p>
      )}
    </div>
  );
};
