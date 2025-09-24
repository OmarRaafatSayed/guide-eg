export type Attraction = {
  id: string;
  name: string;
  type: "heritage" | "museum" | "historical" | "hotel" | "activity" | "coastal";
  city: string;
  governorate: string;
  bestTransport: string[];
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
  "South Sinai": ["Sharm El Sheikh", "Dahab"],
  "Red Sea": ["Hurghada", "El Gouna"],
  "New Valley": ["Bahariya Oasis", "Siwa Oasis"],
  Fayoum: ["Fayoum City"],
  Suez: ["Suez", "Ain Sokhna"],
};

export const governorateInfo: Record<string, GovernorateInfo> = {
  Cairo: {
    name: "Cairo",
    description: "A bustling metropolis home to ancient pyramids and vibrant markets.",
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
    description: "Egypt's Mediterranean jewel with beautiful coastline and ancient history.",
    highlights: ["Mediterranean beaches", "Ancient library", "Coastal fortresses", "Fresh seafood"],
    bestTimeToVisit: "April to October",
    climate: "Mediterranean climate with mild winters and warm summers"
  },
  Luxor: {
    name: "Luxor",
    description: "An open-air museum filled with majestic temples and tombs from the Pharaonic era.",
    highlights: ["Valley of the Kings", "Karnak Temple", "Luxor Temple", "Nile cruises"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate, extremely hot in summer"
  },
  Aswan: {
    name: "Aswan",
    description: "Egypt's southernmost city known for its beautiful Nile scenery and Nubian culture.",
    highlights: ["Philae Temple", "Nubian villages", "High Dam", "Felucca sailing"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate, very hot and dry"
  },
  "South Sinai": {
    name: "South Sinai",
    description: "Known for its stunning coral reefs and crystal-clear waters, perfect for diving and relaxation.",
    highlights: ["Red Sea diving", "Desert mountains", "Bedouin culture", "Beach resorts"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate with mild winters"
  },
  "Red Sea": {
    name: "Red Sea",
    description: "A paradise for divers and beach lovers with world-class coral reefs and luxury resorts.",
    highlights: ["Coral reefs", "Water sports", "Luxury resorts", "Desert safaris"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate with year-round sunshine"
  },
  "New Valley": {
    name: "New Valley",
    description: "Home to Egypt's stunning Western Desert oases and unique natural wonders.",
    highlights: ["Desert oases", "Hot springs", "Fossil sites", "Bedouin culture"],
    bestTimeToVisit: "October to April",
    climate: "Extreme desert climate"
  },
  Fayoum: {
    name: "Fayoum",
    description: "An ancient oasis featuring Lake Qarun and the famous Valley of the Whales.",
    highlights: ["Lake Qarun", "Valley of Whales", "Pottery villages", "Desert landscapes"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate with moderate temperatures"
  },
  Suez: {
    name: "Suez",
    description: "Gateway to the Red Sea featuring the historic Suez Canal and beautiful beaches.",
    highlights: ["Suez Canal", "Red Sea beaches", "Maritime history", "Desert adventures"],
    bestTimeToVisit: "October to April",
    climate: "Desert climate with coastal influence"
  }
};

export const attractions: Attraction[] = [
  // Cairo
  { id: "egyptian-museum", name: "The Egyptian Museum", type: "museum", city: "Cairo", governorate: "Cairo", bestTransport: ["Metro", "Uber"], estHours: 3, rating: 4.5 },
  { id: "citadel", name: "Citadel of Salah Al-Din", type: "heritage", city: "Cairo", governorate: "Cairo", bestTransport: ["Uber"], estHours: 2, rating: 4.3 },
  { id: "khan", name: "Khan el-Khalili Bazaar", type: "activity", city: "Cairo", governorate: "Cairo", bestTransport: ["Metro"], estHours: 2, rating: 4.2 },
  { id: "al-azhar-mosque", name: "Al-Azhar Mosque", type: "historical", city: "Cairo", governorate: "Cairo", bestTransport: ["Metro"], estHours: 1, rating: 4.4 },
  { id: "cairo-food-tour", name: "Traditional Food Tour", type: "activity", city: "Cairo", governorate: "Cairo", bestTransport: ["Walking"], estHours: 3, rating: 4.6 },
  { id: "four-seasons-cairo", name: "Four Seasons Hotel Cairo", type: "hotel", city: "Cairo", governorate: "Cairo", bestTransport: ["Uber"], priceRange: "$$$$", rating: 4.8 },
  { id: "steigenberger-cairo", name: "Steigenberger Hotel El Tahrir", type: "hotel", city: "Cairo", governorate: "Cairo", bestTransport: ["Metro"], priceRange: "$$$", rating: 4.4 },
  { id: "cairo-budget", name: "Dahab Hostel", type: "hotel", city: "Cairo", governorate: "Cairo", bestTransport: ["Metro"], priceRange: "$", rating: 4.0 },

  // Giza
  { id: "giza-pyramids", name: "Giza Pyramids & Sphinx", type: "heritage", city: "Giza", governorate: "Giza", bestTransport: ["Uber"], estHours: 4, rating: 4.7 },
  { id: "saqqara", name: "Saqqara Pyramid Complex", type: "historical", city: "Giza", governorate: "Giza", bestTransport: ["Tour Bus"], estHours: 3, rating: 4.6 },
  { id: "grand-egyptian", name: "Grand Egyptian Museum", type: "museum", city: "Giza", governorate: "Giza", bestTransport: ["Uber"], estHours: 3, rating: 4.6 },
  { id: "giza-camel-ride", name: "Camel Ride Experience", type: "activity", city: "Giza", governorate: "Giza", bestTransport: ["Uber"], estHours: 2, rating: 4.3 },
  { id: "mena-house", name: "Marriott Mena House", type: "hotel", city: "Giza", governorate: "Giza", bestTransport: ["Uber"], priceRange: "$$$$", rating: 4.7 },
  { id: "pyramids-view", name: "Pyramids View Inn", type: "hotel", city: "Giza", governorate: "Giza", bestTransport: ["Uber"], priceRange: "$$", rating: 4.2 },

  // Alexandria
  { id: "library-alex", name: "Bibliotheca Alexandrina", type: "museum", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Tram"], estHours: 2, rating: 4.4 },
  { id: "qaitbay", name: "Citadel of Qaitbay", type: "landmark", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Uber"], estHours: 2, rating: 4.3 },
  { id: "catacombs", name: "Catacombs of Kom el Shoqafa", type: "landmark", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Uber"], estHours: 1, rating: 4.1 },
  { id: "montazah-beach", name: "Montazah Beach", type: "coastal", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Tram"], estHours: 3, rating: 4.2 },
  { id: "stanley-beach", name: "Stanley Beach", type: "coastal", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Tram"], estHours: 2, rating: 4.0 },
  { id: "maamoura-beach", name: "Maamoura Beach", type: "coastal", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Uber"], estHours: 3, rating: 4.1 },
  { id: "hilton-alexandria", name: "Hilton Alexandria Corniche", type: "hotel", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Tram"], priceRange: "$$$", rating: 4.5 },
  { id: "paradise-inn", name: "Paradise Inn Beach Resort", type: "hotel", city: "Alexandria", governorate: "Alexandria", bestTransport: ["Uber"], priceRange: "$$", rating: 4.0 },

  // Luxor
  { id: "karnak", name: "Karnak Temple", type: "heritage", city: "Luxor", governorate: "Luxor", bestTransport: ["Uber"], estHours: 3, rating: 4.6 },
  { id: "valley-kings", name: "Valley of the Kings", type: "historical", city: "Luxor", governorate: "Luxor", bestTransport: ["Tour Bus"], estHours: 4, rating: 4.8 },
  { id: "luxor-temple", name: "Luxor Temple", type: "heritage", city: "Luxor", governorate: "Luxor", bestTransport: ["Walking"], estHours: 2, rating: 4.5 },
  { id: "hatshepsut", name: "Temple of Hatshepsut", type: "historical", city: "Luxor", governorate: "Luxor", bestTransport: ["Tour Bus"], estHours: 2, rating: 4.4 },
  { id: "luxor-museum", name: "Luxor Museum", type: "museum", city: "Luxor", governorate: "Luxor", bestTransport: ["Uber"], estHours: 2, rating: 4.5 },
  { id: "hot-air-balloon", name: "Hot Air Balloon Ride", type: "activity", city: "Luxor", governorate: "Luxor", bestTransport: ["Tour Bus"], estHours: 3, rating: 4.8 },
  { id: "winter-palace", name: "Sofitel Winter Palace Luxor", type: "hotel", city: "Luxor", governorate: "Luxor", bestTransport: ["Uber"], priceRange: "$$$$", rating: 4.6 },
  { id: "steigenberger-luxor", name: "Steigenberger Nile Palace", type: "hotel", city: "Luxor", governorate: "Luxor", bestTransport: ["Uber"], priceRange: "$$$", rating: 4.3 },

  // Aswan
  { id: "philae", name: "Philae Temple", type: "heritage", city: "Aswan", governorate: "Aswan", bestTransport: ["Boat"], estHours: 2, rating: 4.7 },
  { id: "abu-simbel", name: "Abu Simbel Temples", type: "heritage", city: "Aswan", governorate: "Aswan", bestTransport: ["Flight"], estHours: 6, rating: 4.9 },
  { id: "unfinished-obelisk", name: "Unfinished Obelisk", type: "historical", city: "Aswan", governorate: "Aswan", bestTransport: ["Taxi"], estHours: 1, rating: 4.2 },
  { id: "felucca-sailing", name: "Felucca Sailing", type: "activity", city: "Aswan", governorate: "Aswan", bestTransport: ["Walking"], estHours: 2, rating: 4.6 },
  { id: "nubian-museum", name: "Nubian Museum", type: "museum", city: "Aswan", governorate: "Aswan", bestTransport: ["Taxi"], estHours: 2, rating: 4.4 },
  { id: "old-cataract", name: "Sofitel Legend Old Cataract", type: "hotel", city: "Aswan", governorate: "Aswan", bestTransport: ["Taxi"], priceRange: "$$$$", rating: 4.8 },
  { id: "movenpick-aswan", name: "Movenpick Resort Aswan", type: "hotel", city: "Aswan", governorate: "Aswan", bestTransport: ["Taxi"], priceRange: "$$$", rating: 4.4 },

  // South Sinai
  { id: "naama-bay", name: "Naama Bay", type: "activity", city: "Sharm El Sheikh", governorate: "South Sinai", bestTransport: ["Taxi"], estHours: 4, rating: 4.3 },
  { id: "ras-mohammed", name: "Ras Mohammed National Park", type: "heritage", city: "Sharm El Sheikh", governorate: "South Sinai", bestTransport: ["Tour Bus"], estHours: 6, rating: 4.7 },
  { id: "blue-hole", name: "Blue Hole", type: "activity", city: "Dahab", governorate: "South Sinai", bestTransport: ["Taxi"], estHours: 3, rating: 4.6 },
  { id: "st-catherine", name: "St. Catherine's Monastery", type: "historical", city: "Dahab", governorate: "South Sinai", bestTransport: ["Tour Bus"], estHours: 4, rating: 4.5 },
  { id: "sinai-museum", name: "Sinai Heritage Museum", type: "museum", city: "Sharm El Sheikh", governorate: "South Sinai", bestTransport: ["Taxi"], estHours: 2, rating: 4.1 },
  { id: "diving-experience", name: "Red Sea Diving", type: "activity", city: "Sharm El Sheikh", governorate: "South Sinai", bestTransport: ["Boat"], estHours: 4, rating: 4.8 },
  { id: "four-seasons-sharm", name: "Four Seasons Resort Sharm El Sheikh", type: "hotel", city: "Sharm El Sheikh", governorate: "South Sinai", bestTransport: ["Taxi"], priceRange: "$$$$", rating: 4.8 },
  { id: "reef-oasis", name: "Reef Oasis Blue Bay Resort", type: "hotel", city: "Sharm El Sheikh", governorate: "South Sinai", bestTransport: ["Taxi"], priceRange: "$$$", rating: 4.4 },
  { id: "dahab-paradise", name: "Dahab Paradise", type: "hotel", city: "Dahab", governorate: "South Sinai", bestTransport: ["Taxi"], priceRange: "$$", rating: 4.2 },

  // Red Sea
  { id: "giftun-island", name: "Giftun Island", type: "activity", city: "Hurghada", governorate: "Red Sea", bestTransport: ["Boat"], estHours: 6, rating: 4.6 },
  { id: "makadi-bay", name: "Makadi Bay", type: "activity", city: "Hurghada", governorate: "Red Sea", bestTransport: ["Taxi"], estHours: 4, rating: 4.4 },
  { id: "el-gouna", name: "El Gouna", type: "activity", city: "El Gouna", governorate: "Red Sea", bestTransport: ["Taxi"], estHours: 5, rating: 4.5 },
  { id: "red-sea-museum", name: "Red Sea Marine Museum", type: "museum", city: "Hurghada", governorate: "Red Sea", bestTransport: ["Taxi"], estHours: 2, rating: 4.3 },
  { id: "desert-safari", name: "Desert Safari Adventure", type: "activity", city: "Hurghada", governorate: "Red Sea", bestTransport: ["Tour Bus"], estHours: 5, rating: 4.5 },
  { id: "steigenberger-hurghada", name: "Steigenberger Al Dau Beach Hotel", type: "hotel", city: "Hurghada", governorate: "Red Sea", bestTransport: ["Taxi"], priceRange: "$$$$", rating: 4.6 },
  { id: "hilton-hurghada", name: "Hilton Hurghada Resort", type: "hotel", city: "Hurghada", governorate: "Red Sea", bestTransport: ["Taxi"], priceRange: "$$$", rating: 4.3 },
  { id: "sheraton-gouna", name: "Sheraton Miramar Resort El Gouna", type: "hotel", city: "El Gouna", governorate: "Red Sea", bestTransport: ["Taxi"], priceRange: "$$$$", rating: 4.5 },

  // New Valley
  { id: "white-desert", name: "White Desert National Park", type: "heritage", city: "Bahariya Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], estHours: 8, rating: 4.8 },
  { id: "crystal-mountain", name: "Crystal Mountain", type: "heritage", city: "Bahariya Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], estHours: 2, rating: 4.5 },
  { id: "siwa-oasis", name: "Siwa Oasis", type: "heritage", city: "Siwa Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], estHours: 6, rating: 4.7 },
  { id: "bahariya-museum", name: "Bahariya Heritage Museum", type: "museum", city: "Bahariya Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], estHours: 1, rating: 4.2 },
  { id: "desert-camping", name: "Desert Camping Experience", type: "activity", city: "Bahariya Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], estHours: 12, rating: 4.7 },
  { id: "adrere-amellal", name: "Adrère Amellal Desert Ecolodge", type: "hotel", city: "Siwa Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], priceRange: "$$$$", rating: 4.9 },
  { id: "desert-lodge", name: "Al Babenshal Desert Lodge", type: "hotel", city: "Bahariya Oasis", governorate: "New Valley", bestTransport: ["Tour Bus"], priceRange: "$$$", rating: 4.2 },

  // Fayoum
  { id: "lake-qarun", name: "Lake Qarun", type: "heritage", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Taxi"], estHours: 3, rating: 4.3 },
  { id: "valley-whales", name: "Valley of the Whales (Wadi Al-Hitan)", type: "heritage", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Tour Bus"], estHours: 4, rating: 4.6 },
  { id: "magic-lake", name: "Magic Lake", type: "activity", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Tour Bus"], estHours: 2, rating: 4.4 },
  { id: "fayoum-pottery", name: "Pottery Village", type: "activity", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Taxi"], estHours: 2, rating: 4.2 },
  { id: "fayoum-museum", name: "Fayoum Heritage Museum", type: "museum", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Taxi"], estHours: 1, rating: 4.1 },
  { id: "pyramid-hawara", name: "Pyramid of Hawara", type: "historical", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Taxi"], estHours: 2, rating: 4.3 },
  { id: "helnan-auberge", name: "Helnan Auberge Fayoum", type: "hotel", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Taxi"], priceRange: "$$$", rating: 4.1 },
  { id: "lazib-inn", name: "Lazib Inn Resort & Spa", type: "hotel", city: "Fayoum City", governorate: "Fayoum", bestTransport: ["Taxi"], priceRange: "$$", rating: 4.0 },

  // Suez
  { id: "suez-canal", name: "Suez Canal", type: "heritage", city: "Suez", governorate: "Suez", bestTransport: ["Taxi"], estHours: 2, rating: 4.4 },
  { id: "ain-sokhna-beach", name: "Ain Sokhna Beach", type: "activity", city: "Ain Sokhna", governorate: "Suez", bestTransport: ["Car"], estHours: 4, rating: 4.2 },
  { id: "galala-plateau", name: "Galala Plateau", type: "heritage", city: "Ain Sokhna", governorate: "Suez", bestTransport: ["Car"], estHours: 3, rating: 4.3 },
  { id: "suez-museum", name: "Suez Canal Museum", type: "museum", city: "Suez", governorate: "Suez", bestTransport: ["Taxi"], estHours: 2, rating: 4.2 },
  { id: "suez-historical-sites", name: "Suez Historical Sites", type: "historical", city: "Suez", governorate: "Suez", bestTransport: ["Taxi"], estHours: 3, rating: 4.1 },
  { id: "water-sports", name: "Water Sports Activities", type: "activity", city: "Ain Sokhna", governorate: "Suez", bestTransport: ["Car"], estHours: 3, rating: 4.4 },
  { id: "movenpick-sokhna", name: "Mövenpick Resort El Sokhna", type: "hotel", city: "Ain Sokhna", governorate: "Suez", bestTransport: ["Car"], priceRange: "$$$$", rating: 4.5 },
  { id: "stella-sokhna", name: "Stella Di Mare Beach Hotel", type: "hotel", city: "Ain Sokhna", governorate: "Suez", bestTransport: ["Car"], priceRange: "$$$", rating: 4.2 },
  { id: "suez-hotel", name: "Red Sea Hotel", type: "hotel", city: "Suez", governorate: "Suez", bestTransport: ["Taxi"], priceRange: "$$", rating: 3.8 }
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
    case "about":
      return [];
    case "museums":
      return govAttractions.filter((a) => a.type === "museum");
    case "historical":
      return govAttractions.filter((a) => a.type === "historical");
    case "hotels":
      return govAttractions.filter((a) => a.type === "hotel");
    case "activities":
      return govAttractions.filter((a) => a.type === "activity");
    case "overview":
      return govAttractions.slice(0, 3);
    default:
      return govAttractions;
  }
}