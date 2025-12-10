import { useQuery } from "@tanstack/react-query";
import { authorService } from "../services/authorService";

export function useAuthor(id: string) {
  return useQuery({
    queryKey: ["author", id],
    queryFn: () => authorService.getAuthorById(id),
    enabled: !!id,
  });
}

export function useAuthors(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["authors", params],
    queryFn: () => authorService.getAuthors(params),
  });
}

export function useAuthorStats(id: string) {
  return useQuery({
    queryKey: ["author-stats", id],
    queryFn: () => authorService.getAuthorStats(id),
    enabled: !!id,
  });
}

export function useAuthorArticles(id: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["author-articles", id, params],
    queryFn: () => authorService.getAuthorArticles(id, params),
    enabled: !!id,
  });
}
