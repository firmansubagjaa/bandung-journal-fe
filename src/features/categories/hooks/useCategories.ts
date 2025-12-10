import { useQuery } from '@tanstack/react-query';
import { categoryService, Category, CategoryWithArticles } from '../services/categoryService';

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes - categories don't change often
  });
}

/**
 * Hook to fetch category by slug
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}

// Export types
export type { Category, CategoryWithArticles };
