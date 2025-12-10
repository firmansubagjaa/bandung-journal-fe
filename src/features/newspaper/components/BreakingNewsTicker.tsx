/**
 * BreakingNewsTicker Component - Swiss Design Enhanced
 * Bold geometric bar, high contrast, sharp edges
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight, Pause, Play } from 'lucide-react';
import { useBreakingNews } from '../hooks/useNewspaper';
import type { BreakingNewsItem } from '../types';

interface BreakingNewsTickerProps {
  items?: BreakingNewsItem[];
}

export function BreakingNewsTicker({ items }: BreakingNewsTickerProps) {
  const { data, isLoading } = useBreakingNews();
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  const newsItems = items || data?.data || [];

  // Auto-rotate headlines
  useEffect(() => {
    if (isPaused || newsItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, newsItems.length]);

  // No breaking news
  if (!isLoading && newsItems.length === 0) {
    return null;
  }

  // Loading state - Swiss minimal
  if (isLoading) {
    return (
      <div 
        className="bg-black dark:bg-white text-white dark:text-black py-3 px-4 border-b-4 border-black dark:border-white"
        role="status"
        aria-busy="true"
        aria-label="Loading breaking news"
      >
        <div className="container mx-auto flex items-center gap-4">
          <AlertCircle className="w-5 h-5 animate-pulse" aria-hidden="true" />
          <span className="font-black text-xs uppercase tracking-[0.2em]">Breaking</span>
          <div className="h-4 w-48 bg-white/30 dark:bg-black/30 animate-pulse" />
        </div>
      </div>
    );
  }

  const currentItem = newsItems[currentIndex];

  return (
    <div
      ref={tickerRef}
      className="bg-black dark:bg-white text-white dark:text-black py-3 px-4 border-b-4 border-black dark:border-white"
      role="region"
      aria-label="Breaking news"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Label - Swiss bold uppercase */}
        <div className="flex items-center gap-3 shrink-0">
          <AlertCircle className="w-5 h-5" aria-hidden="true" />
          <span className="font-black text-xs uppercase tracking-[0.2em] hidden sm:inline">
            Breaking
          </span>
          <div className="w-px h-4 bg-white/40 dark:bg-black/40 hidden sm:block" aria-hidden="true" />
        </div>

        {/* Headline - Bold */}
        <div 
          className="flex-1 overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm sm:text-base font-bold truncate">
            {currentItem.article ? (
              <Link
                to={`/articles/${currentItem.article.slug}`}
                className="hover:underline decoration-2 focus:outline-none focus-visible:underline"
              >
                {currentItem.headline}
              </Link>
            ) : (
              currentItem.headline
            )}
          </p>
        </div>

        {/* Controls - Geometric */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Pause/Play button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-black dark:focus-visible:ring-offset-white min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? (
              <Play className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Pause className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Pagination - Swiss dots */}
          {newsItems.length > 1 && (
            <div className="hidden sm:flex items-center gap-1" role="tablist">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black ${
                    index === currentIndex
                      ? 'bg-white dark:bg-black'
                      : 'bg-white/30 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/60'
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to headline ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* View all link - Swiss arrow */}
          {currentItem.article && (
            <Link
              to={`/articles/${currentItem.article.slug}`}
              className="hidden md:inline-flex items-center gap-1 text-sm font-black uppercase tracking-wide hover:underline decoration-2 focus:outline-none focus-visible:underline"
            >
              Read
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsTicker;
