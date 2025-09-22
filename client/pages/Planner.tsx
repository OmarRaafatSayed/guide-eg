import { useMemo, useState } from "react";
import { attractions as allAttractions } from "@/lib/egypt-data";
import { STORAGE_KEYS, load, save } from "@/lib/offline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Download, Save } from "lucide-react";

export default function PlannerPage() {
  const saved = load<{ days: number; selected: string[]; plan: Slot[][] }>(
    STORAGE_KEYS.itinerary,
    { days: 3, selected: [], plan: [] },
  );
  const [days, setDays] = useState<number>(saved.days || 3);
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries((saved.selected || []).map((id) => [id, true])),
  );
  const selectedIds = Object.keys(selected).filter((id) => selected[id]);
  const itinerary = useMemo(
    () => generateItinerary(days, selectedIds),
    [days, selectedIds],
  );

  function persist() {
    save(STORAGE_KEYS.itinerary, {
      days,
      selected: selectedIds,
      plan: itinerary,
    });
  }
  function exportJSON() {
    const blob = new Blob(
      [JSON.stringify({ days, selections: selectedIds, itinerary }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "itinerary.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="container py-8 grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Plan your trip</CardTitle>
        </CardHeader>
        <CardContent>
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
            Select destinations
          </p>
          <div className="max-h-72 overflow-auto rounded-md border p-3 space-y-2 bg-card">
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
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={persist} className="gap-2">
              <Save className="h-4 w-4" /> Save offline
            </Button>
            <Button variant="secondary" onClick={exportJSON} className="gap-2">
              <Download className="h-4 w-4" /> Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
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
                      <li key={sIdx}>
                        {slot.time} — {slot.name} ({slot.city})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

type Slot = { time: string; name: string; city: string };
function generateItinerary(days: number, ids: string[]): Slot[][] {
  const chosen = allAttractions.filter((a) => ids.includes(a.id));
  if (chosen.length === 0) return [];
  const perDay = Math.max(1, Math.ceil(chosen.length / days));
  const slots = ["09:00", "12:30", "15:30"]; // simple slotting
  const result: Slot[][] = Array.from({ length: days }, () => []);
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
