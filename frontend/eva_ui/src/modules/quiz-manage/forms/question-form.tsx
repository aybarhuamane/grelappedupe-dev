"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
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
import { useLevels } from "@/modules/director/hooks";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useCapacitiesAction } from "../hooks/use-capacities";

export default function QuestionForm() {
  const { control, watch } = useFormContext();
  const { getLevels, listLevels, loading } = useLevels();
  const { getCapacity, listCapacity, loadingCapacities } =
    useCapacitiesAction();
  const { getParams } = useParamsFilters();
  const competenceId = getParams({ key: "competence", value: "" });
  const degreeId = getParams({ key: "degree", value: "" });
  const levelId = getParams({ key: "level", value: "" });
  const level = Number(watch("level"));

  useEffect(() => {
    getLevels({});
    getCapacity({ competence__course__id: Number(competenceId) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold">Opciones de la pregunta</h2>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 w-full">
          <FormField
            control={control}
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
                          ? listCapacity?.find(
                              (capacity) =>
                                String(capacity.id) === String(field.value)
                            )?.name
                          : "Selecciona una capacidad"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <div>
                        <Input placeholder="Buscar capacidad..." />
                      </div>
                      <CommandList>
                        <CommandEmpty>No capacity found.</CommandEmpty>
                        <CommandGroup>
                          {listCapacity?.map((capacity) => (
                            <CommandItem
                              key={capacity.id}
                              value={String(capacity.id)}
                              onSelect={() => {
                                field.onChange(String(capacity.id));
                              }}
                              defaultValue={String(field.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  String(capacity.id) === String(field.value)
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

          <FormField
            control={control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
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
          {/* <FormField
            control={control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Input
                  type="text"
                  readOnly
                  placeholder="Level"
                  {...field}
                  className="w-full"
                  // defaultValue={levelId}
                  value={
                    listLevels.results.length > 0 ? listLevels.results.find(
                      (item) => item.id === Number(levelId)
                    )?.name : ""
                    // listLevels.results.find(
                    //   (item) => item.id === Number(levelId)
                    // )?.name
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={control}
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
                    {level === 1
                      ? dataDegrees.optionsNumberDegree.map((item) => (
                          <SelectItem key={item.text} value={item.numberText}>
                            {item.numberText} - {item.text}
                          </SelectItem>
                        ))
                      : dataDegrees.secundaryOptionsNumberDegree.map((item) => (
                          <SelectItem key={item.text} value={item.numberText}>
                            {item.numberText} - {item.text}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={control}
            name="degree_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grado</FormLabel>
                <Input
                  type="text"
                  readOnly
                  placeholder="Grado"
                  {...field}
                  className="w-full"
                  // defaultValue={degreeId}
                  value={
                    level === 1
                      ? dataDegrees.optionsNumberDegree.find(
                          (item) => item.numberText === degreeId
                        )?.text
                      : dataDegrees.secundaryOptionsNumberDegree.find(
                          (item) => item.numberText === degreeId
                        )?.text
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </section>
      </div>
    </div>
  );
}
