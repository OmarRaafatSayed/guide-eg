import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { PostCard } from "@/components/feed/PostCard";
import { StoriesBar } from "@/components/feed/StoriesBar";
import { BadgeShowcase } from "@/components/feed/BadgeShowcase";
import { ProfileSetup } from "@/components/feed/ProfileSetup";
import { UserSettings } from "@/components/feed/UserSettings";
import { PostComposer } from "@/components/feed/PostComposer";
import { samplePosts, sampleStories, Post, Story } from "@/lib/social-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Users, TrendingUp, Award, Heart, MessageCircle, Plus, Settings, Shield } from "lucide-react";
import { toast } from "sonner";

export default function FeedPage() {
  const { user, requireEmail } = useAuth();
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [stories, setStories] = useState<Story[]>(sampleStories);
  const [activeTab, setActiveTab] = useState<'feed' | 'explore' | 'badges'>('feed');
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPostComposer, setShowPostComposer] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Check if user is registered and profile setup status
  useEffect(() => {
    if (!user.registered) {
      requireEmail("Access to the Feed is restricted to registered users. Please sign in to connect with fellow travelers and share your Egypt adventures.");
    } else {
      // Check if this is first time accessing feed (profile setup)
      const hasCompletedSetup = user.bio !== undefined || user.travelInterests?.length > 0 || user.profilePicture;
      if (!hasCompletedSetup && !showProfileSetup) {
        setShowProfileSetup(true);
      } else {
        setIsProfileComplete(true);
      }
    }
  }, [user.registered, user.bio, user.travelInterests, user.profilePicture, requireEmail, showProfileSetup]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.isLiked;
        return {
          ...post,
          isLiked: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
    toast.success("Post liked!");
  };

  const handleComment = (postId: string) => {
    toast.info("Comment feature coming soon!");
  };

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast.success("Post link copied to clipboard!");
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, isBookmarked: !post.isBookmarked };
      }
      return post;
    }));
    toast.success("Post bookmarked!");
  };

  const handleStoryClick = (story: Story) => {
    toast.info("Story viewer coming soon!");
  };

  const handleAddStory = () => {
    setShowPostComposer(true);
  };

  const handleCreatePost = (postData: { content: string; images: string[]; location?: string }) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: user.username,
      username: user.username,
      userFullName: user.fullName || user.username,
      userAvatar: user.profilePicture,
      content: postData.content,
      images: postData.images,
      location: postData.location ? {
        name: postData.location,
        governorate: 'Unknown' // In real app, this would be determined from location
      } : undefined,
      likes: 0,
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
      isLiked: false
    };
    
    setPosts(prev => [newPost, ...prev]);
    setShowPostComposer(false);
  };

  const handleProfileSetupComplete = () => {
    setShowProfileSetup(false);
    setIsProfileComplete(true);
    toast.success("Welcome to the NileNavigator community!");
  };

  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      setIsLoading(false);
      toast.success("No more posts to load");
    }, 1000);
  };

  // Show profile setup for first-time users
  if (showProfileSetup) {
    return <ProfileSetup onComplete={handleProfileSetupComplete} />;
  }

  if (!user.registered) {
    return (
      <section className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Private Community Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Join the NileNavigator Community</h3>
              <p className="text-muted-foreground mb-4">
                Connect with fellow Egypt travelers in our private social platform. 
                Share experiences, discover hidden gems, and earn travel badges.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Private Community:</strong> Only registered members can view and interact with content. 
                  Your privacy is protected.
                </p>
              </div>
              <Button onClick={() => requireEmail()}>
                Register to Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#004A58]">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-xl font-bold text-[#004A58]">NileNavigator</h2>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                <button className="bg-[#006B7A] text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full">
                  <Camera className="mr-3 h-5 w-5" />
                  Feed
                </button>
                <button className="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full">
                  <TrendingUp className="mr-3 h-5 w-5" />
                  Explore
                </button>
                <button className="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full">
                  <Award className="mr-3 h-5 w-5" />
                  Badges
                </button>
                <button className="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full">
                  <Users className="mr-3 h-5 w-5" />
                  Community
                </button>
                <button className="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </button>
              </nav>
            </div>
            
            {/* User Profile in Sidebar */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.profilePicture} alt={user.username} />
                  <AvatarFallback className="bg-[#006B7A] text-white">{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Stories Bar */}
          <div className="bg-white border-b border-gray-200">
            <StoriesBar
              stories={stories}
              onStoryClick={handleStoryClick}
              onAddStory={handleAddStory}
              currentUser={{
                username: user.username,
                avatar: user.profilePicture
              }}
            />
          </div>

          <div className="flex-1 bg-gray-50">
            <div className="max-w-4xl mx-auto py-6 px-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#004A58]">Community Feed</h1>
                  <p className="text-[#006B7A]">Connect with fellow Egypt travelers</p>
                </div>
                <Button onClick={() => setShowPostComposer(true)} className="bg-[#006B7A] hover:bg-[#005A66] text-white flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </div>

              {/* Main Feed Layout */}
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Posts Feed */}
                <div className="lg:col-span-3 space-y-6">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                      onBookmark={handleBookmark}
                    />
                  ))}
                  
                  {/* Load More Button */}
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={loadMorePosts}
                      disabled={isLoading}
                      className="bg-white border-[#006B7A] text-[#006B7A] hover:bg-[#006B7A] hover:text-white"
                    >
                      {isLoading ? "Loading..." : "Load More Posts"}
                    </Button>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Quick Actions */}
                  <Card className="bg-white border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-[#004A58]">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-[#006B7A] hover:bg-[#005A66] text-white" onClick={() => setShowPostComposer(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Post
                      </Button>
                      <Button variant="outline" className="w-full border-[#006B7A] text-[#006B7A] hover:bg-[#006B7A] hover:text-white">
                        <Camera className="h-4 w-4 mr-2" />
                        Add Story
                      </Button>
                      <Button variant="outline" className="w-full border-[#006B7A] text-[#006B7A] hover:bg-[#006B7A] hover:text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Find Friends
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Trending Topics */}
                  <Card className="bg-white border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-[#004A58]">Trending in Egypt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {['#PyramidsOfGiza', '#RedSeaDiving', '#LuxorTemples', '#NileRiver', '#SinaiBedouins'].map((tag, index) => (
                          <div key={tag} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#006B7A]">{tag}</span>
                            <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100) + 50}k posts</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Badges */}
                  {user.badges && user.badges.length > 0 && (
                    <Card className="bg-white border-0 shadow-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-[#004A58]">Recent Badges</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BadgeShowcase
                          badges={user.badges.slice(0, 4)}
                          title=""
                          showDescription={false}
                          layout="grid"
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Suggested Users */}
                  <Card className="bg-white border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-[#004A58]">Suggested for You</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { username: 'travel_photographer', followers: '12.5k', verified: true },
                          { username: 'egypt_guide', followers: '8.2k', verified: false },
                          { username: 'adventure_seeker', followers: '5.7k', verified: true },
                          { username: 'nile_explorer', followers: '3.1k', verified: false }
                        ].map((suggestedUser) => (
                          <div key={suggestedUser.username} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarFallback className="bg-[#006B7A] text-white">{suggestedUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium truncate">{suggestedUser.username}</span>
                                {suggestedUser.verified && <span className="text-blue-500 text-sm">✓</span>}
                              </div>
                              <span className="text-xs text-gray-500">{suggestedUser.followers} followers</span>
                            </div>
                            <Button size="sm" className="bg-[#006B7A] hover:bg-[#005A66] text-white flex-shrink-0">
                              Follow
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Stats */}
                  <Card className="bg-white border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-[#004A58]">Community Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Active Members</span>
                          <span className="font-semibold text-[#006B7A]">1,247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Posts This Week</span>
                          <span className="font-semibold text-[#006B7A]">89</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Badges Earned</span>
                          <span className="font-semibold text-[#006B7A]">2,156</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Countries Visited</span>
                          <span className="font-semibold text-[#006B7A]">47</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSettings && (
        <UserSettings onClose={() => setShowSettings(false)} />
      )}
      
      {showPostComposer && (
        <PostComposer 
          onClose={() => setShowPostComposer(false)}
          onPost={handleCreatePost}
        />
      )}
    </div>
  );
}


