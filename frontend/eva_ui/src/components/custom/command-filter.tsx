"use client";

import { Check, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFilterFromUrl } from "@/modules/core";
import { useEffect, useState } from "react";

type searchParams = {
  initialStatus?: string;
};

export type Status = {
  value: string;
  label: string;
};

export type IData = {
  value: string;
  label: string;
};

interface IProps {
  filterKey: string;
  placeholder?: string;
  className?: string;
  popclassName?: string;
  hasSearch?: boolean;
  searchParam?: searchParams;
  data?: IData[];
  defaultValue?: string;
}

export const CommandFilter = (props: IProps) => {
  const {
    filterKey,
    placeholder,
    data,
    className,
    popclassName,
    hasSearch,
    searchParam,
    defaultValue,
  } = props;

  const { updateFilter, removeFilter } = useFilterFromUrl();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(() => {
    const initial = defaultValue || searchParam?.initialStatus;
    return initial
      ? data?.find((item) => item.value === initial) || null
      : null;
  });

  useEffect(() => {
    if (selectedStatus) {
      updateFilter(filterKey, selectedStatus.value);
    } else {
      removeFilter(filterKey);
    }
  }, [selectedStatus, updateFilter, removeFilter, filterKey]);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", popclassName)}
          >
            {selectedStatus ? (
              <div className="flex items-center justify-between w-full text-sm font-semibold">
                {selectedStatus.label}
                <Filter className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center justify-between w-full text-sm font-semibold">
                Todos
                <Filter className="h-4 w-4" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-full p-0", popclassName)}>
          <Command>
            {hasSearch && (
              <CommandInput
                placeholder={placeholder || "Buscar..."}
                className="h-9"
              />
            )}
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {data?.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={
                      selectedStatus?.value === item.value ? "" : item.value
                    }
                    onSelect={(currentValue) => {
                      setSelectedStatus(
                        selectedStatus?.value === item.value
                          ? null
                          : (data?.find(
                              (item) => item.value === currentValue
                            ) as Status | null)
                      );
                      setValue(currentValue);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
