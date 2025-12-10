/**
 * HeroArticle Component - Swiss Design Enhanced
 * Bold black borders, geometric grid, high contrast, minimal decoration
 */

import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useHeroArticle } from '../hooks/useNewspaper';
import type { FeaturedArticle } from '../types';

interface HeroArticleProps {
  article?: FeaturedArticle;
  loading?: boolean;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatViewCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

// Skeleton for loading state - Swiss style
export function HeroArticleSkeleton() {
  return (
    <article 
      className="relative w-full border-4 border-black dark:border-white"
      aria-busy="true"
      aria-label="Loading featured article"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image skeleton - 7 columns */}
        <div className="lg:col-span-7">
          <Skeleton className="aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded-none" />
        </div>
        
        {/* Content skeleton - 5 columns */}
        <div className="lg:col-span-5 p-6 lg:p-10 space-y-6 border-t-4 lg:border-t-0 lg:border-l-4 border-black dark:border-white">
          <Skeleton className="h-6 w-32 rounded-none" />
          <Skeleton className="h-12 w-full rounded-none" />
          <Skeleton className="h-8 w-3/4 rounded-none" />
          <Skeleton className="h-24 w-full rounded-none" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-none" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function HeroArticle({ article, loading }: HeroArticleProps) {
  const { data, isLoading } = useHeroArticle();
  
  const heroData = article || data?.data;
  const isLoadingState = loading || isLoading;

  if (isLoadingState) {
    return <HeroArticleSkeleton />;
  }

  if (!heroData) {
    return null;
  }

  const { article: articleData } = heroData;

  return (
    <article
      className="group relative w-full border-4 border-black dark:border-white bg-white dark:bg-neutral-950 overflow-hidden"
      aria-label={`Featured article: ${articleData.title}`}
    >
      {/* Swiss-style asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Image Section - 7 columns (asymmetric) */}
        <div className="lg:col-span-7 relative">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            {articleData.featuredImage ? (
              <img
                src={articleData.featuredImage}
                alt={articleData.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
                <span className="text-6xl font-black text-white dark:text-black tracking-tighter">
                  BJ
                </span>
              </div>
            )}
          </div>
          
          {/* View count badge - geometric box */}
          <div className="absolute bottom-0 left-0 bg-black dark:bg-white text-white dark:text-black px-4 py-2 flex items-center gap-2 text-sm font-bold">
            <Eye className="w-4 h-4" aria-hidden="true" />
            {formatViewCount(articleData.viewCount)}
          </div>
        </div>

        {/* Content Section - 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t-4 lg:border-t-0 lg:border-l-4 border-black dark:border-white">
          
          {/* Top content */}
          <div className="p-6 lg:p-10 space-y-4">
            {/* Category - bold uppercase */}
            <div className="flex items-center gap-4">
              <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-black uppercase tracking-widest">
                {articleData.category.name}
              </span>
              <time 
                dateTime={articleData.publishedAt || ''}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400"
              >
                {formatDate(articleData.publishedAt)}
              </time>
            </div>

            {/* Title - Bold Swiss typography */}
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight text-black dark:text-white"
              style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, sans-serif" }}
            >
              <Link 
                to={`/articles/${articleData.slug}`}
                className="hover:underline decoration-4 underline-offset-4 focus:outline-none focus-visible:underline"
              >
                {articleData.title}
              </Link>
            </h2>

            {/* Excerpt */}
            {articleData.excerpt && (
              <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-4">
                {articleData.excerpt}
              </p>
            )}
          </div>

          {/* Bottom section - author & CTA */}
          <div className="border-t-4 border-black dark:border-white p-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              {articleData.author.avatarUrl ? (
                <img 
                  src={articleData.author.avatarUrl} 
                  alt={articleData.author.name}
                  className="w-10 h-10 rounded-none border-2 border-black dark:border-white object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black">
                  {articleData.author.name.charAt(0)}
                </div>
              )}
              <span className="text-sm font-bold text-black dark:text-white uppercase tracking-wide">
                {articleData.author.name}
              </span>
            </div>

            {/* CTA Button - Swiss geometric */}
            <Link
              to={`/articles/${articleData.slug}`}
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-black text-sm uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white min-h-[48px]"
              aria-label={`Read full article: ${articleData.title}`}
            >
              Read
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default HeroArticle;
