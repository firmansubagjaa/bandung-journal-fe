import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Tag } from "@/features/articles/types";

export interface TagWithArticles extends Tag {
  _count?: {
    articles: number;
  };
  articles?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: string;
    publishedAt: string;
  }[];
}

export const tagService = {
  /**
   * Get all tags
   * GET /tags
   */
  getTags: async () => {
    const response = await api.get<ApiResponse<Tag[]>>('/tags');
    return response.data;
  },

  /**
   * Get tag by slug with articles
   * GET /tags/:slug
   */
  getTagBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<TagWithArticles>>(`/tags/${slug}`);
    return response.data;
  },
};
