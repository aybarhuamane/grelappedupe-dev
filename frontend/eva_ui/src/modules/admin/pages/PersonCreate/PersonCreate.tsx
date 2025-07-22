'use client'
import { FrmAddPerson } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export const PersonCreate = () => {
    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title="Crear persona"
                subtitle="Formulario para crear un persona"
                showBackButton
                disableAddButton
                hrefBack="/admin/person-manange"
            />
            <div className="bg-white container py-8">
                <FrmAddPerson />
            </div>
        </main>
    )
}