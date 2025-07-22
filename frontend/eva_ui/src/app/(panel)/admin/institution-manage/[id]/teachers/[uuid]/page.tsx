import { personaFunctionsApi } from "@/api";
import { HeaderSection } from "@/modules/core";
import { FrmPersonTeacherEditor } from "@/modules/director";
import { person } from "@/types";

interface ITeacherDetailProps {
  params: {
    uuid: string;
  };
}

export default async function TeacherDetail(props: ITeacherDetailProps) {
  const { uuid } = props.params;

  const { personGetId } = personaFunctionsApi;

  let dataPerson: person.IPersonList | null = null;
  try {
    const response = await personGetId(Number(uuid));

    if (response) {
      const data = await response.json();
      dataPerson = data;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="flex flex-col gap-5">
      <HeaderSection
        disableAddButton
        title="Perfil de docente"
        subtitle="Edite la información del docente. Puede cambiar la información personal, la información de contacto y la información de la cuenta."
        showBackButton
      />
      {dataPerson && <FrmPersonTeacherEditor teacher={dataPerson} />}
    </main>
  );
}
