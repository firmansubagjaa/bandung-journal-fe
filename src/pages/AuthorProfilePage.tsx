import { useParams, Link } from "react-router-dom";
import { useAuthor, useAuthorArticles, useAuthorStats } from "@/features/authors/hooks/useAuthor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { ArticleCardSkeleton } from "@/features/articles/components/ArticleCardSkeleton";
import { SEO } from "@/components/seo/SEO";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Mail, Twitter, Linkedin, Globe, Calendar, FileText, Eye, MessageSquare, UserX, ArrowLeft } from "lucide-react";

export function AuthorProfilePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: authorData, isLoading: authorLoading } = useAuthor(id!);
  const { data: statsData } = useAuthorStats(id!);
  const { data: articlesData, isLoading: articlesLoading } = useAuthorArticles(id!, { limit: 12 });

  const author = authorData?.data;
  const stats = statsData?.data;
  const articles = articlesData?.data?.articles || [];

  if (authorLoading) {
    return (
      <main role="main" className="max-w-6xl mx-auto py-8 md:py-12 px-4" aria-busy="true" aria-label="Loading author profile">
        <div className="animate-pulse space-y-6 md:space-y-8">
          <div className="h-40 md:h-48 bg-gray-200 dark:bg-gray-800 border-4 border-black dark:border-gray-700" />
          <div className="h-48 md:h-64 bg-gray-200 dark:bg-gray-800 border-4 border-black dark:border-gray-700" />
        </div>
      </main>
    );
  }

  if (!author) {
    return (
      <main role="main" className="max-w-4xl mx-auto py-12 px-4" aria-label="Author not found">
        <SEO title="Author Not Found" noindex={true} />
        <Empty className="py-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
          <EmptyMedia>
            <UserX />
          </EmptyMedia>
          <EmptyTitle>Author Not Found</EmptyTitle>
          <EmptyDescription>
            The author you're looking for doesn't exist or has been removed.
          </EmptyDescription>
          <EmptyContent>
            <Link to="/">
              <Button className="bg-swiss-blue hover:bg-blue-800 text-white rounded-none font-bold px-8 py-3 min-h-[48px]">
                Back to Home
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      </main>
    );
  }

  return (
    <main 
      role="main" 
      className="max-w-6xl mx-auto py-8 md:py-12 px-4 space-y-8 md:space-y-12"
      aria-label={`${author.name}'s profile`}
    >
      <SEO 
        title={author.name} 
        description={author.bio || `Read articles by ${author.name} on Bandung Journal.`}
        url={`/authors/${id}`}
        type="profile"
        image={author.avatar}
      />

      {/* Back Button */}
      <Link to="/">
        <Button 
          variant="ghost" 
          className="pl-0 hover:bg-transparent hover:text-swiss-blue dark:text-gray-300 dark:hover:text-swiss-blue focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Articles
        </Button>
      </Link>

      {/* Author Header */}
      <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
        <CardContent className="p-5 md:p-8">
          <div className="flex flex-col md:flex-row gap-5 md:gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-black dark:border-gray-600 rounded-none">
                <AvatarImage src={author.avatar} alt={`${author.name}'s avatar`} />
                <AvatarFallback 
                  className="bg-swiss-blue text-white font-black rounded-none"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                >
                  {author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
              <div>
                <h1 
                  className="font-black uppercase tracking-tighter mb-2 dark:text-white"
                  style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
                >
                  {author.name}
                </h1>
                {author.role && (
                  <Badge className="bg-swiss-blue text-white border-2 border-black dark:border-gray-600 rounded-none font-bold uppercase">
                    {author.role}
                  </Badge>
                )}
              </div>

              {author.bio && (
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {author.bio}
                </p>
              )}

              {/* Contact Links */}
              <nav aria-label="Author social links" className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                {author.email && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-black dark:border-gray-600 rounded-none font-bold min-h-[40px] dark:text-gray-200"
                    asChild
                  >
                    <a href={`mailto:${author.email}`}>
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                      Email
                    </a>
                  </Button>
                )}
                {author.socialLinks?.twitter && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-black dark:border-gray-600 rounded-none font-bold min-h-[40px] dark:text-gray-200"
                    asChild
                  >
                    <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-2 h-4 w-4" aria-hidden="true" />
                      Twitter
                    </a>
                  </Button>
                )}
                {author.socialLinks?.linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-black dark:border-gray-600 rounded-none font-bold min-h-[40px] dark:text-gray-200"
                    asChild
                  >
                    <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {author.socialLinks?.website && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-black dark:border-gray-600 rounded-none font-bold min-h-[40px] dark:text-gray-200"
                    asChild
                  >
                    <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                      Website
                    </a>
                  </Button>
                )}
              </nav>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {stats && (
        <section aria-label="Author statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
              <CardHeader className="pb-2 md:pb-3">
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-swiss-blue" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-black mb-1 dark:text-white">{stats.totalArticles}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Articles</div>
              </CardContent>
            </Card>

            <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
              <CardHeader className="pb-2 md:pb-3">
                <Eye className="h-6 w-6 md:h-8 md:w-8 text-swiss-blue" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-black mb-1 dark:text-white">{stats.totalViews.toLocaleString()}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Total Views</div>
              </CardContent>
            </Card>

            <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
              <CardHeader className="pb-2 md:pb-3">
                <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-swiss-blue" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-black mb-1 dark:text-white">{stats.totalComments}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Comments</div>
              </CardContent>
            </Card>

            <Card className="border-4 border-black dark:border-gray-700 rounded-none bg-white dark:bg-gray-900">
              <CardHeader className="pb-2 md:pb-3">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-swiss-blue" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-xl font-black mb-1 dark:text-white">
                  {new Date(stats.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Joined</div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Articles */}
      <section aria-labelledby="articles-heading">
        <h2 
          id="articles-heading"
          className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 md:mb-8 border-b-4 border-black dark:border-gray-700 pb-4 dark:text-white"
        >
          Articles by {author.name}
        </h2>

        {articlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <Card className="border-4 border-gray-200 dark:border-gray-700 rounded-none bg-gray-50 dark:bg-gray-800/50">
            <CardContent className="p-8 md:p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" aria-hidden="true" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">No articles published yet</p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
