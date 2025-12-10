import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, TrendingUp } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useArticles } from "@/features/articles/hooks/useArticles";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // Fetch articles for suggestions (only when dialog is open)
  const { data: articlesData } = useArticles({ 
    limit: 5,
  });

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  // Save to recent searches
  const saveToRecent = (query: string) => {
    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      saveToRecent(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onOpenChange(false);
      setSearchQuery("");
    }
  };

  const handleSelectArticle = (slug: string) => {
    navigate(`/articles/${slug}`);
    onOpenChange(false);
  };

  const handleRecentSearch = (query: string) => {
    handleSearch(query);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search articles..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>
          {searchQuery.trim() ? (
            <div className="py-6 text-center">
              <p className="text-sm text-gray-600 mb-3">No results found</p>
              <button
                onClick={() => handleSearch(searchQuery)}
                className="text-sm font-bold text-swiss-blue hover:underline"
              >
                Search for "{searchQuery}"
              </button>
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-gray-600">
              Start typing to search...
            </p>
          )}
        </CommandEmpty>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <CommandGroup heading="Recent Searches">
            {recentSearches.map((query, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleRecentSearch(query)}
                className="cursor-pointer"
              >
                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                <span>{query}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Popular/Latest Articles */}
        {!searchQuery && articlesData?.data?.articles && articlesData.data.articles.length > 0 && (
          <CommandGroup heading="Popular Articles">
            {articlesData.data.articles.slice(0, 5).map((article) => (
              <CommandItem
                key={article.id}
                onSelect={() => handleSelectArticle(article.slug)}
                className="cursor-pointer"
              >
                <TrendingUp className="mr-2 h-4 w-4 text-swiss-blue" />
                <div className="flex flex-col">
                  <span className="font-semibold">{article.title}</span>
                  <span className="text-xs text-gray-500">{article.category.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Search action */}
        {searchQuery.trim() && (
          <CommandGroup>
            <CommandItem
              onSelect={() => handleSearch(searchQuery)}
              className="cursor-pointer bg-swiss-blue/5"
            >
              <Search className="mr-2 h-4 w-4 text-swiss-blue" />
              <span className="font-bold">
                Search for "{searchQuery}"
              </span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
