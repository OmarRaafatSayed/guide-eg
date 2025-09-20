export type Attraction = {
  id: string;
  name: string;
  type: "museum" | "landmark" | "market" | "religious" | "activity" | "hotel" | "coastal";
  city: string;
  governorate: string;
  bestTransport: string[]; // e.g. ["Metro", "Uber"]
  estHours?: number;
  description?: string;
  rating?: number;
  priceRange?: "$" | "$$" | "$$$" | "$$$$";
};

export type GovernorateInfo = {
  name: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  climate: string;
};

export const governorates: Record<string, string[]> = {
  Cairo: ["Cairo"],
  Giza: ["Giza"],
  Alexandria: ["Alexandria"],
  Luxor: ["Luxor"],
  Aswan: ["Aswan"],
};

export const governorateInfo: Record<string, GovernorateInfo> = {
  Cairo: {
    name: "Cairo",
    description: "The bustling capital of Egypt, home to Islamic Cairo, the Citadel, and world-class museums.",
    highlights: ["Islamic architecture", "Museums", "Vibrant markets", "Historic mosques"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate with hot summers and mild winters"
  },
  Giza: {
    name: "Giza",
    description: "Home to the iconic Pyramids and Sphinx, one of the Seven Wonders of the Ancient World.",
    highlights: ["Great Pyramids", "Sphinx", "Grand Egyptian Museum", "Desert adventures"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate, very hot in summer"
  },
  Alexandria: {
    name: "Alexandria",
    description: "Egypt's Mediterranean jewel with beautiful coastline, ancient history, and modern culture.",
    highlights: ["Mediterranean beaches", "Ancient library", "Coastal fortresses", "Fresh seafood"],
    bestTimeToVisit: "April to October",
    climate: "Mediterranean climate with mild winters and warm summers"
  },
  Luxor: {
    name: "Luxor",
    description: "The world's greatest open-air museum, built on the ancient city of Thebes.",
    highlights: ["Valley of the Kings", "Karnak Temple", "Luxor Temple", "Nile cruises"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate, extremely hot in summer"
  },
  Aswan: {
    name: "Aswan",
    description: "Egypt's southernmost city, known for its beautiful Nile scenery and Nubian culture.",
    highlights: ["Philae Temple", "Nubian villages", "High Dam", "Felucca sailing"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate, very hot and dry"
  }
};

export const attractions: Attraction[] = [
  // Cairo attractions
  {
    id: "egyptian-museum",
    name: "The Egyptian Museum",
    type: "museum",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Metro", "Uber", "Taxi"],
    estHours: 3,
    description: "World's most extensive collection of ancient Egyptian artifacts",
    rating: 4.5
  },
  {
    id: "citadel",
    name: "Citadel of Salah Al-Din",
    type: "landmark",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Uber", "Taxi"],
    estHours: 2,
    description: "Medieval Islamic fortification with stunning city views",
    rating: 4.3
  },
  {
    id: "khan",
    name: "Khan el-Khalili Bazaar",
    type: "market",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Metro", "Uber", "Taxi"],
    estHours: 2,
    description: "Historic bazaar perfect for souvenirs and local crafts",
    rating: 4.2
  },
  {
    id: "four-seasons-cairo",
    name: "Four Seasons Hotel Cairo",
    type: "hotel",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Uber", "Taxi"],
    priceRange: "$$$$",
    description: "Luxury hotel with Nile views and world-class amenities",
    rating: 4.8
  },
  {
    id: "steigenberger-cairo",
    name: "Steigenberger Hotel El Tahrir",
    type: "hotel",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Metro", "Uber", "Taxi"],
    priceRange: "$$$",
    description: "Historic hotel in the heart of downtown Cairo",
    rating: 4.4
  },
  
  // Giza attractions
  {
    id: "giza-pyramids",
    name: "Giza Pyramids & Sphinx",
    type: "landmark",
    city: "Giza",
    governorate: "Giza",
    bestTransport: ["Uber", "Taxi", "Tour Bus"],
    estHours: 4,
    description: "The last surviving Wonder of the Ancient World",
    rating: 4.7
  },
  {
    id: "grand-egyptian",
    name: "Grand Egyptian Museum",
    type: "museum",
    city: "Giza",
    governorate: "Giza",
    bestTransport: ["Uber", "Taxi"],
    estHours: 3,
    description: "State-of-the-art museum showcasing Egypt's treasures",
    rating: 4.6
  },
  {
    id: "mena-house",
    name: "Marriott Mena House",
    type: "hotel",
    city: "Giza",
    governorate: "Giza",
    bestTransport: ["Uber", "Taxi"],
    priceRange: "$$$$",
    description: "Historic palace hotel with pyramid views",
    rating: 4.7
  },
  
  // Alexandria attractions
  {
    id: "library-alex",
    name: "Bibliotheca Alexandrina",
    type: "museum",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Tram", "Uber", "Taxi"],
    estHours: 2,
    description: "Modern revival of the ancient Library of Alexandria",
    rating: 4.4
  },
  {
    id: "qaitbay",
    name: "Citadel of Qaitbay",
    type: "landmark",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Uber", "Taxi"],
    estHours: 2,
    description: "15th-century fortress built on the site of the ancient Lighthouse",
    rating: 4.3
  },
  {
    id: "montazah-beach",
    name: "Montazah Beach",
    type: "coastal",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Tram", "Uber", "Taxi"],
    estHours: 3,
    description: "Beautiful Mediterranean beach with royal gardens",
    rating: 4.2
  },
  {
    id: "stanley-beach",
    name: "Stanley Beach",
    type: "coastal",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Tram", "Uber"],
    estHours: 2,
    description: "Popular city beach with cafes and restaurants",
    rating: 4.0
  },
  {
    id: "hilton-alexandria",
    name: "Hilton Alexandria Corniche",
    type: "hotel",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Tram", "Uber", "Taxi"],
    priceRange: "$$$",
    description: "Waterfront hotel with Mediterranean Sea views",
    rating: 4.5
  },
  
  // Luxor attractions
  {
    id: "karnak",
    name: "Karnak Temple",
    type: "religious",
    city: "Luxor",
    governorate: "Luxor",
    bestTransport: ["Uber", "Taxi", "Tour Bus"],
    estHours: 3,
    description: "Vast temple complex dedicated to ancient Egyptian gods",
    rating: 4.6
  },
  {
    id: "valley-kings",
    name: "Valley of the Kings",
    type: "landmark",
    city: "Luxor",
    governorate: "Luxor",
    bestTransport: ["Tour Bus", "Taxi"],
    estHours: 4,
    description: "Royal burial ground of pharaohs including Tutankhamun",
    rating: 4.8
  },
  {
    id: "luxor-temple",
    name: "Luxor Temple",
    type: "religious",
    city: "Luxor",
    governorate: "Luxor",
    bestTransport: ["Walking", "Uber", "Taxi"],
    estHours: 2,
    description: "Ancient temple complex in the heart of modern Luxor",
    rating: 4.5
  },
  {
    id: "winter-palace",
    name: "Sofitel Winter Palace Luxor",
    type: "hotel",
    city: "Luxor",
    governorate: "Luxor",
    bestTransport: ["Uber", "Taxi"],
    priceRange: "$$$$",
    description: "Historic luxury hotel with Nile views and Victorian charm",
    rating: 4.6
  },
  
  // Aswan attractions
  {
    id: "philae",
    name: "Philae Temple",
    type: "religious",
    city: "Aswan",
    governorate: "Aswan",
    bestTransport: ["Boat", "Taxi"],
    estHours: 2,
    description: "Beautiful temple dedicated to goddess Isis on an island",
    rating: 4.7
  },
  {
    id: "nubian-museum",
    name: "Nubian Museum",
    type: "museum",
    city: "Aswan",
    governorate: "Aswan",
    bestTransport: ["Taxi"],
    estHours: 2,
    description: "Showcases the rich culture and history of Nubia",
    rating: 4.4
  },
  {
    id: "abu-simbel",
    name: "Abu Simbel Temples",
    type: "landmark",
    city: "Aswan",
    governorate: "Aswan",
    bestTransport: ["Flight", "Tour Bus"],
    estHours: 6,
    description: "Magnificent temples of Ramesses II carved into rock",
    rating: 4.9
  },
  {
    id: "old-cataract",
    name: "Sofitel Legend Old Cataract",
    type: "hotel",
    city: "Aswan",
    governorate: "Aswan",
    bestTransport: ["Taxi"],
    priceRange: "$$$$",
    description: "Legendary hotel where Agatha Christie wrote Death on the Nile",
    rating: 4.8
  }
];

export function getCities(gov: string) {
  return governorates[gov] ?? [];
}

export function getAttractionsByCity(city: string) {
  return attractions.filter((a) => a.city === city);
}

export function getAttractionsByGovernorate(governorate: string) {
  return attractions.filter((a) => a.governorate === governorate);
}

export function getAttractionsByType(governorate: string, type: string) {
  const govAttractions = getAttractionsByGovernorate(governorate);
  switch (type) {
    case "historical":
      return govAttractions.filter((a) => 
        a.type === "landmark" || a.type === "religious" || a.type === "museum"
      );
    case "coastal":
      return govAttractions.filter((a) => a.type === "coastal");
    case "hotels":
      return govAttractions.filter((a) => a.type === "hotel");
    case "overview":
      return govAttractions.slice(0, 3); // Top 3 attractions for overview
    default:
      return govAttractions;
  }
}
