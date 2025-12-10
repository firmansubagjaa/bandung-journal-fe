/**
 * Newspaper Feature Types
 * Type definitions for featured, breaking news, newsletter, trending
 */

// Featured Articles
export interface FeaturedArticle {
  id: string;
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    author: {
      id: string;
      name: string;
      avatarUrl: string | null;
    };
    category: {
      id: number;
      name: string;
      slug: string;
    };
    viewCount: number;
    publishedAt: string | null;
  };
  position: 'hero' | 'sidebar' | 'trending';
  displayOrder: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

// Breaking News
export interface BreakingNewsItem {
  id: string;
  headline: string;
  article: {
    id: string;
    title: string;
    slug: string;
  } | null;
  isLive: boolean;
  priority: number;
  createdAt: string;
  expiresAt: string | null;
}

// Newsletter
export interface NewsletterSubscription {
  id: string;
  email: string;
  confirmed: boolean;
  subscribedAt: string;
  confirmedAt: string | null;
}

// Trending Article (same as regular article with viewCount)
export interface TrendingArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  category: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  status: string;
  isPremium: boolean;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
}
