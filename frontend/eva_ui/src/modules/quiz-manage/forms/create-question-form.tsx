"use client";
import { questionsFuntions } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamsFilters } from "@/lib/filter-url";
import { cn } from "@/lib/utils";
import { dataDegrees } from "@/modules/core";
import { useLevels } from "@/modules/director";
import { useCapacitiesAction } from "@/modules/quiz-manage/hooks/use-capacities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  code: z.string().min(1),
  question: z.string().min(1),
  is_active: z.string().optional().default("true"),
  degree_number: z.string(),
  capacity: z.string(),
  level: z.string(),
});

export default function CreateQuestionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { getLevels, listLevels, loading } = useLevels();
  const { getCapacitiesAction, listCapacities, loadingCapacities } =
    useCapacitiesAction();
  const { getParams } = useParamsFilters();
  const competenceId = getParams({ key: "competence", value: "" });
  const { createOrUpdateQuestion } = questionsFuntions;
  const [loadingCreate, setLoadingCreate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getLevels({});
    getCapacitiesAction({
      competence__course__id: Number(competenceId),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingCreate(true);
    try {
      const res = await createOrUpdateQuestion({
        code: values.code,
        question: values.question,
        is_active: values.is_active === "true",
        degree_number: values.degree_number,
        capacity: Number(values.capacity),
        level: Number(values.level),
      });
      if (res) {
        toast.success("Question created successfully");
        form.reset();
        router.push(`/admin/quiz-manage/${competenceId}/questions`);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoadingCreate(false);
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Crear pregunta</h1>
        <p className="text-base text-muted-foreground mt-2">
          Complete el siguiente formulario para crear una nueva pregunta
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 container mx-auto py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end justify-center">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input placeholder="Codigo" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pregunta</FormLabel>
                  <FormControl>
                    <Input placeholder="Pregunta 123" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listLevels.results.map((level) => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch("level") === "1"
                        ? dataDegrees.optionsNumberDegree.map((item) => (
                            <SelectItem key={item.text} value={item.numberText}>
                              {item.numberText} - {item.text}
                            </SelectItem>
                          ))
                        : dataDegrees.secundaryOptionsNumberDegree.map(
                            (item) => (
                              <SelectItem
                                key={item.text}
                                value={item.numberText}
                              >
                                {item.numberText} - {item.text}
                              </SelectItem>
                            )
                          )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Capacidad</FormLabel>
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
                            ? listCapacities.results?.find(
                                (capacity) =>
                                  capacity.id.toString() === field.value
                              )?.name
                            : "Select capacity"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <Input placeholder="Buscar capacidad..." />
                        <CommandList>
                          <CommandEmpty>No capacity found.</CommandEmpty>
                          <CommandGroup>
                            {listCapacities.results?.map((capacity) => (
                              <CommandItem
                                value={capacity.id.toString()}
                                key={capacity.id}
                                onSelect={() => {
                                  form.setValue(
                                    "capacity",
                                    capacity.id.toString()
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    capacity.id.toString() === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {capacity.name}
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
            {/* <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Activo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="flex justify-end w-full gap-3">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit" disabled={loadingCreate}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
