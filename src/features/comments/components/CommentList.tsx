import { useComments } from "../hooks/useComments";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CommentSkeleton } from "./CommentSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/typography";
import { Comment } from "@/features/comments/types";

interface CommentListProps {
  articleId: string;
}

export function CommentList({ articleId }: CommentListProps) {
  const { comments, isLoading, deleteComment, isDeleting } = useComments(articleId);
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SectionHeading className="border-none mb-6 dark:text-white">Comments</SectionHeading>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    );
  }

  const commentList = comments?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6 text-swiss-blue dark:text-blue-400" />
        <SectionHeading className="border-none mb-0 dark:text-white">
          Comments
        </SectionHeading>
        <span className="bg-swiss-blue dark:bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded-full">
          {commentList.length}
        </span>
      </div>

      <div className="space-y-4">
        {commentList.length === 0 ? (
          <div className="text-center py-12 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 italic">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          commentList.map((comment: Comment) => (
            <div 
              key={comment.id} 
              className="flex gap-3 sm:gap-4 p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group hover:border-swiss-blue dark:hover:border-blue-600 transition-colors"
            >
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-gray-200 dark:border-gray-600 shrink-0">
                <AvatarImage src={comment.author?.avatar} />
                <AvatarFallback className="bg-swiss-blue dark:bg-blue-600 text-white font-bold">
                  {comment.author?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="grow min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm dark:text-gray-200">
                      {comment.author?.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {(user?.id === comment.authorId || user?.role === 'admin') && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 sm:h-8 sm:w-8 text-gray-400 hover:text-red-600 dark:hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" 
                      onClick={() => deleteComment(comment.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
