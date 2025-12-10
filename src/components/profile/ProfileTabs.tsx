import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditProfileForm } from "@/features/users/components/EditProfileForm";
import { UserStatsWidget } from "./UserStatsWidget";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/users/hooks/useProfile";
import { useBookmarks } from "@/features/bookmarks/hooks/useBookmarks";
import { ArticleCard } from "@/features/articles/components/ArticleCard";
import { ArticleCardSkeleton } from "@/features/articles/components/ArticleCardSkeleton";
import { Button } from "@/components/ui/button";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfileTabs() {
  const { profile } = useProfile();
  
  return (
    <Tabs defaultValue="profile" className="w-full">
      {/* TabsList - Horizontal scroll on mobile, touch-friendly 48px min height */}
      <TabsList className="w-full justify-start border-b-4 border-black dark:border-gray-700 rounded-none bg-transparent h-auto p-0 gap-2 mb-6 md:mb-8 overflow-x-auto flex-nowrap">
        <TabsTrigger
          value="profile"
          className="rounded-none border-2 border-black dark:border-gray-600 data-[state=active]:bg-swiss-blue data-[state=active]:text-white data-[state=active]:border-swiss-blue font-bold uppercase tracking-wide px-4 md:px-6 py-3 min-h-[48px] text-sm md:text-base whitespace-nowrap shrink-0"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="bookmarks"
          className="rounded-none border-2 border-black dark:border-gray-600 data-[state=active]:bg-swiss-blue data-[state=active]:text-white data-[state=active]:border-swiss-blue font-bold uppercase tracking-wide px-4 md:px-6 py-3 min-h-[48px] text-sm md:text-base whitespace-nowrap shrink-0"
        >
          Bookmarks
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="rounded-none border-2 border-black dark:border-gray-600 data-[state=active]:bg-swiss-blue data-[state=active]:text-white data-[state=active]:border-swiss-blue font-bold uppercase tracking-wide px-4 md:px-6 py-3 min-h-[48px] text-sm md:text-base whitespace-nowrap shrink-0"
        >
          Settings
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile" className="space-y-8">
        <UserStatsWidget />
        {profile?.data && <EditProfileForm user={profile.data} />}
      </TabsContent>

      {/* Bookmarks Tab */}
      <TabsContent value="bookmarks">
        <BookmarksContent />
      </TabsContent>

      {/* Settings Tab */}
      <TabsContent value="settings">
        <SettingsContent />
      </TabsContent>
    </Tabs>
  );
}

// Bookmarks Tab Content
function BookmarksContent() {
  const { bookmarks, isLoading, removeBookmark, isRemoving } = useBookmarks();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Filter out bookmarks without valid articles
  const validBookmarks = bookmarks.filter(b => b.article);

  if (!validBookmarks || validBookmarks.length === 0) {
    return (
      <Empty className="py-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)]">
        <EmptyMedia>
          <BookmarkIcon />
        </EmptyMedia>
        <EmptyTitle>No Bookmarks Yet</EmptyTitle>
        <EmptyDescription>
          Start bookmarking articles to save them for later reading.
        </EmptyDescription>
        <EmptyContent>
          <Link to="/articles">
            <Button className="bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none px-8 py-3 border-2 border-swiss-blue hover:border-blue-800">
              Browse Articles
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        You have <span className="font-bold">{validBookmarks.length}</span> bookmarked {validBookmarks.length === 1 ? 'article' : 'articles'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {validBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="relative">
            <ArticleCard article={bookmark.article} />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 rounded-none font-bold z-10"
              onClick={() => removeBookmark(bookmark.article.slug)}
              disabled={isRemoving}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Tab Content
function SettingsContent() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-4 border-black p-6 space-y-6">
        <div>
          <h3 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
            Account Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-bold">Email</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-bold">Password</p>
                <p className="text-sm text-gray-600">••••••••</p>
              </div>
              <Link to="/reset-password">
                <Button variant="outline" className="border-2 border-black rounded-none font-bold">
                  Change
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-bold">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates about new articles</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-swiss-blue/20 peer-checked:after:translate-x-full peer-checked:bg-swiss-blue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-2 after:border-black after:h-5 after:w-5 after:transition-all border-2 border-black"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
