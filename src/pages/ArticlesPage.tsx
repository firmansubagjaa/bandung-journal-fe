import { useArticles } from "@/features/articles/hooks/useArticles";
import { ArticleList } from "@/features/articles/components/ArticleList";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { TrendingWidget } from "@/components/home/TrendingWidget";
import { NewsletterWidget } from "@/components/home/NewsletterWidget";
import { SectionHeading } from "@/components/typography";
import { SEO } from "@/components/seo/SEO";
import { ArticleCardSkeleton } from "@/features/articles/components/ArticleCardSkeleton";
import { Separator } from "@/components/ui/separator";

export function ArticlesPage() {
  // Fetch articles - first 5 for carousel, rest for latest news
  const { data: articlesData, isLoading } = useArticles({ limit: 15 });
  
  const allArticles = articlesData?.data?.articles || [];
  const featuredArticles = allArticles.slice(0, 5); // Top 5 for carousel
  const hasArticles = allArticles.length > 0;

  return (
    <>
      <SEO 
        title="Home" 
        description="Discover the latest news, culture, and lifestyle stories from West Java. Bandung Journal brings you trusted journalism and compelling narratives."
        url="/"
        keywords="Bandung news, West Java, culture, lifestyle, journalism, Indonesia"
      />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-swiss-blue focus:text-white focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to main content
      </a>

      <main id="main-content" className="space-y-12" role="main">
        {/* Hero Section */}
        <section aria-label="Featured Stories">
          {isLoading ? (
            <div 
              className="h-[400px] md:h-[500px] border-4 border-black dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse" 
              aria-busy="true"
              aria-label="Loading featured articles"
            />
          ) : featuredArticles.length > 0 ? (
            <HeroCarousel articles={featuredArticles} />
          ) : null}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Latest News */}
          <section className="lg:col-span-2 space-y-12" aria-label="Latest News">
            <div>
              <SectionHeading className="mb-8">Latest News</SectionHeading>
              {isLoading ? (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8" 
                  aria-busy="true"
                  aria-label="Loading articles"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                  ))}
                </div>
              ) : hasArticles ? (
                <ArticleList limit={6} />
              ) : (
                <p className="text-center py-12 text-gray-600 dark:text-gray-400">
                  No articles available yet. Check back soon for fresh stories!
                </p>
              )}
            </div>
            
            {/* Category Tabs */}
            <section aria-label="Browse by Category">
              <CategoryTabs />
            </section>
          </section>

          {/* Sidebar */}
          <aside 
            className="lg:col-span-1 space-y-8" 
            aria-label="Sidebar"
            role="complementary"
          >
            <TrendingWidget />
            <Separator className="border-2 border-black dark:border-gray-700" />
            <NewsletterWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
