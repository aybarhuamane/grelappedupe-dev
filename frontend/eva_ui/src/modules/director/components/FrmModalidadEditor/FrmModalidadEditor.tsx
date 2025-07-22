'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { modality } from '@/types'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { modalitiesFunctionsApi } from '@/api'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/modules/core'

interface DialogModalidadProps {
  defaultData?: modality.IModality
}

export const FrmModalidadEditor = (props: DialogModalidadProps) => {
  const { defaultData } = props
  const router = useRouter()

  const handleBack = () => {
    router.push('/director/manage-classrooms/modality')
  }

  const methods = useForm<modality.IModality>({
    defaultValues: defaultData,
  })

  const onSubmit: SubmitHandler<modality.IModality> = async (
    data: modality.IModality
  ) => {
    const newData: modality.IModalityPost = {
      name: data.name,
      is_active: data.is_active,
    }

    try {
      if (defaultData) {
        const res = await modalitiesFunctionsApi.createOrUpdateInstitution(
          newData,
          defaultData.id
        )

        if (res.ok) {
          toast.success(
            <ToastCustom
              title="Modalidad actualizada"
              message={`La modalidad ${newData.name} ha sido actualizada`}
            />
          )
        } else {
          toast.error(
            <ToastCustom
              title="Error"
              message={res.statusText}
            />
          )
        }
      } else {
        const res = await modalitiesFunctionsApi.createOrUpdateInstitution(
          newData
        )

        if (res.ok) {
          toast.success(
            <ToastCustom
              title="Modalidad creada"
              message={`La modalidad ${newData.name} ha sido creada`}
            />
          )
        } else {
          toast.error(
            <ToastCustom
              title="Error"
              message={res.statusText}
            />
          )
        }
      }
      handleBack()
    } catch (error) {
      console.error(error)

      toast.error(
        <ToastCustom
          title="Error"
          message="Ocurrió un error inesperado, por favor intente de nuevo."
        />
      )
    }
  }

  return (
    <Dialog
      open
      onOpenChange={handleBack}
    >
      <DialogContent className="sm:max-w-[520px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {defaultData ? 'Editar' : 'Crear'}
                Modalidad
              </DialogTitle>
              <DialogDescription className="text-xs">
                Registre el nombre y el estado (opcional) de la modalidad. Se
                guardará en estado desactivado por defecto.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center">
                <Label
                  htmlFor="name"
                  className="text-left"
                >
                  Nombre de la modalidad
                </Label>
              </div>
              <div className="grid grid-cols-3 items-center gap-5">
                <Input
                  id="namecategory"
                  className="col-span-3"
                  placeholder='Ejemplo: "Presencial"'
                  required
                  {...methods.register('name')}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                control={methods.control}
                name="is_active"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    id="terms"
                    className="peer h-4 w-4"
                    checked={value}
                    onCheckedChange={onChange}
                  />
                )}
              />
              <label
                htmlFor="terms"
                className="px-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Activar modalidad
              </label>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={handleBack}
                  type="button"
                  variant="secondary"
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                // onClick={onSubmitMod}
                type="submit"
              >
                {defaultData ? 'Actualizar' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
