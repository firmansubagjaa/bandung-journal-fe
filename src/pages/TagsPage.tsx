import { SEO } from "@/components/seo/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tag, TrendingUp } from "lucide-react";

// Mock popular tags data
const POPULAR_TAGS = [
  { name: "Politics", slug: "politics", count: 156 },
  { name: "Technology", slug: "technology", count: 134 },
  { name: "Culture", slug: "culture", count: 98 },
  { name: "Business", slug: "business", count: 87 },
  { name: "Innovation", slug: "innovation", count: 76 },
  { name: "Society", slug: "society", count: 65 },
  { name: "Environment", slug: "environment", count: 54 },
  { name: "Health", slug: "health", count: 48 },
  { name: "Education", slug: "education", count: 42 },
  { name: "Sports", slug: "sports", count: 38 },
  { name: "Entertainment", slug: "entertainment", count: 35 },
  { name: "Science", slug: "science", count: 32 },
  { name: "Travel", slug: "travel", count: 28 },
  { name: "Food", slug: "food", count: 25 },
  { name: "Fashion", slug: "fashion", count: 22 },
  { name: "Opinion", slug: "opinion", count: 20 },
];

export function TagsPage() {
  return (
    <main 
      role="main" 
      className="max-w-6xl mx-auto py-8 md:py-12 px-4 space-y-8 md:space-y-12"
      aria-label="Browse tags"
    >
      <SEO 
        title="Browse Tags" 
        description="Explore articles by popular tags on Bandung Journal. Find stories about politics, technology, culture, and more."
        url="/tags"
        keywords="tags, topics, politics, technology, culture, business, lifestyle"
      />

      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-700 pb-6 md:pb-8">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <Tag className="h-6 w-6 md:h-8 md:w-8 text-swiss-blue" aria-hidden="true" />
          <h1 
            className="font-black tracking-tighter uppercase dark:text-white"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
          >
            Tags
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Discover articles by topic
        </p>
      </header>

      {/* Trending Tags */}
      <section aria-labelledby="trending-heading">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <TrendingUp className="h-5 w-5 text-swiss-blue" aria-hidden="true" />
          <h2 
            id="trending-heading"
            className="text-xl md:text-2xl font-black uppercase tracking-tight dark:text-white"
          >
            Trending Tags
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {POPULAR_TAGS.slice(0, 8).map((tag) => (
            <Link key={tag.slug} to={`/tags/${tag.slug}`}>
              <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] transition-all duration-300 hover:-translate-y-1 group h-full">
                <CardContent className="p-4 md:p-6 text-center">
                  <Tag className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-swiss-blue group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-black uppercase text-base md:text-lg mb-2 group-hover:text-swiss-blue transition-colors dark:text-white">
                    #{tag.name}
                  </h3>
                  <Badge variant="outline" className="border-2 border-black dark:border-gray-600 rounded-none font-bold text-xs dark:text-gray-200">
                    {tag.count} articles
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* All Tags Cloud */}
      <section aria-labelledby="all-tags-heading">
        <h2 
          id="all-tags-heading"
          className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 md:mb-6 dark:text-white"
        >
          All Tags
        </h2>
        
        <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
          <CardContent className="p-5 md:p-8">
            <nav aria-label="Tag cloud">
              <ul className="flex flex-wrap gap-2 md:gap-3 list-none">
                {POPULAR_TAGS.map((tag) => (
                  <li key={tag.slug}>
                    <Link to={`/tags/${tag.slug}`}>
                      <Badge 
                        variant="outline"
                        className="border-2 border-black dark:border-gray-600 rounded-none hover:bg-swiss-blue hover:text-white hover:border-swiss-blue transition-all px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer dark:text-gray-200"
                      >
                        #{tag.name}
                        <span className="ml-1 md:ml-2 text-xs opacity-70">{tag.count}</span>
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
      </section>

      {/* Info Note */}
      <Card className="border-4 border-swiss-blue dark:border-blue-600 rounded-none bg-swiss-blue/5 dark:bg-blue-900/20">
        <CardContent className="p-4 md:p-6 text-center">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            <strong className="font-black">Note:</strong> Tag filtering will be fully functional once backend tag support is implemented.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
