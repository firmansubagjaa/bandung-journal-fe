import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link2, 
  Share2,
  MessageCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDesc = encodeURIComponent(description || "");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-2 border-black rounded-none font-bold hover:bg-swiss-blue hover:text-white hover:border-swiss-blue"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 border-4 border-black rounded-none"
      >
        <DropdownMenuItem
          onClick={() => handleShare("twitter")}
          className="cursor-pointer font-semibold"
        >
          <Twitter className="mr-2 h-4 w-4 text-sky-500" />
          Share on Twitter
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleShare("facebook")}
          className="cursor-pointer font-semibold"
        >
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleShare("linkedin")}
          className="cursor-pointer font-semibold"
        >
          <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleShare("whatsapp")}
          className="cursor-pointer font-semibold"
        >
          <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
          Share on WhatsApp
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="cursor-pointer font-semibold border-t-2 border-gray-200"
        >
          <Link2 className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
