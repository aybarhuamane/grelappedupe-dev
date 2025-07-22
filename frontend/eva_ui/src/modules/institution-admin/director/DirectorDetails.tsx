import { Button } from "@/components/ui/button"
import { HeaderSection, LayoutFrmHorizontal } from "@/modules/core"
import { detailInstitution } from "@/types"
import Link from "next/link"

interface IProps {
    data: detailInstitution.IDetailInstitutionList | null
}

export const DirectorDetails = (props: IProps) => {
    const { data } = props

    return (
        <main className="space-y-6">
            <HeaderSection
                title="Director"
                subtitle="Detalles del director"
                disableAddButton
            />
            <div className="bg-white container py-6">
                {
                    data?.director ? (
                        <LayoutFrmHorizontal
                            title="Datos Personales"
                            subtitle="Datos del director de la institución"
                        >
                            <div>
                                <h1>{data.director?.person?.name} {data.director?.person?.last_name}</h1>
                                <p>{data.director?.person?.email}</p>
                            </div>


                        </LayoutFrmHorizontal>
                    ) : (
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <h1>Sin director asignado</h1>
                            <Link href="/institution/create">
                                <Button size='sm'>Asignar director</Button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </main>
    )
}
