"use client";
import { capacitiesFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamsFilters } from "@/lib/filter-url";
import { capacity } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useCompetences } from "../hooks/use-competencies";

interface IProps {
  competenceId?: string;
  initialData?: capacity.ICapacityList;
  courseId?: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  competence: z.number(),
  is_active: z.string().optional(),
});

export default function CreateCapacitiesForm(props: IProps) {
  const { competenceId, initialData, courseId } = props;

  const isEditing = !!initialData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      code: initialData?.code || "",
      competence:
        initialData?.competence?.id ??
        (competenceId ? parseInt(competenceId) : 0),
      is_active: initialData?.is_active ? "true" : "false",
    },
  });

  const { getCompetences, listCompetences, loadingCompetences } =
    useCompetences();
  const { createOrUpdateCapacity } = capacitiesFunctionsApi;
  const router = useRouter();

  const { getParams } = useParamsFilters();
  const paramsCourseId = getParams({ key: "curso", value: "" });

  useEffect(() => {
    getCompetences({
      course__id: courseId ? parseInt(courseId, 10) : undefined,
      is_active: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competenceId, courseId, paramsCourseId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const capacityPayload: capacity.ICapacityPost = {
        name: values.name,
        competence: competenceId
          ? parseInt(competenceId, 10)
          : values.competence,
        code: values.code,
        is_active: values.is_active === "true",
      };

      let res;
      if (isEditing) {
        res = await createOrUpdateCapacity(capacityPayload, initialData.id);
      } else {
        res = await createOrUpdateCapacity(capacityPayload);
      }

      if (res.ok) {
        form.reset();
        toast.success(
          isEditing
            ? "Capacidad actualizada con éxito."
            : "Capacidad creada con éxito."
        );
        if (isEditing) {
          router.push(`/admin/quiz-manage/${paramsCourseId}/capacities`);
          setTimeout(() => {
            window.location.reload();
          }, 300);
        } else {
          window.location.reload();
        }
      } else {
        console.error("Error en el formulario", res.statusText);
        toast.error("Error al enviar el formulario. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 container mx-auto py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo</FormLabel>
              <FormControl>
                <Input placeholder="Codigo" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="competence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Competencia</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Competencia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listCompetences.results.map((competence) => (
                    <SelectItem
                      key={competence.id}
                      value={competence.id.toString()}
                    >
                      {competence.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Activo" />
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
        <div className="flex justify-end gap-3">
          {isEditing && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                router.push(`/admin/quiz-manage/${paramsCourseId}/capacities`);
              }}
            >
              Cancelar
            </Button>
          )}
          <Button disabled={loadingCompetences} type="submit">
            <Save size={16} className="mr-2" />
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
