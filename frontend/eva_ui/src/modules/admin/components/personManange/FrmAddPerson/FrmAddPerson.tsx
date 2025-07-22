"use client";

import { personaFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import { person } from "@/types";
import { IPersonPost } from "@/types/core/IPerson";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRole } from "@/modules/admin/hooks/useRole";
import { LayoutFrmHorizontal } from "@/modules/core";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import { customIcons, lang } from "../dual-list-box/config-list-box";

const roles = [
  { label: "Administrador", value: "admin" },
  { label: "Director", value: "director" },
  { label: "Docente", value: "docente" },
] as const;

interface IFrmPersonProps {
  personData?: person.IPersonList;
  person_id?: number;
}

const PersonSchema = z.object({
  name: z.string().min(3, { message: "El nombre es requerido" }),
  last_name: z.string().min(3, "El apellido es requerido"),
  num_document: z
    .string()
    .min(8, "El documento debe tener al menos 8 caracteres")
    .max(8, "El documento debe tener maximo 8 caracteres")
    .regex(/^\d+$/, "El documento debe ser numerico"),
  phone: z.string().regex(/^\d+$/, "El telefono debe ser numerico").optional(),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "El email no es valido"
    )
    .optional(),
  groups: z.array(z.string()).optional(),
});

export const FrmAddPerson = (props: IFrmPersonProps) => {
  const { person_id, personData } = props;

  const { createOrUpdatePerson } = personaFunctionsApi;
  const router = useRouter();
  const { listRole, getRoles } = useRole();

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );

  const [selected, setSelected] = useState<(typeof roles)[number]["value"][]>(
    []
  );

  const methods = useForm<z.infer<typeof PersonSchema>>({
    resolver: zodResolver(PersonSchema),
    defaultValues: {
      name: personData?.name || "",
      last_name: personData?.last_name || "",
      num_document: personData?.num_document || "",
      phone: personData?.phone || "",
      email: personData?.email || "",
      groups: personData?.groups || [],
    },
  });

  const onSubmit = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedRoles = listRole?.map((role) => ({
    label: role.name,
    value: role.id.toString(),
  }));

  const handleSubmit: SubmitHandler<person.IPersonList> = async (
    data: person.IPersonList
  ) => {
    setIsOpen(false);

    const newData: IPersonPost = {
      num_document: data.num_document,
      name: data.name,
      last_name: data.last_name,
      phone: data.phone || "",
      email: data.email || "",
      groups: selected,
    };

    try {
      if (person_id) {
        const res = await createOrUpdatePerson(newData, person_id);
        if (res.ok) {
          const data: person.IPersonList = await res.json();
          if (data) {
            toast.success(
              `Persona actualizada correctamente con el id: ${person_id}`
            );
            methods.reset();
            router.push("/admin/person-manange");
          } else {
            const data = await res.json();
            if (data) {
              setErrors(data);
            }
          }
        }
      } else {
        const res = await createOrUpdatePerson(newData);
        if (res.ok) {
          const data: person.IPersonList = await res.json();
          if (data) {
            toast.success(`Persona creada correctamente con el id: ${data.id}`);
            methods.reset();
            router.push("/admin/person-manange");
          }
        } else {
          const data = await res.json();
          if (data) {
            setErrors(data);
          }
        }
      }
    } catch (error) {
      toast.error("Error al crear la persona");
    }
  };

  return (
    <main>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-8"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <LayoutFrmHorizontal
            title="Datos de la persona"
            subtitle="Ingrese los datos de la persona"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Apellidos</Label>
                    <FormControl>
                      <Input
                        id="last_name"
                        type="text"
                        className="h-10"
                        placeholder="Ingrese el apellido"
                        {...field}
                        {...methods.register("last_name")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="num_document"
                render={({ field }) => (
                  <FormItem>
                    <Label>Documento</Label>
                    <FormControl>
                      <Input
                        id="num_document"
                        type="text"
                        className="h-10"
                        placeholder="Ingrese el documento"
                        {...field}
                        {...methods.register("num_document")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label>Telefono</Label>
                    <FormControl>
                      <Input
                        id="phone"
                        type="text"
                        className="h-10"
                        placeholder="Ingrese el telefono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Este campo es opcional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="text"
                        className="h-10"
                        placeholder="Ingrese el email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </LayoutFrmHorizontal>

          <LayoutFrmHorizontal
            title="Datos de la usuario"
            subtitle="Ingrese los datos del usuario"
          >
            <section className="sm:grid sm:grid-cols-1 lg:grid lg:grid-cols-2 w-full gap-6">
              <div className="space-y-2">
                <Label>Asignar roles</Label>
                <DualListBox
                  options={formattedRoles || []}
                  selected={selected}
                  onChange={(newValue) =>
                    setSelected(newValue as (typeof roles)[number]["value"][])
                  }
                  icons={customIcons}
                  lang={lang}
                  showHeaderLabels
                  className="text-sm"
                />
                <FormDescription>
                  Seleccione los roles que desea asignar a la persona. Este
                  campo es opcional.
                </FormDescription>
              </div>
            </section>
          </LayoutFrmHorizontal>

          <div className="flex justify-end gap-4">
            <Link href="/admin/person-manange">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button>{person_id ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
      </FormProvider>
      <DialogConfirmacion
        tittleConfirm="Confirmar creación de persona"
        description="¿Está seguro de crear la persona?"
        aceppLabel="Aceptar"
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        onSubmitConfirm={() =>
          handleSubmit({
            ...methods.getValues(),
            id: person_id || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            email: methods.getValues().email || "",
            phone: methods.getValues().phone || "",
          })
        }
      />
    </main>
  );
};
