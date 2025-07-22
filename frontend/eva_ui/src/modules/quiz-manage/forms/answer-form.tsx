"use client";

import { deleteAnswer } from "@/api/app/evaluacion/fetchAnswer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function AnswersForm() {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "answers",
  });
  const [deletedAnswer, setDeletedAnswer] = useState(false);

  // Observa las respuestas en el formulario
  const answers = watch("answers");

  // Asegurar que cada respuesta tenga una opción (A, B, C, ...)
  useEffect(() => {
    if (answers?.length) {
      const updatedAnswers = answers.map((answer: any, index: number) => ({
        ...answer,
        option: String.fromCharCode(97 + index),
      }));
      replace(updatedAnswers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers.length]);

  const removeAnswer = async (id: string) => {
    const res = await deleteAnswer(Number(id));

    if (res.ok) {
      const updatedAnswers = answers.filter((answer: any) => answer.id !== id);
      setValue("answers", updatedAnswers);
      setDeletedAnswer(true);
    } else {
      console.log("Error al eliminar la respuesta.");
    }

    return res;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Respuestas</h2>

      {answers.length === 0 && (
        <p className="text-sm text-gray-500">
          Agrega al menos una respuesta para esta pregunta.
        </p>
      )}

      {deletedAnswer && (
        <div className="p-3 text-sm text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          Se ha eliminado una respuesta. Asegúrate de guardar los cambios antes
          de cerrar la ventana.
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-3">
          <FormField
            control={control}
            name={`answers.${index}.option`}
            render={() => (
              <FormItem className="w-12">
                <FormLabel>Opción</FormLabel>
                <FormControl>
                  <Input value={String.fromCharCode(97 + index)} readOnly />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Respuesta */}
          <FormField
            control={control}
            name={`answers.${index}.answer`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Respuesta</FormLabel>
                <FormControl>
                  <Input placeholder={`Respuesta ${index + 1}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox para marcar si es correcta */}
          <FormField
            control={control}
            name={`answers.${index}.is_correct`}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Correcta</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        // Asegurar que solo esta respuesta sea correcta
                        const updatedAnswers = answers.map(
                          (ans: any, idx: number) => ({
                            ...ans,
                            is_correct: idx === index,
                          })
                        );
                        setValue("answers", updatedAnswers);
                      } else {
                        field.onChange(false);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Botón de eliminar */}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => {
              if (field.id) {
                removeAnswer(answers[index].id);
                remove(index);
                setDeletedAnswer(true);
              } else {
                remove(index);
                setDeletedAnswer(true);
              }
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {/* Botón para agregar respuestas */}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          append({
            option: String.fromCharCode(97 + fields.length),
            answer: "",
            is_correct: false,
          });
        }}
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar respuesta
      </Button>
    </div>
  );
}
