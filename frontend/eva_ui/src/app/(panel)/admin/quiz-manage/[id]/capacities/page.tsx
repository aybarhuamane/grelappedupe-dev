import CapacitiesTable from "@/modules/quiz-manage/components/tables/capacities-table";
import { Params, SearchParams } from "@/types/IParams";

export default async function CapacitiesPage({ searchParams, params }: { searchParams: SearchParams, params: Params }) {
    const id = params.id;
    const { capacities } = searchParams;

    return (
        <>
            <CapacitiesTable courseId={id} search={capacities?.toString()} />
        </>
    )
}
