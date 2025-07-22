"use client";

import { Input } from "@/components/ui/input";
import { useParamsFilters } from "@/lib/filter-url";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface IProps {
  placeholder?: string;
  icon?: boolean;
  className?: string;
  queryKey?: string;
  queryValue?: string;
}

export const SearchFilter = ({
  placeholder,
  icon,
  className,
  queryKey,
}: IProps) => {
  const { createFilter, removeFilter, getParams } = useParamsFilters();
  const searchParams = getParams({
    key: queryKey ? queryKey : "search",
    value: "",
  });
  // const searchParams = getParams({ key: 'search', value: '' });

  const [searchValue, setSearchValue] = useState(searchParams || "");

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      createFilter({ key: queryKey ? queryKey : "search", value: term });
      // createFilter({ key: 'search', value: term });
    } else {
      removeFilter({ key: queryKey ? queryKey : "search" });
      // removeFilter({ key: 'search' });
    }
  }, 300);

  const handleClear = () => {
    removeFilter({ key: queryKey ? queryKey : "search" });
    // removeFilter({ key: 'search' });
    setSearchValue("");
  };

  return (
    <div className={cn("relative flex items-center gap-2 w-full", className)}>
      {icon ? <Search className="absolute left-3 text-gray-500 h-4" /> : null}
      <Input
        className={icon ? "pl-10" : ""}
        placeholder={placeholder || "Buscar..."}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e.target.value);
        }}
        value={searchValue}
      />
      {searchValue && (
        <X
          className="absolute right-3 text-red-800 font-bold bg-red-100 h-6 w-6 p-1 rounded-full cursor-pointer"
          onClick={handleClear}
        />
      )}
    </div>
  );
};
