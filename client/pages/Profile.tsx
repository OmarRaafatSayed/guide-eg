import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { STORAGE_KEYS, load } from "@/lib/offline";
import type { Post } from "@/lib/social-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { 
  Settings, 
  Edit, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Camera,
  Bell,
  Shield,
  Eye,
  Heart,
  Bookmark
} from "lucide-react";

export default function ProfilePage() {
  const { handle = "" } = useParams();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  
  const posts = load<Post[]>(STORAGE_KEYS.posts, []);
  const userPosts = useMemo(
    () => posts.filter((p) => p.username.toLowerCase() === handle?.toLowerCase()),
    [posts, handle],
  );

  const countPosts = userPosts.length;
  const countFollowers = 120; // demo
  const countFollowing = 80; // demo
  const isOwnProfile = user.username === handle;
  
  // Mock user data
  const [userProfile, setUserProfile] = useState({
    bio: "Egypt Heritage Explorer • Travel Enthusiast • Photography Lover",
    location: "Cairo, Egypt",
    website: "www.example.com",
    email: "user@example.com",
    phone: "+20 123 456 7890",
    joinDate: "January 2024",
    interests: ["History", "Photography", "Culture", "Food"],
    visitedPlaces: 15,
    savedPlaces: 8,
    notifications: {
      email: true,
      push: true,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showPhone: false
    }
  });

  return (
    <section className="container py-8">
      <div className="flex items-center gap-8">
        <div className="h-28 w-28 rounded-full bg-secondary" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{handle}</h1>
            <Badge>Verified</Badge>
            {!isOwnProfile ? (
              <>
                <Button size="sm">Follow</Button>
                <Button size="sm" variant="secondary">
                  Message
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-semibold">{countPosts}</span> posts
            </div>
            <div>
              <span className="font-semibold">{countFollowers}</span> followers
            </div>
            <div>
              <span className="font-semibold">{countFollowing}</span> following
            </div>
          </div>
          <div className="text-sm max-w-md">
            <p>{userProfile.bio}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          {isOwnProfile && <TabsTrigger value="settings">Settings</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <Grid posts={userPosts} />
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mock saved places */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <img src="/placeholder.svg" alt="Saved place" className="w-full h-32 object-cover rounded-t-lg" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Saved Place {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="h-3 w-3" />
                    Cairo, Egypt
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Profile Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Joined {userProfile.joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{userProfile.website}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-700">{userProfile.bio}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">{interest}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userProfile.visitedPlaces}</div>
                    <div className="text-xs text-gray-600">Places Visited</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userProfile.savedPlaces}</div>
                    <div className="text-xs text-gray-600">Places Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {isOwnProfile && (
          <TabsContent value="settings" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={userProfile.location}
                      onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      value={userProfile.website}
                      onChange={(e) => setUserProfile({...userProfile, website: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
              
              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <Switch 
                      id="email-notif"
                      checked={userProfile.notifications.email}
                      onCheckedChange={(checked) => 
                        setUserProfile({
                          ...userProfile, 
                          notifications: {...userProfile.notifications, email: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notif">Push Notifications</Label>
                    <Switch 
                      id="push-notif"
                      checked={userProfile.notifications.push}
                      onCheckedChange={(checked) => 
                        setUserProfile({
                          ...userProfile, 
                          notifications: {...userProfile.notifications, push: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-notif">Marketing Emails</Label>
                    <Switch 
                      id="marketing-notif"
                      checked={userProfile.notifications.marketing}
                      onCheckedChange={(checked) => 
                        setUserProfile({
                          ...userProfile, 
                          notifications: {...userProfile.notifications, marketing: checked}
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <Switch 
                      id="public-profile"
                      checked={userProfile.privacy.profilePublic}
                      onCheckedChange={(checked) => 
                        setUserProfile({
                          ...userProfile, 
                          privacy: {...userProfile.privacy, profilePublic: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-email">Show Email</Label>
                    <Switch 
                      id="show-email"
                      checked={userProfile.privacy.showEmail}
                      onCheckedChange={(checked) => 
                        setUserProfile({
                          ...userProfile, 
                          privacy: {...userProfile.privacy, showEmail: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-phone">Show Phone</Label>
                    <Switch 
                      id="show-phone"
                      checked={userProfile.privacy.showPhone}
                      onCheckedChange={(checked) => 
                        setUserProfile({
                          ...userProfile, 
                          privacy: {...userProfile.privacy, showPhone: checked}
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <Button variant="outline" className="w-full">Update Contact Info</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
}

function Grid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2">
      {posts.map((p) => (
        <div key={p.id} className="relative aspect-square overflow-hidden">
          <img
            src={p.images[0]}
            alt={p.location?.name || 'Post'}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
