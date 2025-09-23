import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('locations');
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(existingCart.reduce((sum: number, item: any) => sum + item.quantity, 0));
  }, []);
  
  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartCount(existingCart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    
    toast.success(`${product.name} added to cart!`);
  };
  
  const mockLocations = [
    {
      id: "cairo-pottery",
      name: "Cairo Pottery Workshop",
      governorate: "Cairo",
      description: "Traditional pottery making",
      image: "/placeholder.svg"
    },
    {
      id: "alexandria-textiles",
      name: "Alexandria Textile Center",
      governorate: "Alexandria",
      description: "Handwoven textiles and carpets",
      image: "/placeholder.svg"
    }
  ];
  
  const mockProducts = [
    {
      id: "1",
      name: "Handmade Pottery Vase",
      description: "Beautiful traditional Egyptian pottery",
      price: 45,
      category: "Pottery",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Woven Carpet",
      description: "Traditional Egyptian carpet",
      price: 120,
      category: "Textiles",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
        <div className="container py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Handmade & Souvenirs
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover authentic handcrafted treasures and unique experiences from local Egyptian artisans. 
              Support traditional craftsmanship and learn hands-on skills.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cartCount})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="locations">Artisan Locations</TabsTrigger>
                  <TabsTrigger value="products">All Products</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-muted-foreground">
                  {activeTab === 'locations' 
                    ? `${mockLocations.length} locations found`
                    : `${mockProducts.length} products found`
                  }
                </div>
              </div>

              <TabsContent value="locations">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockLocations.map(location => (
                    <Card key={location.id} className="hover:shadow-lg transition-all">
                      <img src={location.image} alt={location.name} className="w-full h-48 object-cover rounded-t-lg" />
                      <CardHeader>
                        <CardTitle>{location.name}</CardTitle>
                        <p className="text-sm text-gray-600">{location.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Badge>{location.governorate}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="products">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockProducts.map(product => (
                    <Card key={product.id} className="hover:shadow-lg transition-all">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">${product.price}</span>
                          <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activities">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Pottery Village */}
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src="/placeholder.svg" 
                        alt="Pottery Village"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-green-500">Hands-on Experience</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>Pottery Village - Fustat</CardTitle>
                      <p className="text-sm text-gray-600">
                        Learn traditional pottery making techniques from master craftsmen in Old Cairo
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>📍 Old Cairo</span>
                        <span>⏱️ 3-4 hours</span>
                        <span>💰 150 EGP</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => navigate('/book-experience/pottery')}
                      >
                        Book Experience
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Carpet Weaving */}
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src="/placeholder.svg" 
                        alt="Carpet Weaving"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-green-500">Hands-on Experience</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>Traditional Carpet Weaving</CardTitle>
                      <p className="text-sm text-gray-600">
                        Master the ancient art of Egyptian carpet weaving with local artisans
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>📍 Khan El Khalili</span>
                        <span>⏱️ 2-3 hours</span>
                        <span>💰 200 EGP</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => navigate('/book-experience/carpet')}
                      >
                        Book Experience
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Jewelry Making */}
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src="/placeholder.svg" 
                        alt="Jewelry Making"
                        className="w-full h-48 object-cover group-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-green-500">Hands-on Experience</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>Silver Jewelry Workshop</CardTitle>
                      <p className="text-sm text-gray-600">
                        Create your own Egyptian-inspired silver jewelry pieces
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>📍 Islamic Cairo</span>
                        <span>⏱️ 4-5 hours</span>
                        <span>💰 300 EGP</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => navigate('/book-experience/jewelry')}
                      >
                        Book Experience
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}