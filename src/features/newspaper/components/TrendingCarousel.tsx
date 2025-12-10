/**
 * TrendingCarousel Component - Swiss Design Enhanced
 * Grid-based cards, bold borders, geometric ranking, minimal decoration
 */

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrendingArticles } from '../hooks/useNewspaper';
import type { TrendingArticle } from '../types';

interface TrendingCarouselProps {
  articles?: TrendingArticle[];
  limit?: number;
  categoryId?: number;
  title?: string;
}

function formatViewCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

// Article Card - Swiss style
function TrendingCard({ article, rank }: { article: TrendingArticle; rank: number }) {
  return (
    <article
      className="group flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
      aria-label={`Trending #${rank}: ${article.title}`}
    >
      <Link
        to={`/articles/${article.slug}`}
        className="block border-4 border-black dark:border-white bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
              <span className="text-3xl font-black text-white dark:text-black">
                {rank}
              </span>
            </div>
          )}
          
          {/* Rank badge - Swiss geometric */}
          <div className="absolute top-0 left-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg">
            {rank}
          </div>

          {/* View count */}
          <div className="absolute bottom-0 right-0 flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1">
            <Eye className="w-3 h-3" aria-hidden="true" />
            {formatViewCount(article.viewCount)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 border-t-4 border-black dark:border-white">
          <span className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {article.category.name}
          </span>
          
          <h3 className="mt-2 font-bold text-base leading-snug line-clamp-2 text-black dark:text-white group-hover:underline decoration-2">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

// Skeleton Card - Swiss style
function TrendingCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start border-4 border-black dark:border-white">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="p-4 border-t-4 border-black dark:border-white space-y-3">
        <Skeleton className="h-4 w-20 rounded-none" />
        <Skeleton className="h-5 w-full rounded-none" />
        <Skeleton className="h-5 w-3/4 rounded-none" />
      </div>
    </div>
  );
}

export function TrendingCarousel({ 
  articles, 
  limit = 10, 
  categoryId,
  title = "Trending"
}: TrendingCarouselProps) {
  const { data, isLoading } = useTrendingArticles(limit, categoryId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const trendingArticles = articles || data?.data || [];

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 320; // Card width + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section 
      className="py-8"
      aria-labelledby="trending-heading"
    >
      {/* Header - Swiss bold line */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between border-b-4 border-black dark:border-white pb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white dark:text-black" aria-hidden="true" />
            </div>
            <h2 
              id="trending-heading"
              className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white"
            >
              {title}
            </h2>
          </div>

          {/* Navigation buttons - Swiss geometric */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4 -mx-4 sm:mx-0 sm:px-0 sm:container sm:mx-auto"
          role="list"
          aria-label="Trending articles"
          tabIndex={0}
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <TrendingCardSkeleton key={i} />
            ))
          ) : trendingArticles.length > 0 ? (
            // Articles
            trendingArticles.map((article, index) => (
              <TrendingCard 
                key={article.id} 
                article={article} 
                rank={index + 1} 
              />
            ))
          ) : (
            // Empty state
            <p className="text-neutral-500 dark:text-neutral-400 py-8 font-medium">
              No trending articles yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default TrendingCarousel;
