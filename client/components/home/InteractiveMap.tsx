import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Info, 
  Landmark, 
  Waves, 
  BedDouble, 
  MapPin, 
  X, 
  Star,
  Clock,
  DollarSign
} from "lucide-react";
import { 
  governorates, 
  governorateInfo, 
  getAttractionsByType,
  Attraction 
} from "@/lib/egypt-data";
import { 
  outlinePath, 
  project, 
  GOV_CENTROIDS, 
  polylinePath, 
  NILE_PATH, 
  NILE_DELTA_LEFT, 
  NILE_DELTA_RIGHT, 
  SUEZ_CANAL, 
  LAKE_NASSER, 
  OASES 
} from "@/lib/egypt-geo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type PopupCategory = "overview" | "historical" | "coastal" | "hotels";

interface SelectedItem {
  id: string;
  name: string;
  type: string;
  governorate: string;
  city: string;
}

const CATEGORY_ICONS = {
  overview: Info,
  historical: Landmark,
  coastal: Waves,
  hotels: BedDouble,
};

const CATEGORY_LABELS = {
  overview: "Overview",
  historical: "Historical Sites", 
  coastal: "Coastal Sights",
  hotels: "Hotels",
};

export function InteractiveMap({ 
  onPlanTrip 
}: { 
  onPlanTrip: (selections: SelectedItem[]) => void 
}) {
  const [selectedGov, setSelectedGov] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PopupCategory | null>(null);
  const [selections, setSelections] = useState<SelectedItem[]>([]);
  
  const availableGovs = useMemo(() => Object.keys(governorates), []);
  
  // Precompute projected centroids
  const centers = useMemo(() =>
    availableGovs
      .map((g) => {
        const c = GOV_CENTROIDS.find((x) => x.gov === g);
        if (!c) return null;
        const p = project(c.lng, c.lat, 100, 100);
        return { gov: g, x: p.x, y: p.y };
      })
      .filter(Boolean) as { gov: string; x: number; y: number }[],
  [availableGovs]);

  const handleGovernorateClick = (gov: string) => {
    setSelectedGov(gov);
    setActiveCategory(null);
  };

  const handleCategoryClick = (category: PopupCategory) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleAttractionSelect = (attraction: Attraction) => {
    const item: SelectedItem = {
      id: attraction.id,
      name: attraction.name,
      type: attraction.type,
      governorate: attraction.governorate,
      city: attraction.city,
    };
    
    const exists = selections.find(s => s.id === item.id);
    if (exists) {
      setSelections(selections.filter(s => s.id !== item.id));
    } else {
      setSelections([...selections, item]);
    }
  };

  const closePopup = () => {
    setSelectedGov(null);
    setActiveCategory(null);
  };

  const currentAttractions = selectedGov && activeCategory 
    ? getAttractionsByType(selectedGov, activeCategory)
    : [];

  const currentGovInfo = selectedGov ? governorateInfo[selectedGov] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Section */}
      <div className="lg:col-span-2 relative">
        <div className="relative h-full w-full rounded-xl border overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#eff6ff" />
                <stop offset="100%" stopColor="#ecfdf5" />
              </linearGradient>
              <clipPath id="egypt-clip">
                <path d={outlinePath(100, 100)} />
              </clipPath>
              <filter id="paperNoise" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncA type="table" tableValues="0 0.08" />
                </feComponentTransfer>
              </filter>
              <pattern id="dunes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
                <path d="M0 3 H6" stroke="#d4a373" strokeWidth="0.4" opacity="0.3" />
              </pattern>
            </defs>
            
            <rect x="0" y="0" width="100" height="100" fill="#f4e4bc" />
            <g clipPath="url(#egypt-clip)">
              <rect x="0" y="0" width="100" height="100" fill="#e6d3a3" />
              <rect x="0" y="0" width="100" height="100" fill="url(#dunes)" opacity="0.4" />
              <rect x="0" y="0" width="100" height="100" filter="url(#paperNoise)" />
              
              {/* Country outline and water features */}
              <path d={outlinePath(100, 100)} fill="none" stroke="#8b4513" strokeWidth="1.2" opacity="0.9" />
              <path d={polylinePath(NILE_PATH, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="2" opacity="0.9" />
              <path d={polylinePath(NILE_DELTA_LEFT, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="1.5" opacity="0.9" />
              <path d={polylinePath(NILE_DELTA_RIGHT, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="1.5" opacity="0.9" />
              <path d={polylinePath(SUEZ_CANAL, 100, 100)} fill="none" stroke="#3b82f6" strokeDasharray="2 2" strokeWidth="1.2" opacity="0.9" />
              <path d={polylinePath(LAKE_NASSER, 100, 100)} fill="none" stroke="#1e40af" strokeWidth="2.5" opacity="0.8" />
            </g>
            
            {/* Geographic labels */}
            <g opacity="0.45">
              <text x="12" y="8" fontSize="4" fill="#0284c7">Mediterranean Sea</text>
              <text x="78" y="60" fontSize="4" fill="#0284c7" transform="rotate(-90 78,60)">Red Sea</text>
              <text x="20" y="40" fontSize="3.2" fill="#92400e">Western Desert</text>
              <text x="70" y="30" fontSize="3.2" fill="#92400e">Sinai</text>
            </g>
            
            {/* Oases */}
            <g>
              {OASES.map((o) => {
                const p = project(o.lng, o.lat, 100, 100);
                return (
                  <g key={o.name}>
                    <circle cx={p.x} cy={p.y} r={1.6} fill="#16a34a" opacity="0.9" />
                    <text x={p.x + 1.8} y={p.y - 0.8} fontSize="2.8" fill="#166534">{o.name}</text>
                  </g>
                );
              })}
            </g>
            
            {/* Decorative elements */}
            <g opacity="0.8">
              <path d="M 45 10 l 8 0 l -2 3 l -6 0 Z" fill="#0ea5e9" stroke="#0369a1" strokeWidth="0.4" />
              <path d="M 49 10 l 0 -4 l 4 4 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.3" />
            </g>
            <g opacity="0.9">
              <polygon points="34,60 40,60 37,56" fill="#fbbf24" stroke="#a16207" strokeWidth="0.4" />
              <polyline points="34,60 37,58 40,60" fill="none" stroke="#d97706" strokeWidth="0.4" opacity="0.6" />
            </g>
          </svg>

          {/* Governorate pins */}
          {centers.map((center) => (
            <div
              key={center.gov}
              className="absolute"
              style={{ 
                left: `${center.x}%`, 
                top: `${center.y}%`, 
                transform: "translate(-50%, -50%)" 
              }}
            >
              <button
                className={`group relative inline-flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 shadow hover:shadow-md transition ${
                  selectedGov === center.gov ? "border-primary ring-2 ring-primary/30" : "border-foreground/10"
                }`}
                onClick={() => handleGovernorateClick(center.gov)}
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{center.gov}</span>
              </button>
            </div>
          ))}

          {/* Popup */}
          <AnimatePresence>
            {selectedGov && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 left-4 right-4 z-10"
              >
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{selectedGov}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={closePopup}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {currentGovInfo && !activeCategory && (
                      <p className="text-sm text-muted-foreground">
                        {currentGovInfo.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!activeCategory ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {(Object.keys(CATEGORY_ICONS) as PopupCategory[]).map((category) => {
                          const Icon = CATEGORY_ICONS[category];
                          return (
                            <Button
                              key={category}
                              variant="outline"
                              className="h-auto p-3 flex flex-col gap-2"
                              onClick={() => handleCategoryClick(category)}
                            >
                              <Icon className="h-5 w-5" />
                              <span className="text-xs">{CATEGORY_LABELS[category]}</span>
                            </Button>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveCategory(null)}
                          >
                            ← Back
                          </Button>
                          <h3 className="font-medium">{CATEGORY_LABELS[activeCategory]}</h3>
                        </div>
                        <ScrollArea className="h-48">
                          <div className="space-y-2">
                            {currentAttractions.map((attraction) => {
                              const isSelected = selections.some(s => s.id === attraction.id);
                              return (
                                <div
                                  key={attraction.id}
                                  className={`p-3 rounded-lg border cursor-pointer transition ${
                                    isSelected 
                                      ? "border-primary bg-primary/5" 
                                      : "border-border hover:border-primary/50"
                                  }`}
                                  onClick={() => handleAttractionSelect(attraction)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-sm">{attraction.name}</h4>
                                      {attraction.description && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {attraction.description}
                                        </p>
                                      )}
                                      <div className="flex items-center gap-3 mt-2">
                                        {attraction.rating && (
                                          <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs">{attraction.rating}</span>
                                          </div>
                                        )}
                                        {attraction.estHours && (
                                          <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-xs">{attraction.estHours}h</span>
                                          </div>
                                        )}
                                        {attraction.priceRange && (
                                          <div className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-xs">{attraction.priceRange}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {isSelected && (
                                      <Badge variant="default" className="ml-2">
                                        Selected
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            {currentAttractions.length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No {CATEGORY_LABELS[activeCategory].toLowerCase()} found in {selectedGov}
                              </p>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Selections Panel */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">My Selections</CardTitle>
            <p className="text-sm text-muted-foreground">
              {selections.length} {selections.length === 1 ? 'place' : 'places'} selected
            </p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 mb-4">
              {selections.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click on governorate pins and select places to add them here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selections.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg border"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.city}, {item.governorate}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelections(selections.filter(s => s.id !== item.id))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            <Button
              className="w-full"
              disabled={selections.length === 0}
              onClick={() => onPlanTrip(selections)}
            >
              Plan My Trip
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}