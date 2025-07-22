'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { person } from '@/types'
import { personaFunctionsApi } from '@/api/app/index'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ToastCustom } from '../Toast/ToastCustom'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface IFormUserProfile {
  defaultData?: person.IPersonList
  cancelHref?: string
}

export const UserProfile = (props: IFormUserProfile) => {
  const { createOrUpdatePerson } = personaFunctionsApi
  const { defaultData, cancelHref  } = props
  const router = useRouter()
  const methods = useForm<person.IPersonList>({
    defaultValues: defaultData,
  })
  const [loading, setLoading] = useState(false)

  const isDirty = methods.formState.isDirty


  const onSubmit: SubmitHandler<person.IPersonPost> = async (data) => {
    setLoading(true)

    const newData: person.IPersonPost = {
      name: data.name || '',
      last_name: data.last_name || '',
      num_document: data.num_document || '',
      email: data.email,
      phone: data.phone,
    }

    try {
      const response = await createOrUpdatePerson(newData, defaultData?.id)

      if (response.ok) {
        toast.success(
          <ToastCustom
            title="Datos actualizados"
            message={`Los datos de ${newData.name} ${newData.last_name} han sido actualizados.`}
          />
        )
      } else {
        toast.error(
          <ToastCustom
            title="Error"
            message={`Error al guardar la persona: ${newData.name} ${newData.last_name}`}
          />
        )
      }
    } catch (error) {
      console.error('Error al guardar la persona: ', error)
      toast.error(
        <ToastCustom
          title="Error"
          message="Error al guardar la persona"
        />
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <section className="flex flex-col gap-4 p-8 w-full bg-white">
            <div>
              <Label htmlFor="text">Nombres</Label>
              <Controller
                name="name"
                rules={{
                  required: 'Ingrese sus Nombres',
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                    message: 'Solo se permiten letras y espacios',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ingrese su nombres"
                    className="h-10"
                    value={value || ''}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(inputValue)) {
                        onChange(inputValue)
                      }
                    }}
                    required
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="text">Apellidos</Label>
              <Controller
                name="last_name"
                rules={{
                  required: 'Ingrese su Apellidos',
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
                    message: 'Solo se permiten letras y espacios',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="last_name"
                    type="text"
                    className="h-10"
                    placeholder="Ingrese sus apellidos"
                    value={value || ''}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(inputValue)) {
                        onChange(inputValue)
                      }
                    }}
                    required
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="text">N° de Documento</Label>
              <Controller
                name="num_document"
                rules={{
                  required: 'Ingrese su documento',
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Solo se permiten números',
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Input
                      id="text"
                      type="text"
                      className="h-10"
                      placeholder="Ingrese su n° de documento"
                      value={value || ''}
                      onChange={(e) => {
                        const inputValue = e.target.value
                        if (/^[0-9]*$/.test(inputValue)) {
                          onChange(inputValue)
                        }
                      }}
                      required
                    />
                    {error && <p className="text-red-600">{error.message}</p>}
                  </div>
                )}
              />
            </div>
          </section>
          <div className="flex justify-end items-center gap-4 p-8 bg-white">
            <Button
              variant={'outline'}
              type="button"
              className="h-10 border-green-800 text-green-800 bg-green-800/10"
              onClick={() => cancelHref && router.push(cancelHref)}
            >
              Cancelar
            </Button>
            <Button
              className="h-10"
              type="submit"
              disabled={loading || !isDirty}
            >
              {loading && <Loader2 className="w-6 h-6 animate-spin" />}
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
