import { useProfile } from "@/features/users/hooks/useProfile";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/seo/SEO";
import { Shield, User, Edit3 } from "lucide-react";

export function ProfilePage() {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-6 md:py-12 px-4 space-y-6 md:space-y-8">
        {/* Loading Header - Mobile first: stack layout */}
        <div className="flex flex-col items-center gap-6 border-b-4 border-black dark:border-gray-700 pb-8 md:pb-12">
          {/* Avatar skeleton - Consistent size mobile/desktop */}
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-none border-4 border-black" />
          <div className="w-full space-y-4 text-center">
            <Skeleton className="h-10 md:h-12 w-48 md:w-64 mx-auto" />
            <Skeleton className="h-5 md:h-6 w-40 md:w-48 mx-auto" />
            <Skeleton className="h-7 md:h-8 w-20 md:w-24 mx-auto" />
          </div>
        </div>
        <Skeleton className="h-64 md:h-96 w-full" />
      </div>
    );
  }

  if (!profile?.data) return null;

  const user = profile.data;
  const isAdmin = user.role === 'admin';
  const isEditor = user.role === 'editor';

  return (
    <main 
      role="main" 
      className="max-w-6xl mx-auto py-6 md:py-12 px-4 space-y-6 md:space-y-12"
      aria-label="User profile"
    >
      <SEO 
        title="My Profile" 
        description={`Manage your Bandung Journal profile, reading list, and settings.`}
        noindex={true}
      />
      
      {/* Profile Header Card - Mobile first: stack, then side-by-side */}
      <div className="border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(75,85,99,1)] md:dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
        <div className="flex flex-col items-center gap-4 md:gap-6 p-4 md:p-8 md:flex-row md:items-start">
          {/* Avatar - Fitts's Law: Large touch target (min 48px, we use 96px+) */}
          <div className="relative group shrink-0">
            <Avatar className="h-24 w-24 md:h-32 lg:h-36 md:w-32 lg:w-36 rounded-none border-4 border-black dark:border-gray-600">
              <AvatarImage src={user.avatar || ""} className="object-cover" />
              <AvatarFallback 
                className="bg-swiss-blue text-white font-black rounded-none"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Edit overlay - Touch friendly (full avatar size) */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Edit3 className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
          </div>
          
          {/* User Info - Visual Hierarchy with fluid typography */}
          <div className="flex-1 text-center md:text-left space-y-2 md:space-y-3 w-full">
            {/* Primary: Name - Fluid sizing with clamp() */}
            <h1 
              className="font-black tracking-tight uppercase dark:text-white leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
            >
              {user.name}
            </h1>
            
            {/* Secondary: Email - Smaller, muted */}
            <p 
              className="text-gray-500 dark:text-gray-400 font-medium break-all"
              style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
            >
              {user.email}
            </p>
            
            {/* Role Badge - Touch friendly (min height 44px with padding) */}
            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
              <Badge 
                className={`
                  rounded-none font-bold uppercase text-xs md:text-sm px-3 py-1.5 md:py-1 border-2 min-h-[36px] md:min-h-[32px] flex items-center
                  ${isAdmin 
                    ? 'bg-swiss-red border-swiss-red text-white' 
                    : isEditor 
                      ? 'bg-swiss-blue border-swiss-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-800 border-black dark:border-gray-600 text-black dark:text-white'
                  }
                `}
              >
                {isAdmin ? (
                  <><Shield className="h-3.5 w-3.5 md:h-3 md:w-3 mr-1.5 md:mr-1" /> Admin</>
                ) : isEditor ? (
                  <><Edit3 className="h-3.5 w-3.5 md:h-3 md:w-3 mr-1.5 md:mr-1" /> Editor</>
                ) : (
                  <><User className="h-3.5 w-3.5 md:h-3 md:w-3 mr-1.5 md:mr-1" /> Member</>
                )}
              </Badge>
            </div>
            
            {/* Bio - Readable line height */}
            {user.bio && (
              <p 
                className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed pt-2"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
              >
                {user.bio}
              </p>
            )}
          </div>
        </div>
        
        {/* Stats Bar - Touch friendly cells (min 48px height) */}
        <div className="grid grid-cols-3 border-t-4 border-black dark:border-gray-700">
          <div className="p-3 md:p-6 text-center border-r-2 border-black dark:border-gray-700 min-h-[64px] md:min-h-[80px] flex flex-col justify-center">
            <p 
              className="font-black dark:text-white"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}
            >
              0
            </p>
            <p className="text-[10px] md:text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Articles</p>
          </div>
          <div className="p-3 md:p-6 text-center border-r-2 border-black dark:border-gray-700 min-h-[64px] md:min-h-[80px] flex flex-col justify-center">
            <p 
              className="font-black dark:text-white"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}
            >
              0
            </p>
            <p className="text-[10px] md:text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Bookmarks</p>
          </div>
          <div className="p-3 md:p-6 text-center min-h-[64px] md:min-h-[80px] flex flex-col justify-center">
            <p 
              className="font-black dark:text-white"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}
            >
              0
            </p>
            <p className="text-[10px] md:text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Comments</p>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <ProfileTabs />
    </main>
  );
}
