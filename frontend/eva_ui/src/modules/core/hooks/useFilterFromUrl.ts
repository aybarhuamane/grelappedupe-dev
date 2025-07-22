"use client";
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ParamItem = {
  name: string;
  value: string;
};

export const useFilterFromUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const getParams = (nameParams: string, defaultValue: string) => {
    const value = searchParams.get(nameParams);
    return value || defaultValue;
  };

  const removeFilter = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);

      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const updateFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (name === "page") {
        if (value === "1" || value === "") {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      } else {
        params.delete("page");
        if (value === "") {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      }

      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const updateFilters = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      // Set the new filters
      Object.entries(filters).forEach(([name, value]) => {
        if (name === "page") {
          if (value === "1") {
            params.delete(name);
          } else {
            params.set(name, value);
          }
        } else {
          params.delete("page");
          if (value === "") {
            params.delete(name);
          } else {
            params.set(name, value);
          }
        }
      });

      const queryString = params.toString();
      const url = `${pathname}${queryString ? `?${queryString}` : ""}`;

      router.push(url, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  function filteredParams(
    filterArray: { name: string; value: string }[]
  ): ParamItem[] {
    const filteredParams: ParamItem[] = [];

    filterArray.forEach(({ value, name }) => {
      const paramValue = searchParams.get(value);
      if (paramValue) {
        filteredParams.push({ name, value: value });
      }
    });

    return filteredParams;
  }

  const removeFilters = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(filters).forEach(([name, value]) => {
        params.delete(name);
      });
      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  return {
    getParams,
    updateFilter,
    updateFilters,
    filteredParams,
    removeFilter,
    removeFilters,
  };
};
