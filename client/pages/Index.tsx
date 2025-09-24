import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapBrowser } from "@/components/home/MapBrowser";
import { TripPlanner } from "@/components/home/TripPlanner";
import { SocialPreview } from "@/components/home/SocialPreview";
import { AIGuide } from "@/components/home/AIGuide";
import { Missions } from "@/components/home/Missions";
import { EmergencyButton } from "@/components/home/EmergencyButton";
import { Calendar, Camera, Shield, MapPin, Zap } from "lucide-react";

export default function Index() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="container py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Zap className="h-3.5 w-3.5" /> English-only (Phase 1)
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Explore Egypt with confidence
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Interactive map, trip planner, social photo quests, AI guide, and
              strong safety features. Designed for foreign tourists.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="/map">Start Planning</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="/map">Explore Map</a>
              </Button>
              <EmergencyButton />
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Feature
                icon={<MapPin className="h-3.5 w-3.5 text-primary" />}
                label="Map of governorates & cities"
              />
              <Feature
                icon={<Calendar className="h-3.5 w-3.5 text-primary" />}
                label="Auto itinerary"
              />
              <Feature
                icon={<Camera className="h-3.5 w-3.5 text-primary" />}
                label="Photo quests"
              />
              <Feature
                icon={<Shield className="h-3.5 w-3.5 text-primary" />}
                label="Emergency help"
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-primary/20 blur-3xl rounded-full" />
            <div className="rounded-2xl border shadow-xl overflow-hidden">
              <MapBrowser />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 grid gap-6 md:grid-cols-2">
        <Missions />
        <AIGuide />
      </section>

      <section className="container pb-12 grid gap-6">
        <TripPlanner />
        <SocialPreview />
      </section>

      <section className="border-t bg-secondary/40">
        <div className="container py-10 flex flex-wrap items-center gap-4">
          <Badge>Offline mode (maps & itineraries) — coming soon</Badge>
          <Badge variant="secondary">Verified guides & secure payments</Badge>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
      {icon} {label}
    </span>
  );
}
