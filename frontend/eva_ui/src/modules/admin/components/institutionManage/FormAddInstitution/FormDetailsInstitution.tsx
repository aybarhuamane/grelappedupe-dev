/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { detailsInstitutionApi } from '@/api'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useArea } from '@/modules/admin/hooks/useArea'
import { useEducationLevel } from '@/modules/admin/hooks/useEducationLevel'
import { useModality } from '@/modules/admin/hooks/useModalidad'
import DialogConfirmacion from '@/modules/core/components/dialogos/confirmacion'
import { detailInstitution } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { DirectorSection } from '../AsignDirector/AsignDirector'

interface IProps {
    institution_id?: number
}

const DetailSchema = z.object({
    local_code: z.string().min(3, { message: 'Este campo es requerido' }),
    modular_code: z.string().min(3, 'Este campo es requerido'),
    director: z.number().min(1, 'Este campo es requerido'),
    level: z.string().min(1, 'Este campo es requerido'),
    area: z.string().min(1, 'Este campo es requerido'),
    modality: z.string().min(1, 'Este campo es requerido'),
})

export const AddDetailsInstitution = ({ institution_id }: IProps) => {
    const { createOrUpdateDetailInstitution, fetchDetailInstitutionId } = detailsInstitutionApi
    const { getAreas, listArea, loadingArea } = useArea()
    const { getModality, listModality, loadingModality } = useModality()
    const { getEducationsLevels, listLevel, loadingLevel } = useEducationLevel()

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [institutionData, setInstitutionData] = useState<detailInstitution.IDetailInstitutionList | null>(null)

    const methods = useForm<detailInstitution.IDetailInstitutionPost>({
        resolver: zodResolver(DetailSchema),
        defaultValues: {
            local_code: '',
            modular_code: '',
            director: 0,
            level: 0,
            area: 0,
            modality: 0,
        }
    })

    const getInstitution = async (id: number) => {
        try {
            const res = await fetchDetailInstitutionId(id)
            if (res.ok) {
                const data = await res.json()
                setInstitutionData(data)
                // Poblar los campos del formulario con los datos obtenidos
                methods.reset({
                    local_code: data.local_code,
                    modular_code: data.modular_code,
                    director: Number(data.director),
                    level: Number(data.level),
                    area: Number(data.area),
                })
            }
        } catch (error) {
            console.error('Error al obtener la institución:', error)
        }
    }

    useEffect(() => {
        getAreas({})
        getModality({})
        getEducationsLevels({})
        if (institution_id !== undefined) {
            getInstitution(institution_id)
        }
    }, [institution_id])

    const institutiosArea = listArea.results || []
    const modalities = listModality.results || []
    const levels = listLevel.results

    const onSubmit = () => {
        setIsOpen(true)
    }

    const handleSubmit: SubmitHandler<detailInstitution.IDetailInstitutionPost> = async (
        data: detailInstitution.IDetailInstitutionPost
    ) => {
        setIsOpen(false)

        const newData: detailInstitution.IDetailInstitutionPost = {
            institution: institutionData?.id ?? 0,
            director: data.director,
            level: Number(data.level),
            category: institutionData?.category?.id ?? null,
            area: Number(data.area),
            local_code: data.local_code,
            modular_code: data.modular_code,
            modality: Number(data.modality),
        }

        try {
            if (institution_id) {
                const res = await createOrUpdateDetailInstitution(newData, institution_id)
                if (res.ok) {
                    toast.success(`Institución actualizada correctamente con el id: ${institution_id}`)
                    methods.reset()
                    router.push('/admin/institution-manage')
                } else {
                    const data = await res.json()
                    console.error('Errores de validación:', data)
                }
            }
        } catch (error) {
            console.error('Error al actualizar la institución:', error)
        }
    }

    return (
        <main>


            <FormProvider {...methods}>
                <form
                    className='flex flex-col gap-5'
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <section className='sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-6'>
                        <FormField
                            control={methods.control}
                            name="local_code"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Código Local</Label>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="modular_code"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Código Modular</Label>
                                    <FormControl>
                                        <Input type='string' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>NIvel</Label>
                                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el area" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                levels.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Area</Label>
                                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione el area" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                institutiosArea.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="modality"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Modalidad</Label>
                                    <Select onValueChange={field.onChange} defaultValue={(field.value ?? '').toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione la modalidad" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                modalities.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='pt-2'>
                            <DirectorSection />
                        </div>
                    </section>
                    <div className='flex justify-end gap-4' >
                        <Link href='/admin/institution-manage'>
                            <Button variant="outline">Cancelar</Button>
                        </Link>
                        <Button>
                            {institution_id ? 'Actualizar' : 'Crear'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <DialogConfirmacion
                isOpenConfirm={isOpen}
                onCloseConfirm={() => setIsOpen(false)}
                onSubmitConfirm={() => handleSubmit({
                    ...methods.getValues(),
                    institution: institutionData?.institution.id ?? 0,
                    category: institutionData?.category?.id ?? null,
                    local_code: methods.getValues().local_code.toString(),
                    modular_code: methods.getValues().modular_code.toString(),
                    level: Number(methods.getValues().level),
                    area: Number(methods.getValues().area),
                    modality: Number(methods.getValues().modality),
                })}
            />
        </main>
    )
}
