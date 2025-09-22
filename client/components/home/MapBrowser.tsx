import { useMemo, useState } from "react";
import {
  governorates,
  getCities,
  getAttractionsByCity,
  Attraction,
} from "@/lib/egypt-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Landmark, Train } from "lucide-react";

export function MapBrowser({
  initialGov,
  initialCity,
  onSelectionChange,
}: {
  initialGov?: string;
  initialCity?: string;
  onSelectionChange?: (gov: string, city: string) => void;
}) {
  const govNames = useMemo(() => Object.keys(governorates), []);
  const defaultGov = govNames.includes(initialGov || '') ? initialGov! : 'Cairo';
  const cities = getCities(defaultGov);
  const defaultCity = cities.includes(initialCity || '') ? initialCity! : cities[0];
  const [gov, setGov] = useState<string>(defaultGov);
  const [city, setCity] = useState<string>(defaultCity);

  const currentCities = getCities(gov);
  const attractions = useMemo(
    () => (city ? getAttractionsByCity(city) : []),
    [city],
  );

  function updateGov(v: string) {
    const newCities = getCities(v);
    const firstCity = newCities[0] || v;
    setGov(v);
    setCity(firstCity);
    onSelectionChange?.(v, firstCity);
  }
  function updateCity(v: string) {
    setCity(v);
    onSelectionChange?.(gov, v);
  }

  return (
    <Card className="border-none shadow-md bg-gradient-to-br from-secondary to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" /> Explore Egypt
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Governorate
              </label>
              <Select value={gov} onValueChange={updateGov}>
                <SelectTrigger>
                  <SelectValue placeholder="Select governorate" />
                </SelectTrigger>
                <SelectContent>
                  {govNames.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">City</label>
              <Select value={city} onValueChange={updateCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {currentCities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Browse governorates → select city → view attractions and best
            transport options.
          </p>
        </div>
        <div className="grid gap-3">
          {attractions.map((a) => (
            <AttractionItem key={a.id} attraction={a} />
          ))}
          {attractions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Select a governorate to see attractions.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AttractionItem({ attraction }: { attraction: Attraction }) {
  return (
    <div className="flex items-start justify-between rounded-lg border bg-card p-4 shadow-sm">
      <div>
        <div className="flex items-center gap-2 font-medium">
          <Landmark className="h-4 w-4 text-primary" />
          {attraction.name}
        </div>
        <div className="mt-1 text-xs text-muted-foreground capitalize">
          {attraction.type} • {attraction.city}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {attraction.bestTransport.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Train className="h-3 w-3" />
              {t}
            </Badge>
          ))}
        </div>
      </div>
      {attraction.estHours && (
        <div className="text-xs text-muted-foreground">
          ~{attraction.estHours}h
        </div>
      )}
    </div>
  );
}
