import { useQuery } from "@tanstack/react-query";
import { articleService } from "../services/articleService";

export function useArticles(params?: { page?: number; limit?: number; categoryId?: string; categorySlug?: string; search?: string }) {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => articleService.getArticles(params),
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articleService.getArticleBySlug(slug),
    enabled: !!slug,
  });
}
