"use client";
import {
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { usePeriod } from "@/modules/admin/hooks/usePeriod";
import { useFilterFromUrl } from "@/modules/core";
import { useEffect } from "react";
import { LabelFilterBar } from "./label-filter";

export const PeriodFilterBar = () => {
  const { getParams, updateFilters } = useFilterFromUrl();
  const { getPeriods, listPeriods } = usePeriod();

  const periodSelected = getParams("period_id", "");

  useEffect(() => {
    getPeriods({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!periodSelected && listPeriods?.results?.length) {
      const activePeriod = listPeriods.results.find(
        (period) => period.is_active
      );
      if (activePeriod) {
        updateFilters({ period_id: activePeriod.id.toString() });
      }
    }
  }, [listPeriods, periodSelected, updateFilters]);

  const selectedPeriod = listPeriods?.results?.find(
    (period) => period.id === Number(periodSelected)
  );

  const selectedPeriodName = selectedPeriod ? selectedPeriod.name : "";

  return (
    <MenubarMenu>
      <MenubarTrigger className="flex items-center gap-1 p-0">
        <LabelFilterBar label="Periodo" selectedName={selectedPeriodName} />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup value={periodSelected}>
          {listPeriods?.results?.map((period) => (
            <MenubarRadioItem
              key={period.id}
              value={period.id.toString()}
              onClick={() => updateFilters({ period_id: period.id.toString() })}
              className={`${
                period.id === Number(periodSelected) ? "bg-green-100" : ""
              }`}
            >
              {period.name}
            </MenubarRadioItem>
          ))}
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  );
};
