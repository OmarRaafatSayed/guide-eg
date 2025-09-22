import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Star, 
  ChefHat, 
  Utensils, 
  Heart,
  BookOpen,
  Search,
  Filter,
  ArrowRight
} from "lucide-react";

const featuredDishes = [
  {
    id: 1,
    name: "Koshari",
    description: "Egypt's national dish - a hearty mix of rice, lentils, pasta, and chickpeas topped with spicy tomato sauce",
    image: "/placeholder.svg",
    region: "Cairo",
    difficulty: "Easy",
    cookTime: "45 min",
    rating: 4.8,
    isVegetarian: true
  },
  {
    id: 2,
    name: "Molokhia",
    description: "Traditional green soup made from jute leaves, served with rice and your choice of chicken or meat",
    image: "/placeholder.svg",
    region: "Alexandria",
    difficulty: "Medium",
    cookTime: "1.5 hours",
    rating: 4.6,
    isVegetarian: false
  },
  {
    id: 3,
    name: "Ful Medames",
    description: "Ancient Egyptian breakfast of slow-cooked fava beans with olive oil, garlic, and lemon",
    image: "/placeholder.svg",
    region: "Upper Egypt",
    difficulty: "Easy",
    cookTime: "30 min",
    rating: 4.7,
    isVegetarian: true
  }
];

const foodRegions = [
  { name: "Cairo", count: 45, image: "/placeholder.svg" },
  { name: "Alexandria", count: 32, image: "/placeholder.svg" },
  { name: "Upper Egypt", count: 28, image: "/placeholder.svg" },
  { name: "Sinai", count: 15, image: "/placeholder.svg" },
  { name: "Delta", count: 38, image: "/placeholder.svg" },
  { name: "Red Sea", count: 12, image: "/placeholder.svg" }
];

const foodStories = [
  {
    id: 1,
    title: "The Ancient Origins of Ful Medames",
    excerpt: "Discover how this humble dish has been nourishing Egyptians for over 5,000 years...",
    readTime: "5 min read",
    image: "/placeholder.svg",
    category: "History"
  },
  {
    id: 2,
    title: "Street Food Culture in Cairo",
    excerpt: "From dawn to dusk, explore the vibrant street food scene that defines Egyptian cuisine...",
    readTime: "8 min read",
    image: "/placeholder.svg",
    category: "Culture"
  },
  {
    id: 3,
    title: "Ramadan Traditions and Iftar Delights",
    excerpt: "The special dishes that bring families together during the holy month...",
    readTime: "6 min read",
    image: "/placeholder.svg",
    category: "Traditions"
  }
];

export default function TraditionalFood() {
  const [hoveredDish, setHoveredDish] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ChefHat className="h-4 w-4" />
            Authentic Egyptian Cuisine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Traditional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 block">
              Egyptian Food
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Embark on a culinary journey through Egypt's rich food heritage. From ancient recipes 
            passed down through generations to modern interpretations of classic dishes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3">
              <Search className="h-5 w-5 mr-2" />
              Explore Dishes
            </Button>
            <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3">
              <BookOpen className="h-5 w-5 mr-2" />
              Read Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Traditional Dishes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most beloved dishes that define Egyptian cuisine
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card 
                key={dish.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  hoveredDish === dish.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onMouseEnter={() => setHoveredDish(dish.id)}
                onMouseLeave={() => setHoveredDish(null)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    {dish.isVegetarian && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Vegetarian
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dish.name}
                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {dish.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {dish.region}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {dish.cookTime}
                    </div>
                  </div>
                  
                  <Button className="w-full group-hover:bg-orange-600 transition-colors">
                    View Recipe
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Region Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore by Region
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each region of Egypt has its own unique flavors and specialties
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {foodRegions.map((region) => (
              <Link
                key={region.name}
                to={`/traditional-food/regions/${region.name.toLowerCase()}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={region.image} 
                        alt={region.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{region.name}</h3>
                    <p className="text-sm text-gray-600">{region.count} dishes</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/traditional-food/regions">
                <Filter className="h-5 w-5 mr-2" />
                View All Regions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Food Stories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Food Stories & Culture
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive deep into the rich history and cultural significance of Egyptian cuisine
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodStories.map((story) => (
              <Link
                key={story.id}
                to={`/traditional-food/stories/${story.id}`}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="group-hover:text-orange-600 transition-colors">
                      {story.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {story.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {story.readTime}
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/traditional-food/stories">
                <BookOpen className="h-5 w-5 mr-2" />
                Read All Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Taste Egypt?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Find authentic Egyptian restaurants near you or learn to cook these amazing dishes at home
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              <Utensils className="h-5 w-5 mr-2" />
              Find Restaurants
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <ChefHat className="h-5 w-5 mr-2" />
              Learn to Cook
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}