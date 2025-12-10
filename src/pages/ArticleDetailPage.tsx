import { useParams, Link } from "react-router-dom";
import { useArticle } from "@/features/articles/hooks/useArticles";
import { ArticleDetail } from "@/features/articles/components/ArticleDetail";
import { ArticleDetailSkeleton } from "@/features/articles/components/ArticleDetailSkeleton";
import { RelatedArticles } from "@/features/articles/components/RelatedArticles";
import { CommentList } from "@/features/comments/components/CommentList";
import { CommentForm } from "@/features/comments/components/CommentForm";
import { Button } from "@/components/ui/button";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { ShareButtons } from "@/components/article/ShareButtons";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { FileQuestion } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useArticle(slug || "");

  if (isLoading) {
    return (
      <main role="main" aria-busy="true" aria-label="Loading article">
        <ArticleDetailSkeleton />
      </main>
    );
  }

  if (isError || !article) {
    return (
      <main role="main" className="max-w-4xl mx-auto py-16 px-4">
        <SEO 
          title="Article Not Found" 
          description="Sorry, we couldn't find the article you're looking for."
          noindex={true}
        />
        <Empty className="py-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
          <EmptyMedia>
            <FileQuestion />
          </EmptyMedia>
          <EmptyTitle>Article Not Found</EmptyTitle>
          <EmptyDescription>
            Oops! The story you're looking for seems to have wandered off. 
            It may have been moved, deleted, or perhaps it never existed.
          </EmptyDescription>
          <EmptyContent>
            <Link to="/">
              <Button className="bg-swiss-blue hover:bg-blue-800 text-white rounded-none font-bold px-8 py-3 min-h-[48px]">
                Back to Home
              </Button>
            </Link>
            <Link to="/articles">
              <Button variant="outline" className="rounded-none font-bold border-2 border-black dark:border-gray-600 px-8 py-3 min-h-[48px]">
                Browse All Articles
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      </main>
    );
  }

  const articleData = article.data;
  const articleUrl = `/articles/${articleData.slug}`;

  return (
    <>
      <SEO 
        title={articleData.title} 
        description={articleData.excerpt || `Read "${articleData.title}" on Bandung Journal.`}
        image={articleData.featuredImage || undefined}
        url={articleUrl}
        type="article"
        keywords={articleData.tags?.map(tag => tag.name).join(', ')}
        article={{
          publishedTime: articleData.createdAt,
          modifiedTime: articleData.updatedAt,
          author: articleData.author?.name,
          authorUrl: articleData.author?.id ? `/authors/${articleData.author.id}` : undefined,
          tags: articleData.tags?.map(tag => tag.name),
          section: articleData.category?.name,
        }}
      />
      
      <ReadingProgressBar />
      
      <main role="main" className="max-w-4xl mx-auto pb-24">
        {/* Article Content */}
        <article 
          itemScope 
          itemType="https://schema.org/Article"
          aria-label={`Article: ${articleData.title}`}
        >
          <ArticleDetail article={articleData} />
          
          {/* Hidden structured data helpers */}
          <meta itemProp="headline" content={articleData.title} />
          <meta itemProp="description" content={articleData.excerpt || ''} />
          {articleData.featuredImage && (
            <meta itemProp="image" content={articleData.featuredImage} />
          )}
        </article>
        
        {/* Share Section */}
        <section 
          aria-label="Share this article"
          className="flex justify-center my-8 pt-8 border-t-2 border-gray-300 dark:border-gray-700"
        >
          <ShareButtons 
            url={`${window.location.origin}${articleUrl}`}
            title={articleData.title}
            description={articleData.excerpt || ''}
          />
        </section>
      
        {/* Related Articles */}
        <section aria-label="Related articles">
          <RelatedArticles 
            categorySlug={articleData.category?.slug || ''} 
            currentArticleId={articleData.id}
            limit={3}
          />
        </section>
      
        {/* Comment Section */}
        <section 
          aria-label="Comments"
          className="mt-16 pt-12 border-t-4 border-black dark:border-gray-700"
        >
          <div className="max-w-prose mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-8 dark:text-white">
              Join the Conversation
            </h2>
            <CommentForm articleId={articleData.id} />
            <CommentList articleId={articleData.id} />
          </div>
        </section>
      </main>
    </>
  );
}
