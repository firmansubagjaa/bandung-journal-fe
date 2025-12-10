import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Article } from "@/features/articles/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HeroCarouselProps {
  articles: Article[];
}

export function HeroCarousel({ articles }: HeroCarouselProps) {
  if (articles.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full group"
    >
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem key={article.id}>
            <Link to={`/articles/${article.slug}`} className="block group/item">
              <div className="overflow-hidden border-4 border-black rounded-none hover:shadow-2xl transition-shadow">
                {/* Featured Image */}
                <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                  {article.featuredImage ? (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-swiss-blue to-blue-900" />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    {/* Category Badge */}
                    <Badge className="mb-4 bg-swiss-blue hover:bg-blue-800 text-white font-bold uppercase tracking-widest rounded-none border-2 border-white">
                      {article.category.name}
                    </Badge>
                    
                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight mb-4 group-hover/item:text-swiss-blue transition-colors">
                      {article.title}
                    </h2>
                    
                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="text-gray-200 text-lg mb-4 line-clamp-2 max-w-3xl">
                        {article.excerpt}
                      </p>
                    )}
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                      {/* Author */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-swiss-blue flex items-center justify-center text-white font-bold text-xs border-2 border-white">
                          {article.author.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold">{article.author.name}</span>
                      </div>
                      
                      <span>•</span>
                      
                      {/* Date */}
                      <span>
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      
                      {/* Reading Time */}
                      {article.content && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{Math.ceil(article.content.split(/\s+/).length / 200)} min read</span>
                          </div>
                        </>
                      )}
                      
                      {/* View Count */}
                      {article.viewCount !== undefined && article.viewCount > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.viewCount} views</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Carousel Navigation - Show on Hover */}
      <CarouselPrevious className="left-4 border-2 border-white bg-white/90 hover:bg-swiss-blue hover:text-white rounded-none w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <ChevronLeft className="h-6 w-6" />
      </CarouselPrevious>
      <CarouselNext className="right-4 border-2 border-white bg-white/90 hover:bg-swiss-blue hover:text-white rounded-none w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <ChevronRight className="h-6 w-6" />
      </CarouselNext>
    </Carousel>
  );
}
