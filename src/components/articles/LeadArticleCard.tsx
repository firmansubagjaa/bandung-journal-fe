/**
 * LeadArticleCard Component
 * Large featured article with image, title, excerpt, and author
 * Based on reference Image 1 - used as lead article in list pages
 */

import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Article } from '@/features/articles/types';
import { cn } from '@/lib/utils';

interface LeadArticleCardProps {
  article: Article;
  className?: string;
}

export function LeadArticleCard({ article, className }: LeadArticleCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link
        to={`/articles/${article.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
      >
        {/* Featured Image */}
        <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-6">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
              <span className="text-6xl font-black text-white dark:text-black">BJ</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-black dark:text-white group-hover:underline decoration-2 underline-offset-4">
            {article.title}
          </h2>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-neutral-600 dark:text-neutral-400 text-base lg:text-lg leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 pt-2">
            <Avatar className="h-10 w-10 border-2 border-black dark:border-white">
              <AvatarImage src={article.author?.avatarUrl} alt={article.author?.name} />
              <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black font-bold">
                {article.author?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {article.author?.name || 'Anonymous'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Skeleton for loading state
export function LeadArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

export default LeadArticleCard;
