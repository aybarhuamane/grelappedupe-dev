"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTeacherAssigmentSchool } from "@/api/app/educativa/fetchTeachers";
import { toast } from "react-toastify";

interface IUpdateStateForm {
  id: number;
  is_active: boolean;
  detail_institution: number;
  teaching: number;
}

export const FrmUpdateState = () => {
  const params = useSearchParams();
  const router = useRouter();

  // Obtener valores de la URL
  const is_active = params.get("is_active") === "true"; // Convertir a booleano
  const id = parseInt(params.get("id") || "0");
  const detail_institution = parseInt(params.get("detail_institution_id") || "0");
  const teaching = parseInt(params.get("teaching_id") || "0");

  // Inicializar el formulario con `defaultValues`
  const form = useForm<IUpdateStateForm>({
    defaultValues: {
      id,
      is_active,
      detail_institution,
      teaching,
    },
  });

  // Sincronizar el valor de `is_active` con el formulario al montar el componente
  useEffect(() => {
    form.setValue("is_active", is_active);
  }, [is_active, form]);

  async function onSubmit(data: IUpdateStateForm) {
    try {
      const res = await updateTeacherAssigmentSchool(
        {
          is_active: data.is_active,
          detail_institution,
          teaching,
        },
        id
      );

      if (res.ok) {
        router.push("/director/manage-teachers");
        toast.success("Datos actualizados, se ha cambiado el estado del docente");
      } else {
        console.error(res.statusText);
        toast.error("Error al actualizar el estado del docente");
      }
    } catch (error) {
      toast.error("Error al actualizar el estado del docente");
    }
  }

  return (
    <section className="w-2/3 space-y-6">
      <FormField
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Activo</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value.toString()} // Asegurar que el valor sea un string
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="true">Activo</SelectItem>
                <SelectItem value="false">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" onClick={form.handleSubmit(onSubmit)}>
        Actualizar estado
      </Button>
    </section>
  );
};
