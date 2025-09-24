import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { STORAGE_KEYS, load, save } from "@/lib/offline";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

export function WelcomePlannerDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const seen = load<boolean>(STORAGE_KEYS.welcomeSeen, false);
    if (!seen) setOpen(true);
  }, []);

  function close(seen: boolean) {
    if (seen) save(STORAGE_KEYS.welcomeSeen, true);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close(true))}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">
            Ready to plan your Egypt trip?
          </DialogTitle>
          <DialogDescription>
            Start with our interactive 2D cartoon map of Egypt. Pick governorates,
            explore historical and coastal spots, choose hotels, then generate a
            day-by-day itinerary.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            className="gap-2"
            onClick={() => {
              save(STORAGE_KEYS.welcomeSeen, true);
              setOpen(false);
              navigate("/map");
            }}
          >
            <MapPin className="h-4 w-4" /> Start planning now
          </Button>
          <Button variant="secondary" onClick={() => close(true)}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
