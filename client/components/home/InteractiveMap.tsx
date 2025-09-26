import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  X, 
  ArrowRight
} from "lucide-react";
import { 
  governorates, 
  governorateInfo
} from "@/lib/egypt-data";
import { 
  project, 
  GOV_CENTROIDS
} from "@/lib/egypt-geo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


interface SelectedItem {
  id: string;
  name: string;
  type: string;
  governorate: string;
  city: string;
}

export function InteractiveMap({ 
  onPlanTrip 
}: { 
  onPlanTrip: (selections: SelectedItem[]) => void 
}) {
  const navigate = useNavigate();
  const [selectedGov, setSelectedGov] = useState<string | null>(null);

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
  };





  const closePopup = () => {
    setSelectedGov(null);
  };



  const currentGovInfo = selectedGov ? governorateInfo[selectedGov] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Section */}
      <div className="lg:col-span-2 relative">
        <div className="relative h-full w-full rounded-xl border overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50">
          <img src="/MAP/ee.png" className="absolute inset-0 h-full w-full object-cover" alt="Stylized Map of Egypt" />

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
                className={`group relative inline-flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white/95 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  selectedGov === center.gov 
                    ? "border-[#004A58] ring-4 ring-[#004A58]/20 bg-[#004A58] shadow-lg" 
                    : "border-gray-200 hover:border-[#004A58] hover:shadow-md"
                }`}
                onClick={() => handleGovernorateClick(center.gov)}
              >
                <MapPin className={`h-4 w-4 ${
                  selectedGov === center.gov ? "text-white" : "text-[#004A58]"
                }`} />
              </button>
              
              {/* Governorate Name Tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                {center.gov}
              </div>
            </div>
          ))}

          {/* Governorate Info Popup */}
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
                      <CardTitle className="text-lg font-bold text-[#004A58]">
                        {selectedGov}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={closePopup}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {currentGovInfo && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          {currentGovInfo.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {currentGovInfo.highlights.map((highlight, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => navigate(`/governorate/${selectedGov}`)}
                            className="bg-[#004A58] hover:bg-[#006B7A]"
                          >
                            استكشف المحافظة
                            <ArrowRight className="h-4 w-4 mr-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#004A58]">
              المحافظات المتاحة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableGovs.map((gov) => (
                <button
                  key={gov}
                  onClick={() => handleGovernorateClick(gov)}
                  className={`w-full text-right p-3 rounded-lg border transition-all duration-200 ${
                    selectedGov === gov
                      ? "bg-[#004A58] text-white border-[#004A58]"
                      : "bg-white hover:bg-gray-50 border-gray-200 hover:border-[#004A58]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <MapPin className={`h-4 w-4 ${
                      selectedGov === gov ? "text-white" : "text-[#004A58]"
                    }`} />
                    <span className="font-medium">{gov}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}