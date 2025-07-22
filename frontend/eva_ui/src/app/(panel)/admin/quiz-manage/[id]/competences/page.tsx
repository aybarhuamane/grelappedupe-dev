import { competencesFunctionsApi } from "@/api";
import CompetencesTable from "@/modules/quiz-manage/components/tables/competences-table";
import { competences } from "@/types";
import { IResApi } from "@/types/core/IResApi";
import { Params, SearchParams } from "@/types/IParams";

export default async function CompetencesPage({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const id = params.id;
  const { competences, page, page_size } = searchParams;
  const { fetchCompetenceList } = competencesFunctionsApi;

  let competenceList: IResApi<competences.ICompetencesList> | undefined =
    undefined;

  try {
    const response = await fetchCompetenceList({
      course__id: Number(id),
      search: competences?.toString(),
      page: Number(page) || 1,
      page_size: Number(page_size) || 15,
    });
    if (response.ok) {
      const data = await response.json();
      competenceList = data;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <CompetencesTable courseId={id} search={competences?.toString()} />
    </>
  );
}
