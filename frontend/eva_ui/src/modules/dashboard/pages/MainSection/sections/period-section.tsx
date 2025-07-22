"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePeriod } from "@/modules/admin/hooks/usePeriod";
import { useFilterFromUrl } from "@/modules/core";
import { ReloadIcon } from "@radix-ui/react-icons";
import { BookCopy } from "lucide-react";
import { useEffect } from "react";

export const PeriodSection = () => {
  const { getParams, updateFilters } = useFilterFromUrl();

  // Obtén el período seleccionado de la URL
  const periodSelected = getParams("period_id", "");

  const handleSelectedPeriod = (id: string) => {
    updateFilters({ period_id: id });
  };

  const { getPeriods, listPeriods, loading } = usePeriod();

  useEffect(() => {
    getPeriods({}).then(() => {
      const activePeriod = listPeriods?.results.find(
        (period) => period.is_active
      );

      if (activePeriod && !periodSelected) {
        updateFilters({ period_id: activePeriod.id.toString() });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea className="grid grid-cols-1 h-36 overflow-y-auto">
      {listPeriods &&
        listPeriods.results.map((period) => {
          const isSelected = period.id === Number(periodSelected);
          const isActive = period.is_active && !periodSelected;

          return (
            <div
              key={period.id}
              className={`p-3 cursor-pointer rounded-sm flex items-center gap-3 border-l-4 text-sm ${
                isSelected || isActive
                  ? "bg-green-200 text-green-800 font-bold border-green-800"
                  : ""
              }`}
              onClick={() => handleSelectedPeriod(period.id.toString())}
            >
              <BookCopy
                className={`w-5 h-5
                  ${isSelected || isActive ? "text-green-800" : "text-gray-800"}
                 `}
              />
              <h2>{period.name}</h2>
            </div>
          );
        })}
      {loading && (
        <div className="p-3 cursor-pointer rounded-sm flex items-center gap-3 border-l-4 text-sm">
          <ReloadIcon className="w-5 h-5 animate-spin" />
        </div>
      )}
    </ScrollArea>
  );
};
