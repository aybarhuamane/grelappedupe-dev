'use client'

import { ubigeoFunctionsApi } from '@/api'
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ubigeo } from '@/types'

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const UbigeoSchema = z.object({
    code: z.string().min(3, { message: 'El nombre es requerido' }),
    region: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional()
})

export const FormAddUbigeo = () => {

    const { createOrUpdateUbigeo } = ubigeoFunctionsApi

    const form = useForm<z.infer<typeof UbigeoSchema>>({
        resolver: zodResolver(UbigeoSchema),
    })

    const handleCreateUbigeo: SubmitHandler<ubigeo.IUbigeoPost> = async (data) => {
        try {
            const res = await createOrUpdateUbigeo(data)
            if (res.ok) {
                toast.success('Ubigeo creado correctamente')
            } else {
                toast.error('Error al crear el ubigeo')
            }
        } catch (error) {
            toast.error('Error al crear el ubigeo')
        }

    }


    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(
                    (data) => {
                        handleCreateUbigeo({
                            ...data,
                            region: data.region || '',
                            province: data.province || '',
                            district: data.district || ''
                        })
                    }
                )} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Codigo</Label>
                                <FormControl>
                                    <Input placeholder="Ubigeo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Región</Label>
                                <FormControl>
                                    <Input placeholder="Region" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Provincia</Label>
                                <FormControl>
                                    <Input placeholder="Provincia" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Distrito</Label>
                                <FormControl>
                                    <Input placeholder="Distrito" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Guardar</Button>
                </form>
            </FormProvider>
        </div>
    )
}
