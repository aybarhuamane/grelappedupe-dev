'use client'

import { detailsInstitutionApi, institutionsFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { AsideIndications } from "@/modules/admin";
import { AddInstitutionOnly, InstitutionSchema } from "@/modules/admin/components/institutionManage/FormAddInstitution/FormOnlyAddInstitution";
import { HeaderSection, LayoutAsideSection } from "@/modules/core";
import { institution } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveAllIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddDetailsInstitutionOnly, DetailSchemaInstitution } from "./FormOnlyAddDetailsInstitution";

const indications = [
    'Aqui puedes agregar una nueva institución',
    'Recuerda que todos los campos son obligatorios',
    'Si no encuentras el ubigeo de la institución, puedes crear uno nuevo.',
]

export default function FormAddInstitutionUnique() {
    const methods = useForm({
        resolver: zodResolver(InstitutionSchema.merge(DetailSchemaInstitution)),
    });
    const { createOrUpdateDetailInstitution } = detailsInstitutionApi
    const { createOrUpdateInstitution } = institutionsFunctionsApi
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState<institution.IInstitutionPost | null>(null);

    const handleInstitutionSubmit: SubmitHandler<institution.IInstitutionPost> = async (
        data: institution.IInstitutionPost
    ) => {
        setIsOpen(false);

        const newData: institution.IInstitutionPost = {
            name: data.name,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            ubigeo: data.ubigeo,
        };

        try {
            const res = await createOrUpdateInstitution(newData);
            if (res.ok) {
                const response = await res.json();
                if (response) {
                    const institutionId = response.id;
                    methods.setValue('institution', institutionId);
                    setIsOpen(true);
                    return institutionId;
                }
            } else {
                const errorData = await res.json();
                setErrors(errorData);
                toast.error("Error al crear la institución.");
            }
        } catch (error) {
            console.error("Error al crear la institución:", error);
            toast.error("Error al procesar la solicitud de institución.");
        }
        return null;
    };

    const handleDetailSubmit: SubmitHandler<any> = async (data) => {
        setIsOpen(false);

        const institutionId = methods.watch('institution');
        if (!institutionId) {
            toast.error("El campo 'institution' es requerido.");
            return;
        }

        try {
            const newData = {
                director: data.director,
                level: Number(data.level),
                area: Number(data.area),
                local_code: data.local_code,
                modular_code: data.modular_code,
                modality: Number(data.modality),
                institution: institutionId,
                category: data.category
            };

            const res = await createOrUpdateDetailInstitution(newData);
            if (res.ok) {
                return true;
            } else {
                const errorData = await res.json();
                console.error("Errores de validación:", errorData);
            }
        } catch (error) {
            console.error('Error al crear los detalles:', error);
            toast.error("Error al procesar la solicitud de detalles.");
        }
        return false;
    };

    const onSubmit = async (data: any) => {
        let toastMessage = '';
        let toastType: 'success' | 'error' = 'success';

        const institutionId = await handleInstitutionSubmit(data);
        if (!institutionId) {
            toastMessage = 'Error al crear la institución';
            toastType = 'error';
        } else {
            const success = await handleDetailSubmit(data);
            if (success) {
                toastMessage = 'Institución y detalles creados correctamente';
            } else {
                toastMessage = 'Error al crear los detalles de la institución';
                toastType = 'error';
            }
        }

        toast[toastType](toastMessage);

        if (toastType === 'success') {
            methods.reset();
            router.push("/admin/institution-manage");
        }
    };


    return (
        <main className="flex flex-col gap-5">
            <HeaderSection
                title="Crear Institución"
                subtitle="Formulario para agregar una nueva institución"
                showBackButton
                disableAddButton
                hrefBack="/admin/institution-manage"
            />
            <div className="container space-y-5 pb-5">
                <LayoutAsideSection aside={<AsideIndications indications={indications} />}>
                    <div className="bg-white">
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
                                <AddInstitutionOnly />
                                <AddDetailsInstitutionOnly />
                                <div className='flex justify-end gap-4 px-8 pb-8'>
                                    <Link href='/admin/institution-manage'>
                                        <Button variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button>
                                        <SaveAllIcon className='w-6 h-6 mr-2' />
                                        Guardar
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </LayoutAsideSection>
            </div>
        </main>
    )
}
