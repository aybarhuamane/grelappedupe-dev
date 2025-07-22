"use client";
import { importFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  AlertCustom,
  FileDropzone,
  HeaderSection,
  ToastCustom,
} from "@/modules/core";
import { importStudenst } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

const API_URL = process.env.API_URL_DOWN;

const steps: string[] = [
  "Recuerda que el archivo debe tener el formato correcto para poder importar los datos correctamente. (Archivo: 02_ALUMNOS_CARGA_MASIVA.xlsx)",
  "Sube el archivo con el listado de estudiantes para importarlos a la evaluación",
  "Si no tienes el archivo con el formato correcto, descarga el formato de ejemplo",
  "Si no se descarga el archivo, da permisos a la página para que puedas descargarlo",
];
interface IProps {
  course_assigned_id: number;
}

interface IResSuccess {
  message: string;
  imported_students: any[];
  errors: any[];
}

export const AlumnosImport = (props: IProps) => {
  const { course_assigned_id } = props;
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const params = useSearchParams();

  const level_id = Number(params.get("level_id"));
  const degree_number = Number(params.get("degree_number"));

  const methods = useForm<importStudenst.IStudentImport>({
    defaultValues: {
      course_assigned_id: course_assigned_id,
    },
  });

  const onSubmit: SubmitHandler<importStudenst.IStudentImport> = async (
    data: importStudenst.IStudentImport
  ) => {
    setLoading(true);
    try {
      const res = await importFunctionsApi.importStudentsData({
        course_assigned_id: data.course_assigned_id,
        level_id: level_id,
        degree_number: degree_number.toString(),
        file: data.file,
      });
      if (res.ok) {
        const data = (await res.json()) as IResSuccess;

        toast.success(
          <ToastCustom
            title="¡Importación exitosa!"
            message={`${data.message}  Estudiantes importados: ${data.imported_students.length} - Existentes: ${data.errors.length}`}
          />
        );
      } else {
        toast.error(
          <ToastCustom
            title="¡Error al importar!"
            message="Ha ocurrido un error al importar los datos."
          />
        );
      }
    } catch (error) {
      toast.error(
        <ToastCustom
          title="¡Error al importar!"
          message="Ha ocurrido un error al importar los datos."
        />
      );
    }
    router.push(`/teacher/evaluaciones/${course_assigned_id}`);
    setLoading(false);
  };

  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click(); // Forzar la descarga cuando se haga clic
    }
  };

  return (
    <main className="flex flex-col gap-8">
      <HeaderSection
        title="Importar lista de estudiantes"
        subtitle="Suba el archivo con el listado de estudiantes para importarlos a la evaluación"
        disableAddButton
        showBackButton
        hrefBack={`/teacher/evaluaciones/${id}`}
      />
      <section className="container">
        <AlertCustom
          title="¡Atención, Ten en cuenta!"
          color="warning"
          content={
            <ul className="list-disc list-inside">
              {steps.map((step) => (
                <li key={step} className="text-slate-600">
                  {step}
                </li>
              ))}
            </ul>
          }
        />
      </section>
      <FormProvider {...methods}>
        <form>
          <main className="flex flex-col container space-y-8">
            <section className="justify-between items-end inline-flex">
              <div className="justify-start items-start gap-4 flex">
                <div className="w-8 h-8 p-4 rounded-full border border-slate-500 flex-col justify-center items-center gap-2.5 inline-flex">
                  <span className="text-base font-medium">1</span>
                </div>
                <div className="flex-col justify-start items-start gap-2 inline-flex">
                  <h5 className="text-xl font-medium">
                    Seleccione un archivo para importar
                  </h5>
                  <p className="text-slate-600 text-sm">
                    Ten en cuenta que el archivo debe tener el formato correcto
                    para poder importar los datos correctamente. Si no tiene el
                    formato correcto, descarga el formato de ejemplo.
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
                href={`${API_URL}media/02_ALUMNOS_CARGA_MASIVA.xlsx`}
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
            <footer className="flex flex-col w-full justify-center items-center pb-12">
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                className="px-10"
                disabled={loading}
              >
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Importando..." : "Importar"}
              </Button>
            </footer>
          </main>
        </form>
      </FormProvider>
    </main>
  );
};
