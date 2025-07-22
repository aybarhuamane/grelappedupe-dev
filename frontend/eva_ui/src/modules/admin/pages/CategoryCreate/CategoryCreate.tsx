'use client'
import { FrmAddCategory } from '@/modules/admin'
import { HeaderSection, LayoutFrmHorizontal } from '@/modules/core'

export const CategoryCreate = () => {
    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title="Crear Categoria"
                subtitle="Formulario para crear una categoria"
                showBackButton
                disableAddButton
                hrefBack="/admin/category-manage"
            />
            <div className="bg-white container py-8">
                <LayoutFrmHorizontal title='Datos de la categoria' subtitle='Ingrese los datos de la categoria'>
                    <FrmAddCategory />
                </LayoutFrmHorizontal>
            </div>
        </main>
    )
}