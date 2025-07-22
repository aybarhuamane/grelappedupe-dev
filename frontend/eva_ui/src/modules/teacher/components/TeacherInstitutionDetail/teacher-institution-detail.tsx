"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseAssignment } from "@/types";
import { BookOpen, MapPin, School, Users } from "lucide-react";
import { CoursesInstitutionCard } from "./course-institution-card";
import { TeacherInstitutionCard } from "./teacher-institution-card";

interface IProps {
  institutions: courseAssignment.ITeacherAssignmentList[];
}

export const TeacherInstitutionHistory = (props: IProps) => {
  const { institutions } = props;

  const listInstitutions = institutions.map(
    (i) => i.degree?.detail_institution
  );

  const uniqueInstitutions = listInstitutions.filter(
    (institution, index, self) =>
      index === self.findIndex((t) => t?.id === institution?.id)
  );

  // Datos para el gráfico de barras (distribución de niveles educativos por institución)
  const chartData = uniqueInstitutions.reduce((acc, institution) => {
    if (!institution) return acc;

    const levelName = institution.level?.name || "Sin nivel";
    const existingLevel = acc.find((item) => item.name === levelName);

    if (existingLevel) {
      existingLevel.cantidad += 1;
    } else {
      acc.push({
        name: levelName,
        cantidad: 1,
      });
    }
    return acc;
  }, [] as { name: string; cantidad: number }[]);

  // Ordenar por cantidad de mayor a menor
  chartData.sort((a, b) => b.cantidad - a.cantidad);

  return (
    <div className="px-6 bg-background rounded-lg space-y-6 w-full">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">
          Resumen del Docente
        </h1>
        <p className="text-gray-500">
          Resumen visual de tu institución y cursos a cargo.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Instituciones
            </CardTitle>
            <School className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {uniqueInstitutions.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Cursos a cargo
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {institutions.filter((i) => i.course).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Ubicaciones
            </CardTitle>
            <MapPin className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {uniqueInstitutions.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Grados asignados
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {institutions.filter((i) => i.degree).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Detalles de la institución
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {uniqueInstitutions.map((institution) => (
            <TeacherInstitutionCard
              key={institution.id}
              detalInstitution={institution}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Cursos a cargo
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {institutions.map((institution) => (
            <CoursesInstitutionCard
              key={institution.id}
              assigment={institution}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
