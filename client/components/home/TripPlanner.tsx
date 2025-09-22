import { useMemo, useState } from "react";
import { attractions as allAttractions } from "@/lib/egypt-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";

export function TripPlanner() {
  const [days, setDays] = useState<number>(3);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const selectedIds = Object.keys(selected).filter((id) => selected[id]);

  const itinerary = useMemo(
    () => generateItinerary(days, selectedIds),
    [days, selectedIds],
  );

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-primary" /> Trip Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Trip days</label>
            <Input
              type="number"
              min={1}
              max={14}
              value={days}
              onChange={(e) =>
                setDays(Math.max(1, Math.min(14, Number(e.target.value))))
              }
            />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Pick destinations to include:
          </p>
          <div className="max-h-64 overflow-auto rounded-md border p-3 space-y-2 bg-card">
            {allAttractions.map((a) => (
              <label key={a.id} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={!!selected[a.id]}
                  onCheckedChange={(v) =>
                    setSelected((s) => ({ ...s, [a.id]: !!v }))
                  }
                />
                <span className="font-medium">{a.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {a.city}
                </span>
              </label>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Generate
          </Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Suggested Itinerary</h3>
          {itinerary.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Select at least one destination.
            </p>
          )}
          <div className="space-y-3">
            {itinerary.map((day, idx) => (
              <div key={idx} className="rounded-lg border p-4">
                <div className="font-medium mb-2">Day {idx + 1}</div>
                {day.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Free day / travel / rest
                  </p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {day.map((slot, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-primary" />{" "}
                        {slot.time} — {slot.name} ({slot.city})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function generateItinerary(days: number, ids: string[]) {
  const chosen = allAttractions.filter((a) => ids.includes(a.id));
  if (chosen.length === 0)
    return [] as { time: string; name: string; city: string }[][];
  const perDay = Math.max(1, Math.ceil(chosen.length / days));
  const slots = ["09:00", "12:30", "15:30"]; // simple slotting
  const result: { time: string; name: string; city: string }[][] = Array.from(
    { length: days },
    () => [],
  );
  let index = 0;
  for (let d = 0; d < days; d++) {
    for (let i = 0; i < perDay && index < chosen.length; i++) {
      const a = chosen[index++];
      const time = slots[Math.min(i, slots.length - 1)];
      result[d].push({ time, name: a.name, city: a.city });
    }
  }
  return result;
}
