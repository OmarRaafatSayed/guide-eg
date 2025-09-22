import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InteractiveMap } from "@/components/home/InteractiveMap";
import { TripQuestionnaire } from "@/components/home/TripQuestionnaire";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

export default function MapPage() {
  const navigate = useNavigate();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selections, setSelections] = useState<SelectedItem[]>([]);

  const handlePlanTrip = (selectedItems: SelectedItem[]) => {
    setSelections(selectedItems);
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = (answers: QuestionnaireAnswers) => {
    // Navigate to planner with selections and answers
    navigate("/planner", {
      state: {
        wizard: true,
        selections,
        answers,
      },
    });
  };

  const handleBackToMap = () => {
    setShowQuestionnaire(false);
  };

  return (
    <section className="container py-8">
      {!showQuestionnaire ? (
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Explore Egypt
            </h1>
            <p className="text-muted-foreground">
              Click on governorate pins to discover attractions, then plan your perfect trip.
            </p>
          </div>
          <InteractiveMap onPlanTrip={handlePlanTrip} />
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToMap}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Map
            </Button>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Plan Your Perfect Trip
            </h1>
            <p className="text-muted-foreground">
              Answer a few questions to help us create your personalized itinerary.
            </p>
          </div>
          <TripQuestionnaire 
            selections={selections}
            onComplete={handleQuestionnaireComplete}
          />
        </div>
      )}
    </section>
  );
}
