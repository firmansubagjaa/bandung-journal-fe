import { Eye } from "lucide-react";

interface ViewCountProps {
  count: number;
  className?: string;
}

export function ViewCount({ count, className }: ViewCountProps) {
  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className={`flex items-center gap-2 text-gray-600 ${className}`}>
      <Eye className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {formatCount(count)} {count === 1 ? 'view' : 'views'}
      </span>
    </div>
  );
}
