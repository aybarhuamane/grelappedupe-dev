"use client";
import {
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useFilterFromUrl } from "@/modules/core";
import { useCoursesContext } from "@/modules/dashboard";
import { LabelFilterBar } from "./label-filter";

export const CapacityFilterBar = () => {
  const { getParams, updateFilters } = useFilterFromUrl();

  const capacitySelected = getParams("capacity", "");

  const { capacitiesList } = useCoursesContext();

  const selectedCapacity = capacitiesList?.results.find(
    (capacity) => capacity.id === Number(capacitySelected)
  );

  const selectedCapacityName = selectedCapacity ? selectedCapacity.code : "";

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 p-0">
          <LabelFilterBar
            label="Capacidad"
            selectedName={selectedCapacityName}
          />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={capacitySelected}>
            {capacitiesList &&
              capacitiesList.results.map((capacity) => (
                <MenubarRadioItem
                  key={capacity.id}
                  value={capacity.id.toString()}
                  onClick={() =>
                    updateFilters({
                      capacity: capacity.id.toString(),
                    })
                  }
                  className={`${
                    capacity.id === Number(capacitySelected)
                      ? "bg-green-100"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-xs">{capacity.code}</p>
                    <p className="text-sm">{capacity.name}</p>
                  </div>
                </MenubarRadioItem>
              ))}
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};
