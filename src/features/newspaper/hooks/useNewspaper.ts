/**
 * Newspaper React Query Hooks
 * Hooks for featured, breaking news, trending, newsletter
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newspaperService } from '../services/newspaperService';

// Featured Articles Hook
export function useFeaturedArticles(position?: 'hero' | 'sidebar' | 'trending') {
  return useQuery({
    queryKey: ['featured', position],
    queryFn: () => newspaperService.getFeaturedArticles(position),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hero Article Hook
export function useHeroArticle() {
  return useQuery({
    queryKey: ['featured', 'hero'],
    queryFn: () => newspaperService.getHeroArticle(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Breaking News Hook
export function useBreakingNews() {
  return useQuery({
    queryKey: ['breaking-news'],
    queryFn: () => newspaperService.getBreakingNews(),
    staleTime: 1000 * 60 * 1, // 1 minute (more frequent updates)
    refetchInterval: 1000 * 60 * 1, // Auto-refetch every minute
  });
}

// Trending Articles Hook
export function useTrendingArticles(limit: number = 10, categoryId?: number) {
  return useQuery({
    queryKey: ['trending', limit, categoryId],
    queryFn: () => newspaperService.getTrendingArticles(limit, categoryId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Newsletter Subscription Hook
export function useNewsletterSubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => newspaperService.subscribeNewsletter(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
    },
  });
}

// Newsletter Unsubscribe Hook
export function useNewsletterUnsubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => newspaperService.unsubscribeNewsletter(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
    },
  });
}
