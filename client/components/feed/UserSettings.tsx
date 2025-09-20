import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  UserX, 
  Flag,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface UserSettingsProps {
  onClose: () => void;
}

export function UserSettings({ onClose }: UserSettingsProps) {
  const { user, updateUser } = useAuth();
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    followers: true,
    posts: false,
    badges: true
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: false,
    showBadges: true,
    showFollowCount: true,
    allowTagging: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    updateUser({
      notificationSettings,
      privacySettings
    });
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Information */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Account Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Username</span>
                  <span className="font-medium">{user.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Full Name</span>
                  <span className="font-medium">{user.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </span>
                  <Badge variant="secondary">Private</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    Phone
                  </span>
                  <Badge variant="secondary">Private</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Likes</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone likes your posts</p>
                  </div>
                  <Switch
                    checked={notificationSettings.likes}
                    onCheckedChange={(checked) => handleNotificationChange('likes', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Comments</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone comments on your posts</p>
                  </div>
                  <Switch
                    checked={notificationSettings.comments}
                    onCheckedChange={(checked) => handleNotificationChange('comments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Followers</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                  </div>
                  <Switch
                    checked={notificationSettings.followers}
                    onCheckedChange={(checked) => handleNotificationChange('followers', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Travel Badges</p>
                    <p className="text-sm text-muted-foreground">Get notified when you earn new badges</p>
                  </div>
                  <Switch
                    checked={notificationSettings.badges}
                    onCheckedChange={(checked) => handleNotificationChange('badges', checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Privacy Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Privacy Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {privacySettings.privateAccount ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                      Private Account
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Only approved followers can see your posts and profile
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.privateAccount}
                    onCheckedChange={(checked) => handlePrivacyChange('privateAccount', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Travel Badges</p>
                    <p className="text-sm text-muted-foreground">Display your earned badges on your profile</p>
                  </div>
                  <Switch
                    checked={privacySettings.showBadges}
                    onCheckedChange={(checked) => handlePrivacyChange('showBadges', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Follower Count</p>
                    <p className="text-sm text-muted-foreground">Display follower and following counts on your profile</p>
                  </div>
                  <Switch
                    checked={privacySettings.showFollowCount}
                    onCheckedChange={(checked) => handlePrivacyChange('showFollowCount', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Tagging</p>
                    <p className="text-sm text-muted-foreground">Let others tag you in their posts</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowTagging}
                    onCheckedChange={(checked) => handlePrivacyChange('allowTagging', checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Safety & Support */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety & Support
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <UserX className="h-4 w-4 mr-2" />
                  Blocked Users
                </Button>
                <Button variant="outline" className="justify-start">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Content
                </Button>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Community Guidelines:</strong> NileNavigator is a safe space for travel enthusiasts. 
                  Please report any inappropriate content or behavior to help maintain our positive community.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={saveSettings} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}