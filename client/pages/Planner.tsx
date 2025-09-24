import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { attractions as allAttractions } from "@/lib/egypt-data";
import { STORAGE_KEYS, load, save } from "@/lib/offline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Save, ArrowLeft, MapPin, Clock, Star, Users, DollarSign, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { exportItineraryToPDF } from "@/lib/pdf-export";

interface SelectedItem {
  id: string;
  name: string;
  type: string;
  governorate: string;
  city: string;
}

interface QuestionnaireAnswers {
  days: string;
  budget: string;
  groupSize: string;
  travelWith: string;
  interests: string;
  pace: string;
  accommodation: string;
  transportation: string;
  dining: string;
  specialRequests: string;
}

type Slot = { 
  time: string; 
  name: string; 
  city: string; 
  type: string;
  description?: string;
  duration?: string;
  transport?: string;
};

export default function PlannerPage() {
  const location = useLocation() as any;
  const navigate = useNavigate();
  const wizard = location?.state?.wizard === true;
  const selections: SelectedItem[] = location?.state?.selections || [];
  const answers: QuestionnaireAnswers = location?.state?.answers || {};
  
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Slot[][]>([]);
  const [generatedAt, setGeneratedAt] = useState<Date | null>(null);

  // Generate itinerary when component mounts with wizard data
  useEffect(() => {
    if (wizard && selections.length > 0 && answers.days) {
      generateItinerary();
    }
  }, [wizard, selections, answers]);

  function generateItinerary() {
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const days = parseDays(answers.days);
      const pace = mapPaceFromAnswers(answers.pace);
      const generated = createPersonalizedItinerary(selections, days, pace, answers);
      setItinerary(generated);
      setGeneratedAt(new Date());
      setLoading(false);
      
      // Save to offline storage
      save(STORAGE_KEYS.itinerary, {
        days,
        selections: selections.map(s => s.id),
        plan: generated,
        answers,
        generatedAt: new Date().toISOString()
      });
    }, 2000);
  }

  function parseDays(daysAnswer: string): number {
    if (daysAnswer.includes('3-5')) return 4;
    if (daysAnswer.includes('6-10')) return 7;
    if (daysAnswer.includes('11-14')) return 12;
    if (daysAnswer.includes('15+')) return 15;
    const num = parseInt(daysAnswer);
    return isNaN(num) ? 7 : num;
  }

  function mapPaceFromAnswers(paceAnswer: string): 'relaxed' | 'moderate' | 'active' {
    if (paceAnswer === 'relaxed') return 'relaxed';
    if (paceAnswer === 'active') return 'active';
    return 'moderate';
  }

  function createPersonalizedItinerary(
    selections: SelectedItem[], 
    days: number, 
    pace: 'relaxed' | 'moderate' | 'active',
    answers: QuestionnaireAnswers
  ): Slot[][] {
    const activitiesPerDay = pace === 'relaxed' ? 2 : pace === 'active' ? 4 : 3;
    const timeSlots = ['09:00', '11:30', '14:00', '16:30', '19:00'];
    
    const result: Slot[][] = [];
    let selectionIndex = 0;
    
    for (let day = 0; day < days; day++) {
      const daySlots: Slot[] = [];
      
      for (let slot = 0; slot < activitiesPerDay && selectionIndex < selections.length; slot++) {
        const selection = selections[selectionIndex];
        const attraction = allAttractions.find(a => a.id === selection.id);
        
        if (attraction) {
          daySlots.push({
            time: timeSlots[slot] || '18:00',
            name: attraction.name,
            city: attraction.city,
            type: attraction.type,
            description: attraction.description,
            duration: attraction.estHours ? `${attraction.estHours}h` : '2h',
            transport: attraction.bestTransport?.[0] || 'Taxi'
          });
        }
        
        selectionIndex++;
      }
      
      // Add travel/rest time for multi-city trips
      if (day > 0 && daySlots.length > 0) {
        const prevDay = result[day - 1];
        const prevCity = prevDay[prevDay.length - 1]?.city;
        const currentCity = daySlots[0]?.city;
        
        if (prevCity && currentCity && prevCity !== currentCity) {
          daySlots.unshift({
            time: '08:00',
            name: `Travel from ${prevCity} to ${currentCity}`,
            city: currentCity,
            type: 'transport',
            duration: '2h',
            transport: answers.transportation === 'private' ? 'Private Car' : 'Train/Bus'
          });
        }
      }
      
      result.push(daySlots);
    }
    
    return result;
  }

  function exportJSON() {
    const exportData = {
      generatedAt: generatedAt?.toISOString(),
      selections,
      answers,
      itinerary,
      summary: {
        totalDays: itinerary.length,
        totalActivities: itinerary.flat().length,
        cities: [...new Set(itinerary.flat().map(slot => slot.city))],
        governorates: [...new Set(selections.map(s => s.governorate))]
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `egypt-itinerary-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    if (!generatedAt || itinerary.length === 0) return;
    
    const pdfData = {
      selections,
      answers,
      itinerary,
      generatedAt
    };
    
    exportItineraryToPDF(pdfData);
  }

  if (!wizard) {
    return (
      <section className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Trip Planner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Start Planning Your Trip</h3>
              <p className="text-muted-foreground mb-4">
                Use our interactive map to select destinations and create your personalized itinerary.
              </p>
              <Button onClick={() => navigate('/map')}>Go to Map</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/map')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Map
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Your Personalized Egypt Itinerary
        </h1>
        <p className="text-muted-foreground">
          AI-generated itinerary based on your preferences and selected destinations.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trip Summary */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trip Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{answers.days} in Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{answers.groupSize} {answers.travelWith}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{answers.budget} budget</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{answers.interests} focused</span>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Selected Places</h4>
                <div className="space-y-1">
                  {selections.map((item) => (
                    <div key={item.id} className="text-xs text-muted-foreground">
                      • {item.name} ({item.city})
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={exportPDF} 
                    className="flex-1"
                    disabled={!generatedAt || itinerary.length === 0}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportJSON} className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    JSON
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={generateItinerary} className="w-full">
                  Regenerate Itinerary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itinerary */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Daily Itinerary</CardTitle>
                {generatedAt && (
                  <Badge variant="secondary" className="text-xs">
                    Generated {generatedAt.toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">
                      Creating your personalized itinerary...
                    </p>
                  </div>
                </div>
              ) : itinerary.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Click "Generate Itinerary" to create your plan.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {itinerary.map((day, dayIndex) => (
                    <div key={dayIndex} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-primary">
                        Day {dayIndex + 1}
                      </h3>
                      {day.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                          Free day for rest or personal exploration
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {day.map((slot, slotIndex) => (
                            <div key={slotIndex} className="flex gap-4 pb-3 border-b border-border/50 last:border-b-0">
                              <div className="text-sm font-mono text-muted-foreground min-w-[60px]">
                                {slot.time}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{slot.name}</div>
                                {slot.description && (
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {slot.description}
                                  </div>
                                )}
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>📍 {slot.city}</span>
                                  {slot.duration && <span>⏱️ {slot.duration}</span>}
                                  {slot.transport && <span>🚗 {slot.transport}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


