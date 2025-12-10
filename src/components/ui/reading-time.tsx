import { Clock } from "lucide-react";

interface ReadingTimeProps {
  content: string;
  className?: string;
}

export function ReadingTime({ content, className }: ReadingTimeProps) {
  // Calculate reading time based on average 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className={`flex items-center gap-2 text-gray-600 ${className}`}>
      <Clock className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {minutes} min read
      </span>
    </div>
  );
}
