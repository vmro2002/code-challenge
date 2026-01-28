import { Skeleton } from "@/components/ui/skeleton";

export function SwapSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass rounded-2xl p-6 space-y-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-6 w-24 animate-shimmer" />
          <Skeleton className="h-8 w-8 rounded-full animate-shimmer" />
        </div>

        {/* From input skeleton */}
        <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16 animate-shimmer" />
            <Skeleton className="h-4 w-24 animate-shimmer" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-12 flex-1 animate-shimmer" />
            <Skeleton className="h-10 w-28 rounded-full animate-shimmer" />
          </div>
        </div>

        {/* Swap button skeleton */}
        <div className="flex justify-center -my-2 relative z-10">
          <Skeleton className="h-10 w-10 rounded-full animate-shimmer" />
        </div>

        {/* To input skeleton */}
        <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 animate-shimmer" />
            <Skeleton className="h-4 w-24 animate-shimmer" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-12 flex-1 animate-shimmer" />
            <Skeleton className="h-10 w-28 rounded-full animate-shimmer" />
          </div>
        </div>

        {/* Exchange rate skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-4 w-48 animate-shimmer" />
        </div>

        {/* Submit button skeleton */}
        <Skeleton className="h-14 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}
