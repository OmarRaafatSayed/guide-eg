import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { toast } from "sonner";

interface LocationWithProducts {
  id: string;
  name: string;
  governorate: string;
  description: string;
  history: string;
  images: string[];
  openingHours: string;
  specialties: string[];
  products: any[];
}

export default function LocationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationWithProducts | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    import("@/lib/marketplace-data").then(({ sampleLocations, getProductsByLocation }) => {
      import("@/lib/marketplace-data-scraped").then(({ scrapedLocations }) => {
        const allLocations = [...sampleLocations, ...scrapedLocations];
        const locationData = allLocations.find(loc => loc.id === id);
        
        if (locationData) {
          const products = getProductsByLocation(id);
          setLocation({
            ...locationData,
            products
          });
        }
        setLoading(false);
      });
    }).catch(() => {
      setLoading(false);
      toast.error("Failed to load location details");
    });
  }, [id]);

  const handleAddToCart = (productId: string) => {
    toast.success("Product added to cart!");
  };

  const handleToggleFavorite = (productId: string) => {
    toast.success("Added to favorites");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading location details...</div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Location Not Found</h2>
          <Button onClick={() => navigate('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/marketplace')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Location Images */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-white">
              <img
                src={location.images[selectedImage]}
                alt={location.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {location.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {location.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${location.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{location.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{location.governorate}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{location.openingHours}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground mb-4">{location.description}</p>
              
              <h3 className="font-semibold mb-2">History</h3>
              <p className="text-muted-foreground">{location.history}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {location.specialties.map(specialty => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products from this location */}
        {location.products.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Products from this Location</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {location.products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}