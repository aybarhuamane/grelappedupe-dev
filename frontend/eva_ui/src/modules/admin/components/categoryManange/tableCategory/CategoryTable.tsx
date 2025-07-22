import { DataTable } from "@/modules/core";
import { categoryColumns } from "./CategoryColumns";

export const CategoryTable = () => {
    return (
        <div>
            <DataTable
                columns={categoryColumns}
                data={[]}
                hasPagination={false}
                hasToolbar={false}
            />
        </div>  
    )
}