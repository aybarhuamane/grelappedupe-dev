/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { InputSelectPerson } from "@/modules/institution/components/directorMange/directorManange/AsignDirector/InputSelectPerson";
import {
  area,
  category,
  detailInstitution,
  educationalLevel,
  institution,
  person,
  response,
} from "@/types";
import { IDetailInstitutionUpdate } from "@/types/educativa/IDetailInstitution";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { PersonsListAction } from "../../directorManange/AsignDirector/PersonsListAction";

const formSchema = z.object({
  local_code: z.string(),
  modular_code: z.string(),
  director: z.string(),
  level: z.string(),
  category: z.string(),
  area: z.string(),
});

interface DetailFormProps {
  result: institution.IDetailsInstitutionList;
  institution_id: number;
  updateDetailInstitution: (
    data: IDetailInstitutionUpdate,
    id: number
  ) => Promise<Response>;
  listLevels: response.IResApi<educationalLevel.IEducationalLevel>;
  listCategories: response.IResApi<category.ICategory>;
  listArea: response.IResApi<area.IArea>;
}

export const DetailForm = ({
  result,
  institution_id,
  updateDetailInstitution,
  listLevels,
  listCategories,
  listArea,
}: DetailFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      local_code: result?.local_code || "",
      modular_code: result?.modular_code || "",
      director:
        typeof result?.director === "string"
          ? result.director
          : result?.director?.person?.name || "",
      level: result?.level?.id?.toString() || "",
      category: result?.category?.id?.toString() || "",
      area: result?.area ? result?.area?.id?.toString() : "",
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] =
    useState<person.IPersonList | null>(null);

  useEffect(() => {
    if (
      listLevels.results.length > 0 &&
      listCategories.results.length > 0 &&
      listArea.results.length > 0
    ) {
      form.reset({
        local_code: result?.local_code || "",
        modular_code: result?.modular_code || "",
        director:
          typeof result?.director === "string"
            ? result.director
            : result?.director?.person?.name || "",
        level: result?.level?.name || "",
        category: result?.category?.name || "",
        area: result?.area?.name || "",
      });
    }
  }, [listLevels, listCategories, listArea]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newInstitution: detailInstitution.IDetailInstitutionUpdate = {
        local_code: values.local_code,
        modular_code: values.modular_code,
        institution: institution_id,
        director: Number(values.director),
        level: Number(values.level),
        category: Number(values.category),
        area: Number(values.area),
      };

      const res = await updateDetailInstitution(newInstitution, result.id);
      if (res.ok) {
        toast.success("Institución actualizada correctamente");
      } else {
        toast.error("Error al actualizar la institución");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-6"
      >
        <FormField
          control={form.control}
          name="local_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código local</FormLabel>
              <FormControl>
                <Input placeholder="código local" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modular_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código modular</FormLabel>
              <FormControl>
                <Input placeholder="Código modular" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="director"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="pb-2">Director</FormLabel>
              <InputSelectPerson
                labelButton="Seleccionar"
                placeholder="Seleccionar una persona..."
                onPressButton={() => setOpen(true)}
                value={value}
                description={
                  selectedPerson
                    ? `${selectedPerson?.name} ${selectedPerson?.last_name}`
                    : ""
                }
                onChange={onChange}
                errorMensagem={errors.director?.message as string}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un nivel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listLevels.results.map(
                    (level: educationalLevel.IEducationalLevel) => (
                      <SelectItem value={level.id.toString()} key={level.id}>
                        {level.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listCategories.results.map(
                    (category: category.ICategory) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listArea.results.map((area: area.IArea) => (
                    <SelectItem value={area.id.toString()} key={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="w-[420px]" style={{ minWidth: "720px" }}>
            <SheetHeader>
              <SheetTitle>Selecciona un director</SheetTitle>
            </SheetHeader>
            <hr />

            <PersonsListAction
              onSelected={(selectedPerson: person.IPersonList) => {
                setOpen(false);
                setSelectedPerson(selectedPerson); // Almacenar el objeto completo para la descripción
                form.setValue("director", selectedPerson.id.toString()); // Almacenar el objeto completo en el formulario
              }}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setSelectedPerson(null);
                    form.setValue("director", "");
                  }}
                >
                  Cancelar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex justify-end gap-4 col-span-2">
          <Button variant={"outline"} type="reset">
            Cancelar
          </Button>
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </Form>
  );
};
