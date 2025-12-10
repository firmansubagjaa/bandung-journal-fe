/**
 * Newspaper Services
 * API calls for featured, breaking news, newsletter, trending
 */

import api from '@/lib/axios';
import { ApiResponse } from '@/types';
import type {
  FeaturedArticle,
  BreakingNewsItem,
  NewsletterSubscription,
  TrendingArticle,
} from '../types';

export const newspaperService = {
  // Featured Articles
  getFeaturedArticles: async (position?: 'hero' | 'sidebar' | 'trending') => {
    const params = position ? { position } : {};
    const response = await api.get<ApiResponse<FeaturedArticle[]>>('/featured', { params });
    return response.data;
  },

  getHeroArticle: async () => {
    const response = await api.get<ApiResponse<FeaturedArticle | null>>('/featured/hero');
    return response.data;
  },

  // Breaking News
  getBreakingNews: async () => {
    const response = await api.get<ApiResponse<BreakingNewsItem[]>>('/breaking-news');
    return response.data;
  },

  // Trending Articles
  getTrendingArticles: async (limit: number = 10, categoryId?: number) => {
    const params: Record<string, string> = { limit: String(limit) };
    if (categoryId) params.categoryId = String(categoryId);
    const response = await api.get<ApiResponse<TrendingArticle[]>>('/trending', { params });
    return response.data;
  },

  // Newsletter
  subscribeNewsletter: async (email: string) => {
    const response = await api.post<ApiResponse<NewsletterSubscription>>(
      '/newsletter/subscribe',
      { email }
    );
    return response.data;
  },

  unsubscribeNewsletter: async (email: string) => {
    const response = await api.post<ApiResponse<null>>('/newsletter/unsubscribe', { email });
    return response.data;
  },
};
