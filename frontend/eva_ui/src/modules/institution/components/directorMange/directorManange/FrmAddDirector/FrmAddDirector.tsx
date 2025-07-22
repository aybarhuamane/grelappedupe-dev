/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import DialogConfirmacion from '@/modules/core/components/dialogos/confirmacion'
import { IDirectorPost } from '@/types/educativa/IDirector'
import { LayoutFrmHorizontal, ToastCustom } from '@/modules/core'
import { directoresFunctionsApi } from '@/api'
import { PersonSection } from '../AsignDirector/AsignDirectorRol'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FrmAddPerson, PersonCreate } from '@/modules/admin/components/personManange'
import { PlusIcon } from 'lucide-react'

export const AddDirector = () => {
  const { createOrUpdateDirector } = directoresFunctionsApi

  const [open, setOpen] = useState(false)
  const [errors, serErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const methods = useForm<IDirectorPost>()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleOnSubmit: SubmitHandler<IDirectorPost> = async (data) => {
    setOpen(false)
    setIsLoading(true)

    try {
      const res = await createOrUpdateDirector(data)

      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Asignación de director"
            message="La asignación de director se ha realizado correctamente"
          />
        )
        router.push('/admin/director-manage')
      } else {
        const dataError = await res.json()
        console.error(dataError)
        toast.error(
          <ToastCustom
            title="Asignación de director"
            message="Ha ocurrido un error al asignar el director"
          />
        )
      }
    } catch (error) {
      console.error(error)
      toast.error(
        <ToastCustom
          title="Asignación de director"
          message="Ha ocurrido un error al asignar el director"
        />
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/admin/director-manage')
  }

  return (
    <main className="sm:w-full md:container space-y-8">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <LayoutFrmHorizontal
            title="Seleccionar una persona"
            subtitle="Seleccione una persona para asignar el rol de director"
          >
            <PersonSection />
          </LayoutFrmHorizontal>

          <footer className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              //   disabled={isLoading || !isDirty}
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Asignar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <DialogConfirmacion
        isOpenConfirm={open}
        onCloseConfirm={() => setOpen(false)}
        description="¿Está seguro de asignar el rol de director a esta persona?"
        tittleConfirm="Confirmar asignación"
        aceppLabel="Asignar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() => handleOnSubmit(methods.getValues())}
      />
      <LayoutFrmHorizontal
        title="Crear una persona"
        subtitle="Si la persona que busca asignar como director no existe en la plataforma, puede crearlo."
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-96"
            >
              <div className="flex gap-2">
                <PlusIcon
                  height={20}
                  width={20}
                />
                Crear persona
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[420px]"
            style={{ minWidth: '720px' }}
          >
            <SheetHeader>
              <SheetTitle>Crea una persona</SheetTitle>
              <SheetDescription>
                Ingrese los datos de la persona a crear
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <FrmAddPerson />
            </div>
          </SheetContent>
        </Sheet>
      </LayoutFrmHorizontal>
    </main>
  )
}
