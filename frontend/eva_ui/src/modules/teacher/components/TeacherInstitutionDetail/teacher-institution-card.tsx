import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { detailInstitution } from "@/types";
import { BookOpen, Locate, MapPin, School, Users } from "lucide-react";

export const TeacherInstitutionCard = ({
  detalInstitution,
}: {
  detalInstitution: detailInstitution.IDetailInstitutionList;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-600 font-semibold border-b-2 pb-2">
          <School className="inline h-4 w-4 mr-2 text-blue-500" />
          {detalInstitution.institution.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <MapPin className="inline h-4 w-4 mr-2 text-orange-500" />
          {detalInstitution.institution.address}
        </p>
        <p>
          <Users className="inline h-4 w-4 mr-2 text-green-500" />
          Director:{" "}
          {detalInstitution.director?.person.name +
            " " +
            detalInstitution.director?.person.last_name}
        </p>
        <p>
          <BookOpen className="inline h-4 w-4 mr-2 text-purple-500" />
          Nivel: {detalInstitution.level?.name}
        </p>
        <p>
          <Locate className="inline h-4 w-4 mr-2 text-red-500" />
          Area: {detalInstitution.area?.name ?? "No disponible"}
        </p>
        <div className="flex space-x-4">
          <span className="text-gray-500">Código modular: </span>
          <span>{detalInstitution.modular_code ?? "No disponible"}</span>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-500">Código local: </span>
          <span>{detalInstitution.local_code ?? "No disponible"}</span>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-500">Latitud: </span>
          <span>
            {detalInstitution.institution.latitude || "No disponible"}
          </span>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-500">Longitud: </span>
          <span>
            {detalInstitution.institution.longitude || "No disponible"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
