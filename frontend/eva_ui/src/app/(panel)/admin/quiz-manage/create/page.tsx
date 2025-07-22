"use client";

import { cursosFunctionsApi } from "@/api";
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
import { HeaderSection, LayoutAsideSection } from "@/modules/core";
import { CourseInfosection } from "@/modules/quiz-manage/course-info-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  is_active: z.string().optional(),
});

export default function CreateCoursePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      is_active: "",
    },
  });
  const { createOrUpdateCourse } = cursosFunctionsApi;
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createOrUpdateCourse({
        ...values,
        is_active: values.is_active === "true",
      });
      if (res.ok) {
        router.push("/admin/quiz-manage");
        toast.success("El curso ha sido creado exitosamente.");
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Ha ocurrido un error al crear el curso.");
    }
  }

  return (
    <>
      <HeaderSection
        title="Crear curso"
        subtitle="Crear un nuevo curso"
        showBackButton
      />
      <div className="container py-4">
        <LayoutAsideSection aside={<CourseInfosection />} asidePosition="left">
          <section className="bg-white p-6 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-screen-md bg-white"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre del curso"
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado" />
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
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
          </section>
        </LayoutAsideSection>
      </div>
    </>
  );
}
