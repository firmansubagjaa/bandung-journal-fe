import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService, UpdateProfileInput } from "../services/profileService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileInput) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['auth-user'] }); // Also update auth context if needed
      toast.success("Profile updated successfully");
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  };
}
