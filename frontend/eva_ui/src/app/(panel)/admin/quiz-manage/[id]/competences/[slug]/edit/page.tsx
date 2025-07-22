import { competencesFunctionsApi } from "@/api";
import { TabsLayout } from "@/modules/quiz-manage/components/tabs-layout";
import CreateCompetencesForm from "@/modules/quiz-manage/forms/create-competences-form";
import { competences, SlugParams } from "@/types";
import { IResApi } from "@/types/core/IResApi";

export default async function page({ params }: { params: SlugParams }) {
  const slug = params.slug;
  const { fetchCompetenceList } = competencesFunctionsApi;

  let competencesList: IResApi<competences.ICompetences> | undefined =
    undefined;

  try {
    const response = await fetchCompetenceList({ id: Number(slug) });
    if (response.ok) {
      const data = await response.json();
      competencesList = data;
    }
  } catch (error) {
    console.error(error);
  }

  const competencesData = competencesList?.results[0];

  return (
    <>
      <TabsLayout
        title={`${competencesData?.name}`}
        infoTitle="Editar competencia"
        infoDescription="Edita la competencia seleccionada"
      >
        <div className="bg-white mx-auto space-y-4">
          <CreateCompetencesForm initialData={competencesData} />
        </div>
      </TabsLayout>
    </>
  );
}
