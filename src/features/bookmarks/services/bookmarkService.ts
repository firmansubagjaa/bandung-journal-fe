import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Article } from "@/features/articles/types";

interface Bookmark {
  id: string;
  articleId: string;
  userId: string;
  createdAt: string;
  article: Article;
}

export const bookmarkService = {
  /**
   * Get user's bookmarks
   * GET /users/me/bookmarks
   */
  getBookmarks: async (): Promise<ApiResponse<Bookmark[]>> => {
    const response = await api.get<ApiResponse<Bookmark[]>>('/users/me/bookmarks');
    return response.data;
  },

  /**
   * Add bookmark by article slug
   * POST /articles/:slug/bookmark
   */
  addBookmark: async (slug: string): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>(`/articles/${slug}/bookmark`);
    return response.data;
  },

  /**
   * Remove bookmark by article slug
   * DELETE /articles/:slug/bookmark
   */
  removeBookmark: async (slug: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/articles/${slug}/bookmark`);
    return response.data;
  },

  /**
   * Check if article is bookmarked by slug
   */
  isBookmarked: async (slug: string): Promise<boolean> => {
    try {
      const result = await bookmarkService.getBookmarks();
      return result.data?.some(b => b.article?.slug === slug) ?? false;
    } catch {
      return false;
    }
  },
};
