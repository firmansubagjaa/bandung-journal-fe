/**
 * ArticleCard Component - Swiss Design
 * Bold borders, geometric shapes, high contrast, minimal decoration
 */

import { Link } from "react-router-dom";
import { Article } from "@/features/articles/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function ArticleCard({ article, className, variant = 'default' }: ArticleCardProps) {
  // Compact variant for sidebars
  if (variant === 'compact') {
    return (
      <article className={cn("group", className)}>
        <Link 
          to={`/articles/${article.slug}`}
          className="flex gap-4 border-4 border-black dark:border-white p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {/* Thumbnail */}
          <div className="w-20 h-16 shrink-0 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            {article.featuredImage ? (
              <img 
                src={article.featuredImage} 
                alt=""
                loading="lazy" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
                <span className="text-sm font-black text-white dark:text-black">BJ</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {article.category?.name || 'News'}
            </span>
            <h3 className="mt-1 font-bold text-sm text-black dark:text-white line-clamp-2 group-hover:underline">
              {article.title}
            </h3>
          </div>
        </Link>
      </article>
    );
  }

  // Featured variant for hero sections
  if (variant === 'featured') {
    return (
      <article className={cn("group", className)}>
        <Link 
          to={`/articles/${article.slug}`}
          className="block border-4 border-black dark:border-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {/* Image */}
          <div className="aspect-video bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            {article.featuredImage ? (
              <img 
                src={article.featuredImage} 
                alt={article.title}
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
                <span className="text-4xl font-black text-white dark:text-black">BJ</span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 border-t-4 border-black dark:border-white">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline">
                {article.category?.name || 'News'}
              </Badge>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-black text-black dark:text-white leading-tight mb-3 group-hover:underline decoration-4 underline-offset-4">
              {article.title}
            </h3>
            
            {article.excerpt && (
              <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {article.excerpt}
              </p>
            )}
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className={cn("group flex flex-col h-full", className)}>
      <Link 
        to={`/articles/${article.slug}`} 
        className="block border-4 border-black dark:border-white overflow-hidden flex-1 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
      >
        {/* Image */}
        <div className="aspect-4/3 bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden">
          {article.featuredImage ? (
            <img 
              src={article.featuredImage} 
              alt={article.title}
              loading="lazy" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
              <span className="text-3xl font-black text-white dark:text-black">BJ</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex flex-col grow p-4 border-t-4 border-black dark:border-white">
          {/* Meta */}
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-[10px]">
              {article.category?.name || 'News'}
            </Badge>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black leading-tight mb-3 text-black dark:text-white group-hover:underline decoration-2 underline-offset-4">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4 leading-relaxed grow">
            {article.excerpt}
          </p>
          
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-black">
              {article.author?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <span className="text-xs font-bold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
              {article.author?.name || 'Anonymous'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
