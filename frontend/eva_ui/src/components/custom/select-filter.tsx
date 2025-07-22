"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParamsFilters } from "@/lib/filter-url";
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";

type IData = {
  value: string;
  label: string;
};

interface IProps {
  filterKey: string;
  selectLabel?: string;
  placeholder?: string;
  data?: IData[];
  className?: string;
  startIcon?: JSX.Element;
}

export const SelectFilter = (props: IProps) => {
  const { filterKey, selectLabel, placeholder, data, className, startIcon } =
    props;

  const [value, setValue] = useState<string | undefined>("");
  const { createFilter, removeFilter } = useParamsFilters();

  useEffect(() => {
    if (value) {
      createFilter({ key: filterKey, value: value });
    } else {
      removeFilter({ key: filterKey });
    }
  }, [value, createFilter, removeFilter, filterKey]);

  return (
    <Select
      onValueChange={(value) => {
        setValue(value);
      }}
      value={value}
    >
      <SelectTrigger className={cn("w-full md:w-[200px]", className)}>
        <div className="flex items-center justify-start gap-2 w-full">
          {startIcon && startIcon}
          <SelectValue
            placeholder={placeholder || "Seleccionar"}
            className="text-muted-foreground text-left font-normal"
          />
          <span className="py-1.5 pl-8 pr-2 text-sm font-semibold">
            {value || "Todos"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel && <SelectLabel>{selectLabel || "Todos"}</SelectLabel>}

          {data?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
