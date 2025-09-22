import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STORAGE_KEYS, load, save } from "@/lib/offline";

export default function AccountPage() {
  const saved = load(STORAGE_KEYS.profile, {
    name: "Traveler",
    verified: false,
  });
  const [name, setName] = useState<string>(saved.name);
  const [verified, setVerified] = useState<boolean>(saved.verified);

  function persist() {
    save(STORAGE_KEYS.profile, { name, verified });
  }

  return (
    <section className="container py-8">
      <Tabs defaultValue="user">
        <TabsList>
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="user" className="mt-6">
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Display name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Status:</span>
                {verified ? (
                  <Badge>Verified</Badge>
                ) : (
                  <Badge variant="secondary">Unverified</Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={persist}>Save</Button>
                <Button
                  variant="secondary"
                  onClick={() => setVerified((v) => !v)}
                >
                  {verified ? "Remove verification" : "Verify"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Moderation queue: 0 reports</p>
              <p>Trusted guides: 12</p>
              <p>Pending bookings: 3</p>
              <div className="flex items-center gap-3">
                <Button onClick={() => alert("Safety notice sent to users.")}>
                  Send safety notice
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    alert("Providers requested to update verification docs.")
                  }
                >
                  Request provider verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
