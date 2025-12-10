import { UserSession } from "@/types";

export interface Comment {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  author: UserSession;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentInput {
  articleId: string;
  content: string;
}
