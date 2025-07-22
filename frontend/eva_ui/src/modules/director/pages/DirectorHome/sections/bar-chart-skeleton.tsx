import { Skeleton } from "@/components/ui/skeleton";

export const BarChartSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-end gap-4 pb-4">
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-[150px]" />
            <div className="flex-1 flex space-x-2">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-10 flex-1" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
