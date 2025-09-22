import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  BookOpen, 
  Heart, 
  Share2, 
  ArrowLeft,
  Calendar,
  User,
  Eye,
  MessageCircle
} from "lucide-react";

const stories = [
  {
    id: 1,
    title: "The Ancient Origins of Ful Medames",
    excerpt: "Discover how this humble dish has been nourishing Egyptians for over 5,000 years, from pharaonic times to modern street corners...",
    content: `
      <p>In the bustling streets of Cairo, as the first light of dawn breaks over the ancient city, the aroma of slow-cooked fava beans begins to fill the air. This is the smell of Ful Medames, Egypt's most beloved breakfast dish, and perhaps one of the oldest continuously prepared foods in human history.</p>
      
      <p>Archaeological evidence suggests that fava beans were being cultivated in Egypt as early as 3000 BCE. Ancient Egyptian texts and tomb paintings depict the preparation and consumption of these nutritious legumes, making Ful Medames quite possibly the world's oldest recipe still in use today.</p>
      
      <p>The dish's preparation has remained remarkably unchanged throughout millennia. Dried fava beans are soaked overnight, then slow-cooked in large copper pots called "idra" for hours until they reach the perfect creamy consistency. The beans are then mashed and seasoned with olive oil, garlic, lemon juice, and a sprinkle of cumin.</p>
      
      <p>What makes Ful Medames truly special is not just its ancient heritage, but its democratic nature. From the humblest street vendor to the finest restaurants, from rural villages to cosmopolitan cities, this dish unites all Egyptians in a shared culinary tradition that spans generations.</p>
    `,
    readTime: "5 min read",
    publishDate: "2024-01-15",
    image: "/placeholder.svg",
    category: "History",
    author: {
      name: "Dr. Amira Hassan",
      avatar: "/placeholder.svg",
      bio: "Food Historian & Culinary Anthropologist"
    },
    views: 2847,
    likes: 156,
    comments: 23,
    tags: ["Ancient Egypt", "Breakfast", "Fava Beans", "Street Food"]
  },
  {
    id: 2,
    title: "Street Food Culture in Cairo",
    excerpt: "From dawn to dusk, explore the vibrant street food scene that defines Egyptian cuisine and brings communities together...",
    content: `
      <p>The streets of Cairo are a living museum of culinary traditions, where ancient recipes meet modern innovation in the most delicious ways possible. As the sun rises over the city, street food vendors begin their daily ritual of preparing the foods that will nourish millions of Cairenes.</p>
      
      <p>The day begins with Ful and Ta'meya (Egyptian falafel) vendors setting up their stalls, their large copper pots already simmering from the night before. The rhythmic sound of chopping vegetables and the sizzle of oil create the morning symphony of Egyptian street food.</p>
      
      <p>As the day progresses, the offerings evolve. Koshari carts appear at lunch time, their colorful displays of rice, lentils, pasta, and chickpeas topped with spicy tomato sauce and crispy onions. The vendors' skilled hands work like artists, creating perfect portions in seconds.</p>
      
      <p>Evening brings its own specialties: grilled corn on the cob, roasted sweet potatoes, and the beloved liver sandwiches that Alexandria is famous for. Each vendor has their own secret recipes, passed down through generations, creating a tapestry of flavors that defines Egyptian street food culture.</p>
    `,
    readTime: "8 min read",
    publishDate: "2024-01-10",
    image: "/placeholder.svg",
    category: "Culture",
    author: {
      name: "Omar Farouk",
      avatar: "/placeholder.svg",
      bio: "Food Writer & Cultural Journalist"
    },
    views: 3521,
    likes: 234,
    comments: 45,
    tags: ["Street Food", "Cairo", "Culture", "Vendors"]
  },
  {
    id: 3,
    title: "Ramadan Traditions and Iftar Delights",
    excerpt: "The special dishes that bring families together during the holy month, from traditional soups to modern interpretations...",
    content: `
      <p>As the call to prayer echoes across Egypt during Ramadan, families gather around tables laden with dishes that have been prepared with love and anticipation throughout the day. The Iftar meal is more than just breaking the fast; it's a celebration of community, tradition, and the rich culinary heritage of Egypt.</p>
      
      <p>The meal traditionally begins with dates and water, following the Prophet's tradition, but quickly expands into a feast that showcases the best of Egyptian cuisine. Lentil soup, with its warming spices and comforting texture, is almost always present, providing the perfect gentle start after a day of fasting.</p>
      
      <p>Main dishes during Ramadan often feature special preparations that families spend hours perfecting. Mahshi (stuffed vegetables) filled with aromatic rice and herbs, slow-cooked molokhia with tender meat, and perfectly spiced roasted chicken are common centerpieces of the Iftar table.</p>
      
      <p>But perhaps most important are the desserts that conclude the meal. Qatayef, the crescent-shaped pancakes filled with nuts or cheese, appear only during Ramadan, making them a truly special treat that children and adults alike eagerly anticipate each year.</p>
    `,
    readTime: "6 min read",
    publishDate: "2024-01-05",
    image: "/placeholder.svg",
    category: "Traditions",
    author: {
      name: "Fatima Al-Zahra",
      avatar: "/placeholder.svg",
      bio: "Traditional Cooking Expert"
    },
    views: 4156,
    likes: 312,
    comments: 67,
    tags: ["Ramadan", "Iftar", "Family", "Traditions"]
  }
];

