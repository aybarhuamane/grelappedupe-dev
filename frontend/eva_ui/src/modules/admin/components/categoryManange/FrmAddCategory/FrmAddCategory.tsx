'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
    SubmitHandler,
    useForm,
    FormProvider,
    Controller,
} from 'react-hook-form'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'


export const FrmAddCategory = () => {
    return (
        <main>
            <form className='flex flex-col gap-5'>
                <section className='grid grid-cols-2 w-full gap-6'>
                    <div className='w-full'>
                        <Label htmlFor="text">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            className="h-10"
                            placeholder="Nombre de la Categoria"
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="text">Descripción</Label>
                        <Input
                            id="description"
                            type="text"
                            className="h-10"
                            placeholder="Descripción de la categoria"
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="text">Estado de la categoria</Label>
                        <Select>
                            <SelectTrigger className="w-[190px]">
                                <SelectValue placeholder="Seleccione un estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Estados:</SelectLabel>
                                    <SelectItem value="apple">Activo</SelectItem>
                                    <SelectItem value="banana">Inactivo</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </section>
                <div className='flex justify-end gap-4' >
                    <Link href='/admin/category-manage'>
                        <Button variant="outline">Cancelar</Button>
                    </Link>
                    <Button>Agregar</Button>
                </div>
            </form>
        </main>
    )
}