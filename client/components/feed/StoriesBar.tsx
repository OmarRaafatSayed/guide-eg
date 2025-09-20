import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Story } from "@/lib/social-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StoriesBarProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
  onAddStory: () => void;
  currentUser?: {
    username: string;
    avatar?: string;
  };
}

export function StoriesBar({ stories, onStoryClick, onAddStory, currentUser }: StoriesBarProps) {
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  const handleStoryClick = (story: Story) => {
    setViewedStories(prev => new Set([...prev, story.id]));
    onStoryClick(story);
  };

  // Group stories by user
  const storiesByUser = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = [];
    }
    acc[story.userId].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  const userStories = Object.entries(storiesByUser).map(([userId, userStoryList]) => ({
    userId,
    username: userStoryList[0].username,
    avatar: userStoryList[0].userAvatar,
    stories: userStoryList,
    hasUnviewed: userStoryList.some(story => !viewedStories.has(story.id) && !story.isViewed)
  }));

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <ScrollArea className="w-full">
        <div className="flex gap-4 px-4">
          {/* Add Story Button */}
          {currentUser && (
            <div className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-gray-200">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                  <AvatarFallback>{currentUser.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  onClick={onAddStory}
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <span className="text-xs text-center max-w-[60px] truncate">Your Story</span>
            </div>
          )}

          {/* User Stories */}
          {userStories.map(({ userId, username, avatar, stories: userStoryList, hasUnviewed }) => (
            <motion.div
              key={userId}
              className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStoryClick(userStoryList[0])}
            >
              <div className="relative">
                <div
                  className={`p-0.5 rounded-full ${
                    hasUnviewed
                      ? "bg-gradient-to-tr from-yellow-400 to-pink-600"
                      : "bg-gray-200"
                  }`}
                >
                  <Avatar className="h-14 w-14 border-2 border-white">
                    <AvatarImage src={avatar} alt={username} />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                {userStoryList.length > 1 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {userStoryList.length}
                  </div>
                )}
              </div>
              <span className="text-xs text-center max-w-[60px] truncate">{username}</span>
            </motion.div>
          ))}

          {/* Placeholder for more stories */}
          {userStories.length === 0 && !currentUser && (
            <div className="flex items-center justify-center w-full py-8">
              <p className="text-sm text-muted-foreground">No stories available</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}