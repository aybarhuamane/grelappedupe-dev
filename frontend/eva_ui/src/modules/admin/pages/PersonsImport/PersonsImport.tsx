'use client'
import { Button } from '@/components/ui/button'
import { FileDropzone, HeaderSection } from '@/modules/core'
import { DownloadIcon } from 'lucide-react'

import { importPersonFunctionsApi } from '@/api'
import { ToastCustom } from '@/modules/core'
import { importStudenst } from '@/types'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { toast } from 'react-toastify'

const API_URL = process.env.API_URL_DOWN

export const PersonsImport = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const methods = useForm<importStudenst.IPersonImport>()

  const onSubmit: SubmitHandler<importStudenst.IPersonImport> = async (
    data: importStudenst.IPersonImport
  ) => {
    setLoading(true)
    try {
      const res = await importPersonFunctionsApi.importPersonsData({
        file: data.file,
      })
      if (res.ok) {
        toast.success(
          <ToastCustom
            title="¡Importación exitosa!"
            message="Los datos han sido importados correctamente."
          />
        )
        router.push('/admin/person-manange')
      } else {
        toast.error(
          <ToastCustom
            title="¡Error al importar!"
            message="Ha ocurrido un error al importar los datos."
          />
        )
      }
    } catch (error) {
      toast.error(
        <ToastCustom
          title="¡Error al importar!"
          message="Ha ocurrido un error al importar los datos."
        />
      )
    }
    setLoading(false)
  }

  const downloadRef = useRef<HTMLAnchorElement | null>(null)

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click() // Forzar la descarga cuando se haga clic
    }
  }

  return (
    <div>
      <HeaderSection
        title="Importar personas"
        subtitle="Suba un archivo con los datos de las personas que desea importar."
        disableAddButton
        hrefBack="/admin/person-manange"
        showBackButton
      />
      <FormProvider {...methods}>
        <form>
          <main className="flex flex-col container space-y-8 py-6">
            <section className="justify-between items-end inline-flex">
              <div className="justify-start items-start gap-4 flex">
                <div className="w-8 h-8 p-4 rounded-full border border-slate-500 flex-col justify-center items-center gap-2.5 inline-flex">
                  <span className="text-base font-medium">1</span>
                </div>
                <div className="flex-col justify-start items-start gap-2 inline-flex">
                  <h5 className="text-xl font-medium">Importe su archivo</h5>
                  <p className="text-slate-600 text-sm">
                    Seleccione un archivo que contenga sus los datos para
                    importar.
                  </p>
                </div>
              </div>

              <Button
                variant="link"
                className="space-x-2"
                onClick={handleDownload} // Ejecuta la función de descarga
              >
                <DownloadIcon size={20} />
                <div className="text-sm font-medium">
                  Descargar formato de ejemplo
                </div>
              </Button>
              {/* El enlace oculto que dispara la descarga */}
              <a
                href={`${API_URL}media/03_PERSONAS_CARGA_MASIVA.xlsx`}
                target="_blank"
                ref={downloadRef}
                download
                className="hidden"
              >
                Descargar
              </a>
            </section>

            <Controller
              control={methods.control}
              name="file"
              render={({ field }) => (
                <FileDropzone
                  value={field.value}
                  onChange={(file) => field.onChange(file)}
                />
              )}
            />
            <footer className="flex flex-col w-full justify-center items-center">
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                className="px-10"
                disabled={loading}
              >
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? 'Importando...' : 'Importar'}
              </Button>
            </footer>
          </main>
        </form>
      </FormProvider>
    </div>
  )
}
