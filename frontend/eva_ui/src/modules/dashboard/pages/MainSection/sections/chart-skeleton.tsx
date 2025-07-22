import { Skeleton } from "@/components/ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <>
      <main className="flex flex-col gap-4 py-6">
        <div className="w-full justify-center flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
            <Skeleton className="h-4 w-8 rounded-md" />
            Previo inicio
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
            {" "}
            <Skeleton className="h-4 w-8 rounded-md" />
            Inicio
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
            {" "}
            <Skeleton className="h-4 w-8 rounded-md" />
            Proceso
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
            {" "}
            <Skeleton className="h-4 w-8 rounded-md" />
            Satisfactorio
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-md" />
          ))}
        </div>
      </main>
    </>
  );
};
