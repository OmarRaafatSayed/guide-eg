import { useEffect, useMemo, useState } from "react";
import { MapBrowser } from "@/components/home/MapBrowser";
import { MapCanvas } from "@/components/home/MapCanvas";
import { getCities, governorates } from "@/lib/egypt-data";
import { STORAGE_KEYS, load, save } from "@/lib/offline";

export default function MapPage() {
  const govNames = useMemo(() => Object.keys(governorates), []);
  const [gov, setGov] = useState<string>(govNames[0]);
  const [city, setCity] = useState<string>(
    load(STORAGE_KEYS.mapCity, getCities(govNames[0])[0]),
  );

  useEffect(() => {
    save(STORAGE_KEYS.mapCity, city);
  }, [city]);

  return (
    <section className="container py-8 grid gap-6 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <MapBrowser
          initialGov={gov}
          initialCity={city}
          onSelectionChange={(g, c) => {
            setGov(g);
            setCity(c);
          }}
        />
      </div>
      <div className="order-1 md:order-2">
        <MapCanvas city={city} query={`${city}, ${gov}, Egypt landmarks`} />
      </div>
    </section>
  );
}
