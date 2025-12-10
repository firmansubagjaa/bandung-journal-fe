import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { UserSession } from "@/types";

interface UpdateProfileInput {
  name?: string;
}

export const profileService = {
  /**
   * Get current user profile
   * GET /users/me
   */
  getProfile: async () => {
    const response = await api.get<ApiResponse<UserSession>>('/users/me');
    return response.data;
  },

  /**
   * Alias for getProfile (backward compatibility)
   */
  getCurrentUser: async () => {
    const response = await api.get<ApiResponse<UserSession>>('/users/me');
    return response.data;
  },

  /**
   * Update user profile
   * POST /users/me/profile
   */
  updateProfile: async (data: UpdateProfileInput) => {
    const response = await api.post<ApiResponse<UserSession>>('/users/me/profile', data);
    return response.data;
  },

  /**
   * Update user avatar
   * POST /users/me/avatar
   */
  updateAvatar: async (avatarUrl: string | null) => {
    const response = await api.post<ApiResponse<UserSession>>('/users/me/avatar', { avatarUrl });
    return response.data;
  },
};
