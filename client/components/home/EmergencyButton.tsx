import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PhoneCall, ShieldAlert } from "lucide-react";

export function EmergencyButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <ShieldAlert className="h-4 w-4" /> Emergency
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Emergency Contacts (Egypt)</DialogTitle>
          <DialogDescription>
            Hospitals, police, embassy & tips
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <Contact label="Police" number="122" />
          <Contact label="Ambulance" number="123" />
          <Contact label="Fire" number="180" />
          <a
            className="inline-flex items-center gap-2 text-primary underline"
            href="https://www.google.com/maps/search/hospital+near+me"
            target="_blank"
            rel="noreferrer"
          >
            Find nearby hospitals
          </a>
          <a
            className="inline-flex items-center gap-2 text-primary underline"
            href="https://www.google.com/search?q=embassy+in+cairo"
            target="_blank"
            rel="noreferrer"
          >
            Find your embassy in Cairo
          </a>
          <p className="text-xs text-muted-foreground">
            Stay in public areas, keep copies of passports, and use verified
            guides.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Contact({ label, number }: { label: string; number: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">Dial {number}</div>
      </div>
      <Button asChild size="sm" className="gap-1">
        <a href={`tel:${number}`}>
          <PhoneCall className="h-4 w-4" /> Call
        </a>
      </Button>
    </div>
  );
}
