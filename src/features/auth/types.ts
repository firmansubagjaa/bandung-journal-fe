import { UserSession } from "@/types";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmailInput {
  userId: string;
  code: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserSession;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  otpExpiresIn: number;
  otpExpiresAt: string;
}
