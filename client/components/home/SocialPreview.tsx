import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Camera } from "lucide-react";

const samplePosts = [
  {
    id: "p1",
    user: "Lena",
    location: "Giza Pyramids",
    likes: 128,
    img: "/placeholder.svg",
  },
  {
    id: "p2",
    user: "Tom",
    location: "Karnak Temple",
    likes: 94,
    img: "/placeholder.svg",
  },
];

export function SocialPreview() {
  const [likes, setLikes] = useState<Record<string, number>>(
    Object.fromEntries(samplePosts.map((p) => [p.id, p.likes])),
  );

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Camera className="h-5 w-5 text-primary" /> Social Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {samplePosts.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-xl border">
            <img
              src={p.img}
              alt={p.location}
              className="h-48 w-full object-cover bg-muted"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.user}</div>
                <div className="text-xs text-muted-foreground">
                  {p.location}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setLikes((s) => ({ ...s, [p.id]: s[p.id] + 1 }))
                  }
                >
                  <Heart className="h-4 w-4 mr-1" /> {likes[p.id]}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" /> Comment
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
