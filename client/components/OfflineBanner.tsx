import { useOnline } from "@/hooks/use-online";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const online = useOnline();
  if (online) return null;
  return (
    <div className="w-full bg-amber-100 text-amber-900 border-b border-amber-300">
      <div className="container py-2 text-sm flex items-center gap-2">
        <WifiOff className="h-4 w-4" /> Offline mode: some features are limited.
        Saved itineraries and feed are available.
      </div>
    </div>
  );
}
