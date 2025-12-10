import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useComments } from "../hooks/useComments";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(500, "Comment is too long"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  articleId: string;
}

export function CommentForm({ articleId }: CommentFormProps) {
  const { createComment, isCreating } = useComments(articleId);
  const { isAuthenticated } = useAuth();
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  // Reset submit status after a few seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  async function onSubmit(data: CommentFormValues) {
    try {
      setSubmitStatus('idle');
      await createComment({
        articleId,
        content: data.content,
      });
      form.reset();
      setSubmitStatus('success');
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-8 text-center border-2 border-gray-200 dark:border-gray-700 rounded-none">
        <MessageSquare className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-4 font-semibold">Please log in to join the discussion</p>
        <Link to="/login">
          <Button variant="outline" className="h-12 font-bold border-2 border-black dark:border-gray-600 rounded-none hover:bg-swiss-blue hover:text-white dark:hover:bg-blue-600">
            Log In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8 border-4 border-black dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
        <h4 className="font-black uppercase text-base sm:text-lg tracking-wide mb-4 dark:text-white">Leave a Comment</h4>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <label htmlFor="comment-content" className="sr-only">Your comment</label>
              <FormControl>
                <Textarea 
                  id="comment-content"
                  placeholder="Share your thoughts..." 
                  className="text-base resize-none min-h-[120px] bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 rounded-none focus-visible:ring-swiss-blue dark:focus-visible:ring-blue-500 dark:text-gray-200" 
                  aria-label="Comment content"
                  aria-required="true"
                  aria-describedby="comment-char-count"
                  aria-invalid={!!form.formState.errors.content}
                  {...field} 
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <p id="comment-char-count" className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
            {form.watch("content")?.length || 0} / 500 characters
          </p>
          <Button 
            type="submit" 
            className="h-12 bg-swiss-blue hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-none px-6" 
            disabled={isCreating}
            aria-label={isCreating ? "Posting comment" : "Post comment"}
          >
            {isCreating ? "Posting..." : "Post Comment"}
          </Button>
        </div>
        
        {/* Success/Error Announcements - Screen Reader */}
        {submitStatus === 'success' && (
          <div role="status" aria-live="polite" className="text-sm text-green-600 dark:text-green-400 font-semibold">
            ✓ Comment posted successfully!
          </div>
        )}
        {submitStatus === 'error' && (
          <div role="alert" aria-live="assertive" className="text-sm text-red-600 dark:text-red-400 font-semibold">
            ✗ Failed to post comment. Please try again.
          </div>
        )}
      </form>
    </Form>
  );
}
