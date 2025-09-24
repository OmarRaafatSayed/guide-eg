import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

const KEY = "nile-mission-complete";

export function Missions() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDone(localStorage.getItem(KEY) === "1");
  }, []);
  function complete() {
    setDone(true);
    localStorage.setItem(KEY, "1");
  }

  return (
    <Card className="border-none shadow-md bg-gradient-to-br from-accent/20 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-primary" /> Daily Mission
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <div className="font-medium">Snap a landmark and share it</div>
          <div className="text-sm text-muted-foreground">
            Earn the "Explorer" badge
          </div>
        </div>
        {done ? (
          <Badge className="text-xs">Completed</Badge>
        ) : (
          <Button onClick={complete}>Mark Done</Button>
        )}
      </CardContent>
    </Card>
  );
}
