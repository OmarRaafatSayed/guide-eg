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
  Clock, 
  Star, 
  Heart,
  ChefHat,
  Utensils,
  ArrowLeft
} from "lucide-react";

const allDishes = [
  {
    id: 1,
    name: "Koshari",
    description: "Egypt's national dish with rice, lentils, pasta, and chickpeas",
    image: "/placeholder.svg",
    region: "Cairo",
    governorate: "Cairo",
    difficulty: "Easy",
    cookTime: "45 min",
    rating: 4.8,
    isVegetarian: true,
    category: "Main Course"
  },
  {
    id: 2,
    name: "Alexandrian Liver",
    description: "Spicy liver sandwich, a street food favorite",
    image: "/placeholder.svg",
    region: "Alexandria",
    governorate: "Alexandria",
    difficulty: "Medium",
    cookTime: "30 min",
    rating: 4.5,
    isVegetarian: false,
    category: "Street Food"
  },
  {
    id: 3,
    name: "Sayadeya",
    description: "Traditional fish and rice dish from the coast",
    image: "/placeholder.svg",
    region: "Alexandria",
    governorate: "Alexandria",
    difficulty: "Hard",
    cookTime: "2 hours",
    rating: 4.7,
    isVegetarian: false,
    category: "Main Course"
  },
  {
    id: 4,
    name: "Upper Egyptian Bread",
    description: "Traditional flatbread baked in clay ovens",
    image: "/placeholder.svg",
    region: "Upper Egypt",
    governorate: "Aswan",
    difficulty: "Medium",
    cookTime: "1 hour",
    rating: 4.6,
    isVegetarian: true,
    category: "Bread"
  },
  {
    id: 5,
    name: "Molokhia",
    description: "Green soup made from jute leaves",
    image: "/placeholder.svg",
    region: "Delta",
    governorate: "Dakahlia",
    difficulty: "Medium",
    cookTime: "1.5 hours",
    rating: 4.6,
    isVegetarian: false,
    category: "Soup"
  },
  {
    id: 6,
    name: "Bedouin Tea",
    description: "Traditional desert tea with herbs",
    image: "/placeholder.svg",
    region: "Sinai",
    governorate: "South Sinai",
    difficulty: "Easy",
    cookTime: "15 min",
    rating: 4.4,
    isVegetarian: true,
    category: "Beverage"
  }
];

const governorates = [
  "All Governorates",
  "Cairo",
  "Alexandria",
  "Giza",
  "Aswan",
  "Luxor",
  "Dakahlia",
  "Gharbia",
  "South Sinai",
  "North Sinai",
  "Red Sea",
  "Matrouh"
];

const categories = [
  "All Categories",
  "Main Course",
  "Street Food",
  "Soup",
  "Bread",
  "Dessert",
  "Beverage",
  "Appetizer"
];

const difficulties = [
  "All Levels",
  "Easy",
  "Medium",
  "Hard"
];

export default function TraditionalFoodRegions() {
  const { region } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState(region || "All Governorates");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false);

  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dish.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGovernorate = selectedGovernorate === "All Governorates" || 
                                dish.governorate === selectedGovernorate;
      const matchesCategory = selectedCategory === "All Categories" || 
                             dish.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All Levels" || 
                               dish.difficulty === selectedDifficulty;
      const matchesVegetarian = !showVegetarianOnly || dish.isVegetarian;

      return matchesSearch && matchesGovernorate && matchesCategory && 
             matchesDifficulty && matchesVegetarian;
    });
  }, [searchTerm, selectedGovernorate, selectedCategory, selectedDifficulty, showVegetarianOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/traditional-food">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Traditional Food
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {region ? `${region} Cuisine` : "Egyptian Dishes by Region"}
          </h1>
          <p className="text-gray-600">
            Discover authentic dishes from across Egypt's diverse regions
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
                  <label className="text-sm font-medium mb-2 block">Search Dishes</label>
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

                {/* Difficulty Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(diff => (
                        <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Vegetarian Filter */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="vegetarian"
                    checked={showVegetarianOnly}
                    onChange={(e) => setShowVegetarianOnly(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="vegetarian" className="text-sm font-medium">
                    Vegetarian Only
                  </label>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGovernorate("All Governorates");
                    setSelectedCategory("All Categories");
                    setSelectedDifficulty("All Levels");
                    setShowVegetarianOnly(false);
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
                Found {filteredDishes.length} dishes
              </p>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="time">Cook Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <Card key={dish.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${dish.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`}>
                        {dish.isVegetarian ? 'Vegetarian' : 'Non-Veg'}
                      </Badge>
                      <Badge variant="secondary">
                        {dish.category}
                      </Badge>
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
                    <CardDescription>
                      {dish.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {dish.governorate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {dish.cookTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        {dish.difficulty}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <Utensils className="h-4 w-4 mr-2" />
                        View Recipe
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDishes.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find more dishes
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedGovernorate("All Governorates");
                    setSelectedCategory("All Categories");
                    setSelectedDifficulty("All Levels");
                    setShowVegetarianOnly(false);
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