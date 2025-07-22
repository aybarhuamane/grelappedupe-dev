/* eslint-disable react-hooks/exhaustive-deps */
'use client'

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
import { LayoutFrmHorizontal } from '@/modules/core'
import { useEffect } from 'react'
import { useFormContext } from "react-hook-form"
import { z } from 'zod'

export const DetailSchemaInstitution = z.object({
    local_code: z.string().min(3, { message: 'Este campo es requerido' }),
    modular_code: z.string().min(3, 'Este campo es requerido'),
    level: z.string().min(1, 'Este campo es requerido'),
    area: z.string().min(1, 'Este campo es requerido'),
    modality: z.string().min(1, 'Este campo es requerido'),
})

export const AddDetailsInstitutionOnly = () => {
    const { register, formState: { errors }, control } = useFormContext();
    const { getAreas, listArea, loadingArea } = useArea()
    const { getModality, listModality, loadingModality } = useModality()
    const { getEducationsLevels, listLevel, loadingLevel } = useEducationLevel()

    useEffect(() => {
        getAreas({})
        getModality({})
        getEducationsLevels({})
    }, [])

    const institutiosArea = listArea.results || []
    const modalities = listModality.results || []
    const levels = listLevel.results

    return (
        <main className='px-8'>
            <LayoutFrmHorizontal
                title="Detalles de la Institución"
                subtitle="Completa los datos de la institución"
            >

                <section className='sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-6'>
                    <FormField
                        control={control}
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
                        control={control}
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
                        control={control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Nivel</Label>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={(field.value ?? '').toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el nivel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {levels.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Área</Label>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el área" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {institutiosArea.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
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
                                        {modalities.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

            </LayoutFrmHorizontal>
        </main>
    )
}
