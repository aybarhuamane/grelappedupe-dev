import { questionsFuntions } from "@/api";
import { fetchAnswerList } from "@/api/app/evaluacion/fetchAnswer";
import { answers, questions, SlugParams } from "@/types";
import { IResApi } from "@/types/core/IResApi";
import CreateQuestionForm, {
  IFormQuestionAnswerSchema,
} from "../../create/page";

export default async function page({ params }: { params: SlugParams }) {
  const slug = params.slug;
  const { fetchQuestionsListAction } = questionsFuntions;

  let questionsList: IResApi<questions.IQuestionListAction> | undefined =
    undefined;
  let answersList: IResApi<answers.IAnswerList> | undefined = undefined;

  try {
    const response = await fetchQuestionsListAction({ id: Number(slug) });
    if (response.ok) {
      const data = await response.json();
      questionsList = data;
    }
  } catch (error) {
    console.error(error);
  }

  const questionsData = questionsList?.results[0];
  const questionId = questionsData?.id;

  try {
    const response = await fetchAnswerList({ question__id: questionId });
    if (response.ok) {
      const data = await response.json();
      answersList = data;
    }
  } catch (error) {
    console.error(error);
  }

  const questionWithAnswer: IFormQuestionAnswerSchema = {
    code: questionsData?.code || "",
    question: questionsData?.question || "",
    is_active: questionsData?.is_active || true,
    degree_number: questionsData?.degree_number || "",
    capacity: questionsData?.capacity.id ?? 0,
    level: questionsData?.level.id ?? 0,
    answers: answersList?.results || [
      { option: "A", answer: "", is_correct: false },
    ],
  };

  return (
    <>
      <CreateQuestionForm
        initialData={questionWithAnswer}
        questionId={questionId}
      />
    </>
  );
}
