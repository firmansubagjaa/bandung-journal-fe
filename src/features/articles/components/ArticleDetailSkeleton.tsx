import { Skeleton } from "@/components/ui/skeleton";

export function ArticleDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8 h-4 w-64 bg-gray-200" />

      {/* Header Skeleton - max-w-3xl */}
      <div className="mb-12 max-w-3xl mx-auto">
        {/* Metadata */}
        <div className="mb-6 flex gap-4">
          <div className="h-6 w-24 bg-gray-200" />
          <div className="h-6 w-32 bg-gray-200" />
        </div>
        
        {/* Title */}
        <div className="space-y-3 mb-6">
          <div className="h-12 bg-gray-200 w-full" />
          <div className="h-12 bg-gray-200 w-3/4" />
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-gray-200 w-full" />
          <div className="h-4 bg-gray-200 w-full" />
          <div className="h-4 bg-gray-200 w-2/3" />
        </div>
        
        {/* Share buttons */}
        <div className="h-10 w-32 bg-gray-200" />
      </div>

      {/* Featured Image Skeleton - max-w-4xl (widest) */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="aspect-video bg-gray-200 border-4 border-gray-300" />
        <div className="mt-3 h-3 w-48 bg-gray-200" />
      </div>

      {/* Content Skeleton - max-w-prose (optimal reading) */}
      <div className="space-y-4 max-w-prose mx-auto">
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-5/6" />
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-4/5" />
        
        <div className="h-8" /> {/* Spacer */}
        
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-3/4" />
      </div>
    </div>
  );
}
