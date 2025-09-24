import { useMemo } from "react";
import { attractions, Attraction } from "@/lib/egypt-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Building2, Utensils, Waves, Mountain } from "lucide-react";

function filterByCategory(items: Attraction[], cat: string) {
  switch (cat) {
    case "history":
      return items.filter((a) => a.type === "landmark" || a.type === "religious");
    case "museums":
      return items.filter((a) => a.type === "museum");
    case "beaches":
      return items.filter((a) => a.city === "Alexandria");
    case "cuisines":
      return items.filter((a) => a.type === "market");
    case "mounds":
      return items.filter((a) => a.type === "activity");
    default:
      return items;
  }
}

export function MapInfoPanel({ selectedGov }: { selectedGov: string }) {
  const govItems = useMemo(
    () => attractions.filter((a) => a.governorate === selectedGov),
    [selectedGov],
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Explore {selectedGov}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="history">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="history" className="gap-1 text-xs">
              <Landmark className="h-3.5 w-3.5" /> History
            </TabsTrigger>
            <TabsTrigger value="museums" className="gap-1 text-xs">
              <Building2 className="h-3.5 w-3.5" /> Museums
            </TabsTrigger>
            <TabsTrigger value="beaches" className="gap-1 text-xs">
              <Waves className="h-3.5 w-3.5" /> Beaches
            </TabsTrigger>
            <TabsTrigger value="cuisines" className="gap-1 text-xs">
              <Utensils className="h-3.5 w-3.5" /> Cuisines
            </TabsTrigger>
            <TabsTrigger value="mounds" className="gap-1 text-xs">
              <Mountain className="h-3.5 w-3.5" /> Sites
            </TabsTrigger>
          </TabsList>

          {(["history", "museums", "beaches", "cuisines", "mounds"] as const).map(
            (cat) => (
              <TabsContent key={cat} value={cat} className="mt-4">
                <ul className="space-y-3">
                  {filterByCategory(govItems, cat).map((a) => (
                    <li key={a.id} className="flex items-center justify-between rounded-md border p-3 bg-card">
                      <div>
                        <div className="text-sm font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {a.type} • {a.city}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {a.estHours ? `~${a.estHours}h` : ""}
                      </div>
                    </li>
                  ))}
                  {filterByCategory(govItems, cat).length === 0 && (
                    <div className="text-xs text-muted-foreground">No items for this category.</div>
                  )}
                </ul>
              </TabsContent>
            ),
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
