"use client";

import {
  createOrUpdateQuestionWithAnswers,
  deleteQuestion,
} from "@/api/app/evaluacion/fetchQuestions";
import { newCreateOrUpdateQuestionWithAnswers } from "@/api/app/evaluacion/newFetchQuestion";
import { Button } from "@/components/ui/button";
import { useParamsFilters } from "@/lib/filter-url";
import DialogConfirmacion from "@/modules/core/components/dialogos/confirmacion";
import AnswersForm from "@/modules/quiz-manage/forms/answer-form";
import HeaderQuestionForm from "@/modules/quiz-manage/forms/header-question-form";
import QuestionForm from "@/modules/quiz-manage/forms/question-form";
import { IQuestionAnswersPost } from "@/types/evaluacion/IQuestions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  code: z
    .string()
    .min(1, "El código es obligatorio")
    .max(10, "El código no puede tener más de 10 caracteres"),
  question: z.string().min(1, "La pregunta es obligatoria"),
  is_active: z.boolean().default(true),
  degree_number: z.string().min(1, "El número de grado es obligatorio"),
  capacity: z.coerce.number().min(1, "Debe seleccionar una capacidad"),
  level: z.coerce.number().min(1, "Debe seleccionar un nivel educativo"),
  answers: z
    .array(
      z.object({
        id: z.number().optional(),
        option: z.string(),
        answer: z.string().min(1, "La respuesta es obligatoria"),
        is_correct: z.boolean(),
      })
    )
    .min(1, "Debe agregar al menos una respuesta"),
});

export type IFormQuestionAnswerSchema = z.infer<typeof formSchema>;

interface IProps {
  initialData?: IFormQuestionAnswerSchema;
  questionId?: number;
}

export default function CreateQuestionForm(props: IProps) {
  const { initialData, questionId } = props;
  const isEditing = !!questionId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: initialData?.code || "",
      question: initialData?.question || "",
      is_active: initialData?.is_active || true,
      degree_number: initialData?.degree_number || "",
      capacity: initialData?.capacity || 0,
      level: initialData?.level || 0,
      answers: initialData?.answers?.map((answer) => ({
        id: answer.id,
        option: answer.option || "",
        answer: answer.answer || "",
        is_correct: answer.is_correct || false,
      })) || [{ option: "A", answer: "", is_correct: false }],
    },
  });

  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false); // Nuevo estado
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const router = useRouter();
  const { getParams } = useParamsFilters();
  const competenceId = getParams({ key: "competence", value: "" });
  const degreeId = getParams({ key: "degree", value: "" });
  const levelId = getParams({ key: "level", value: "" });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const hasCorrectAnswer = values.answers.some((answer) => answer.is_correct);

    if (!hasCorrectAnswer) {
      form.setError("answers", {
        type: "manual",
        message: "Debe haber al menos una respuesta correcta",
      });
      toast.error("Debe haber al menos una respuesta correcta");
      return;
    }

    setLoading(true);
    try {
      const updatedValues: IQuestionAnswersPost = {
        id: questionId,
        code: values.code,
        question: values.question,
        is_active: values.is_active,
        degree_number: values.degree_number,
        capacity: values.capacity,
        level: values.level,
        answers: values.answers.map((answer) => ({
          id: answer.id,
          option: answer.option,
          answer: answer.answer,
          is_correct: answer.is_correct,
        })),
      };

      let res;
      if (isEditing) {
        res = await newCreateOrUpdateQuestionWithAnswers(
          updatedValues,
          questionId,
          `/admin/quiz-manage/${competenceId}/grados/questions`
        );
      } else {
        res = await createOrUpdateQuestionWithAnswers(values);
      }

      if (res) {
        toast.success(
          `Pregunta ${isEditing ? "actualizada" : "creada"} exitosamente`
        );

        if (shouldRedirect) {
          router.push(
            `/admin/quiz-manage/${competenceId}/grados/questions?degree=${degreeId}&level=${levelId}`
          );
        } else {
          form.reset(values); // Mantener los datos en el formulario
        }
      } else {
        toast.error(
          `Error al ${isEditing ? "actualizar" : "crear"} la pregunta`
        );
      }
    } catch (error) {
      console.error(`Error:`, error);
      toast.error(`Error al ${isEditing ? "actualizar" : "crear"} la pregunta`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (questionId) {
      const res = await deleteQuestion(questionId);
      if (res) {
        toast.success("Pregunta eliminada exitosamente");
        router.push(
          `/admin/quiz-manage/${competenceId}/grados/questions?degree=${degreeId}&level=${levelId}`
        );
      } else {
        toast.error("Error al eliminar la pregunta");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-8 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold py-4">
            {isEditing ? "Editar pregunta" : "Crear pregunta"}
          </h1>
          {isEditing && (
            <Button
              variant="destructive"
              onClick={() => setIsOpenConfirm(true)}
              type="button"
            >
              <Trash className="mr-2 h-4 w-4" />
              Eliminar pregunta
            </Button>
          )}
        </div>
        <hr className="py-4" />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <aside className="space-y-6 w-full col-span-1">
                <QuestionForm />
              </aside>
              <main className="space-y-6 w-full col-span-2">
                <HeaderQuestionForm />
                <AnswersForm />
              </main>
            </section>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => router.back()}
                type="button"
              >
                Cancelar
              </Button>

              {isEditing && (
                <Button
                  type="submit"
                  variant="outline"
                  disabled={loading}
                  onClick={() => setShouldRedirect(false)}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Actualizar y continuar
                </Button>
              )}

              <Button
                type="submit"
                disabled={loading}
                onClick={() => setShouldRedirect(true)}
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Actualizar y finalizar" : "Guardar"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>

      <DialogConfirmacion
        isOpenConfirm={isOpenConfirm}
        onCloseConfirm={() => setIsOpenConfirm(false)}
        onSubmitConfirm={handleDelete}
        tittleConfirm="Eliminar pregunta"
        description="¿Estás seguro de querer eliminar esta pregunta? ¡Recuerda que esta acción es irreversible!"
        cancelLabel="Cancelar"
        aceppLabel="Eliminar"
      />
    </>
  );
}
