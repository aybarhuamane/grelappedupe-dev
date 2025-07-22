import { HeaderSection, LayoutAsideSection } from "@/modules/core"
import { tableCategory, AsideCategoryFilter } from "@/modules/admin"

export const CategoryList = () => {
    return (
        <main className="flex flex-col w-full gap-4">
            <HeaderSection
                title="Categorias"
                subtitle="Listado de colegios de educación alternativa (PENDIENTE DE REVISIÓN)"
                hrefAddButton="/admin/category-manage/create"
                labelAddButton="Agregar Categoria"
                hrefBack="/admin/category-manage"
            />
            <LayoutAsideSection
                aside={
                    <AsideCategoryFilter />
                }
            >
                <tableCategory.CategoryTable />
            </LayoutAsideSection>
        </main>
    )
}