import { CategoryCard } from "@/components/categories/CategoryCard";
import { SEO } from "@/components/seo/SEO";
import { useArticles } from "@/features/articles/hooks/useArticles";

// Hardcoded categories for now, can be fetched from API later
const CATEGORIES = [
  { id: 'news', name: 'News', slug: 'news', description: 'Latest updates and breaking news from Bandung and beyond.' },
  { id: 'culture', name: 'Culture', slug: 'culture', description: 'Exploring the rich heritage, arts, and traditions of West Java.' },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'Food, fashion, travel, and modern living in the city.' },
  { id: 'tech', name: 'Tech', slug: 'tech', description: 'Innovation, startups, and digital transformation stories.' },
  { id: 'opinion', name: 'Opinion', slug: 'opinion', description: 'Thought-provoking essays and perspectives from our contributors.' },
  { id: 'politics', name: 'Politics', slug: 'politics', description: 'Government, policy, and political analysis.' },
];

export function CategoriesPage() {
  return (
    <main 
      role="main" 
      className="max-w-6xl mx-auto space-y-8 md:space-y-12 px-4"
      aria-label="Browse categories"
    >
      <SEO 
        title="Categories" 
        description="Explore articles by category - from breaking news to cultural insights, technology to lifestyle. Find stories that matter to you."
        url="/categories"
        keywords="categories, news, culture, lifestyle, tech, opinion, politics, Bandung"
      />
      
      {/* Header */}
      <header className="text-center py-6 md:py-8 border-b-4 border-black dark:border-gray-700">
        <h1 
          className="font-black tracking-tighter uppercase mb-3 md:mb-4 dark:text-white"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          Explore Categories
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover stories organized by topic. Find what interests you most.
        </p>
      </header>
      
      {/* Categories Grid */}
      <section aria-label="Category list">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((category) => (
            <CategoryCardWithData key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}

// Wrapper to fetch articles for each category
function CategoryCardWithData({ category }: { category: typeof CATEGORIES[0] }) {
  const { data: articlesData, isLoading } = useArticles({ 
    categorySlug: category.slug,
    limit: 3 
  });

  const articles = articlesData?.data?.articles || [];
  const totalCount = articlesData?.data?.total || 0;

  if (isLoading) {
    return (
      <div 
        className="border-4 border-black dark:border-gray-700 rounded-none h-80 md:h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" 
        aria-busy="true"
        aria-label={`Loading ${category.name} category`}
      />
    );
  }

  return (
    <CategoryCard
      category={category}
      articleCount={totalCount}
      latestArticles={articles}
    />
  );
}
