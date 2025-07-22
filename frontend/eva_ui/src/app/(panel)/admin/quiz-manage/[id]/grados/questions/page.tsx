import QuestionsTable from "@/modules/quiz-manage/components/tables/questions-table";
import { Params, SearchParams } from "@/types/IParams";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Params;
}) {
  const id = params.id;

  const { questions, page, page_size } = searchParams;

  // const { fetchQuestionsListAction } = questionsFuntions;

  // let questionsData: IResApi<questions.IQuestionListAction> | undefined =
  //   undefined;

  // try {
  //   const questionsResponse = await fetchQuestionsListAction({
  //     capacity__competence__course__id: Number(id),
  //     search: questions?.toString(),
  //   });
  //   if (questionsResponse.ok) {
  //     questionsData = await questionsResponse.json();
  //   }
  // } catch (error) {
  //   console.error("Error fetching questions:", error);
  // }

  return (
    <>
      <QuestionsTable
        competenceId={Number(id)}
        search={questions?.toString()}
      />
    </>
  );
}
