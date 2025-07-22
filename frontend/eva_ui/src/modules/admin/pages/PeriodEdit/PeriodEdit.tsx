import { FrmAddPeriod } from '@/modules/admin'
import { HeaderSection, LayoutFrmHorizontal } from '@/modules/core'
import { period } from '@/types'

interface PeriodEditProps {
    periodData: period.IPeriodPost
    idPeriod?: number  // Aquí agregamos el id como prop opcional
}

export const PeriodEdit = ({ periodData, idPeriod }: PeriodEditProps) => {
    if (!periodData) {
        return <p>Cargando...</p>
    }

    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title="Editar periodo"
                subtitle="Formulario para editar un periodo"
                showBackButton
                disableAddButton
                hrefBack="/admin/period-manange"
            />
            <div className="bg-white container py-8">
                <LayoutFrmHorizontal title="Datos del periodo" subtitle="Ingrese los datos del periodo">
                    <FrmAddPeriod periodData={periodData} idPeriod={idPeriod} /> 
                </LayoutFrmHorizontal>
            </div>
        </main>
    )
}
