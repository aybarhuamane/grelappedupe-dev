"use client";
import { competencesFunctionsApi } from "@/api";
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
import { useCourse } from "@/modules/director";
import { competences } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

interface IProps {
  courseId?: string;
  initialData?: competences.ICompetences;
}

const formSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  course: z.number(),
  is_active: z.string().optional().default("true"),
});

export default function CreateCompetencesForm(props: IProps) {
  const { courseId, initialData } = props;

  const isEditing = !!initialData;
  let rouetCourseId = initialData?.course;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      code: initialData?.code || "",
      course: initialData?.course || (courseId ? parseInt(courseId, 10) : 0),
      is_active: initialData?.is_active ? "true" : "false",
    },
  });

  const { getCursos, listCursos, loading } = useCourse();
  const { createOrUpdateCompetence } = competencesFunctionsApi;
  const router = useRouter();

  useEffect(() => {
    getCursos({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const competencePayload: competences.ICompetencesPost = {
        name: values.name,
        code: values.code,
        course: values.course,
        is_active: values.is_active === "true",
      };
      let res;
      if (isEditing) {
        res = await createOrUpdateCompetence(competencePayload, initialData.id);
      } else {
        res = await createOrUpdateCompetence(competencePayload);
      }

      if (res.ok) {
        form.reset();
        toast.success(
          isEditing
            ? "Competencia actualizada con éxito."
            : "Competencia creada con éxito."
        );
        if (isEditing) {
          router.push(`/admin/quiz-manage/${rouetCourseId}/competences`);
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}
                disabled={courseId ? true : false}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listCursos.results.map((curso) => (
                    <SelectItem key={curso.id} value={curso.id.toString()}>
                      {curso.name}
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={courseId ? true : false}
              >
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
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          )}
          <Button disabled={loading} type="submit">
            <Save size={16} className="mr-2" />
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
