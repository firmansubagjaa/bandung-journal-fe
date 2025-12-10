export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserSession {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  name: string;
  avatar?: string;
  bio?: string;
  username?: string;
}
