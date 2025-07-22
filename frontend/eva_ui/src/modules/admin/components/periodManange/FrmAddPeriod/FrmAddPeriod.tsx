"use client";

import { periodoFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastCustom } from "@/modules/core";
import { period } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { DateRanges } from "./DateRanges";

interface IFrmAddPeriodProps {
  periodData?: period.IPeriodPost;
  idPeriod?: number;
}

export const FrmAddPeriod = (props: IFrmAddPeriodProps) => {
  const { periodData, idPeriod } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<period.IPeriodPost>({
    defaultValues: periodData,
  });
  const { createOrUpdatePeriod } = periodoFunctionsApi;
  const isDirty = methods.formState.isDirty;

  const handleBack = () => {
    router.push("/admin/period-manange");
  };

  const hanldleSubmit: SubmitHandler<period.IPeriodPost> = async (
    data: period.IPeriodPost
  ) => {
    setIsLoading(true);
    const newData: period.IPeriodPost = {
      name: data.name,
      start_date: data.start_date,
      end_date: data.end_date,
      is_active: data.is_active,
    };

    try {
      let res;
      if (idPeriod) {
        res = await createOrUpdatePeriod(newData, idPeriod);
        handleBack();
        router.refresh();
      } else {
        res = await createOrUpdatePeriod(newData);
        handleBack();
        router.refresh();
      }

      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Periodo creado"
            message={`El periodo ${newData.name} ha sido ${
              idPeriod ? "actualizado" : "creado"
            }`}
          />
        );
        methods.reset(newData);
      } else {
        toast.error(
          <ToastCustom
            title="Error"
            message="Ocurrió un error inesperado, por favor intente de nuevo."
          />
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        <ToastCustom
          title="Error"
          message="Ocurrió un error inesperado, por favor intente de nuevo."
        />
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-5"
          onSubmit={methods.handleSubmit(hanldleSubmit)}
        >
          <div>
            <Label htmlFor="text">Nombre del periodo</Label>
            <Controller
              name="name"
              rules={{
                required: "Ingrese su nombre",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  id="periodo"
                  type="text"
                  className="h-10"
                  placeholder="Ingrese el nombre del periodo"
                  value={value || ""}
                  onChange={onChange}
                  required
                />
              )}
            />
          </div>
          <div className="flex w-full gap-2">
            <div className="flex flex-col gap-1 mt-1.5">
              <Label htmlFor="text">Elija el rango de fechas</Label>
              <Controller
                name="start_date"
                rules={{ required: "Ingrese su rango de fechas" }}
                render={({ field: { onChange, value } }) => (
                  <DateRanges
                    onChange={(startDate, endDate) => {
                      const formattedStartDate = startDate
                        ? format(startDate, "yyyy-MM-dd", { locale: es })
                        : "";
                      const formattedEndDate = endDate
                        ? format(endDate, "yyyy-MM-dd", { locale: es })
                        : "";

                      onChange(formattedStartDate);
                      methods.setValue("end_date", formattedEndDate);
                    }}
                    value={{
                      from: value ? new Date(value) : undefined,
                      to: methods.getValues("end_date")
                        ? new Date(methods.getValues("end_date"))
                        : undefined,
                    }}
                  />
                )}
              />
            </div>
            {periodData && (
              <div className="w-full">
                <Label htmlFor="text">Estado del periodo</Label>
                <Controller
                  name="is_active"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value === true ? "true" : "false"}
                      onValueChange={(val) => {
                        const booleanValue = val === "true";
                        onChange(booleanValue);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Estados</SelectLabel>
                          <SelectItem value="true">Activo</SelectItem>
                          <SelectItem value="false">Inactivo</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant={"outline"} onClick={handleBack}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !isDirty}>
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {periodData ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};
