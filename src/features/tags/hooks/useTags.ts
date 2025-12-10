import { useQuery } from '@tanstack/react-query';
import { tagService, TagWithArticles } from '../services/tagService';
import { Tag } from '@/features/articles/types';

/**
 * Hook to fetch all tags
 */
export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => tagService.getTags(),
    staleTime: 5 * 60 * 1000, // 5 minutes - tags don't change often
  });
}

/**
 * Hook to fetch tag by slug
 */
export function useTag(slug: string) {
  return useQuery({
    queryKey: ['tag', slug],
    queryFn: () => tagService.getTagBySlug(slug),
    enabled: !!slug,
  });
}

// Export types
export type { Tag, TagWithArticles };
