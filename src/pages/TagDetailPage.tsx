import { useParams, Link } from "react-router-dom";
import { ArticleListWithPagination } from "@/features/articles/components/ArticleListWithPagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tag as TagIcon } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

export function TagDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Capitalize tag name for display
  const tagName = slug
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Tag";

  return (
    <main 
      role="main" 
      className="max-w-6xl mx-auto py-8 md:py-12 px-4"
      aria-label={`Articles tagged with ${tagName}`}
    >
      <SEO 
        title={`#${tagName}`} 
        description={`Discover articles tagged with ${tagName} on Bandung Journal. Find relevant stories and insights.`}
        url={`/tags/${slug}`}
        keywords={`${tagName}, articles, tag, Bandung Journal`}
      />
      
      <div className="mb-8 md:mb-12">
        <Link to="/tags">
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 hover:bg-transparent hover:text-swiss-blue dark:text-gray-300 dark:hover:text-swiss-blue focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Browse All Tags
          </Button>
        </Link>
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-gray-700 pb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div 
              className="w-12 h-12 md:w-16 md:h-16 bg-swiss-blue flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <TagIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div>
              <span className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                Tag
              </span>
              <h1 
                className="font-black tracking-tighter uppercase dark:text-white"
                style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}
              >
                #{tagName}
              </h1>
            </div>
          </div>
          <Badge className="bg-swiss-blue text-white border-2 border-black dark:border-gray-600 rounded-none font-bold uppercase tracking-wide px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm hover:bg-blue-800 self-start md:self-auto">
            Trending Tag
          </Badge>
        </header>
      </div>

      {/* Articles with this tag */}
      <section aria-label={`Articles tagged with ${tagName}`}>
        <ArticleListWithPagination 
          itemsPerPage={12} 
          // Note: You'll need to add tag filtering to ArticleListWithPagination
        />
      </section>

      {/* Empty State Placeholder */}
      <div className="text-center py-8 md:py-12 border-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <TagIcon className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-400 dark:text-gray-500 mb-3 md:mb-4" aria-hidden="true" />
        <h2 className="text-xl md:text-2xl font-black uppercase mb-2 dark:text-white">Coming Soon</h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Tag filtering functionality will be implemented with backend support.
        </p>
      </div>
    </main>
  );
}
