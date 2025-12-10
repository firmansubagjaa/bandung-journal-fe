/**
 * CompactArticleList Component
 * Sidebar-style list with thumbnails + title + author
 * Based on reference Image 1 - "Recent articles" sidebar
 */

import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Article } from '@/features/articles/types';
import { cn } from '@/lib/utils';

interface CompactArticleListProps {
  articles: Article[];
  title?: string;
  className?: string;
  showAuthor?: boolean;
  maxItems?: number;
}

export function CompactArticleList({ 
  articles, 
  title = "Recent articles",
  className,
  showAuthor = true,
  maxItems = 5
}: CompactArticleListProps) {
  const displayArticles = articles.slice(0, maxItems);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Section Title */}
      {title && (
        <h3 className="text-lg font-black text-black dark:text-white">
          {title}
        </h3>
      )}

      {/* Article List */}
      <div className="space-y-5">
        {displayArticles.map((article) => (
          <CompactArticleItem 
            key={article.id} 
            article={article} 
            showAuthor={showAuthor}
          />
        ))}
      </div>
    </div>
  );
}

// Individual compact article item
function CompactArticleItem({ 
  article, 
  showAuthor = true 
}: { 
  article: Article; 
  showAuthor?: boolean;
}) {
  return (
    <article className="group">
      <Link
        to={`/articles/${article.slug}`}
        className="flex gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 rounded"
      >
        {/* Thumbnail */}
        <div className="w-24 h-20 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
              <span className="text-sm font-black text-white dark:text-black">BJ</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          {/* Title */}
          <h4 className="font-bold text-sm leading-snug text-black dark:text-white line-clamp-2 group-hover:underline">
            {article.title}
          </h4>

          {/* Author */}
          {showAuthor && article.author && (
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={article.author.avatarUrl} alt={article.author.name} />
                <AvatarFallback className="text-[10px] bg-neutral-200 dark:bg-neutral-700">
                  {article.author.name?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {article.author.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

// Skeleton for loading state
export function CompactArticleListSkeleton({ 
  count = 3,
  className 
}: { 
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-6", className)}>
      <Skeleton className="h-6 w-32" />
      <div className="space-y-5">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-24 h-20 shrink-0 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompactArticleList;
