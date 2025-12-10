import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 
      className={cn(
        "text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase border-b-2 border-black dark:border-gray-700 pb-2 mb-6 dark:text-white",
        className
      )}
    >
      {children}
    </h2>
  );
}

interface ArticleTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function ArticleTitle({ children, className }: ArticleTitleProps) {
  return (
    <h1 
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight dark:text-white",
        className
      )}
    >
      {children}
    </h1>
  );
}

interface LeadTextProps {
  children: React.ReactNode;
  className?: string;
}

export function LeadText({ children, className }: LeadTextProps) {
  return (
    <p 
      className={cn(
        "text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300",
        className
      )}
    >
      {children}
    </p>
  );
}