const categories = ["All", "History", "Culture", "Traditions", "Recipes", "Regions"];

export default function TraditionalFoodStories() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedStories, setLikedStories] = useState<number[]>([]);

  // If viewing a specific story
  if (id) {
    const story = stories.find(s => s.id === parseInt(id));
    if (!story) {
      return <div>Story not found</div>;
    }

    const isLiked = likedStories.includes(story.id);

    const toggleLike = () => {
      setLikedStories(prev => 
        isLiked 
          ? prev.filter(storyId => storyId !== story.id)
          : [...prev, story.id]
      );
    };

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-6">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link to="/traditional-food/stories">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Stories
              </Link>
            </Button>
          </div>
        </div>

        {/* Article */}
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Hero Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img 
              src={story.image} 
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {story.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {story.title}
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={story.author.avatar} />
                <AvatarFallback>{story.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{story.author.name}</p>
                <p className="text-sm text-gray-600">{story.author.bio}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(story.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {story.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {story.views.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {story.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between py-6 border-t border-b">
            <div className="flex items-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={toggleLike}
                className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {story.likes + (isLiked ? 1 : 0)}
              </Button>
              
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {story.comments}
              </Button>
              
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={story.author.avatar} />
                <AvatarFallback>{story.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg mb-2">About {story.author.name}</h3>
                <p className="text-gray-600 mb-4">{story.author.bio}</p>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Stories listing page
  const filteredStories = selectedCategory === "All" 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

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
            Food Stories & Culture
          </h1>
          <p className="text-gray-600">
            Dive deep into the rich history and cultural significance of Egyptian cuisine
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Story */}
        {filteredStories.length > 0 && (
          <Card className="mb-8 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={filteredStories[0].image} 
                  alt={filteredStories[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <Badge className="mb-4">{filteredStories[0].category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link 
                    to={`/traditional-food/stories/${filteredStories[0].id}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {filteredStories[0].title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {filteredStories[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {filteredStories[0].readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {filteredStories[0].views.toLocaleString()}
                    </div>
                  </div>
                  
                  <Button asChild>
                    <Link to={`/traditional-food/stories/${filteredStories[0].id}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Story
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.slice(1).map((story) => (
            <Card key={story.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                  <Link to={`/traditional-food/stories/${story.id}`}>
                    {story.title}
                  </Link>
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {story.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {story.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {story.views.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={story.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {story.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{story.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                      {story.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                      {story.comments}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600 mb-4">
              Try selecting a different category
            </p>
            <Button onClick={() => setSelectedCategory("All")}>
              View All Stories
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}