'use client'
import { HeaderSection, LayoutAsideSection } from '@/modules/core'
import { AddDirector } from '../../components/directorManange/FrmAddDirector/FrmAddDirector'
import { AsideAddDirector } from './AsideAddDirector'

export const DirectorCreate = () => {
    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title="Crear Director"
                subtitle="Formulario para crear un director"
                showBackButton
                disableAddButton
                hrefBack="/admin/director-manage"
            />
            <div className="bg-white container py-4">
                <LayoutAsideSection aside={<AsideAddDirector />}>
                    <AddDirector />
                </LayoutAsideSection>
            </div>
        </main>
    )
}