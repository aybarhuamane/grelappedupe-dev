'use client'
import { FrmAddPeriod } from '@/modules/admin'
import { HeaderSection, LayoutFrmHorizontal } from '@/modules/core'

export const PeriodCreate = () => {
    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title="Crear periodo"
                subtitle="Formulario para crear un periodo"
                showBackButton
                disableAddButton
                hrefBack="/admin/period-manange"
            />
            <div className="bg-white container py-8">
                <LayoutFrmHorizontal title='Datos del periodo' subtitle='Ingrese los datos del periodo'>
                    <FrmAddPeriod />
                </LayoutFrmHorizontal>
            </div>

        </main>
    )
}