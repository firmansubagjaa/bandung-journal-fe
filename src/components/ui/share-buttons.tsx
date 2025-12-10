import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400 flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share:
      </span>
      
      <div className="flex gap-2">
        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white dark:hover:bg-blue-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white dark:hover:bg-blue-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white dark:hover:bg-blue-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="p-2 sm:p-2.5 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white dark:hover:bg-blue-600 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
