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
    <div className="min-h-screen bg-gray-50">
      {/* Stories Bar */}
      <StoriesBar
        stories={stories}
        onStoryClick={handleStoryClick}
        onAddStory={handleAddStory}
        currentUser={{
          username: user.username,
          avatar: user.profilePicture
        }}
      />

      <div className="container py-6">
        {/* Community Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Community Feed</h1>
            <p className="text-muted-foreground">Connect with fellow Egypt travelers</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowPostComposer(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Explore
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
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
                  >
                    {isLoading ? "Loading..." : "Load More Posts"}
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* User Profile Card */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.profilePicture} alt={user.username} />
                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-sm text-muted-foreground">{user.fullName}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-semibold">{user.postsCount || 0}</div>
                        <div className="text-xs text-muted-foreground">Posts</div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.followersCount || 0}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.followingCount || 0}</div>
                        <div className="text-xs text-muted-foreground">Following</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Badges */}
                {user.badges && user.badges.length > 0 && (
                  <BadgeShowcase
                    badges={user.badges.slice(0, 4)}
                    title="Recent Badges"
                    showDescription={false}
                    layout="grid"
                  />
                )}

                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Members</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Posts This Week</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Badges Earned</span>
                        <span className="font-semibold">2,156</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Users */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Suggested for You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['travel_photographer', 'egypt_guide', 'adventure_seeker'].map((username) => (
                        <div key={username} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{username}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Follow
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="text-white text-center">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <BadgeShowcase
              badges={user.badges || []}
              title="Your Travel Badges"
              showDescription={true}
              layout="grid"
            />
          </TabsContent>
        </Tabs>
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


