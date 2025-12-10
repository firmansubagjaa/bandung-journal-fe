import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentService } from "../services/commentService";
import { CreateCommentInput } from "../types";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export function useComments(articleId: string) {
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => commentService.getCommentsByArticleId(articleId),
    enabled: !!articleId,
  });

  const createCommentMutation = useMutation({
    mutationFn: (data: CreateCommentInput) => commentService.createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      toast.success("Comment posted successfully");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const message = error.response?.data?.message || "Failed to post comment";
      toast.error(message);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      toast.success("Comment deleted");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const message = error.response?.data?.message || "Failed to delete comment";
      toast.error(message);
    },
  });

  return {
    comments: commentsQuery.data,
    isLoading: commentsQuery.isLoading,
    isError: commentsQuery.isError,
    createComment: createCommentMutation.mutateAsync,
    isCreating: createCommentMutation.isPending,
    deleteComment: deleteCommentMutation.mutateAsync,
    isDeleting: deleteCommentMutation.isPending,
  };
}
