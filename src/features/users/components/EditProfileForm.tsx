import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProfile } from "../hooks/useProfile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSession } from "@/types";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  user: UserSession;
  onSuccess?: () => void;
}

export function EditProfileForm({ user, onSuccess }: EditProfileFormProps) {
  const { updateProfile, isUpdating } = useProfile();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar || null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateProfile({
        name: data.name,
        bio: data.bio,
        avatar: avatarFile || undefined,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Section - Stack on mobile, side-by-side on tablet+ */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-black dark:border-gray-600 rounded-none shrink-0">
            <AvatarImage src={previewUrl || ""} className="object-cover" />
            <AvatarFallback className="bg-swiss-blue text-white text-xl sm:text-2xl font-bold rounded-none">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            {/* Touch-friendly button (min 48px) */}
            <label 
              htmlFor="avatar-upload" 
              className="cursor-pointer flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 px-4 sm:px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-2 border-black dark:border-gray-600 min-h-[48px]"
            >
              Change Photo
            </label>
            <Input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarChange} 
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              JPG, GIF or PNG. Max 2MB.
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold uppercase">Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  className="min-h-[48px] rounded-none border-2 border-black dark:border-gray-600 text-base"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold uppercase">Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about yourself" 
                  className="resize-none min-h-[120px] rounded-none border-2 border-black dark:border-gray-600 text-base" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button - Large touch target */}
        <Button 
          type="submit" 
          className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-bold rounded-none min-h-[56px] text-base md:text-lg" 
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
