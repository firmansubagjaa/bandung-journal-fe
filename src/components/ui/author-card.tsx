import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Author {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

interface AuthorCardProps {
  author: Author;
  variant?: "compact" | "full";
  className?: string;
}

export function AuthorCard({ author, variant = "compact", className }: AuthorCardProps) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Avatar className="h-10 w-10 border-2 border-black dark:border-gray-600">
          <AvatarImage src={author.avatarUrl || undefined} alt={author.name} />
          <AvatarFallback className="bg-swiss-blue dark:bg-blue-600 text-white font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold dark:text-gray-200">{author.name}</p>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`border-4 border-black dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20 border-2 border-black dark:border-gray-600">
          <AvatarImage src={author.avatarUrl || undefined} alt={author.name} />
          <AvatarFallback className="bg-swiss-blue dark:bg-blue-600 text-white font-bold text-2xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-bold mb-1">
            Written by
          </p>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2 dark:text-white">
            {author.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Contributing writer for Bandung Journal
          </p>
          {/* TODO: Add author bio when available in backend */}
          {/* TODO: Add link to author profile page when implemented */}
        </div>
      </div>
    </div>
  );
}
