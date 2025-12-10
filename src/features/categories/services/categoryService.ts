import api from "@/lib/axios";
import { ApiResponse } from "@/types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: {
    articles: number;
  };
}

export interface CategoryWithArticles extends Category {
  articles?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: string;
    publishedAt: string;
  }[];
}

export const categoryService = {
  /**
   * Get all categories
   * GET /categories
   */
  getCategories: async () => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  },

  /**
   * Get category by slug with articles
   * GET /categories/:slug
   */
  getCategoryBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<CategoryWithArticles>>(`/categories/${slug}`);
    return response.data;
  },
};
