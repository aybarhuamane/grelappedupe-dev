import { detailsInstitutionApi, institutionsFunctionsApi } from "@/api"
import { DynamicTabs, ITabContent } from "@/components/custom/dynamic-tabs"
import { AddInstitution } from "@/modules/admin/components/institutionManage/FormAddInstitution/FormAddInstitution"
import { FormEditDetailInstitution } from "@/modules/admin/components/institutionManage/FormAddInstitution/FormEditDetailInstitution"
import { HeaderSection } from "@/modules/core"
import { institution, response } from "@/types"

interface IProps {
    params: {
        id: string
    }
}

export default async function Page(props: IProps) {
    const { params } = props
    const { id } = params

    const { institutionGetId } = institutionsFunctionsApi

    let defaultData: institution.IInstitutionList | undefined = undefined

    try {
        const res = await institutionGetId(Number(id))
        if (res.ok) {
            const listData = await res.json()
            defaultData = listData
        }
    } catch (error) {
        console.error('Error:', error)
    }

    const { fetchDetailInstitutionByInstitutionId } = detailsInstitutionApi

    let detailsData: institution.IDetailsInstitutionList[] = []

    try {
        const res = await fetchDetailInstitutionByInstitutionId(Number(id))
        if (res.ok) {
            detailsData = await res.json()
        }
    } catch (error) {
        console.error('Error:', error)
    }

    let initialData: response.IResApi<institution.IDetailsInstitutionList> | undefined = undefined

    try {
        const res = await fetchDetailInstitutionByInstitutionId(Number(id))
        if (res.ok) {
            const listData = await res.json()
            initialData = listData
        }
    } catch (error) {
        console.error('Error:', error)
    }

    const tabs: ITabContent[] = [
        {
            label: "Editar institución",
            value: "institution",
            content: (
                <AddInstitution
                    institutionData={defaultData}
                    institution_id={Number(id)}
                />
            )
        },
        {
            label: "Editar detalles",
            value: "details",
            content: (
                <FormEditDetailInstitution
                    institution_id={Number(id)}
                    detailsData={initialData}
                />
            )
        }
    ]

    return (
        <main className="flex flex-col">
            <HeaderSection
                title={id ? "Editar institución" : "Crear institución"}
                subtitle={id ? "Formulario para editar una institución" : "Formulario para crear una institución"}
                showBackButton
                disableAddButton
                hrefBack="/admin/institution-manage"
            />
            <DynamicTabs
                tabs={tabs}
                defaultValue="institution"
            />
        </main>
    )
}