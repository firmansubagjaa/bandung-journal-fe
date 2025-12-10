import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkService } from "../services/bookmarkService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export function useBookmarks() {
  const queryClient = useQueryClient();

  const bookmarksQuery = useQuery({
    queryKey: ['bookmarks'],
    queryFn: bookmarkService.getBookmarks,
  });

  const addBookmarkMutation = useMutation({
    mutationFn: (slug: string) => bookmarkService.addBookmark(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success("Article bookmarked");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const message = error.response?.data?.message || "Failed to bookmark article";
      toast.error(message);
    },
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: (slug: string) => bookmarkService.removeBookmark(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      toast.success("Bookmark removed");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const message = error.response?.data?.message || "Failed to remove bookmark";
      toast.error(message);
    },
  });

  return {
    bookmarks: bookmarksQuery.data?.data || [],
    isLoading: bookmarksQuery.isLoading,
    isError: bookmarksQuery.isError,
    addBookmark: addBookmarkMutation.mutateAsync,
    removeBookmark: removeBookmarkMutation.mutateAsync,
    isAdding: addBookmarkMutation.isPending,
    isRemoving: removeBookmarkMutation.isPending,
  };
}
