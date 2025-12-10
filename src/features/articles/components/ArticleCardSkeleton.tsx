/**
 * ArticleCardSkeleton - Swiss Design
 * Loading state for ArticleCard with bold borders
 */

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ArticleCardSkeletonProps {
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function ArticleCardSkeleton({ className, variant = 'default' }: ArticleCardSkeletonProps) {
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn("border-4 border-neutral-200 dark:border-neutral-700 p-3 flex gap-4", className)}>
        <Skeleton className="w-20 h-16 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <div className={cn("border-4 border-neutral-200 dark:border-neutral-700", className)}>
        <Skeleton className="aspect-video w-full" />
        <div className="p-6 border-t-4 border-neutral-200 dark:border-neutral-700 space-y-4">
          <div className="flex gap-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("border-4 border-neutral-200 dark:border-neutral-700 flex flex-col h-full", className)}>
      {/* Image Skeleton */}
      <Skeleton className="aspect-4/3 w-full" />
      
      {/* Content */}
      <div className="flex flex-col grow p-4 border-t-4 border-neutral-200 dark:border-neutral-700">
        {/* Meta */}
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        
        {/* Excerpt */}
        <div className="space-y-2 mb-4 grow">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Author */}
        <div className="flex items-center gap-2 mt-auto">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
