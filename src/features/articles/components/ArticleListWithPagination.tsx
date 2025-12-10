import { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "./ArticleCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ArticleListWithPaginationProps {
  categorySlug?: string;
  itemsPerPage?: number;
  className?: string;
}

export function ArticleListWithPagination({ 
  categorySlug, 
  itemsPerPage = 9,
  className 
}: ArticleListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, isError } = useArticles({ 
    page: currentPage, 
    limit: itemsPerPage, 
    categorySlug 
  });

  const articles = data?.data?.articles || [];
  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first page
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('ellipsis');
    }
    
    // Show pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ${className}`}>
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 border-4 border-red-200 bg-red-50 text-red-600">
        <p className="font-bold mb-2 text-xl uppercase">Failed to load articles.</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="border-2 border-black rounded-none"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center py-12 border-4 border-gray-200 bg-gray-50 text-gray-500">
        <p className="text-xl font-bold uppercase">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Articles Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ${className}`}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-8 border-t-4 border-black">
          <div className="text-sm text-gray-600 font-semibold">
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
  );
}
