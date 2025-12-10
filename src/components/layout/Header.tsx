import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bookmark, TrendingUp, Newspaper, Layers, LogIn } from "lucide-react";
import { SearchDialog } from "@/components/search/SearchDialog";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useCategories } from "@/features/categories";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Fetch categories dynamically from backend
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      
      {/* Skip to main content link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-swiss-blue focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:rounded-none focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-50 w-full border-b-4 border-black dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <MobileMenu />
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-swiss-red w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-black text-xl sm:text-2xl">
              B
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase hidden md:block dark:text-white">
              Bandung Journal
            </span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* News Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="font-bold uppercase tracking-wide bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 dark:text-gray-200"
                  aria-label="News menu"
                >
                  <Newspaper className="mr-2 h-4 w-4" />
                  News
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/articles"
                          className="flex h-full w-full select-none flex-col justify-end rounded-none border-2 border-black dark:border-gray-700 bg-gradient-to-b from-swiss-blue/50 to-swiss-blue p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Newspaper className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-black text-white uppercase">
                            Latest News
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Browse all the latest articles and breaking news
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/articles?filter=trending" title="Trending">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      Most popular articles
                    </ListItem>
                    <ListItem href="/articles?filter=latest" title="Just Published">
                      <Newspaper className="inline h-3 w-3 mr-1" />
                      Fresh off the press
                    </ListItem>
                    <ListItem href="/bookmarks" title="Bookmarks">
                      <Bookmark className="inline h-3 w-3 mr-1" />
                      Your saved articles
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Categories Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="font-bold uppercase tracking-wide bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 dark:text-gray-200"
                  aria-label="Categories menu"
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {categories.slice(0, 5).map((category) => (
                      <ListItem
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        title={category.name}
                      >
                        {category.description}
                      </ListItem>
                    ))}
                    <ListItem
                      href="/categories"
                      title="View All"
                      className="border-2 border-swiss-blue dark:border-blue-600 bg-swiss-blue/5 dark:bg-blue-950/20"
                    >
                      Browse all categories →
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Link */}
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  <span className="font-bold uppercase tracking-wide dark:text-gray-200">About</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side - Search & Auth */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Button - Mobile */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden h-11 w-11 border-2 border-black dark:border-gray-600 rounded-none hover:bg-swiss-blue hover:text-white hover:border-swiss-blue dark:hover:bg-blue-600 transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Desktop Search with Kbd */}
            <Button
              variant="outline"
              className="hidden lg:flex gap-2 border-2 border-black dark:border-gray-600 rounded-none hover:bg-swiss-blue hover:text-white hover:border-swiss-blue dark:hover:bg-blue-600 dark:text-gray-200 transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Search articles"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-700 dark:text-gray-300 group-hover:bg-white group-hover:text-swiss-blue group-hover:border-white hidden lg:inline-flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          
            {/* Auth Section - User Profile Dropdown */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-11 w-11 rounded-none border-2 border-black dark:border-gray-600 p-0 hover:bg-swiss-blue hover:border-swiss-blue group transition-all duration-200 focus-visible:ring-2 focus-visible:ring-swiss-blue focus-visible:ring-offset-2"
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                      <AvatarFallback className="font-black text-lg bg-swiss-blue dark:bg-blue-600 text-white rounded-none group-hover:bg-white group-hover:text-swiss-blue transition-colors duration-200">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 rounded-none border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] p-0 z-[100]" 
                  align="end" 
                  sideOffset={8}
                  forceMount
                >
                  {/* User Info Header */}
                  <DropdownMenuLabel className="font-normal p-4 border-b-2 border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-none border-2 border-black dark:border-gray-600">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="font-bold bg-swiss-blue text-white rounded-none text-sm">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold uppercase tracking-wide dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  
                  {/* Menu Items */}
                  <div className="p-1">
                    <DropdownMenuItem asChild className="rounded-none cursor-pointer hover:bg-swiss-blue hover:text-white focus:bg-swiss-blue focus:text-white transition-colors px-3 py-2.5">
                      <Link to="/profile" className="flex items-center gap-3 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span className="font-semibold">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-none cursor-pointer hover:bg-swiss-blue hover:text-white focus:bg-swiss-blue focus:text-white transition-colors px-3 py-2.5">
                      <Link to="/bookmarks" className="flex items-center gap-3 w-full">
                        <Bookmark className="h-4 w-4" />
                        <span className="font-semibold">Bookmarks</span>
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <DropdownMenuItem asChild className="rounded-none cursor-pointer hover:bg-swiss-blue hover:text-white focus:bg-swiss-blue focus:text-white transition-colors px-3 py-2.5">
                        <Link to="/admin" className="flex items-center gap-3 w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                          <span className="font-semibold">Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>
                  
                  <DropdownMenuSeparator className="h-0.5 bg-black dark:bg-gray-600 mx-0" />
                  
                  {/* Logout */}
                  <div className="p-1">
                    <DropdownMenuItem 
                      onClick={() => logout()} 
                      className="rounded-none cursor-pointer text-swiss-red hover:bg-swiss-red hover:text-white focus:bg-swiss-red focus:text-white transition-colors px-3 py-2.5 font-bold flex items-center gap-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {/* Mobile - Icon Only */}
                <Link to="/login" className="lg:hidden">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-11 w-11 border-2 border-black dark:border-gray-600 rounded-none hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Log in"
                  >
                    <LogIn className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Desktop - Full Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                  <Link to="/login">
                    <Button variant="ghost" className="font-bold text-lg dark:text-gray-200">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-swiss-blue hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-none px-6">
                      Subscribe
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

// Helper component for navigation menu items
const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-none border-2 border-transparent p-3 leading-none no-underline outline-none transition-colors hover:border-swiss-blue hover:bg-swiss-blue/5 hover:text-swiss-blue dark:hover:border-blue-400 dark:hover:bg-blue-950/20 dark:hover:text-blue-400 focus:border-swiss-blue focus:bg-swiss-blue/5 dark:focus:border-blue-400 dark:text-gray-300",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none uppercase tracking-wide">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-gray-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
