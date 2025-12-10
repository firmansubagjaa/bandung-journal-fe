import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useArticles } from "@/features/articles/hooks/useArticles";

export function TrendingWidget() {
  // Fetch top articles (we'll sort by viewCount, or just show latest for now)
  const { data: articlesData, isLoading } = useArticles({ limit: 5 });
  
  const trendingArticles = articlesData?.data?.articles || [];

  return (
    <Card className="border-4 border-black dark:border-gray-700 rounded-none sticky top-24 self-start dark:bg-gray-900">
      <CardHeader className="border-b-2 border-black dark:border-gray-700">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black uppercase tracking-tight dark:text-white">
          <TrendingUp className="h-5 w-5 text-swiss-blue" />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : trendingArticles.length > 0 ? (
          <ol className="divide-y-2 divide-gray-200 dark:divide-gray-700">
            {trendingArticles.map((article, index) => (
              <li key={article.id}>
                <Link
                  to={`/articles/${article.slug}`}
                  className="block p-4 hover:bg-swiss-blue/5 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex gap-4">
                    {/* Number */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-swiss-blue text-white flex items-center justify-center font-black text-sm">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-swiss-blue dark:group-hover:text-blue-400 transition-colors dark:text-gray-200">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {article.category.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            No trending articles yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
