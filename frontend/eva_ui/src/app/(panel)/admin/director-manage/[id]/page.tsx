import { directoresFunctionsApi, personaFunctionsApi } from "@/api"
import { FrmEditDirector } from "@/modules/admin"
import { HeaderSection, LayoutFrmHorizontal } from "@/modules/core"
import { person } from "@/types"

interface IProps {
    params: {
        id: string
    }
}

export default async function Page (props: IProps) {
    const { params } = props
    const { id } = params

    const { directorGetId } = directoresFunctionsApi
    const { personGetId } = personaFunctionsApi

    let defaultData: person.IPersonList | undefined = undefined

    try {
        const directorData = await directorGetId(Number(id))
        if (directorData.ok) {
            const listData = await directorData.json()
            if (listData.person) {
                const personData = await personGetId(listData.person)
                if (personData.ok) {
                    const personDataJson = await personData.json()
                    defaultData = personDataJson
                }
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }

    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title={id ? "Editar director" : "Crear director"}
                subtitle={id ? "Formulario para editar un director" : "Formulario para crear un director"}
                showBackButton
                disableAddButton
                hrefBack="/admin/director-manage"
            />
            <div className="bg-white container py-8">
                <LayoutFrmHorizontal title='Datos del director' subtitle='Ingrese los datos del director'>
                    <FrmEditDirector
                        personaData={defaultData}
                        person_id={defaultData?.id}
                    />
                </LayoutFrmHorizontal>
            </div>
        </main>
    )
}