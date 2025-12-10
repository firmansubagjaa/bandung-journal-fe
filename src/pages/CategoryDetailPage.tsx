import { useParams, Link } from "react-router-dom";
import { ArticleListWithPagination } from "@/features/articles/components/ArticleListWithPagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

export function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const categoryName = id ? id.charAt(0).toUpperCase() + id.slice(1) : "Category";

  return (
    <main 
      role="main" 
      className="max-w-6xl mx-auto py-8 md:py-12 px-4"
      aria-label={`${categoryName} articles`}
    >
      <SEO 
        title={categoryName} 
        description={`Explore the latest ${categoryName.toLowerCase()} articles on Bandung Journal. Stay informed with in-depth coverage and analysis.`}
        url={`/categories/${id}`}
        keywords={`${categoryName}, news, articles, Bandung Journal`}
      />
      
      <div className="mb-8 md:mb-12">
        <Link to="/categories">
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 hover:bg-transparent hover:text-swiss-blue dark:text-gray-300 dark:hover:text-swiss-blue focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Categories
          </Button>
        </Link>
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-gray-700 pb-6">
          <div>
            <span className="block text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              Category
            </span>
            <h1 
              className="font-black tracking-tighter uppercase text-swiss-blue"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
            >
              {categoryName}
            </h1>
          </div>
          <p className="text-base md:text-xl font-medium text-gray-600 dark:text-gray-400 max-w-md md:text-right">
            Curated stories about {categoryName.toLowerCase()}.
          </p>
        </header>
      </div>

      <section aria-label={`${categoryName} article list`}>
        <ArticleListWithPagination categorySlug={id} itemsPerPage={12} />
      </section>
    </main>
  );
}
