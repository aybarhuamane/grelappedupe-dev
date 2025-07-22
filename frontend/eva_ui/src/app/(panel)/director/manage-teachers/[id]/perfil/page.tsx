import { personaFunctionsApi } from "@/api";
import { HeaderSection } from "@/modules/core";
import { FrmPersonTeacherEditor } from "@/modules/director";
import { person } from "@/types";

interface IProps {
  params: {
    id: string;
  };
}
export default async function Page(props: IProps) {
  const { id } = props.params;
  const { personGetId } = personaFunctionsApi;
  let dataPerson: person.IPersonList | null = null;
  try {
    const response = await personGetId(Number(id));

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
        hrefBack="/director/manage-teachers"
      />
      {dataPerson && <FrmPersonTeacherEditor teacher={dataPerson} />}
    </main>
  );
}
