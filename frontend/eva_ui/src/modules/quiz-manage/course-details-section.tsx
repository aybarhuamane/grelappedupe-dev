"use client";

import { deleteCourse } from "@/api/app/educativa/fetchCourses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LayoutAsideSection } from "@/modules/core";
import { course } from "@/types";
import { IResApi } from "@/types/core/IResApi";
import {
  CheckCircle,
  Edit,
  GraduationCap,
  Trash2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import DialogConfirmacion from "../core/components/dialogos/confirmacion";
import AsideInfo from "./components/info-aside";
import { ItemField } from "./components/item-field";

interface CourseDetailsProps {
  course?: IResApi<course.ICourse>;
}

export const CourseDetails = ({ course }: CourseDetailsProps) => {
  const courseData = course?.results[0];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteCourse = async () => {
    setIsLoading(true);

    if (courseData) {
      try {
        const res = await deleteCourse(courseData.id);
        if (res.ok) {
          toast.success("Curso eliminado correctamente");
          router.push("/admin/quiz-manage");
        } else {
          toast.error("Error al eliminar el curso");
        }
      } catch (error) {
        console.error("Error al eliminar el curso", error);
        toast.error("Error al eliminar el curso");
      } finally {
        setIsLoading(false);
        setIsConfirmOpen(false);
      }
    }
  };

  return (
    <>
      <LayoutAsideSection aside={<AsideInfo />} asidePosition="left">
        <section className="bg-white p-6 w-full">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" />
                {courseData?.name || "Detalles del curso"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <ItemField
                label="Nombre"
                value={courseData?.name || "No disponible"}
              />

              <ItemField label="Estado">
                <Badge
                  className="flex items-center gap-2 px-3 py-1.5 w-fit"
                  variant={courseData?.is_active ? "default" : "destructive"}
                >
                  {courseData?.is_active ? (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      Activo
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-500" />
                      Inactivo
                    </>
                  )}
                </Badge>
              </ItemField>

              <div className="mt-6 flex justify-end gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant={"secondary"} size={"sm"}>
                        <Link
                          href={`/admin/quiz-manage/${courseData?.id}/edit`}
                        >
                          <Edit size={16} />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Editar</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setIsConfirmOpen(true)}
                        disabled={isLoading}
                        variant={"destructive"}
                        size={"sm"}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Eliminar</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </section>
      </LayoutAsideSection>

      <DialogConfirmacion
        tittleConfirm="Eliminar curso"
        description={`¿Estás seguro de eliminar el curso "${courseData?.name}"? Esta acción no se puede deshacer.`}
        onSubmitConfirm={handleDeleteCourse}
        onCloseConfirm={() => setIsConfirmOpen(false)}
        aceppLabel="Eliminar"
        cancelLabel="Cancelar"
        isOpenConfirm={isConfirmOpen}
      />
    </>
  );
};
