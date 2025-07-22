import { directoresFunctionsApi, personaFunctionsApi } from "@/api";
import { HeaderSection } from "@/modules/core";
import { person } from "@/types";
import { Badge } from "@/components/ui/badge";
import { IdCardIcon, Notebook, Phone, User } from "lucide-react";
import { format } from "date-fns";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Page(props: IProps) {
  const { params } = props;
  const { id } = params;

  const { directorGetId } = directoresFunctionsApi;
  const { personGetId } = personaFunctionsApi;

  let defaultData: person.IPersonList | undefined = undefined;

  try {
    const directorData = await directorGetId(Number(id));
    if (directorData.ok) {
      const listData = await directorData.json();
      if (listData.person) {
        const personData = await personGetId(listData.person);
        if (personData.ok) {
          const personDataJson = await personData.json();
          defaultData = personDataJson;
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  if (!defaultData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Cargando información...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-5">
      <HeaderSection
        title={"Detalles del director"}
        subtitle={"Información detallada del director"}
        showBackButton
        disableAddButton
        hrefBack="/admin/director-manage"
      />

      <div className="w-full container mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center space-x-4">
          <User className="text-gray-600 text-3xl" />
          <h2 className="text-xl font-semibold text-gray-800">
            {defaultData.name} {defaultData.last_name}
          </h2>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <IdCardIcon className="text-gray-500 mr-2" />
            <p className="text-gray-700">
              <span className="font-semibold">Documento:</span>{" "}
              {defaultData.num_document}
            </p>
          </div>

          <div className="flex items-center">
            <Notebook className="text-gray-500 mr-2" />
            <p className="text-gray-700">
              <span className="font-semibold">Correo:</span>{" "}
              {defaultData.email || "No registrado"}
            </p>
          </div>

          <div className="flex items-center">
            <Phone className="text-gray-500 mr-2" />
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span>{" "}
              {defaultData.phone || "No registrado"}
            </p>
          </div>

          <div className="mt-4">
            <Badge className="bg-indigo-500 text-white">{`ID Usuario: ${defaultData.user}`}</Badge>
          </div>

          <div className="mt-4">
            <Badge className="bg-gray-500 text-white">{`Fecha de creación: ${format(new Date(defaultData.created_at), "dd/MM/yyyy")}`}</Badge> 
          </div>
        </div>
      </div>
    </main>
  );
}
