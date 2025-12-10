import api from "@/lib/axios";
import { Author, AuthorStats } from "../types";
import { ApiResponse } from "@/types/api";
import { Article } from "@/features/articles/types";

export const authorService = {
  // Get all authors (for listing)
  getAuthors: async (params?: { page?: number; limit?: number }): Promise<ApiResponse<{ authors: Author[]; total: number }>> => {
    const response = await api.get("/authors", { params });
    return response.data;
  },

  // Get single author by ID
  getAuthorById: async (id: string): Promise<ApiResponse<Author>> => {
    const response = await api.get(`/authors/${id}`);
    return response.data;
  },

  // Get author stats
  getAuthorStats: async (id: string): Promise<ApiResponse<AuthorStats>> => {
    const response = await api.get(`/authors/${id}/stats`);
    return response.data;
  },

  // Get articles by author
  getAuthorArticles: async (
    id: string,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<{ articles: Article[]; total: number }>> => {
    const response = await api.get(`/authors/${id}/articles`, { params });
    return response.data;
  },
};
