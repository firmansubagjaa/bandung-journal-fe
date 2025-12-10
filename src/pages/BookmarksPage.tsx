import { useBookmarks } from "../features/bookmarks/hooks/useBookmarks";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { ArticleCardSkeleton } from "@/features/articles/components/ArticleCardSkeleton";
import { SEO } from "@/components/seo/SEO";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX } from "lucide-react";
import { Link } from "react-router-dom";

export function BookmarksPage() {
  const { bookmarks, isLoading, isError, removeBookmark, isRemoving } = useBookmarks();

  // Filter out bookmarks without valid articles
  const validBookmarks = bookmarks?.filter(b => b.article) ?? [];

  if (isLoading) {
    return (
      <main role="main" className="space-y-8 px-4" aria-label="Bookmarks" aria-busy="true">
        <SEO 
          title="My Bookmarks" 
          description="Your saved articles and reading list on Bandung Journal"
          noindex={true}
        />
        
        <header className="border-b-4 border-black dark:border-gray-700 pb-6">
          <h1 
            className="font-black tracking-tighter uppercase leading-none dark:text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            My Bookmarks
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8 px-4">
        <SEO title="My Bookmarks" description="Your saved articles on Bandung Journal" />
        
        <Empty className="border-2 border-red-300 bg-red-50 dark:bg-red-900/20">
          <EmptyMedia className="border-red-300 bg-red-100 dark:bg-red-900/30 text-red-500">
            <BookmarkX />
          </EmptyMedia>
          <EmptyTitle className="text-red-600 dark:text-red-400">Failed to Load Bookmarks</EmptyTitle>
          <EmptyDescription className="text-red-500 dark:text-red-400">
            Something went wrong. Please try again.
          </EmptyDescription>
          <EmptyContent>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-none font-bold"
            >
              Try Again
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      <SEO title="My Bookmarks" description="Your saved articles on Bandung Journal" />

      {/* Header */}
      <section className="border-b-4 border-black dark:border-gray-700 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Bookmark className="h-8 w-8 md:h-12 md:w-12 text-swiss-blue" />
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none dark:text-white">
            My Bookmarks
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {validBookmarks.length} saved {validBookmarks.length === 1 ? 'article' : 'articles'}
        </p>
      </section>

      {/* Bookmarks Grid */}
      {validBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {validBookmarks.map((bookmark) => (
            <div key={bookmark.id} className="relative">
              <ArticleCard article={bookmark.article} />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 rounded-none font-bold z-10"
                onClick={() => removeBookmark(bookmark.article.slug)}
                disabled={isRemoving}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        // Empty State with Swiss style
        <Empty className="py-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
          <EmptyMedia>
            <BookmarkX />
          </EmptyMedia>
          <EmptyTitle>No Bookmarks Yet</EmptyTitle>
          <EmptyDescription>
            Start saving articles to read them later!
          </EmptyDescription>
          <EmptyContent>
            <Link to="/articles">
              <Button className="bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none px-8 py-3 border-2 border-swiss-blue hover:border-blue-800">
                Browse Articles
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
