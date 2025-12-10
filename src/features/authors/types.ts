export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  role?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  articlesCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Author stats for profile page
export interface AuthorStats {
  totalArticles: number;
  totalViews: number;
  totalComments: number;
  joinedDate: string;
}
