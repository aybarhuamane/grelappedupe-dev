/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
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
import { ubigeo } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { FormAddUbigeo } from "../FormAddUbigeo/FormAddUbigeo";

export const InstitutionSchema = z.object({
  name: z.string().min(3, { message: "Este campo es requerido" }),
  address: z.string().min(1, "Este campo es requerido"),
  latitude: z.string().min(1, "Este campo es requerido"),
  longitude: z.string().min(3, "Este campo es requerido"),
  ubigeo: z.preprocess(
    (value) => String(value),
    z.string().min(1, "Este campo es requerido")
  ),
});

export const AddInstitutionOnly = () => {
  const { register, formState: { errors }, control } = useFormContext();
  const { listUbigeos, getUbigeos, loading } = useUbigeos();
  const [searchUbigeo, setSearchUbigeo] = useState("");

  useEffect(() => {
    getUbigeos({
      code: searchUbigeo,
    });
  }, [searchUbigeo]);

  const ubigeosDta: ubigeo.IUbigeoList[] = listUbigeos?.results || [];

  return (
    <main className="w-full bg-white container p-8">
      <LayoutFrmHorizontal
        title="Crear institución"
        subtitle="Formulario para crear una institución"
      >

        <section className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-6">
          <FormField
            control={control}
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
                    {...register("name")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
                    {...register("address")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
                    {...register("latitude")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
                    {...register("longitude")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="ubigeo"
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
                      <Input
                        placeholder="Buscar ubigeo..."
                        value={searchUbigeo}
                        onChange={(e) => setSearchUbigeo(e.target.value)}
                      />
                      <CommandList>
                        <CommandEmpty>No hay ubigeos.</CommandEmpty>
                        <CommandGroup>
                          {ubigeosDta
                            .filter((ubigeo) =>
                              ubigeo.code.includes(searchUbigeo)
                            )
                            .map((ubigeo) => (
                              <CommandItem
                                value={ubigeo.code}
                                key={ubigeo.code}
                                onSelect={() => {
                                  field.onChange(ubigeo.id);
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
                    Si no encuentras el ubigeo de la institución,
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

      </LayoutFrmHorizontal>
    </main>
  );
}
