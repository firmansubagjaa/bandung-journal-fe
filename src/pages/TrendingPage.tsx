/**
 * TrendingPage - Trending Articles List
 * Based on reference Image 1 - Lead article + sidebar list layout
 */

import { useState } from 'react';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { SEO } from '@/components/seo/SEO';
import { 
  LeadArticleCard, 
  LeadArticleCardSkeleton,
  CompactArticleList,
  CompactArticleListSkeleton,
  TabFilter,
  CATEGORY_TABS
} from '@/components/articles';
import { TrendingUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState('');
  
  // Fetch trending articles (sorted by views)
  const { data, isLoading } = useArticles({ 
    limit: 10,
    categorySlug: activeCategory || undefined,
    // Note: Backend should support sorting by views
  });
  
  const articles = data?.data?.articles || [];
  const leadArticle = articles[0];
  const sidebarArticles = articles.slice(1);

  return (
    <>
      <SEO 
        title="Trending - Bandung Journal" 
        description="Discover the most popular and trending articles on Bandung Journal."
        url="/trending"
        keywords="trending, popular, news, Bandung"
      />

      <main className="container mx-auto px-4 py-8" role="main">
        {/* Header */}
        <header className="border-b-4 border-black dark:border-white pb-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-10 h-10 text-swiss-red" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black dark:text-white">
              Trending
            </h1>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
            The most read and shared stories right now.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="mb-8">
          <TabFilter
            tabs={CATEGORY_TABS}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
          />
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <LeadArticleCardSkeleton />
            </div>
            <div className="lg:col-span-5">
              <CompactArticleListSkeleton count={5} />
            </div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lead Article */}
            <div className="lg:col-span-7">
              {leadArticle && <LeadArticleCard article={leadArticle} />}
            </div>

            {/* Sidebar - Recent/Related Articles */}
            <div className="lg:col-span-5">
              <CompactArticleList
                articles={sidebarArticles}
                title="More Trending"
                showAuthor={true}
                maxItems={6}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              No trending articles found.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default TrendingPage;
