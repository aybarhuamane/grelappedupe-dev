/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { institutionsFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUbigeos } from "@/modules/admin/hooks/useUbigeos";
import { LayoutFrmHorizontal } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { institution, ubigeo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { FormAddUbigeo } from "../FormAddUbigeo/FormAddUbigeo";

interface IProps {
  institutionData?: institution.IInstitutionList;
  institution_id?: number;
}

const InstitutionSchema = z.object({
  name: z.string().min(3, { message: "Este campo es requerido" }),
  address: z.string().min(1, "Este campo es requerido"),
  latitude: z.string().min(1, "Este campo es requerido"),
  longitude: z.string().min(3, "Este campo es requerido"),
  ubigeos: z.preprocess(
    (value) => String(value),
    z.string().min(1, "Este campo es requerido")
  ),
});

export const AddInstitution = (props: IProps) => {
  const { institution_id, institutionData } = props;

  const { createOrUpdateInstitution } = institutionsFunctionsApi;
  const { listUbigeos, getUbigeos, loading } = useUbigeos();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [searchUbigeo, setSearchUbigeo] = useState("");

  useEffect(() => {
    getUbigeos({
      code: searchUbigeo,
    });
  }, [searchUbigeo]);

  const ubigeosDta: ubigeo.IUbigeoList[] = listUbigeos?.results || [];

  const methods = useForm<z.infer<typeof InstitutionSchema>>({
    resolver: zodResolver(InstitutionSchema),
    defaultValues: institutionData
      ? {
        ...institutionData,
        latitude: institutionData.latitude,
        longitude: institutionData.longitude,
        ubigeos: String(institutionData.ubigeo.id),
      }
      : undefined,
  });

  const onSubmit = () => {
    setIsOpen(true);
  };

  const handleSubmit: SubmitHandler<institution.IInstitutionPost> = async (
    data: institution.IInstitutionPost
  ) => {
    setIsOpen(false);

    const newData: institution.IInstitutionPost = {
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      ubigeo: data.ubigeo,
    };

    try {
      if (institution_id) {
        const res = await createOrUpdateInstitution(newData, institution_id);
        if (res.ok) {
          const data: institution.IInstitutionPost = await res.json();
          if (data) {
            toast.success(
              `Institución actualizada correctamente con el id: ${institution_id}`
            );
            methods.reset();
            router.push("/admin/institution-manage");
          } else {
            const data = await res.json();
            if (data) {
              setErrors(data);
            }
          }
        }
      } else {
        const res = await createOrUpdateInstitution(newData);
        if (res.ok) {
          const data: institution.IInstitutionPost = await res.json();
          if (data) {
            toast.success(
              `Institución creada correctamente con el id: ${data.name}`
            );
            methods.reset();
            router.push("/admin/institution-manage");
          }
        } else {
          const data = await res.json();
          if (data) {
            setErrors(data);
          }
        }
      }
    } catch (error) {
      console.error("este es el error", error);
    }
  };

  return (
    <main className="w-full bg-white container p-8">
      <LayoutFrmHorizontal
        title={institution_id ? "Editar institución" : "Crear institución"}
        subtitle={
          institution_id
            ? "Formulario para editar una institución"
            : "Formulario para crear una institución"
        }
      >
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-5"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <section className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-6">
              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Nombre</Label>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        className="h-10"
                        placeholder="Ingrese el nombre"
                        {...field}
                        {...methods.register("name")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <Label>Dirección</Label>
                    <FormControl>
                      <Input
                        id="address"
                        type="text"
                        className="h-10"
                        placeholder="Ingrese la dirección"
                        {...field}
                        {...methods.register("address")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <Label>Latitud</Label>
                    <FormControl>
                      <Input
                        id="latitude"
                        type="number"
                        className="h-10"
                        placeholder="Ingrese la latitude"
                        {...field}
                        {...methods.register("latitude")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <Label>Longitud</Label>
                    <FormControl>
                      <Input
                        id="longitude"
                        type="number"
                        className="h-10"
                        placeholder="Ingrese la longitude"
                        {...field}
                        {...methods.register("longitude")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="ubigeos"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Label>Ubigeo</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? ubigeosDta.find(
                                (language) =>
                                  language.id === Number(field.value)
                              )?.code
                              : "Seleccione un ubigeo"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar ubigeo..."
                            value={searchUbigeo}
                            onValueChange={(value) =>
                              setSearchUbigeo(value)
                            }
                          />
                          <CommandList>
                            <CommandEmpty>No hay ubigeos.</CommandEmpty>
                            <CommandGroup>
                              {/* Filtra los ubigeos según el código ingresado */}
                              {ubigeosDta
                                .filter((ubigeo) =>
                                  ubigeo.code.includes(searchUbigeo)
                                )
                                .map((ubigeo) => (
                                  <CommandItem
                                    value={ubigeo.code}
                                    key={ubigeo.code}
                                    onSelect={() => {
                                      methods.setValue(
                                        "ubigeos",
                                        String(ubigeo.id)
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        ubigeo.id === Number(field.value)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {ubigeo.region} - {ubigeo.province} -{" "}
                                    {ubigeo.district} - {ubigeo.code}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <section className="flex gap-4 justify-start items-center">
                <span className="text-xs font-semibold">
                  ¿No encuentras el ubigeo de la institución?
                </span>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link">Agregar ubigeo nuevo</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Agrega un ubigeo nuevo</SheetTitle>
                      <SheetDescription>
                        Si no encuentraste el ubigeo de la institución,
                        puedes crear uno nuevo.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <FormAddUbigeo />
                    </div>
                  </SheetContent>
                </Sheet>
              </section>
            </section>
            <div className="flex justify-end gap-4">
              <Link href="/admin/institution-manage">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button>{institution_id ? "Actualizar" : "Crear"}</Button>
            </div>
          </form>
        </FormProvider>
        <DialogConfirmacion
          isOpenConfirm={isOpen}
          tittleConfirm={institution_id ? "¿Estás seguro de actualizar?" : "¿Estás seguro de crear?"}
          description={institution_id ? "Estás a punto de actualizar una institución" : "Estás a punto de crear una institución"}
          aceppLabel={institution_id ? "Actualizar" : "Crear"}
          onCloseConfirm={() => setIsOpen(false)}
          onSubmitConfirm={() =>
            handleSubmit({
              ...methods.getValues(),
              address: methods.getValues().address || "",
              latitude: String(methods.getValues().latitude) || "",
              longitude: String(methods.getValues().longitude) || "",
              name: methods.getValues().name || "",
              ubigeo: Number(methods.getValues().ubigeos) || 0,
            })
          }
        />
      </LayoutFrmHorizontal>
    </main>
  );
};
