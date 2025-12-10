/**
 * HomePage - Newspaper Style Layout
 * Based on PaperMag News reference (Image 2)
 * Mobile-first, accessible, Swiss design
 */

import { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { SEO } from '@/components/seo/SEO';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, MessageSquare, ArrowRight } from 'lucide-react';

// New shared components
import { 
  LeadArticleCard, 
  LeadArticleCardSkeleton,
  CompactArticleList,
  CompactArticleListSkeleton,
  TabFilter,
  ARTICLE_FILTER_TABS
} from '@/components/articles';

// Newspaper components
import { 
  BreakingNewsTicker, 
  NewsletterCTA 
} from '@/features/newspaper';

// Lazy load non-critical
const CategoryTabs = lazy(() => 
  import('@/components/home/CategoryTabs').then(m => ({ default: m.CategoryTabs }))
);

// ============================================
// HERO SECTION COMPONENT
// ============================================
function HeroSection() {
  const { data, isLoading } = useArticles({ limit: 6 });
  const articles = data?.data?.articles || [];
  
  const heroArticle = articles[0];
  const sidebarArticles = articles.slice(1, 3);

  if (isLoading) {
    return <HeroSectionSkeleton />;
  }

  if (!heroArticle) return null;

  return (
    <section className="border-b-4 border-black dark:border-white pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Text Content */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-4">
            {heroArticle.category?.name || 'Featured'}
          </Badge>
          
          <Link to={`/articles/${heroArticle.slug}`} className="group">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-black leading-tight text-black dark:text-white mb-4 group-hover:underline decoration-2 underline-offset-4">
              {heroArticle.title}
            </h1>
          </Link>
          
          {heroArticle.excerpt && (
            <p className="text-neutral-600 dark:text-neutral-400 text-sm lg:text-base mb-6 line-clamp-4">
              {heroArticle.excerpt}
            </p>
          )}

          {/* Author + Date */}
          <div className="flex items-center gap-3 mt-auto">
            <Avatar className="h-10 w-10 border-2 border-black dark:border-white">
              <AvatarImage src={heroArticle.author?.avatarUrl} />
              <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black font-bold">
                {heroArticle.author?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-black dark:text-white">
                {heroArticle.author?.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {new Date(heroArticle.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Large Image */}
        <div className="lg:col-span-6">
          <Link to={`/articles/${heroArticle.slug}`} className="block group">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              {heroArticle.featuredImage ? (
                <img
                  src={heroArticle.featuredImage}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-6xl font-black text-white dark:text-black">BJ</span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Right: Sidebar Cards */}
        <div className="lg:col-span-3 space-y-4">
          {sidebarArticles.map((article) => (
            <SidebarCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sidebar card for hero section
function SidebarCard({ article }: { article: any }) {
  return (
    <Link 
      to={`/articles/${article.slug}`}
      className="block group border-4 border-black dark:border-white overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
    >
      <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
            <span className="text-xl font-black text-white dark:text-black">BJ</span>
          </div>
        )}
      </div>
      <div className="p-3 border-t-2 border-black dark:border-white">
        <Badge variant="outline" className="text-[10px] mb-2">
          {article.category?.name || 'News'}
        </Badge>
        <h3 className="font-bold text-sm leading-snug text-black dark:text-white line-clamp-2 group-hover:underline">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
          <span>{article.author?.name}</span>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}

function HeroSectionSkeleton() {
  return (
    <section className="border-b-4 border-neutral-200 dark:border-neutral-700 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <Skeleton className="aspect-[16/10] w-full" />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </section>
  );
}

// ============================================
// RECENTLY ADDED SECTION
// ============================================
function RecentlyAddedSection() {
  const [activeTab, setActiveTab] = useState('');
  const { data, isLoading } = useArticles({ 
    limit: 7, 
    categorySlug: activeTab || undefined 
  });
  const articles = data?.data?.articles || [];

  const leadArticle = articles[0];
  const gridArticles = articles.slice(1, 7);

  return (
    <section className="py-8">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
          Recently Added
        </h2>
        <TabFilter 
          tabs={ARTICLE_FILTER_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {isLoading ? (
        <RecentlyAddedSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lead Article */}
          {leadArticle && (
            <div className="lg:col-span-5">
              <Link to={`/articles/${leadArticle.slug}`} className="block group">
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4">
                  {leadArticle.featuredImage ? (
                    <img
                      src={leadArticle.featuredImage}
                      alt={leadArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
                      <span className="text-4xl font-black text-white dark:text-black">BJ</span>
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="mb-2">
                  {leadArticle.category?.name || 'News'}
                </Badge>
                <h3 className="text-xl font-black text-black dark:text-white mb-2 group-hover:underline decoration-2">
                  {leadArticle.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span>{leadArticle.author?.name}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> 0
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {leadArticle.viewCount || 0}
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Grid Articles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridArticles.map((article) => (
              <GridArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function GridArticleCard({ article }: { article: any }) {
  return (
    <Link to={`/articles/${article.slug}`} className="block group">
      <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-3">
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <span className="text-xl font-black text-neutral-400">BJ</span>
          </div>
        )}
      </div>
      <h4 className="font-bold text-sm leading-snug text-black dark:text-white line-clamp-2 group-hover:underline mb-2">
        {article.title}
      </h4>
      <div className="flex items-center gap-3 text-xs text-neutral-500">
        <Badge variant="outline" className="text-[10px]">
          {article.category?.name || 'News'}
        </Badge>
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" /> {article.viewCount || 0}
        </span>
      </div>
    </Link>
  );
}

function RecentlyAddedSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5">
        <Skeleton className="aspect-[4/3] w-full mb-4" />
        <Skeleton className="h-6 w-20 mb-2" />
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-video w-full mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================
export function HomePage() {
  return (
    <>
      <SEO 
        title="Home - Bandung Journal" 
        description="Discover the latest news, culture, and lifestyle stories from West Java."
        url="/"
        keywords="Bandung news, West Java, culture, lifestyle, journalism, Indonesia"
      />
      
      {/* Skip to main content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Breaking News */}
      <BreakingNewsTicker />

      <main id="main-content" className="container mx-auto px-4 py-8 space-y-12" role="main">
        
        {/* Hero Section */}
        <HeroSection />

        {/* Recently Added */}
        <RecentlyAddedSection />

        {/* Category Browse */}
        <section className="py-8 border-t-4 border-black dark:border-white">
          <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-8">
            Browse by Category
          </h2>
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <CategoryTabs />
          </Suspense>
        </section>

        {/* Newsletter CTA */}
        <NewsletterCTA 
          variant="hero" 
          title="Never Miss a Story"
          description="Join thousands of readers who start their day with Bandung Journal."
        />
      </main>
    </>
  );
}

export default HomePage;
