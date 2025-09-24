import { useEffect } from "react";
import { useOnline } from "@/hooks/use-online";

export function MapCanvas({ city, query }: { city: string; query: string }) {
  const online = useOnline();

  useEffect(() => {
    // no-op, could prefetch map tiles later
  }, [city]);

  if (!online) {
    return (
      <div className="relative h-80 w-full rounded-xl border bg-gradient-to-br from-secondary to-background grid place-items-center">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Offline map</div>
          <div className="mt-1 text-2xl font-extrabold">{city}</div>
          <svg viewBox="0 0 200 100" className="mt-3 h-24 w-48 opacity-60">
            <rect
              x="10"
              y="20"
              width="180"
              height="60"
              rx="8"
              fill="currentColor"
              className="text-muted-foreground"
            />
            <circle
              cx="60"
              cy="50"
              r="6"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="120"
              cy="45"
              r="5"
              fill="currentColor"
              className="text-accent"
            />
            <circle
              cx="150"
              cy="65"
              r="4"
              fill="currentColor"
              className="text-primary"
            />
          </svg>
          <p className="text-xs text-muted-foreground">
            When online, a live map will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border">
      <iframe
        title={`Map of ${city}`}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      />
    </div>
  );
}
