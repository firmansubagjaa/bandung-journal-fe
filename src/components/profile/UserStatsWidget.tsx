import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, MessageSquare, Bookmark } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function UserStatsWidget() {
  const { user } = useAuth();

  // Mock stats for now - these would come from backend
  const stats = [
    {
      icon: FileText,
      label: "Articles Read",
      value: "42",
      subtext: "This month"
    },
    {
      icon: Bookmark,
      label: "Bookmarks",
      value: "12",
      subtext: "Saved"
    },
    {
      icon: MessageSquare,
      label: "Comments",
      value: "8",
      subtext: "Posted"
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "N/A",
      subtext: ""
    }
  ];

  return (
    <Card className="border-4 border-black rounded-none">
      <CardContent className="p-6">
        <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-black pb-2">
          Your Activity
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-swiss-blue/10 border-2 border-swiss-blue mb-3">
                  <Icon className="h-6 w-6 text-swiss-blue" />
                </div>
                <p className="text-3xl font-black mb-1">{stat.value}</p>
                <p className="text-xs font-bold uppercase text-gray-500">{stat.label}</p>
                {stat.subtext && (
                  <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
