import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Heart,
  ArrowLeft,
  Leaf,
  Award,
  Building2,
  Waves,
  Mountain,
  TreePine
} from "lucide-react";

const sustainablePlaces = [
  {
    id: 1,
    name: "Fayoum Eco Lodge",
    type: "Hotel",
    category: "Accommodation",
    location: "Fayoum",
    governorate: "Fayoum",
    rating: 4.8,
    image: "/placeholder.svg",
    description: "Solar-powered eco lodge with organic gardens and water conservation systems",
    certifications: ["Green Key", "EarthCheck"],
    features: ["Solar Energy", "Organic Food", "Water Conservation"],
    isCoastal: false,
    isHistorical: false
  },
  {
    id: 2,
    name: "Ras Mohammed National Park",
    type: "Natural Site",
    category: "Natural Site",
    location: "Sharm El Sheikh",
    governorate: "South Sinai",
    rating: 4.9,
    image: "/placeholder.svg",
    description: "Protected marine park with coral reef conservation programs",
    certifications: ["UNESCO", "IUCN"],
    features: ["Marine Conservation", "Eco Trails", "Research Center"],
    isCoastal: true,
    isHistorical: false
  },
  {
    id: 3,
    name: "Siwa Sustainable Tours",
    type: "Tour Operator",
    category: "Tour Operator",
    location: "Siwa Oasis",
    governorate: "Matrouh",
    rating: 4.7,
    image: "/placeholder.svg",
    description: "Community-based tourism supporting local Berber culture",
    certifications: ["Fair Trade Tourism"],
    features: ["Community Support", "Cultural Preservation", "Local Guides"],
    isCoastal: false,
    isHistorical: true
  },
  {
    id: 4,
    name: "Marsa Alam Eco Resort",
    type: "Resort",
    category: "Accommodation",
    location: "Marsa Alam",
    governorate: "Red Sea",
    rating: 4.6,
    image: "/placeholder.svg",
    description: "Beachfront resort with marine conservation programs and renewable energy",
    certifications: ["Green Globe", "Blue Flag"],
    features: ["Renewable Energy", "Marine Protection", "Local Employment"],
    isCoastal: true,
    isHistorical: false
  },
  {
    id: 5,
    name: "Aswan Heritage Museum",
    type: "Museum",
    category: "Museum",
    location: "Aswan",
    governorate: "Aswan",
    rating: 4.5,
    image: "/placeholder.svg",
    description: "Sustainable museum showcasing Nubian culture with eco-friendly practices",
    certifications: ["Green Museum"],
    features: ["Cultural Preservation", "Solar Power", "Community Programs"],
    isCoastal: false,
    isHistorical: true
  },
  {
    id: 6,
    name: "White Desert Eco Camp",
    type: "Camp",
    category: "Accommodation",
    location: "Farafra",
    governorate: "New Valley",
    rating: 4.8,
    image: "/placeholder.svg",
    description: "Sustainable desert camping with minimal environmental impact",
    certifications: ["Leave No Trace"],
    features: ["Zero Waste", "Solar Power", "Desert Conservation"],
    isCoastal: false,
    isHistorical: false
  }
];

const governorates = [
  "All Governorates",
  "Cairo",
  "Alexandria",
  "Giza",
  "Aswan",
  "Luxor",
  "Red Sea",
  "South Sinai",
  "Fayoum",
  "Matrouh",
  "New Valley"
];

const categories = [
  "All Categories",
  "Accommodation",
  "Natural Site",
  "Museum",
  "Tour Operator",
  "Restaurant"
];

export default function GreenTourismPlaces() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("All Governorates");
  const [selectedCategory, setSelectedCategory] = useState(category || "All Categories");
  const [filterCoastal, setFilterCoastal] = useState(false);
  const [filterHistorical, setFilterHistorical] = useState(false);
  const [likedPlaces, setLikedPlaces] = useState<number[]>([]);

  const filteredPlaces = useMemo(() => {
    return sustainablePlaces.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           place.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGovernorate = selectedGovernorate === "All Governorates" || 
                                place.governorate === selectedGovernorate;
      const matchesCategory = selectedCategory === "All Categories" || 
                             place.category === selectedCategory;
      const matchesCoastal = !filterCoastal || place.isCoastal;
      const matchesHistorical = !filterHistorical || place.isHistorical;

      return matchesSearch && matchesGovernorate && matchesCategory && 
             matchesCoastal && matchesHistorical;
    });
  }, [searchTerm, selectedGovernorate, selectedCategory, filterCoastal, filterHistorical]);

  const toggleLike = (placeId: number) => {
    setLikedPlaces(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Accommodation": return Building2;
      case "Natural Site": return TreePine;
      case "Museum": return Mountain;
      default: return MapPin;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/green-tourism">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Green Tourism
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sustainable Places in Egypt
          </h1>
          <p className="text-gray-600">
            Discover eco-friendly destinations that support environmental conservation and community development
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Places</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Governorate Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Governorate</label>
                  <Select value={selectedGovernorate} onValueChange={setSelectedGovernorate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {governorates.map(gov => (
                        <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type Filters */}
                <div className="space-y-3">
                  <label className="text-sm font-medium block">Type</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="coastal"
                        checked={filterCoastal}
                        onChange={(e) => setFilterCoastal(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="coastal" className="text-sm font-medium flex items-center gap-2">
                        <Waves className="h-4 w-4 text-blue-500" />
                        Coastal Areas
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="historical"
                        checked={filterHistorical}
                        onChange={(e) => setFilterHistorical(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="historical" className="text-sm font-medium flex items-center gap-2">
                        <Mountain className="h-4 w-4 text-amber-500" />
                        Historical Sites
                      </label>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGovernorate("All Governorates");
                    setSelectedCategory("All Categories");
                    setFilterCoastal(false);
                    setFilterHistorical(false);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Found {filteredPlaces.length} sustainable places
              </p>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => {
                const CategoryIcon = getCategoryIcon(place.category);
                const isLiked = likedPlaces.includes(place.id);
                
                return (
                  <Card key={place.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-green-500">
                          <Leaf className="h-3 w-3 mr-1" />
                          Eco-Certified
                        </Badge>
                        <Badge variant="secondary">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {place.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{place.rating}</span>
                        </div>
                      </div>
                      {place.isCoastal && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-blue-500">
                            <Waves className="h-3 w-3 mr-1" />
                            Coastal
                          </Badge>
                        </div>
                      )}
                      {place.isHistorical && (
                        <div className="absolute bottom-4 right-4">
                          <Badge className="bg-amber-500">
                            <Mountain className="h-3 w-3 mr-1" />
                            Historical
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {place.name}
                        <Heart 
                          className={`h-5 w-5 cursor-pointer transition-colors ${
                            isLiked ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
                          }`}
                          onClick={() => toggleLike(place.id)}
                        />
                      </CardTitle>
                      <CardDescription>
                        {place.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        {place.location}, {place.governorate}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {place.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {place.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{place.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {place.certifications.map((cert, index) => (
                          <Badge key={index} className="text-xs bg-green-100 text-green-800">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/green-tourism/places/${place.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="text-center py-12">
                <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No places found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find more sustainable places
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGovernorate("All Governorates");
                    setSelectedCategory("All Categories");
                    setFilterCoastal(false);
                    setFilterHistorical(false);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}