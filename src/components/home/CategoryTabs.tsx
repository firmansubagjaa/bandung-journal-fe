import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { ArticleCardSkeleton } from "@/features/articles/components/ArticleCardSkeleton";
import { SectionHeading } from "@/components/typography";

// TODO: Fetch actual categories from backend
const CATEGORIES = [
  { id: "1", name: "Politics", slug: "politics" },
  { id: "2", name: "Technology", slug: "technology" },
  { id: "3", name: "Culture", slug: "culture" },
  { id: "4", name: "Business", slug: "business" },
];

export function CategoryTabs() {
  return (
    <div className="mt-12">
      <SectionHeading className="mb-8 dark:text-white">Browse by Category</SectionHeading>
      
      <Tabs defaultValue={CATEGORIES[0].slug} className="w-full">
        {/* Horizontal ScrollArea for mobile with visual indicators */}
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex w-auto justify-start border-b-4 border-black dark:border-gray-700 rounded-none bg-transparent h-auto p-0 gap-2">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.slug}
                className="rounded-none border-2 border-black dark:border-gray-600 data-[state=active]:bg-swiss-blue data-[state=active]:text-white data-[state=active]:border-swiss-blue dark:data-[state=active]:bg-blue-600 font-bold uppercase tracking-wide px-6 py-3 whitespace-nowrap dark:text-gray-300 data-[state=inactive]:hover:bg-gray-100 dark:data-[state=inactive]:hover:bg-gray-800"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="h-2 bg-gray-200" />
        </ScrollArea>

        {CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.slug} className="mt-8">
            <CategoryTabContent categorySlug={category.slug} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function CategoryTabContent({ categorySlug }: { categorySlug: string }) {
  const { data: articlesData, isLoading } = useArticles({ 
    categorySlug,
    limit: 4 
  });

  const articles = articlesData?.data?.articles || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-gray-200 bg-gray-50">
        <p className="text-gray-600">No articles in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
