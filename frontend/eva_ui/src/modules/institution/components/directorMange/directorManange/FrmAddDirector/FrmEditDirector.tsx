'use client'

import { personaFunctionsApi } from '@/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DialogConfirmacion from '@/modules/core/components/dialogos/confirmacion'
import { person } from '@/types'
import { IPersonPost } from '@/types/core/IPerson'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LayoutFrmHorizontal } from '@/modules/core'

interface IFrmPersonProps {
    personaData?: person.IPersonList
    person_id?: number
}

const personSchema = z.object({
    name: z.string().min(3, { message: 'El nombre es requerido' }),
    last_name: z.string().min(3, 'El apellido es requerido'),
    num_document: z.string().min(8, 'El documento debe tener al menos 8 caracteres').max(8, 'El documento debe tener máximo 8 caracteres'),
    phone: z.string().optional(),
    email: z.string().optional(),
})

export const FrmEditDirector = (props: IFrmPersonProps) => {
    const { personaData, person_id } = props
    const { createOrUpdatePerson } = personaFunctionsApi

    const [isOpen, setIsOpen] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null)
    const router = useRouter()

    const methods = useForm<z.infer<typeof personSchema>>({
        resolver: zodResolver(personSchema),
        defaultValues: personaData,
    })

    const onSubmit = () => {
        setIsOpen(true)
    }

    const handleSubmit: SubmitHandler<person.IPersonList> = async (data: person.IPersonList) => {
        setIsOpen(false)

        const newData: IPersonPost = {
            num_document: data.num_document,
            name: data.name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
        }

        try {
            if (person_id) {
                const res = await createOrUpdatePerson(newData, person_id)
                if (res.ok) {
                    const data: person.IPersonList = await res.json()
                    if (data) {
                        toast.success(`Director actualizada correctamente con el id: ${person_id}`)
                        methods.reset()
                        router.push('/admin/director-manage')
                    } else {
                        const data = await res.json()
                        if (data) {
                            setErrors(data)
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error al actualizar la director:', error)
        }
    }

    return (
        <main className='container'>
            <FormProvider {...methods}>
                <form className="flex flex-col gap-5" onSubmit={methods.handleSubmit(onSubmit)}>
                    <LayoutFrmHorizontal
                        title="Datos Personales"
                        subtitle="Ingrese los datos personales"
                    >
                        <div className="w-full">
                            <FormField
                                control={methods.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Nombre</Label>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Ingrese el nombre" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <FormField
                                control={methods.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Apellido</Label>
                                        <FormControl>
                                            <Input
                                                id="last_name"
                                                type="text"
                                                placeholder="Ingrese el apellido" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <FormField
                                control={methods.control}
                                name="num_document"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Documento</Label>
                                        <FormControl>
                                            <Input
                                                id="num_document"
                                                type="text"
                                                placeholder="Ingrese el documento" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </LayoutFrmHorizontal>

                    <section>
                        <LayoutFrmHorizontal
                            title="Datos de Contacto"
                            subtitle="Ingrese el correo y un celular de contacto"
                        >
                            <div className="w-full">
                                <FormField
                                    control={methods.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Teléfono</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="phone"
                                                    type="text"
                                                    placeholder="Ingrese el teléfono" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <FormField
                                    control={methods.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    placeholder="Ingrese el email" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </LayoutFrmHorizontal>
                    </section>

                    <div className="flex justify-end gap-4">
                        <Link href='/admin/director-manage'>
                            <Button variant="outline">Cancelar</Button>
                        </Link>
                        <Button>
                            {person_id ? 'Actualizar' : 'Crear'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <DialogConfirmacion
                isOpenConfirm={isOpen}
                onCloseConfirm={() => setIsOpen(false)}
                onSubmitConfirm={() => handleSubmit({
                    ...methods.getValues(),
                    id: person_id || 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    email: methods.getValues().email || '',
                    phone: methods.getValues().phone || '',
                })}
            />
        </main>
    )
}
