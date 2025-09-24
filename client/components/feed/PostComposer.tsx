import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Video, 
  MapPin, 
  X, 
  Image as ImageIcon,
  Send,
  Smile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface PostComposerProps {
  onClose: () => void;
  onPost: (postData: {
    content: string;
    images: string[];
    location?: string;
  }) => void;
}

export function PostComposer({ onClose, onPost }: PostComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image to your post");
      return;
    }

    if (!content.trim()) {
      toast.error("Please add a caption to your post");
      return;
    }

    setIsPosting(true);
    
    try {
      // Simulate posting delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onPost({
        content: content.trim(),
        images,
        location: location.trim() || undefined
      });
      
      toast.success("Post shared successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to share post. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  const canPost = images.length > 0 && content.trim().length > 0;

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
              <CardTitle>Create New Post</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.fullName}</p>
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Photos
                </Button>
                <Button variant="outline" disabled className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  Add Video
                  <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Image Preview */}
              <AnimatePresence>
                {images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2"
                  >
                    {images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <Textarea
                placeholder="Write a caption... Share your Egypt adventure!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
                className="resize-none min-h-[100px]"
              />
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" disabled>
                  <Smile className="h-4 w-4 mr-1" />
                  Emoji
                </Button>
                <span className="text-xs text-muted-foreground">
                  {content.length}/500
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Add location (e.g., Giza Pyramids, Cairo)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Help others discover amazing places by tagging your location
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Privacy:</strong> Your post will be visible to all registered NileNavigator community members. 
                Make sure you're comfortable sharing this content with fellow travelers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handlePost} 
                disabled={!canPost || isPosting}
                className="flex-1"
              >
                {isPosting ? (
                  "Posting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Share Post
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}