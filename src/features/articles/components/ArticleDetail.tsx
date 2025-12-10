import { Article } from "@/features/articles/types";
import { ArticleTitle, LeadText, SectionHeading } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ShareButtons } from "@/components/ui/share-buttons";
import { AuthorCard } from "@/components/ui/author-card";
import { ViewCount } from "@/components/ui/view-count";
import { ReadingTime } from "@/components/ui/reading-time";
import { Link } from "react-router-dom";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <article className="max-w-4xl mx-auto dark:bg-gray-900">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6 sm:mb-8 px-4 sm:px-6">
        <BreadcrumbList className="text-xs sm:text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/categories/${article.category.slug}`}>
                {article.category.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section - With better spacing */}
      <header className="mb-12 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Category and Metadata */}
        <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="bg-swiss-blue dark:bg-blue-600 text-white px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-blue-800 dark:hover:bg-blue-700 rounded-none">
            {article.category.name}
          </Badge>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <ReadingTime content={article.content} />
          <ViewCount count={article.viewCount || 0} />
        </div>
        
        <ArticleTitle className="mb-8 dark:text-white">{article.title}</ArticleTitle>
        
        {article.excerpt && (
          <LeadText className="max-w-2xl text-gray-700 dark:text-gray-300">
            {article.excerpt}
          </LeadText>
        )}
        
        {/* Share Buttons */}
        <div className="mt-6 sm:mt-8">
          <ShareButtons 
            url={currentUrl}
            title={article.title}
            description={article.excerpt || ''}
          />
        </div>
      </header>

      {/* Featured Image - With spacing */}
      {article.featuredImage && (
        <figure className="mb-12 max-w-4xl mx-auto px-4 sm:px-6">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            loading="lazy" 
            className="w-full h-auto object-cover border-4 border-black dark:border-gray-700"
          />
          <figcaption className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic">
            {article.title}
          </figcaption>
        </figure>
      )}

      {/* Article Content - Optimized Typography with spacing */}
      <div className="
        article-content
        text-lg
        leading-relaxed
        text-gray-800
        dark:text-gray-200
        max-w-prose
        mx-auto
        px-4
        sm:px-6
        
        [&>p]:mb-6
        [&>p]:text-left
        [&>p]:tracking-[0.01em]
        dark:[&>p]:text-gray-300
        
        [&>h2]:text-3xl
        [&>h2]:font-bold
        [&>h2]:mt-12
        [&>h2]:mb-6
        [&>h2]:text-black
        dark:[&>h2]:text-white
        [&>h2]:tracking-tight
        
        [&>h3]:text-2xl
        [&>h3]:font-bold
        [&>h3]:mt-10
        [&>h3]:mb-4
        [&>h3]:text-black
        dark:[&>h3]:text-white
        
        [&>ul]:mb-6
        [&>ul]:ml-6
        [&>ul]:list-disc
        [&>ul>li]:mb-2
        [&>ul>li]:leading-relaxed
        dark:[&>ul>li]:text-gray-300
        
        [&>ol]:mb-6
        [&>ol]:ml-6
        [&>ol]:list-decimal
        [&>ol>li]:mb-2
        [&>ol>li]:leading-relaxed
        dark:[&>ol>li]:text-gray-300
        
        [&>blockquote]:my-8
        [&>blockquote]:pl-6
        [&>blockquote]:border-l-4
        [&>blockquote]:border-swiss-blue
        [&>blockquote]:italic
        [&>blockquote]:text-gray-700
        dark:[&>blockquote]:text-gray-300
        dark:[&>blockquote]:border-blue-400
        
        [&>a]:text-swiss-blue
        dark:[&>a]:text-blue-400
        [&>a]:underline
        [&>a]:decoration-2
        [&>a]:underline-offset-2
        hover:[&>a]:text-blue-800
        dark:hover:[&>a]:text-blue-300
        
        [&>strong]:font-bold
        [&>strong]:text-black
        dark:[&>strong]:text-white
        
        [&>em]:italic
        
        [&>code]:bg-gray-100
        dark:[&>code]:bg-gray-800
        [&>code]:px-1.5
        [&>code]:py-0.5
        [&>code]:rounded
        [&>code]:text-sm
        [&>code]:font-mono
        dark:[&>code]:text-gray-200
        
        [&>pre]:bg-gray-900
        dark:[&>pre]:bg-gray-950
        [&>pre]:text-gray-100
        [&>pre]:p-4
        [&>pre]:rounded-none
        [&>pre]:overflow-x-auto
        [&>pre]:my-6
        [&>pre]:border-2
        [&>pre]:border-black
        dark:[&>pre]:border-gray-700
      ">
        {/* 
          In a real app, we would use a markdown parser or HTML sanitizer here.
          For now, we'll just display the content string. 
        */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      
      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <>
          <Separator className="my-12" />
          <div className="max-w-prose mx-auto px-4 sm:px-6">
            <SectionHeading className="border-none mb-4 dark:text-white">Tags</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Link 
                  key={tag.id} 
                  to={`/tags/${tag.slug}`}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-swiss-blue hover:text-white dark:hover:bg-blue-600 px-3 py-1 text-sm font-bold uppercase transition-colors dark:text-gray-300"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Author Card */}
      <Separator className="my-12" />
      <div className="max-w-prose mx-auto px-4 sm:px-6">
        <AuthorCard author={article.author} variant="full" />
      </div>
    </article>
  );
}
