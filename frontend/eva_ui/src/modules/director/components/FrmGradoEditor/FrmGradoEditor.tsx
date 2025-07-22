"use client";
import { degreesFunctionsApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dataDegrees,
  HeaderSection,
  LayoutFrmHorizontal,
  ToastCustom,
} from "@/modules/core";
import { useInstitutionStore } from "@/store/use-institution-store";
import { degree, detailInstitution } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

const optionsStatus = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" },
];

interface IFrmGradoEditorProps {
  institutionAssigned: detailInstitution.IDetailInstitutionList[];
  defaultData?: degree.IDegree;
}

export const FrmGradoEditor = (props: IFrmGradoEditorProps) => {
  const { defaultData, institutionAssigned } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const [selectedInstitution, setSelectedInstitution] = useState<
  //   string | undefined
  // >(
  //   defaultData
  //     ? defaultData.detail_institution.toString()
  //     : institutionAssigned[0]?.id.toString()
  // );

  const { selectedInstitution } = useInstitutionStore();

  const isEdit = defaultData ? true : false;

  const handleBack = () => {
    router.push("/director/manage-degrees");
  };

  const methods = useForm<degree.IDegree>({
    defaultValues: {
      ...defaultData,
      detail_institution: defaultData
        ? defaultData.detail_institution
        : institutionAssigned[0]?.id,
    },
  });

  const isDirty = methods.formState.isDirty;

  const watchDegreeNumber = methods.watch("degree_number");

  const filterTextByNumber = dataDegrees.optionsNumberDegree.find(
    (item) => item.numberText === watchDegreeNumber
  );

  const onSubmit: SubmitHandler<degree.IDegree> = async (
    data: degree.IDegree
  ) => {
    setIsLoading(true);
    const newData: degree.IDegreePost = {
      degree_number: data.degree_number,
      degree_text: filterTextByNumber?.text || "Grado no encontrado", // Valor por defecto si no se encuentra
      is_active: data.is_active,
      detail_institution: Number(selectedInstitution),
      section: data.section,
    };

    try {
      if (defaultData) {
        const res = await degreesFunctionsApi.createOrUpdateDegree(
          newData,
          defaultData.id
        );

        if (res.ok) {
          toast.success(
            <ToastCustom
              title="Grado actualizado"
              message={`El grado ${newData.degree_number}  ${newData.section} ha sido actualizada`}
            />
          );
          handleBack();
        } else {
          toast.error(<ToastCustom title="Error" message={res.statusText} />);
        }
      } else {
        const res = await degreesFunctionsApi.createOrUpdateDegree(newData);

        if (res.ok) {
          toast.success(
            <ToastCustom
              title="Grado creado"
              message={`El grado ${newData.degree_number}  ${newData.section} ha sido creado`}
            />
          );
          handleBack();
        } else {
          toast.error(<ToastCustom title="Error" message={res.statusText} />);
        }
      }
    } catch (error) {
      toast.error(
        <ToastCustom
          title="Error"
          message="Ocurrió un error inesperado, por favor intente de nuevo."
        />
      );
    }
    setIsLoading(false);
  };

  const handleSetDegreeText = (value: string) => {
    methods.setValue("degree_text", value);
  };

  const filteredDegrees =
    institutionAssigned.find(
      (inst) => inst.id.toString() === selectedInstitution
    )?.level?.name === "Secundaria"
      ? dataDegrees.secundaryOptionsNumberDegree
      : dataDegrees.optionsNumberDegree;

  return (
    <main className="flex flex-col gap-5">
      <HeaderSection
        title={defaultData ? "Editar Grado" : "Crear Grado"}
        subtitle="Formulario para crear o editar un grado"
        showBackButton
        disableAddButton
        hrefBack="/director/manage-degrees"
      />
      <section className="bg-white container py-8">
        <LayoutFrmHorizontal
          title="Datos del grado"
          subtitle="Ingrese los datos del grado"
        >
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <Label className="font-semibold">Institución educativa</Label>
                  <Controller
                    name="detail_institution"
                    control={methods.control}
                    rules={{
                      required: "Este campo es requerido",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Select value={selectedInstitution?.toString()} disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar la institución" />
                        </SelectTrigger>
                        <SelectContent>
                          {institutionAssigned.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {`${item?.institution?.name} - ${item?.level?.name} - ${item?.modular_code} - ${item?.local_code}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {methods.formState.errors.detail_institution && (
                    <span className="text-red-500 text-sm">
                      {methods.formState.errors.detail_institution.message ||
                        "Este campo es requerido"}
                    </span>
                  )}
                </div>
                <section className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold">Número de grado</Label>
                    <Controller
                      name="degree_number"
                      control={methods.control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value ? value.toString() : ""}
                          onValueChange={(value) => {
                            onChange(value);
                          }}
                          required
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar el grado" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredDegrees.map((item) => (
                              <SelectItem
                                key={item.text}
                                value={item.numberText}
                              >
                                {item.numberText} - {item.text}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* oculto porque dificulta la lectura */}
                  <div className="flex-col gap-2 hidden">
                    <Label className="font-semibold">Nombre de grado</Label>
                    <Controller
                      name="degree_text"
                      control={methods.control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={filterTextByNumber?.text || value}
                          onValueChange={onChange}
                          required
                          disabled
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar el grado" />
                          </SelectTrigger>
                          <SelectContent>
                            {dataDegrees.optionsNumberDegree.map((item) => (
                              <SelectItem key={item.text} value={item.text}>
                                {item.text}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label className="font-semibold">Sección</Label>
                    <Controller
                      name="section"
                      control={methods.control}
                      render={({ field: { value, onChange } }) => (
                        <Select value={value} onValueChange={onChange} required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar el grado" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[180px] overflow-y-auto">
                            {dataDegrees.sectionsLetters.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </section>
                {isEdit && (
                  <div>
                    <Label className="font-semibold">Estado</Label>
                    <Controller
                      name="is_active"
                      control={methods.control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value ? "true" : "false"}
                          onValueChange={(value) => onChange(value === "true")}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            {optionsStatus.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                )}
              </div>
              <footer className="flex justify-end gap-4">
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || !isDirty}>
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {defaultData ? "Actualizar" : "Guardar"}
                </Button>
              </footer>
            </form>
          </FormProvider>
        </LayoutFrmHorizontal>
      </section>
    </main>
  );
};
