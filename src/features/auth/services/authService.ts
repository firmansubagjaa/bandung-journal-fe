import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { 
  LoginInput, 
  RegisterInput, 
  VerifyEmailInput, 
  AuthResponse, 
  RegisterResponse 
} from "../types";

export const authService = {
  login: async (data: LoginInput) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterInput) => {
    const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', data);
    return response.data;
  },

  verifyEmail: async (data: VerifyEmailInput) => {
    const response = await api.post<ApiResponse<null>>('/auth/verify-email', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<ApiResponse<AuthResponse['user']>>('/users/me');
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post<ApiResponse<null>>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (email: string, code: string, newPassword: string) => {
    const response = await api.post<ApiResponse<null>>('/auth/reset-password', {
      email,
      code,
      newPassword
    });
    return response.data;
  },

  resendVerificationOtp: async (email: string) => {
    const response = await api.post<ApiResponse<{ userId: string }>>('/auth/resend-verification', { email });
    return response.data;
  },

  resendResetOtp: async (email: string) => {
    const response = await api.post<ApiResponse<null>>('/auth/resend-reset-code', { email });
    return response.data;
  },
};
