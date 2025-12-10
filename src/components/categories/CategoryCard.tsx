import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/features/articles/types";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface CategoryCardProps {
  category: Category;
  articleCount?: number;
  latestArticles?: Article[];
}

export function CategoryCard({ category, articleCount = 0, latestArticles = [] }: CategoryCardProps) {
  // Get featured article (first one with image)
  const featuredArticle = latestArticles.find(a => a.featuredImage) || latestArticles[0];

  return (
    <Link 
      to={`/categories/${category.slug}`}
      className="group block"
    >
      <Card className="border-4 border-black dark:border-gray-700 rounded-none overflow-hidden h-full hover-lift transition-smooth">
        {/* Featured Image Section */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-swiss-blue to-blue-900">
          {featuredArticle?.featuredImage ? (
            <img
              src={featuredArticle.featuredImage}
              alt={category.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-6xl font-black opacity-20 uppercase">
                {category.name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Category Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Badge className="mb-3 bg-swiss-blue hover:bg-blue-800 border-2 border-white text-white font-bold uppercase tracking-widest rounded-none">
              {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-swiss-blue transition-colors">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Latest Headlines */}
        {latestArticles.length > 0 && (
          <div className="p-6 bg-white dark:bg-gray-800 border-t-2 border-black dark:border-gray-700">
            <div className="space-y-3">
              {latestArticles.slice(0, 3).map((article) => (
                <div 
                  key={article.id}
                  className="pb-3 border-b border-gray-200 dark:border-gray-700 last:border-none last:pb-0"
                >
                  <h4 className="font-bold text-xs sm:text-sm leading-tight line-clamp-2 group-hover:text-swiss-blue dark:group-hover:text-blue-400 transition-colors dark:text-gray-200">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>

            {/* View All Arrow */}
            <div className="mt-4 pt-4 border-t-2 border-black dark:border-gray-700 flex items-center justify-between text-swiss-blue dark:text-blue-400 font-bold uppercase text-sm group-hover:translate-x-1 transition-transform">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        )}

        {/* Empty State */}
        {latestArticles.length === 0 && (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 text-center border-t-2 border-black dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">No articles yet</p>
          </div>
        )}
      </Card>
    </Link>
  );
}
