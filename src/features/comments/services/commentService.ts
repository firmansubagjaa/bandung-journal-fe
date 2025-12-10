import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { Comment, CreateCommentInput } from "../types";

export const commentService = {
  /**
   * Get comments for an article
   * GET /articles/:slug/comments
   */
  getCommentsBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<Comment[]>>(`/articles/${slug}/comments`);
    return response.data;
  },

  /**
   * Create a new comment
   * POST /articles/:slug/comments
   */
  createComment: async (slug: string, content: string, parentId?: string) => {
    const response = await api.post<ApiResponse<Comment>>(`/articles/${slug}/comments`, {
      content,
      parentId, // For nested replies
    });
    return response.data;
  },

  /**
   * Update a comment
   * PATCH /comments/:commentId
   */
  updateComment: async (commentId: string, content: string) => {
    const response = await api.patch<ApiResponse<Comment>>(`/comments/${commentId}`, {
      content,
    });
    return response.data;
  },

  /**
   * Delete a comment
   * DELETE /comments/:commentId
   */
  deleteComment: async (commentId: string) => {
    const response = await api.delete<ApiResponse<null>>(`/comments/${commentId}`);
    return response.data;
  },
};
