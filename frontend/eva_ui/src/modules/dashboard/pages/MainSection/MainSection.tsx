"use client";
import { NoDataFound } from "@/components/custom/no-data-found";
import { Skeleton } from "@/components/ui/skeleton";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";
import { FilterBarSkeleton } from "./filter-bar";
import { MapSection } from "./sections";

export const MainSection = () => {
  return (
    <main>
      <Suspense
        fallback={
          <>
            <ReloadIcon className="w-10 h-10 animate-spin" />
          </>
        }
      >
        {/* <DetailHeaderProvider>
          <LocationProvider>
            <ColegioProvider>
              <CourseProvider> */}
        {/* <PanelLayout aside={<AsideFilter />}> */}
        <article className="flex flex-col gap-6 container mx-auto p-4">
          <section>
            {/* <FilterBar /> */}
            <FilterBarSkeleton />
          </section>
          <section className="grid grid-cols-12 gap-5 min-h-96">
            <section className="col-span-7 bg-white rounded-md ">
              {/* <NewChartSection /> */}
              <NoDataFound />
            </section>
            <section className="col-span-5 -z-0">
              <MapSection />
            </section>
          </section>
          <section id="section-table">
            <Skeleton className="w-full h-20" />
            {/* <TableSection /> */}
          </section>
        </article>
        {/* </PanelLayout> */}
        {/* </CourseProvider>
            </ColegioProvider>
          </LocationProvider>
        </DetailHeaderProvider> */}
      </Suspense>
    </main>
  );
};
