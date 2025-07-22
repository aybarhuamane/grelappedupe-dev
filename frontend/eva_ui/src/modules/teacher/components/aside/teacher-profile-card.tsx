import { fetchGetPersonId } from "@/api/app/core/fetchGetPersonAction";
import { getUser } from "@/modules/core/functions/userFunctions";
import { getUser as personType } from "@/types";
import { Calendar, IdCard, Mail, Phone } from "lucide-react";

export const TeacherProfileCard = async () => {
  const user = await getUser();
  const id = user?.persona_id;

  let personData: personType.IGetPersonList | undefined = undefined;

  try {
    const res = await fetchGetPersonId(Number(id));
    if (res.ok) {
      const listData = await res.json();
      personData = listData[0];
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return (
    <aside className="p-6 bg-white shadow rounded w-full">
      <div className="flex items-center gap-4 border-b pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {personData?.name} {personData?.last_name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            🎓{" "}
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs">
              Docente
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p className="text-gray-600 flex items-center gap-2">
          <IdCard size={16} /> <strong>Documento:</strong>{" "}
          {personData?.num_document}
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          <Mail size={16} /> <strong>Correo:</strong> {personData?.email}
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          <Phone size={16} />
          <strong>Teléfono:</strong> {personData?.phone}
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          <Calendar size={16} /> <strong>Registrado desde:</strong>{" "}
          {new Date(personData?.user.date_joined || "").toLocaleDateString()}
        </p>
      </div>
    </aside>
  );
};
