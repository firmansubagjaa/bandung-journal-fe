import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { ArticleCardSkeleton } from "@/features/articles/components/ArticleCardSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/seo/SEO";
import { Search, Filter, X } from "lucide-react";

const CATEGORIES = [
  { name: "Politics", slug: "politics" },
  { name: "Technology", slug: "technology" },
  { name: "Culture", slug: "culture" },
  { name: "Business", slug: "business" },
  { name: "Lifestyle", slug: "lifestyle" },
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, isLoading, isError } = useArticles({
    page: currentPage,
    limit: itemsPerPage,
    search: query,
    categorySlug: categoryFilter || undefined,
  });

  const articles = data?.data?.articles || [];
  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleCategoryFilter = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryFilter === slug) {
      newParams.delete("category");
    } else {
      newParams.set("category", slug);
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    if (query) newParams.set("q", query);
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    if (totalPages > 1) pages.push(totalPages);
    
    return pages;
  };

  return (
    <main role="main" className="space-y-8" aria-label="Search results">
      <SEO 
        title={query ? `Search: ${query}` : "Search Articles"} 
        description={query ? `Discover articles matching "${query}" on Bandung Journal. Find news, culture, and stories that matter.` : "Search for articles, stories, and news on Bandung Journal."}
        url={`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`}
        noindex={true}
      />

      {/* Search Header */}
      <section className="border-b-4 border-black dark:border-gray-700 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Search className="h-8 w-8 text-swiss-blue dark:text-blue-400" />
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase dark:text-white">
            Search Results
          </h1>
        </div>
        {query && (
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Showing results for: <span className="font-bold text-black dark:text-white">"{query}"</span>
          </p>
        )}
      </section>

      {/* Filters */}
      {query && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-bold uppercase text-sm tracking-widest dark:text-gray-200">
                Filter by Category
              </span>
            </div>
            {categoryFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat.slug}
                variant={categoryFilter === cat.slug ? "default" : "outline"}
                className={`cursor-pointer border-2 border-black dark:border-gray-600 rounded-none font-bold uppercase text-sm px-4 py-2 ${
                  categoryFilter === cat.slug
                    ? 'bg-swiss-blue text-white hover:bg-blue-800 dark:bg-blue-600'
                    : 'bg-white dark:bg-gray-800 text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryFilter(cat.slug)}
              >
                {cat.name}
              </Badge>
            ))}
          </div>

          <Separator className="border-gray-300" />
        </section>
      )}

      {/* Results Count */}
      {query && !isLoading && (
        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
          Found {total} {total === 1 ? 'article' : 'articles'}
          {categoryFilter && ` in ${CATEGORIES.find(c => c.slug === categoryFilter)?.name}`}
        </div>
      )}

      {/* Search Results */}
      <section>
        {!query ? (
          <div className="text-center py-16 border-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Search className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-black uppercase mb-2 dark:text-white">No Search Query</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please enter a search term to find articles.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 border-4 border-red-200 bg-red-50 text-red-600">
            <p className="font-bold mb-2 text-xl uppercase">Failed to load results.</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="border-2 border-black rounded-none"
            >
              Try Again
            </Button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 border-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Search className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-2xl font-black uppercase mb-2 dark:text-white">No Results Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try different keywords or remove filters
            </p>
            {categoryFilter && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-2 border-black rounded-none font-bold"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 pt-8 border-t-4 border-black dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  Page {currentPage} of {totalPages} • {total} total articles
                </div>
                
                <Pagination>
                  <PaginationContent className="gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={`border-2 border-black rounded-none hover:bg-swiss-blue hover:text-white hover:border-swiss-blue font-bold ${
                          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(page as number)}
                            isActive={currentPage === page}
                            className={`border-2 border-black rounded-none font-bold cursor-pointer ${
                              currentPage === page
                                ? 'bg-swiss-blue text-white border-swiss-blue'
                                : 'hover:bg-swiss-blue/10 hover:border-swiss-blue'
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={`border-2 border-black rounded-none hover:bg-swiss-blue hover:text-white hover:border-swiss-blue font-bold ${
                          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
