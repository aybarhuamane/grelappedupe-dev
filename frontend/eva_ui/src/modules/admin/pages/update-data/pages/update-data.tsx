"use client";

import {
  updateInstitutionData,
  updateRegionalData,
} from "@/api/app/update/institution-update";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCustom, LayoutAsideSection } from "@/modules/core";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import AsideInfo from "@/modules/quiz-manage/components/info-aside";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const UpdateDataLogs = () => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleUpdateDataInstitution = async () => {
    try {
      const response = await updateInstitutionData();
      const data = await response;
      if (data.message) {
        toast.success(data.message);
        setIsOpenConfirm(false);
      } else {
        toast.error(data.message);
        setIsOpenConfirm(false);
      }
    } catch (error) {
      toast.error(`Error al actualizar los datos: ${error}`);
    }
  };

  const handleUpdateDataRegional = async () => {
    try {
      const response = await updateRegionalData();
      const data = await response;
      if (data.message) {
        toast.success(data.message);
        setIsOpenConfirm(false);
      } else {
        toast.error(data.message);
        setIsOpenConfirm(false);
      }
    } catch (error) {
      toast.error(`Error al actualizar los datos: ${error}`);
    }
  };
  return (
    <>
      <LayoutAsideSection
        aside={
          <AsideInfo
            title="Actualizar datos de evaluaciones"
            description="Actualiza los datos de las evaluaciones para que se muestren correctamente en la aplicación."
          />
        }
      >
        <section className="flex flex-col gap-6 container mx-auto p-6">
          <AlertCustom
            title="Actualizar datos"
            content="Esta acción puede tardar varios minutos, mientas se actualiza los datos, puede continuar con otras acciones. Recuerde que esta acción no se debe realizar a cada momento. Espere un tiempo prudente antes de realizar otra actualización."
            color="warning"
          />
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Actualizar datos a nivel de institución</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                  ¿Estás seguro de querer actualizar los datos de las
                  evaluaciones?
                </p>
                <Button
                  onClick={() => setIsOpenConfirm(true)}
                  className="w-full"
                  disabled={isOpenConfirm}
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Actualizar datos
                </Button>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Actualizar datos a nivel regional</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                  ¿Estás seguro de querer actualizar los datos de las
                  evaluaciones?
                </p>
                <Button
                  onClick={() => setIsOpenConfirm(true)}
                  className="w-full"
                  disabled={true}
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Actualizar datos
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </LayoutAsideSection>
      <DialogConfirmacion
        isOpenConfirm={isOpenConfirm}
        tittleConfirm="Actualizar datos a nivel de institución"
        description="¿Estás seguro de querer actualizar los datos de las evaluaciones?"
        onCloseConfirm={() => {
          setIsOpenConfirm(false);
        }}
        onSubmitConfirm={() => {
          handleUpdateDataInstitution();
        }}
      />
      <DialogConfirmacion
        isOpenConfirm={isOpenConfirm}
        tittleConfirm="Actualizar datos a nivel regional"
        description="¿Estás seguro de querer actualizar los datos de las evaluaciones?"
        onCloseConfirm={() => {
          setIsOpenConfirm(false);
        }}
        onSubmitConfirm={() => {
          handleUpdateDataRegional();
        }}
      />
    </>
  );
};
