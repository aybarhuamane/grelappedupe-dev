import { fetchGetPersonId } from "@/api/app/core/fetchGetPersonAction"
import { FrmAddPersonAction } from "@/modules/admin/components/personManange/FrmAddPerson/FrmAddPersonAction"
import { HeaderSection } from "@/modules/core"
import { getUser } from "@/types"

interface IProps {
    params: {
        id: string
    }
}

export default async function Page(props: IProps) {
    const { params } = props
    const { id } = params

    let personData: getUser.IGetPersonList | undefined = undefined

    try {
        const res = await fetchGetPersonId(Number(id))
        if (res.ok) {
            const listData = await res.json()
            personData = listData[0]
        }
    } catch (error) {
        console.error('Error:', error)
    }


    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title={id ? "Editar persona" : "Crear persona"}
                subtitle={id ? "Formulario para editar una persona" : "Formulario para crear una persona"}
                showBackButton
                disableAddButton
                hrefBack="/admin/person-manange"
            />
            <div className="bg-white container py-8">
                <FrmAddPersonAction
                    personData={personData}
                    person_id={Number(id)}
                />
                {/* <FrmAddPerson
                    personData={defaultData}
                    person_id={Number(id)}
                /> */}
            </div>
        </main>
    )
}