import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MapPin, 
  MoreHorizontal,
  Award
} from "lucide-react";
import { Post, getBadgeById, formatTimeAgo } from "@/lib/social-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare, onBookmark }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(post.id);
  };

  const earnedBadges = post.badges?.map(badgeId => getBadgeById(badgeId)).filter(Boolean) || [];

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-0 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback>{post.userFullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{post.username}</span>
            {post.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {post.location.name}
              </div>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Hide</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="Post content"
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Post content ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{post.images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-1"
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`h-6 w-6 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </motion.div>
          </motion.button>
          
          <button
            onClick={() => {
              setShowComments(!showComments);
              onComment(post.id);
            }}
            className="flex items-center gap-1"
          >
            <MessageCircle className="h-6 w-6 text-gray-700" />
          </button>
          
          <button onClick={() => onShare(post.id)} className="flex items-center gap-1">
            <Share className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        
        <button onClick={handleBookmark}>
          <Bookmark
            className={`h-6 w-6 ${
              isBookmarked ? "fill-gray-700 text-gray-700" : "text-gray-700"
            }`}
          />
        </button>
      </div>

      {/* Likes count */}
      <div className="px-4 pb-2">
        <span className="text-sm font-semibold">{likesCount.toLocaleString()} likes</span>
      </div>

      {/* Badges */}
      {earnedBadges.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Award className="h-4 w-4 text-yellow-500" />
            {earnedBadges.map((badge) => (
              <Badge key={badge.id} variant="secondary" className="text-xs">
                {badge.icon} {badge.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="px-4 pb-2">
        <div className="text-sm">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.content}
        </div>
      </div>

      {/* Comments preview */}
      {post.comments.length > 0 && (
        <div className="px-4 pb-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm text-muted-foreground"
          >
            View all {post.comments.length} comments
          </button>
          
          {!showComments && post.comments.slice(0, 2).map((comment) => (
            <div key={comment.id} className="text-sm mt-1">
              <span className="font-semibold mr-2">{comment.username}</span>
              {comment.content}
            </div>
          ))}
        </div>
      )}

      {/* Expanded comments */}
      {showComments && (
        <div className="px-4 pb-2 border-t pt-2 mt-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={comment.userAvatar} alt={comment.username} />
                <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-semibold mr-2">{comment.username}</span>
                  {comment.content}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                  <button className="text-xs text-muted-foreground font-semibold">
                    Reply
                  </button>
                  <button className="text-xs text-muted-foreground">
                    {comment.likes} likes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timestamp */}
      <div className="px-4 pb-4">
        <span className="text-xs text-muted-foreground uppercase">
          {formatTimeAgo(post.createdAt)}
        </span>
      </div>
    </Card>
  );
}