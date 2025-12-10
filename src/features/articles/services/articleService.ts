import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Article } from "../types";

interface GetArticlesParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  categorySlug?: string;
  search?: string;
}

interface ArticlesResponse {
  articles: Article[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const articleService = {
  getArticles: async (params?: GetArticlesParams) => {
    const response = await api.get<ApiResponse<ArticlesResponse>>('/articles', { params });
    return response.data;
  },

  getArticleBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<Article>>(`/articles/${slug}`);
    return response.data;
  },
  
  // Add more methods as needed (create, update, delete)
};
