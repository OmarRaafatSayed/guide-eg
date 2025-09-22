import { motion } from "framer-motion";
import { MapPin, Clock, Star } from "lucide-react";
import { ArtisanLocation } from "@/lib/marketplace-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface LocationCardProps {
  location: ArtisanLocation;
}

export function LocationCard({ location }: LocationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/marketplace/location/${location.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3]">
          <img
            src={location.images[0]}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg mb-1">{location.name}</h3>
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {location.governorate}
            </div>
          </div>

          <Badge className="absolute top-4 right-4 bg-white/90 text-black">
            {location.products.length} Products
          </Badge>
        </div>

        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {location.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {location.openingHours}
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {location.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}