import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { STORAGE_KEYS, load } from "@/lib/offline";
import type { Post } from "./Feed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { handle = "" } = useParams();
  const posts = load<Post[]>(STORAGE_KEYS.posts, []);
  const userPosts = useMemo(
    () => posts.filter((p) => p.author.toLowerCase() === handle?.toLowerCase()),
    [posts, handle],
  );

  const countPosts = userPosts.length;
  const countFollowers = 120; // demo
  const countFollowing = 80; // demo

  return (
    <section className="container py-8">
      <div className="flex items-center gap-8">
        <div className="h-28 w-28 rounded-full bg-secondary" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{handle}</h1>
            <Badge>Verified</Badge>
            <Button size="sm">Follow</Button>
            <Button size="sm" variant="secondary">
              Message
            </Button>
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
          <div className="text-sm">
            <span className="font-semibold">{handle}</span> • Egypt Heritage
            Explorer
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts" className="mt-8">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="tagged">Tagged</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <Grid posts={userPosts} />
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          <div className="text-sm text-muted-foreground">
            Saved posts will appear here.
          </div>
        </TabsContent>
        <TabsContent value="tagged" className="mt-6">
          <div className="text-sm text-muted-foreground">
            Tagged posts will appear here.
          </div>
        </TabsContent>
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
            src={p.img}
            alt={p.location}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
