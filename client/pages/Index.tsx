import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Camera, 
  ShoppingBag, 
  Leaf, 
  Utensils,
  Star,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Play,
  Heart,
  Award,
  Compass
} from "lucide-react";

const heroImages = [
  "/placeholder.svg", // Pyramids
  "/placeholder.svg", // Luxor Temple
  "/placeholder.svg", // Red Sea
  "/placeholder.svg"  // Khan El Khalili
];

const features = [
  {
    icon: MapPin,
    title: "Interactive Map",
    description: "Explore Egypt's treasures with our smart interactive map",
    color: "from-blue-500 to-cyan-500",
    link: "/map",
    stats: "27 Governorates"
  },
  {
    icon: Camera,
    title: "Community",
    description: "Share your Egyptian adventures with fellow travelers",
    color: "from-purple-500 to-pink-500",
    link: "/feed",
    stats: "10K+ Photos"
  },
  {
    icon: ShoppingBag,
    title: "Handmade & Souvenirs",
    description: "Discover authentic crafts and book hands-on experiences",
    color: "from-amber-500 to-orange-500",
    link: "/marketplace",
    stats: "500+ Artisans"
  },
  {
    icon: Utensils,
    title: "Traditional Food",
    description: "Taste Egypt's culinary heritage and learn ancient recipes",
    color: "from-red-500 to-rose-500",
    link: "/traditional-food",
    stats: "100+ Recipes"
  },
  {
    icon: Leaf,
    title: "Green Tourism",
    description: "Travel responsibly while preserving Egypt's natural beauty",
    color: "from-green-500 to-emerald-500",
    link: "/green-tourism",
    stats: "50+ Eco Places"
  },
  {
    icon: Calendar,
    title: "Trip Planner",
    description: "AI-powered personalized itineraries for your perfect journey",
    color: "from-indigo-500 to-purple-500",
    link: "/planner",
    stats: "Smart Planning"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    country: "USA",
    text: "The Guide made my Egypt trip absolutely magical! The local insights were incredible.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    name: "Marco Rossi",
    country: "Italy", 
    text: "The traditional food experiences were authentic and unforgettable. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    text: "Perfect blend of history, culture, and modern convenience. Best travel app ever!",
    rating: 5,
    image: "/placeholder.svg"
  }
];

const stats = [
  { number: "5000+", label: "Happy Travelers", icon: Users },
  { number: "1000+", label: "Destinations", icon: MapPin },
  { number: "4.9", label: "App Rating", icon: Star },
  { number: "50+", label: "Cities Covered", icon: Globe }
];

export default function IndexPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img 
                src={image} 
                alt="Egypt"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
            </motion.div>
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 text-yellow-400"
        >
          <Sparkles className="h-8 w-8 animate-pulse" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute top-32 right-20 text-yellow-400"
        >
          <Star className="h-6 w-6 animate-bounce" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Discover Ancient Wonders
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              The
            </span>
            <br />
            <span className="text-white">Guide</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Journey through 5,000 years of history. Experience the magic of Egypt 
            with AI-powered planning, authentic local experiences, and sustainable travel.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg group"
            >
              <Link to="/map">
                <Compass className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#004A58]/10 to-[#004A58]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFC211] to-[#2E2F2D] rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#004A58]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#FFC211]/20 text-[#FFC211]">
              <Award className="h-4 w-4 mr-2" />
              Award-Winning Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for the
              <span className="bg-gradient-to-r from-[#FFC211] to-[#2E2F2D] bg-clip-text text-transparent block">
                Perfect Egyptian Adventure
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From ancient pyramids to modern experiences, discover Egypt like never before
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link to={feature.link}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-[#004A58]/80 to-[#004A58]/60 group-hover:from-[#004A58]/90 group-hover:to-[#004A58]/70">
                    <CardContent className="p-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-[#FFC211] group-hover:to-[#2E2F2D] transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-white/80 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-[#FFC211]/20 text-[#FFC211]">
                          {feature.stats}
                        </Badge>
                        <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-[#FFC211] group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Heart className="h-4 w-4 mr-2" />
              Loved by Travelers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stories from Fellow
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                Egypt Explorers
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-white/90 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-white/70 text-sm">{testimonial.country}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute top-10 left-10 text-white/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-16 w-16" />
        </motion.div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Explore
              <span className="block">Ancient Egypt?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers discovering Egypt's wonders with The Guide
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg group"
              >
                <Link to="/map">
                  <MapPin className="h-5 w-5 mr-2 group-hover:bounce" />
                  Start Planning Now
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link to="/feed">
                  <Camera className="h-5 w-5 mr-2" />
                  Join Community
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}