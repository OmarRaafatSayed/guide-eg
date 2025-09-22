import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Calendar,
  Clock,
  Users,
  Phone,
  Globe,
  Mail,
  Award,
  Leaf,
  CheckCircle,
  Camera,
  Navigation
} from "lucide-react";

// Mock data - in real app this would come from API
const placeDetails = {
  id: 1,
  name: "Fayoum Eco Lodge",
  type: "Hotel",
  category: "Accommodation",
  location: "Fayoum Oasis",
  governorate: "Fayoum",
  rating: 4.8,
  reviewCount: 156,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  description: "Experience sustainable luxury at Fayoum Eco Lodge, where traditional Egyptian hospitality meets modern environmental consciousness. Our solar-powered facility features organic gardens, water conservation systems, and locally-sourced materials throughout.",
  longDescription: `
    Nestled in the heart of Fayoum Oasis, our eco lodge represents the perfect harmony between comfort and sustainability. Built using traditional mud-brick construction techniques and modern eco-friendly technologies, we offer guests an authentic Egyptian experience while maintaining our commitment to environmental protection.

    Our facility operates entirely on renewable energy, with solar panels providing all electricity needs. We maintain organic vegetable gardens that supply our restaurant, and our water conservation systems ensure minimal environmental impact. All construction materials were sourced locally, supporting the community economy.

    The lodge features traditional architecture with modern amenities, offering guests comfortable accommodations while educating them about sustainable living practices. Our guided tours include visits to local artisan workshops, organic farms, and conservation projects in the area.
  `,
  certifications: [
    { name: "Green Key", description: "International eco-label for tourism accommodation" },
    { name: "EarthCheck", description: "World's leading environmental certification program" },
    { name: "Fair Trade Tourism", description: "Ensures fair wages and working conditions" }
  ],
  features: [
    "100% Solar Energy",
    "Organic Gardens",
    "Water Conservation",
    "Local Materials",
    "Community Support",
    "Waste Reduction",
    "Cultural Preservation",
    "Educational Programs"
  ],
  amenities: [
    "Free WiFi",
    "Restaurant",
    "Swimming Pool",
    "Spa Services",
    "Guided Tours",
    "Bicycle Rental",
    "Library",
    "Conference Room"
  ],
  contact: {
    phone: "+20 84 123 4567",
    email: "info@fayoumecolodge.com",
    website: "www.fayoumecolodge.com",
    address: "Fayoum Oasis, Fayoum Governorate, Egypt"
  },
  openingHours: "24/7 (Hotel)",
  priceRange: "$$$ (150-300 EGP per night)",
  sustainabilityScore: 95,
  impactMetrics: {
    carbonReduction: "75%",
    waterSaved: "60%",
    localEmployment: "95%",
    wasteReduction: "80%"
  }
};

export default function GreenTourismPlaceDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/green-tourism/places">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Places
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={placeDetails.images[selectedImage]} 
                  alt={placeDetails.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500">
                    <Leaf className="h-3 w-3 mr-1" />
                    Eco-Certified
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {placeDetails.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${placeDetails.name} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                        selectedImage === index ? 'ring-2 ring-green-500' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Place Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{placeDetails.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {placeDetails.location}, {placeDetails.governorate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {placeDetails.rating} ({placeDetails.reviewCount} reviews)
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{placeDetails.category}</Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {placeDetails.sustainabilityScore}% Sustainable
                      </Badge>
                    </div>
                  </div>
                  
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {placeDetails.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {placeDetails.features.slice(0, 6).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Place</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {placeDetails.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sustainability" className="mt-6">
                <div className="space-y-6">
                  {/* Impact Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {placeDetails.impactMetrics.carbonReduction}
                          </div>
                          <div className="text-sm text-gray-600">Carbon Reduction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {placeDetails.impactMetrics.waterSaved}
                          </div>
                          <div className="text-sm text-gray-600">Water Saved</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            {placeDetails.impactMetrics.localEmployment}
                          </div>
                          <div className="text-sm text-gray-600">Local Employment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {placeDetails.impactMetrics.wasteReduction}
                          </div>
                          <div className="text-sm text-gray-600">Waste Reduction</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {placeDetails.certifications.map((cert, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Award className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold">{cert.name}</h4>
                              <p className="text-sm text-gray-600">{cert.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities & Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {placeDetails.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      Reviews feature coming soon...
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Visit This Place</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg font-semibold text-green-600">
                  {placeDetails.priceRange}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {placeDetails.openingHours}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{placeDetails.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{placeDetails.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{placeDetails.contact.website}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-sm">{placeDetails.contact.address}</span>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Sustainability Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {placeDetails.sustainabilityScore}%
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Excellent sustainability practices
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${placeDetails.sustainabilityScore}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}