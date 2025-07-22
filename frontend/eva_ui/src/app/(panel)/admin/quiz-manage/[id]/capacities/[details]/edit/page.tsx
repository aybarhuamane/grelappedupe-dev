import { capacitiesFunctionsApi } from "@/api";
import { TabsLayout } from "@/modules/quiz-manage/components/tabs-layout";
import CreateCapacitiesForm from "@/modules/quiz-manage/forms/create-capacities-form";
import { capacity, DetailsParams } from "@/types";
import { IResApi } from "@/types/core/IResApi";

export default async function page({ params }: { params: DetailsParams }) {
  const slug = params.details;
  const { fetchCapacityListAction } = capacitiesFunctionsApi;

  let capacitiesList: IResApi<capacity.ICapacityList> | undefined = undefined;

  try {
    const response = await fetchCapacityListAction({ id: Number(slug) });
    if (response.ok) {
      const data = await response.json();
      capacitiesList = data;
    }
  } catch (error) {
    console.error(error);
  }

  const capacityData = capacitiesList?.results[0];

  return (
    <>
      <TabsLayout
        title={`${capacityData?.name}`}
        infoTitle="Editar capacidad"
        infoDescription="Editar la capacidad seleccionada."
      >
        <div className="bg-white mx-auto space-y-4">
          <CreateCapacitiesForm initialData={capacityData} />
        </div>
      </TabsLayout>
    </>
  );
}
