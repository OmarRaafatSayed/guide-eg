export type Attraction = {
  id: string;
  name: string;
  type: "museum" | "landmark" | "market" | "religious" | "activity";
  city: string;
  governorate: string;
  bestTransport: string[]; // e.g. ["Metro", "Uber"]
  estHours?: number;
};

export const governorates: Record<string, string[]> = {
  Cairo: ["Cairo"],
  Giza: ["Giza"],
  Alexandria: ["Alexandria"],
  Luxor: ["Luxor"],
  Aswan: ["Aswan"],
};

export const attractions: Attraction[] = [
  {
    id: "egyptian-museum",
    name: "The Egyptian Museum",
    type: "museum",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Metro", "Uber", "Taxi"],
    estHours: 3,
  },
  {
    id: "citadel",
    name: "Citadel of Salah Al-Din",
    type: "landmark",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Uber", "Taxi"],
    estHours: 2,
  },
  {
    id: "khan",
    name: "Khan el-Khalili Bazaar",
    type: "market",
    city: "Cairo",
    governorate: "Cairo",
    bestTransport: ["Metro", "Uber", "Taxi"],
    estHours: 2,
  },
  {
    id: "giza-pyramids",
    name: "Giza Pyramids & Sphinx",
    type: "landmark",
    city: "Giza",
    governorate: "Giza",
    bestTransport: ["Uber", "Taxi", "Tour Bus"],
    estHours: 4,
  },
  {
    id: "grand-egyptian",
    name: "Grand Egyptian Museum",
    type: "museum",
    city: "Giza",
    governorate: "Giza",
    bestTransport: ["Uber", "Taxi"],
    estHours: 3,
  },
  {
    id: "library-alex",
    name: "Bibliotheca Alexandrina",
    type: "museum",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Tram", "Uber", "Taxi"],
    estHours: 2,
  },
  {
    id: "qaitbay",
    name: "Citadel of Qaitbay",
    type: "landmark",
    city: "Alexandria",
    governorate: "Alexandria",
    bestTransport: ["Uber", "Taxi"],
    estHours: 2,
  },
  {
    id: "karnak",
    name: "Karnak Temple",
    type: "religious",
    city: "Luxor",
    governorate: "Luxor",
    bestTransport: ["Uber", "Taxi", "Tour Bus"],
    estHours: 3,
  },
  {
    id: "valley-kings",
    name: "Valley of the Kings",
    type: "landmark",
    city: "Luxor",
    governorate: "Luxor",
    bestTransport: ["Tour Bus", "Taxi"],
    estHours: 4,
  },
  {
    id: "philae",
    name: "Philae Temple",
    type: "religious",
    city: "Aswan",
    governorate: "Aswan",
    bestTransport: ["Boat", "Taxi"],
    estHours: 2,
  },
  {
    id: "nubian-museum",
    name: "Nubian Museum",
    type: "museum",
    city: "Aswan",
    governorate: "Aswan",
    bestTransport: ["Taxi"],
    estHours: 2,
  },
];

export function getCities(gov: string) {
  return governorates[gov] ?? [];
}

export function getAttractionsByCity(city: string) {
  return attractions.filter((a) => a.city === city);
}
