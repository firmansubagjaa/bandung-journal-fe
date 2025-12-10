import { Skeleton } from "@/components/ui/skeleton";

export function CommentSkeleton() {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-100">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="grow space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
