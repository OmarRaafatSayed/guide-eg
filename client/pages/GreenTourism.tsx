import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Recycle, 
  TreePine, 
  Waves, 
  Mountain, 
  Building2,
  MapPin,
  Star,
  Users,
  Award,
  ArrowRight,
  Shield,
  Heart,
  Globe
} from "lucide-react";

const sustainablePlaces = [
  {
    id: 1,
    name: "Fayoum Eco Lodge",
    type: "Hotel",
    location: "Fayoum",
    rating: 4.8,
    image: "/placeholder.svg",
    description: "Solar-powered eco lodge with organic gardens and water conservation systems",
    certifications: ["Green Key", "EarthCheck"],
    features: ["Solar Energy", "Organic Food", "Water Conservation"]
  },
  {
    id: 2,
    name: "Ras Mohammed National Park",
    type: "Natural Site",
    location: "South Sinai",
    rating: 4.9,
    image: "/placeholder.svg",
    description: "Protected marine park with coral reef conservation programs",
    certifications: ["UNESCO", "IUCN"],
    features: ["Marine Conservation", "Eco Trails", "Research Center"]
  },
  {
    id: 3,
    name: "Siwa Sustainable Tours",
    type: "Tour Operator",
    location: "Siwa Oasis",
    rating: 4.7,
    image: "/placeholder.svg",
    description: "Community-based tourism supporting local Berber culture",
    certifications: ["Fair Trade Tourism"],
    features: ["Community Support", "Cultural Preservation", "Local Guides"]
  }
];

const ecoTips = [
  {
    icon: Recycle,
    title: "Reduce Plastic Waste",
    description: "Bring reusable water bottles and bags. Many sites have water refill stations."
  },
  {
    icon: TreePine,
    title: "Respect Wildlife",
    description: "Maintain safe distances from animals and never feed wildlife in natural areas."
  },
  {
    icon: Waves,
    title: "Protect Marine Life",
    description: "Use reef-safe sunscreen and avoid touching coral reefs while snorkeling."
  },
  {
    icon: Mountain,
    title: "Leave No Trace",
    description: "Take only photos, leave only footprints. Keep natural areas pristine."
  }
];

const impactStats = [
  { number: "50+", label: "Certified Eco Places", icon: Award },
  { number: "10K+", label: "Eco-Conscious Travelers", icon: Users },
  { number: "25%", label: "Carbon Footprint Reduction", icon: Leaf },
  { number: "15", label: "Conservation Projects", icon: Shield }
];

export default function GreenTourism() {
  const [hoveredPlace, setHoveredPlace] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            Sustainable Travel Initiative
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Green
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 block">
              Tourism
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover Egypt's natural wonders while protecting them for future generations. 
            Travel responsibly and support sustainable tourism practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3">
              <MapPin className="h-5 w-5 mr-2" />
              Explore Eco Places
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
              <Globe className="h-5 w-5 mr-2" />
              Learn Guidelines
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sustainable Places */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Sustainable Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover places that prioritize environmental protection and community development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sustainablePlaces.map((place) => (
              <Card 
                key={place.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  hoveredPlace === place.id ? 'ring-2 ring-green-500' : ''
                }`}
                onMouseEnter={() => setHoveredPlace(place.id)}
                onMouseLeave={() => setHoveredPlace(null)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {place.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Leaf className="h-6 w-6 text-green-500 bg-white/90 rounded-full p-1" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {place.name}
                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {place.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {place.location}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.certifications.map((cert, index) => (
                      <Badge key={index} className="text-xs bg-green-100 text-green-800">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full group-hover:bg-green-600 transition-colors">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/green-tourism/places">
                <MapPin className="h-5 w-5 mr-2" />
                Explore All Eco Places
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Eco Guidelines */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Responsible Travel Guidelines
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple guidelines to minimize your environmental impact while exploring Egypt
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoTips.map((tip, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <tip.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conservation Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about ongoing conservation efforts you can support during your visit
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Red Sea Coral Restoration"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-blue-500">Marine Conservation</Badge>
              </div>
              <CardHeader>
                <CardTitle>Red Sea Coral Restoration</CardTitle>
                <CardDescription>
                  Protecting and restoring coral reefs through community-based conservation programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Desert Wildlife Protection"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-500">Wildlife Protection</Badge>
              </div>
              <CardHeader>
                <CardTitle>Desert Wildlife Protection</CardTitle>
                <CardDescription>
                  Safeguarding endangered species in Egypt's desert ecosystems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Nile River Clean-up"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-green-500">River Conservation</Badge>
              </div>
              <CardHeader>
                <CardTitle>Nile River Clean-up</CardTitle>
                <CardDescription>
                  Community initiatives to protect and clean Egypt's lifeline river
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Green Tourism Movement
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Be part of the solution. Travel responsibly and help preserve Egypt's natural heritage for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              <Leaf className="h-5 w-5 mr-2" />
              Find Eco Places
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Globe className="h-5 w-5 mr-2" />
              Download Guidelines
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}