"use client";
import { Menubar } from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { CapacityFilterBar } from "./filters/capacity-filter-bar";
import { CompetenceFilterBar } from "./filters/competence-filter-bar";
import { CoursesFilterBar } from "./filters/courses-filter-bar";
import { PeriodFilterBar } from "./filters/period-filter";

export const FilterBar = () => {
  return (
    <Menubar className="w-fit h-full border-none">
      <PeriodFilterBar />
      <CoursesFilterBar />
      <CompetenceFilterBar />
      <CapacityFilterBar />
    </Menubar>
  );
};

export const FilterBarSkeleton = () => {
  return (
    <Menubar className="w-fit h-full border-none">
      <Skeleton className="w-full h-full" />
    </Menubar>
  );
};
