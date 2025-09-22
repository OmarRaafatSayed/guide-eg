// Auto-generated Egyptian Handicrafts Marketplace Data
import { ArtisanLocation } from "./marketplace-data";

export const scrapedLocations: ArtisanLocation[] = [
  {
    id: "potters-village-fustat",
    name: "Potters Village, Fustat",
    governorate: "Cairo",
    description: "Ancient pottery village where traditional Egyptian ceramics are crafted using techniques passed down through generations. Home to skilled artisans creating functional and decorative pottery.",
    history: "Traditional pottery, ceramics craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "9:00 AM - 6:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Traditional pottery","Decorative ceramics","Functional kitchenware"],
    products: []
  },
  {
    id: "khan-el-khalili-metalwork-bazaar",
    name: "Khan el-Khalili Metalwork Bazaar",
    governorate: "Cairo",
    description: "Historic bazaar featuring master metalworkers creating intricate copper, brass, and silver items. Traditional techniques used for centuries in this UNESCO World Heritage site.",
    history: "Traditional metalwork, jewelry, copper craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "10:00 AM - 10:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Copper work","Islamic metalwork","Traditional jewelry"],
    products: []
  },
  {
    id: "siwa-oasis-traditional-weavers",
    name: "Siwa Oasis Traditional Weavers",
    governorate: "Matrouh",
    description: "Berber women artisans creating traditional textiles using ancient weaving techniques. Known for colorful patterns and high-quality natural fibers.",
    history: "Traditional textiles, weaving, embroidery craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "8:00 AM - 5:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Berber textiles","Traditional embroidery","Handwoven carpets"],
    products: []
  },
  {
    id: "fayoum-pottery-school",
    name: "Fayoum Pottery School",
    governorate: "Fayoum",
    description: "Educational center and workshop teaching traditional Fayoum pottery techniques. Produces both functional and artistic ceramic pieces.",
    history: "Traditional pottery, ceramics, clay work craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "9:00 AM - 4:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Traditional pottery","Ceramic art","Pottery education"],
    products: []
  },
  {
    id: "luxor-alabaster-workshops",
    name: "Luxor Alabaster Workshops",
    governorate: "Luxor",
    description: "Master craftsmen creating beautiful alabaster sculptures and decorative items. Using local alabaster stone with techniques dating back to pharaonic times.",
    history: "Traditional stone carving, alabaster, sculpture craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "8:00 AM - 6:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Alabaster carving","Pharaonic replicas","Decorative sculptures"],
    products: []
  },
  {
    id: "aswan-nubian-handicrafts-center",
    name: "Aswan Nubian Handicrafts Center",
    governorate: "Aswan",
    description: "Nubian artisans preserving traditional crafts including colorful textiles, palm leaf basketry, and silver jewelry with distinctive Nubian designs.",
    history: "Traditional textiles, basketry, jewelry craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "9:00 AM - 7:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Nubian textiles","Palm basketry","Traditional jewelry"],
    products: []
  },
  {
    id: "alexandria-glass-art-studio",
    name: "Alexandria Glass Art Studio",
    governorate: "Alexandria",
    description: "Contemporary glass artists creating modern interpretations of traditional Egyptian glasswork. Offers workshops and custom pieces.",
    history: "Traditional glassblowing, glass art craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "10:00 AM - 8:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Modern glasswork","Traditional techniques","Custom designs"],
    products: []
  },
  {
    id: "dahab-bedouin-silver-workshop",
    name: "Dahab Bedouin Silver Workshop",
    governorate: "South Sinai",
    description: "Bedouin silversmiths creating traditional jewelry and decorative items. Known for intricate designs and high-quality craftsmanship.",
    history: "Traditional jewelry, silver work, bedouin crafts craftsmanship with deep cultural roots.",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
    openingHours: "9:00 AM - 9:00 PM",
    coordinates: [31.2357, 30.0131],
    specialties: ["Bedouin jewelry","Silver craftsmanship","Traditional designs"],
    products: []
  }
];

export function getScrapedLocationById(id: string): ArtisanLocation | undefined {
  return scrapedLocations.find(location => location.id === id);
}

export function getScrapedLocationsByGovernorate(governorate: string): ArtisanLocation[] {
  return scrapedLocations.filter(location => location.governorate === governorate);
}