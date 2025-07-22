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
import { LayoutAsideSection } from "@/modules/core";
import { course } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import AsideInfo from "./components/info-aside";

const formSchema = z.object({
  name: z.string(),
  is_active: z.string().optional(),
});

interface ICreateCourseFormProps {
  initialValues?: course.ICourse[] | undefined;
}

export default function CreateCourseForm(props: ICreateCourseFormProps) {
  const { initialValues } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
      ? {
          name: initialValues[0].name,
          is_active: initialValues[0].is_active.toString(),
        }
      : {
          name: "",
          is_active: "true",
        },
  });
  const { createOrUpdateCourse } = cursosFunctionsApi;
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        ...values,
        is_active: values.is_active === "true",
      };

      const res = initialValues
        ? await createOrUpdateCourse(payload, initialValues[0].id)
        : await createOrUpdateCourse(payload);

      if (res.ok) {
        router.push("/admin/quiz-manage");
        toast.success(
          initialValues
            ? "El curso ha sido actualizado."
            : "El curso ha sido creado."
        );
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Ha ocurrido un error.");
    }
  }

  return (
    <>
      <div>
        <LayoutAsideSection
          aside={
            <AsideInfo
              title={initialValues && "Editar curso"}
              description={
                initialValues && "Edita los campos que considere necesarios."
              }
            />
          }
          asidePosition="left"
        >
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </section>
        </LayoutAsideSection>
      </div>
    </>
  );
}
