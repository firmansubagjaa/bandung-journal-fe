import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  Newspaper, 
  Layers, 
  Info, 
  LogIn, 
  UserPlus, 
  Bookmark, 
  User,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { name: "Politics", slug: "politics" },
  { name: "Technology", slug: "technology" },
  { name: "Culture", slug: "culture" },
  { name: "Business", slug: "business" },
  { name: "Lifestyle", slug: "lifestyle" },
];

export function MobileMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden border-2 border-black rounded-none hover:bg-swiss-blue hover:text-white hover:border-swiss-blue"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-[300px] sm:w-[350px] p-0 border-r-4 border-black rounded-none"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="border-b-4 border-black p-6">
            <SheetTitle className="text-2xl font-black uppercase tracking-tighter">
              Bandung Journal
            </SheetTitle>
          </SheetHeader>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* User Section */}
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border-2 border-black bg-gray-50">
                    <Avatar className="h-10 w-10 border-2 border-black">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="font-bold bg-swiss-blue text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <SheetClose asChild>
                      <Link to="/profile">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start font-bold"
                          onClick={closeMenu}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/bookmarks">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start font-bold"
                          onClick={closeMenu}
                        >
                          <Bookmark className="mr-2 h-4 w-4" />
                          Bookmarks
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>

                  <Separator className="border-gray-300" />
                </div>
              ) : (
                <div className="space-y-2">
                  <SheetClose asChild>
                    <Link to="/login" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-black rounded-none font-bold"
                        onClick={closeMenu}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/register" className="block">
                      <Button 
                        className="w-full bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none"
                        onClick={closeMenu}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Subscribe
                      </Button>
                    </Link>
                  </SheetClose>
                  <Separator className="border-gray-300" />
                </div>
              )}

              {/* News Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                  News
                </h3>
                <SheetClose asChild>
                  <Link to="/articles">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between font-bold"
                      onClick={closeMenu}
                    >
                      <span className="flex items-center">
                        <Newspaper className="mr-2 h-4 w-4" />
                        Latest Articles
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </SheetClose>
              </div>

              <Separator className="border-gray-300" />

              {/* Categories Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                  Categories
                </h3>
                {CATEGORIES.map((category) => (
                  <SheetClose key={category.slug} asChild>
                    <Link to={`/categories/${category.slug}`}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between font-semibold"
                        onClick={closeMenu}
                      >
                        {category.name}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link to="/categories">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-swiss-blue font-bold"
                      onClick={closeMenu}
                    >
                      <span className="flex items-center">
                        <Layers className="mr-2 h-4 w-4" />
                        View All Categories
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </SheetClose>
              </div>

              <Separator className="border-gray-300" />

              {/* About */}
              <SheetClose asChild>
                <Link to="/about">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between font-bold"
                    onClick={closeMenu}
                  >
                    <span className="flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>

          {/* Footer - Logout */}
          {isAuthenticated && (
            <div className="border-t-4 border-black p-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 font-bold hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
