import { IData } from "@/components/custom/command-filter";
import educationLevelAction from "@/modules/quiz-manage/actions/education-level-action";
import DegreesPageList from "@/modules/quiz-manage/degrees-page";

export default async function Page() {
  const levels = await educationLevelAction();

  const levelsData: IData[] =
    levels?.results.map((level) => ({
      value: level.id.toString(),
      label: level.name,
    })) || [];

  return (
    <>
      <DegreesPageList levelsData={levelsData} />
    </>
  );
}
