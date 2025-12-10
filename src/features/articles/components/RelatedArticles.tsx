import { useArticles } from "../hooks/useArticles";
import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";
import { SectionHeading } from "@/components/typography";

interface RelatedArticlesProps {
  categorySlug: string;
  currentArticleId: string;
  limit?: number;
}

export function RelatedArticles({ categorySlug, currentArticleId, limit = 3 }:  RelatedArticlesProps) {
  const { data, isLoading } = useArticles({ categorySlug, limit: limit + 1 });

  if (isLoading) {
    return (
      <div className="mt-16 pt-12 border-t-4 border-black">
        <SectionHeading className="mb-8">Related Articles</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: limit }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Filter out current article and limit results
  const relatedArticles = data?.data?.articles
    ?.filter(article => article.id !== currentArticleId)
    .slice(0, limit) || [];

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t-4 border-black">
      <SectionHeading className="mb-8">Related Articles</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
