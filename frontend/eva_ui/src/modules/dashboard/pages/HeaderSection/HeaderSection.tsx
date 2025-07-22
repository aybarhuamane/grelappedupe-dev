"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { LocationsFilters } from "@/modules/dashboard";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";

export const HeaderSection = () => {
  return (
    <Suspense
      fallback={
        <>
          <ReloadIcon className="w-10 h-10 animate-spin" />
        </>
      }
    >
      {/* <DetailHeaderProvider>
        <LocationProvider> */}
      <header className="flex flex-col sticky top-16 z-50">
        <LocationsFilters />
        <Skeleton className="w-full h-10" />
        {/* <CounterSection /> */}
      </header>
      {/* </LocationProvider>
      </DetailHeaderProvider> */}
    </Suspense>
  );
};
