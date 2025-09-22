import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    id: "g1",
    title: "Certified Cairo Guide (4h)",
    price: 45,
    tag: "Guide",
    img: "/placeholder.svg",
  },
  {
    id: "g2",
    title: "Nile Felucca Sunset Ride",
    price: 25,
    tag: "Activity",
    img: "/placeholder.svg",
  },
  {
    id: "g3",
    title: "Luxor West Bank Day Tour",
    price: 70,
    tag: "Tour",
    img: "/placeholder.svg",
  },
  {
    id: "g4",
    title: "Handmade Papyrus Artwork",
    price: 18,
    tag: "Souvenir",
    img: "/placeholder.svg",
  },
];

export default function MarketplacePage() {
  return (
    <section className="container py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it) => (
        <Card key={it.id} className="overflow-hidden">
          <img
            src={it.img}
            alt={it.title}
            className="h-44 w-full object-cover bg-muted"
          />
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>{it.title}</span>
              <Badge variant="secondary">{it.tag}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              From ${it.price} USD
            </div>
          </CardContent>
          <CardFooter>
            <BookDialog title={it.title} price={it.price} />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

function BookDialog({ title, price }: { title: string; price: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p>Total: ${price} USD</p>
          <p>
            We’ll confirm via email/SMS. Payments and verified provider profiles
            coming soon.
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => alert("Request sent! We will contact you shortly.")}
          >
            Confirm Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
