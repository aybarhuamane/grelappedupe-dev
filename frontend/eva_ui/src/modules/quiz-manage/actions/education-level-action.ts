import { fetchEducationLevelList } from "@/api/app/educativa/fetchEducationalLevel";
import { educationalLevel } from "@/types";
import { IResApi } from "@/types/core/IResApi";

export default async function educationLevelAction() {
  let levelsData: IResApi<educationalLevel.IEducationalLevelList> | undefined =
    undefined;

  try {
    const response = await fetchEducationLevelList({});
    if (response.ok) {
      levelsData = await response.json();
    }
  } catch (error) {
    console.error("Error fetching education levels:", error);
  }

  return levelsData;
}
