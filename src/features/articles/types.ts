export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string; // Lead paragraph (Swiss Style)
  content: string;
  featuredImage?: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
  viewCount?: number;
  createdAt: string;
  publishedAt?: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  tagIds?: string[];
  featuredImage?: string;
}
