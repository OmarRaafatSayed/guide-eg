import { useState, useMemo, useEffect } from "react";
import { Search, Filter, ShoppingCart, Heart } from "lucide-react";
import { sampleLocations, Product } from "@/lib/marketplace-data";
import { scrapedLocations } from "@/lib/marketplace-data-scraped";
import { expandedLocations } from "@/lib/expanded-marketplace-data";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { LocationCard } from "@/components/marketplace/LocationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'locations' | 'products'>('locations');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [governorates, setGovernorates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Combine all locations
  const allLocations = [...sampleLocations, ...scrapedLocations, ...expandedLocations];

  // Load initial data and filters
  useEffect(() => {
    // Load data directly from local files
    import("@/lib/marketplace-data").then(({ HANDICRAFT_CATEGORIES, sampleLocations }) => {
      import("@/lib/marketplace-data-scraped").then(({ scrapedLocations }) => {
        const allLocs = [...sampleLocations, ...scrapedLocations];
        setCategories(HANDICRAFT_CATEGORIES);
        setGovernorates([...new Set(allLocs.map(loc => loc.governorate))]);
      });
    });
    
    fetchProducts();
  }, []);

  // Fetch products when filters change (with debounce for search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, searchQuery ? 300 : 0); // Debounce search queries
    
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedGovernorate, priceRange, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { sampleProducts, getProductsByCategory, searchProducts } = await import("@/lib/marketplace-data");
      const { scrapedLocations } = await import("@/lib/marketplace-data-scraped");
      const { expandedProducts } = await import("@/lib/expanded-marketplace-data");
      
      const allProducts = [...sampleProducts, ...expandedProducts];
      let filteredProducts = searchQuery ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) : allProducts;
      
      if (selectedCategory !== "all") {
        filteredProducts = allProducts.filter(p => p.category === selectedCategory);
      }
      
      if (selectedGovernorate !== "all") {
        filteredProducts = filteredProducts.filter(product => {
          const location = allLocations.find(loc => loc.id === product.locationId);
          return location?.governorate === selectedGovernorate;
        });
      }
      
      filteredProducts = filteredProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      setProducts(filteredProducts);
    } catch (error) {
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLocations = useMemo(() => {
    let locations = allLocations;
    
    if (selectedGovernorate !== "all") {
      locations = locations.filter(loc => loc.governorate === selectedGovernorate);
    }
    
    if (searchQuery) {
      locations = locations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return locations;
  }, [searchQuery, selectedGovernorate, allLocations]);

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    toast.success("Product added to cart!");
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success(favorites.includes(productId) ? "Removed from favorites" : "Added to favorites");
  };

  const handleGoToCart = () => {
    navigate('/marketplace/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
        <div className="container py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Egyptian Artisan Marketplace
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover authentic handcrafted treasures from local Egyptian artisans. 
              Support traditional craftsmanship and bring home unique souvenirs.
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
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Governorate</label>
                  <Select value={selectedGovernorate} onValueChange={setSelectedGovernorate}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Governorates</SelectItem>
                      {governorates.map(gov => (
                        <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                </div>

                {/* Cart & Favorites */}
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleGoToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({cartItems.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites ({favorites.length})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="locations">Artisan Locations</TabsTrigger>
                  <TabsTrigger value="products">All Products</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-muted-foreground">
                  {activeTab === 'locations' 
                    ? `${filteredLocations.length} locations found`
                    : loading ? 'Loading...' : `${products.length} products found`
                  }
                </div>
              </div>

              <TabsContent value="locations">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredLocations.map(location => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
                
                {filteredLocations.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No locations found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="products">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading products...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {products.map(product => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onToggleFavorite={handleToggleFavorite}
                          isFavorite={favorites.includes(product.id)}
                        />
                      ))}
                    </div>
                    
                    {products.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No products found in this category/location.</p>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}