import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { STORAGE_KEYS, load, save } from "@/lib/offline";
import { useAuth } from "@/context/AuthContext";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ImagePlus,
} from "lucide-react";

export type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: number;
};
export type Post = {
  id: string;
  author: string;
  location: string;
  img: string;
  caption: string;
  likes: number;
  comments: Comment[];
};

const sample: Post[] = [
  {
    id: "p1",
    author: "lena",
    location: "Giza Pyramids",
    img: "/placeholder.svg",
    caption: "Golden hour at the Pyramids!",
    likes: 128,
    comments: [],
  },
  {
    id: "p2",
    author: "tom",
    location: "Karnak Temple",
    img: "/placeholder.svg",
    caption: "Hypostyle Hall is unreal.",
    likes: 94,
    comments: [],
  },
];

export default function FeedPage() {
  const { user, requireEmail } = useAuth();
  const [posts, setPosts] = useState<Post[]>(load(STORAGE_KEYS.posts, sample));
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    save(STORAGE_KEYS.posts, posts);
  }, [posts]);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const p: Post = {
        id: `p${Date.now()}`,
        author: user.username,
        location: location || "",
        img: dataUrl,
        caption,
        likes: 0,
        comments: [],
      };
      setPosts([p, ...posts]);
      setCaption("");
      setLocation("");
      setFile(null);
    };
    reader.readAsDataURL(file);
  }

  async function like(id: string) {
    if (!(await requireEmail("سجّل ايميلك عشان تعمل لايك"))) return;
    setPosts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    );
  }

  async function addComment(id: string, text: string) {
    if (!(await requireEmail("سجّل ايميلك عشان تكتب كومنت"))) return;
    if (!text.trim()) return;
    setPosts((ps) =>
      ps.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `c${Date.now()}`,
                  author: user.username,
                  text,
                  createdAt: Date.now(),
                },
              ],
            }
          : p,
      ),
    );
  }

  async function share(post: Post) {
    if (!(await requireEmail("سجّل ايميلك عشان تعمل شير"))) return;
    const url = `${window.location.origin}/feed?post=${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${post.author}`,
          text: post.caption,
          url,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      } catch {}
    }
  }

  return (
    <section className="container py-6 max-w-3xl">
      <Composer
        onPick={(f) => handleFile(f)}
        caption={caption}
        setCaption={setCaption}
        location={location}
        setLocation={setLocation}
      />
      <div className="mt-6 space-y-6">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onLike={() => like(p.id)}
            onComment={(t) => addComment(p.id, t)}
            onShare={() => share(p)}
          />
        ))}
      </div>
    </section>
  );
}

function Composer({
  onPick,
  caption,
  setCaption,
  location,
  setLocation,
}: {
  onPick: (f: File) => void;
  caption: string;
  setCaption: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="p-3 flex items-center gap-3">
        <label className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-accent">
          <ImagePlus className="h-4 w-4" /> Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && e.target.files[0] && onPick(e.target.files[0])
            }
          />
        </label>
        <Input
          placeholder="Location (e.g., Giza Pyramids)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          placeholder="Write a caption…"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
    </Card>
  );
}

function PostCard({
  post,
  onLike,
  onComment,
  onShare,
}: {
  post: Post;
  onLike: () => void;
  onComment: (t: string) => void;
  onShare: () => void;
}) {
  const [text, setText] = useState("");
  const commentsCount = useMemo(
    () => post.comments.length,
    [post.comments.length],
  );
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{post.author[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <a
            href={`/u/${post.author}`}
            className="text-sm font-semibold hover:underline"
          >
            {post.author}
          </a>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <img
        src={post.img}
        alt={post.location}
        className="max-h-[600px] w-full object-cover bg-muted"
      />
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onLike}>
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Send className="h-5 w-5" />
          </Button>
          <div className="ml-auto">
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="text-sm font-semibold">{post.likes} likes</div>
        <div className="text-sm">
          <span className="font-semibold mr-1">{post.author}</span>
          {post.caption}
        </div>
        <div className="text-xs text-muted-foreground">
          View all {commentsCount} comments
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Input
            placeholder="Add a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onComment(text);
                setText("");
              }
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onComment(text);
              setText("");
            }}
          >
            Post
          </Button>
        </div>
      </div>
    </Card>
  );
}
