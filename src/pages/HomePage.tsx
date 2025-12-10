/**
 * HomePage - Newspaper Style Layout
 * NYT-inspired design with Swiss aesthetic and Bandung colors
 * Mobile-first, accessible, performance optimized
 */

import { Suspense, lazy } from 'react';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { SEO } from '@/components/seo/SEO';
import { SectionHeading } from '@/components/typography';
import { Separator } from '@/components/ui/separator';
import { ArticleCardSkeleton } from '@/features/articles/components/ArticleCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

// Newspaper components
import { 
  HeroArticle, 
  HeroArticleSkeleton,
  BreakingNewsTicker, 
  TrendingCarousel, 
  NewsletterCTA 
} from '@/features/newspaper';

// Lazy load non-critical components
const CategoryTabs = lazy(() => 
  import('@/components/home/CategoryTabs').then(m => ({ default: m.CategoryTabs }))
);
const ArticleList = lazy(() => 
  import('@/features/articles/components/ArticleList').then(m => ({ default: m.ArticleList }))
);

// Category Section Component - Swiss Design
interface CategorySectionProps {
  title: string;
  categorySlug?: string;
}

function CategorySection({ title, categorySlug }: CategorySectionProps) {
  const { data, isLoading } = useArticles({ limit: 4, categorySlug });
  const articles = data?.data?.articles || [];

  if (isLoading) {
    return (
      <section 
        className="py-8 border-t-4 border-black dark:border-white"
        aria-busy="true"
        aria-label={`Loading ${title}`}
      >
        <Skeleton className="h-8 w-48 mb-6 rounded-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  const leadArticle = articles[0];
  const supportingArticles = articles.slice(1);

  return (
    <section 
      className="py-8 border-t-4 border-black dark:border-white"
      aria-labelledby={`category-${categorySlug || title}`}
    >
      {/* Swiss header with geometric accent */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-8 bg-black dark:bg-white" aria-hidden="true" />
        <h2 
          id={`category-${categorySlug || title}`}
          className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white"
        >
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Lead Article - 8 columns (asymmetric) */}
        <article className="lg:col-span-8 group">
          <a 
            href={`/articles/${leadArticle.slug}`}
            className="block border-4 border-black dark:border-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              {leadArticle.featuredImage ? (
                <img
                  src={leadArticle.featuredImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-4xl font-black text-white dark:text-black">BJ</span>
                </div>
              )}
            </div>
            <div className="p-4 border-t-4 border-black dark:border-white">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {leadArticle.category?.name || 'General'}
              </span>
              <h3 className="mt-2 text-xl lg:text-2xl font-black text-black dark:text-white leading-tight group-hover:underline decoration-4 underline-offset-4">
                {leadArticle.title}
              </h3>
              {leadArticle.excerpt && (
                <p className="mt-2 text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {leadArticle.excerpt}
                </p>
              )}
            </div>
          </a>
        </article>

        {/* Supporting Articles - 4 columns */}
        <div className="lg:col-span-4 space-y-4">
          {supportingArticles.map((article, index) => (
            <article key={article.id} className="group">
              <a 
                href={`/articles/${article.slug}`}
                className="flex gap-4 border-4 border-black dark:border-white p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {/* Number rank */}
                <span className="text-2xl font-black text-black dark:text-white w-8 shrink-0">
                  {index + 2}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {article.category?.name || 'General'}
                  </span>
                  <h4 className="mt-1 font-bold text-black dark:text-white line-clamp-2 group-hover:underline">
                    {article.title}
                  </h4>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <SEO 
        title="Home - Bandung Journal" 
        description="Discover the latest news, culture, and lifestyle stories from West Java. Bandung Journal brings you trusted journalism and compelling narratives."
        url="/"
        keywords="Bandung news, West Java, culture, lifestyle, journalism, Indonesia"
      />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#1E3A5F] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      <main id="main-content" className="container mx-auto px-4 py-6 space-y-12" role="main">
        
        {/* Hero Section */}
        <section aria-label="Featured Story">
          <Suspense fallback={<HeroArticleSkeleton />}>
            <HeroArticle />
          </Suspense>
        </section>

        {/* Trending Carousel */}
        <TrendingCarousel title="Trending Now" limit={10} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <section className="lg:col-span-2 space-y-12" aria-label="Latest News">
            <div>
              <SectionHeading className="mb-8">Latest Stories</SectionHeading>
              <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-busy="true">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                  ))}
                </div>
              }>
                <ArticleList limit={6} />
              </Suspense>
            </div>
            
            {/* Category Tabs */}
            <section aria-label="Browse by Category">
              <Suspense fallback={<Skeleton className="h-40 w-full" />}>
                <CategoryTabs />
              </Suspense>
            </section>
          </section>

          {/* Sidebar */}
          <aside 
            className="lg:col-span-1 space-y-8" 
            aria-label="Sidebar"
            role="complementary"
          >
            {/* Newsletter CTA */}
            <NewsletterCTA 
              title="Stay Informed"
              description="Get curated stories delivered to your inbox every morning."
            />
            
            <Separator className="border-2 border-neutral-200 dark:border-neutral-700" />
            
            {/* Featured Sidebar Articles */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Editor's Picks
              </h3>
              <Suspense fallback={
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              }>
                <SidebarArticles />
              </Suspense>
            </div>
          </aside>
        </div>

        {/* Category Sections (NYT-style) */}
        <CategorySection title="Politics & Government" categorySlug="politics" />
        <CategorySection title="Culture & Lifestyle" categorySlug="culture" />
        <CategorySection title="Business & Economy" categorySlug="business" />

        {/* Newsletter Hero CTA */}
        <NewsletterCTA 
          variant="hero" 
          title="Never Miss a Story"
          description="Join thousands of readers who start their day with Bandung Journal. Our daily newsletter delivers the stories that matter most."
        />
      </main>
    </>
  );
}

// Sidebar Articles Component
function SidebarArticles() {
  const { data, isLoading } = useArticles({ limit: 5 });
  const articles = data?.data?.articles || [];

  if (isLoading || articles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {articles.slice(0, 5).map((article, index) => (
        <article key={article.id} className="group flex gap-3">
          <span className="text-2xl font-bold text-[#B85C38] dark:text-[#B85C38]">
            {index + 1}
          </span>
          <a 
            href={`/articles/${article.slug}`}
            className="flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F] rounded"
          >
            <h4 className="font-semibold text-neutral-900 dark:text-white line-clamp-2 group-hover:text-[#1E3A5F] dark:group-hover:text-[#B85C38] transition-colors text-sm">
              {article.title}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {article.category?.name || 'General'}
            </p>
          </a>
        </article>
      ))}
    </div>
  );
}

export default HomePage;
