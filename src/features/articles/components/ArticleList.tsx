import { useArticles } from "../hooks/useArticles";
import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";
import { Button } from "@/components/ui/button";

interface ArticleListProps {
  limit?: number;
  categorySlug?: string;
  className?: string;
}

export function ArticleList({ limit = 6, categorySlug, className }: ArticleListProps) {
  const { data, isLoading, isError } = useArticles({ limit, categorySlug });

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ${className}`}>
        {Array.from({ length: limit }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 border border-red-200 bg-red-50 text-red-600">
        <p className="font-bold mb-2">Failed to load articles.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!data?.data?.articles?.length) {
    return (
      <div className="text-center py-12 border border-gray-200 bg-gray-50 text-gray-500">
        <p>No articles found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ${className}`}>
      {data?.data?.articles?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
