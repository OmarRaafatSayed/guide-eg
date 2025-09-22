import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, User, MapPin, Hash, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const TRAVEL_INTERESTS = [
  { id: "historical", label: "Historical Sites", icon: "🏛️" },
  { id: "coastal", label: "Coastal Trips", icon: "🏖️" },
  { id: "foodie", label: "Foodie", icon: "🍽️" },
  { id: "adventure", label: "Adventure", icon: "🏔️" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "architecture", label: "Architecture", icon: "🏗️" },
  { id: "museums", label: "Museums", icon: "🏛️" },
  { id: "markets", label: "Markets & Bazaars", icon: "🛍️" },
  { id: "nightlife", label: "Nightlife", icon: "🌙" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "desert", label: "Desert Safari", icon: "🐪" }
];

interface ProfileSetupProps {
  onComplete: () => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const { user, updateUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string | null>(user.profilePicture || null);
  const [bio, setBio] = useState(user.bio || "");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.travelInterests || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleComplete = () => {
    updateUser({
      profilePicture,
      bio,
      travelInterests: selectedInterests
    });
    onComplete();
  };

  const canSkip = true; // Profile setup is optional

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <p className="text-muted-foreground">
              Help fellow travelers get to know you better (optional)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profilePicture || undefined} alt="Profile" />
                  <AvatarFallback className="text-2xl">
                    {user.fullName?.charAt(0) || user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Upload a profile picture (optional)
              </p>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                About Me
              </label>
              <Textarea
                placeholder="Tell us about yourself... (e.g., 'History buff from Cairo' or 'First-time visitor to Egypt')"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={150}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {bio.length}/150 characters
              </p>
            </div>

            {/* Travel Interests */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Travel Interests
              </label>
              <p className="text-sm text-muted-foreground">
                Select topics that interest you to connect with like-minded travelers
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TRAVEL_INTERESTS.map((interest) => (
                  <motion.button
                    key={interest.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{interest.icon}</span>
                        <span className="text-sm font-medium">{interest.label}</span>
                      </div>
                      {selectedInterests.includes(interest.id) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Selected: {selectedInterests.length} interests
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {canSkip && (
                <Button variant="outline" onClick={onComplete} className="flex-1">
                  Skip for Now
                </Button>
              )}
              <Button onClick={handleComplete} className="flex-1">
                Complete Profile
              </Button>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Privacy Notice</p>
                  <p className="text-blue-700 mt-1">
                    Your profile information is only visible to other registered members of the NileNavigator community. 
                    Your email and phone number are never displayed publicly.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}