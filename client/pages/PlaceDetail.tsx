import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  DollarSign, 
  Calendar,
  Users,
  Ticket,
  Heart,
  Share2,
  Camera,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { attractions, Attraction } from "@/lib/egypt-data";
import { toast } from "@/hooks/use-toast";

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const place = attractions.find(a => a.id === id);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleBookTicket = () => {
    toast({
      title: "Booking Ticket",
      description: `Redirecting to book tickets for ${place.name}`,
    });
    // Here you would integrate with booking system
  };

  const handleSelectPlace = () => {
    setIsSelected(!isSelected);
    const action = isSelected ? "removed from" : "added to";
    toast({
      title: isSelected ? "Removed from Trip" : "Added to Trip",
      description: `${place.name} has been ${action} your trip plan`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: `Check out ${place.name} in ${place.city}, ${place.governorate}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Place link copied to clipboard",
      });
    }
  };

  const isEcoFriendly = place.name.includes('Museum') || 
                       place.name.includes('National Park') ||
                       place.name.includes('Reserve') ||
                       place.type === 'coastal' ||
                       place.name.includes('Eco');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[#004A58] to-[#FFC211] flex items-center justify-center">
                <Camera className="h-16 w-16 text-white/50" />
              </div>
            </Card>

            {/* Place Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-[#2E2F2D]">
                      {place.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{place.city}, {place.governorate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {place.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{place.rating}</span>
                      </div>
                    )}
                    {isEcoFriendly && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Leaf className="h-3 w-3 mr-1" />
                        Eco-Friendly
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {place.description || `Discover the beauty and history of ${place.name}, one of ${place.governorate}'s most remarkable destinations. Experience the rich culture and heritage that makes this place truly special.`}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {place.estHours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{place.estHours}h</p>
                        <p className="text-xs text-muted-foreground">Duration</p>
                      </div>
                    </div>
                  )}
                  {place.priceRange && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{place.priceRange}</p>
                        <p className="text-xs text-muted-foreground">Price Range</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">All Ages</p>
                      <p className="text-xs text-muted-foreground">Suitable for</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Year Round</p>
                      <p className="text-xs text-muted-foreground">Open</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Get There</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {place.bestTransport.map((transport) => (
                    <Badge key={transport} variant="outline">
                      {transport}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Best Time to Visit</h4>
                    <p className="text-sm text-muted-foreground">
                      October to April for comfortable weather
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">What to Bring</h4>
                    <p className="text-sm text-muted-foreground">
                      Camera, comfortable shoes, sun protection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Plan Your Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {place.priceRange && (
                  <div className="text-center p-4 bg-[#004A58]/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-bold text-[#004A58]">
                      {place.priceRange === '$' && '50 EGP'}
                      {place.priceRange === '$$' && '150 EGP'}
                      {place.priceRange === '$$$' && '300 EGP'}
                      {place.priceRange === '$$$$' && '500 EGP'}
                    </p>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#004A58] to-[#FFC211] hover:from-[#004A58]/90 hover:to-[#FFC211]/90"
                    onClick={handleBookTicket}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Book Ticket
                  </Button>
                  
                  <Button 
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full ${isSelected ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={handleSelectPlace}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isSelected ? 'fill-white' : ''}`} />
                    {isSelected ? 'Added to Trip' : 'Add to Trip'}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  Book now and get 10% discount on your first visit
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="text-sm font-medium capitalize">{place.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">{place.city}</span>
                </div>
                {place.rating && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <span className="text-sm font-medium">{place.rating}/5</span>
                  </div>
                )}
                {place.estHours && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{place.estHours} hours</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}