"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function HeaderQuestionForm() {
  const { control } = useFormContext();
  return (
    <section className="w-full space-y-3">
      <h2 className="text-xl font-semibold">Pregunta</h2>
      <div className="flex flex-row gap-4">
        <FormField
          control={control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="Código de la pregunta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full">
          <FormField
            control={control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pregunta</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Escriba la pregunta aquí"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
}
