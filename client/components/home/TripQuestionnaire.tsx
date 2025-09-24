import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Calendar, DollarSign, Heart, MapPin, Clock, Utensils, Camera, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface Question {
  id: keyof QuestionnaireAnswers;
  title: string;
  icon: React.ComponentType<any>;
  options: { value: string; label: string; description?: string }[];
  allowCustom?: boolean;
  inputType?: 'radio' | 'textarea';
}

const questions: Question[] = [
  {
    id: "days",
    title: "How many days will you be staying in Egypt?",
    icon: Calendar,
    options: [
      { value: "3-5", label: "3-5 days", description: "Perfect for a quick getaway" },
      { value: "6-10", label: "6-10 days", description: "Ideal for exploring multiple cities" },
      { value: "11-14", label: "11-14 days", description: "Comprehensive Egypt experience" },
      { value: "15+", label: "More than 15 days", description: "Extended exploration" },
    ],
    allowCustom: true,
  },
  {
    id: "budget",
    title: "What is your estimated budget per person?",
    icon: DollarSign,
    options: [
      { value: "budget", label: "Budget-friendly ($50-100/day)", description: "Hostels, local food, public transport" },
      { value: "mid-range", label: "Mid-range ($100-200/day)", description: "3-star hotels, mix of local and tourist restaurants" },
      { value: "luxury", label: "Luxury ($200-500/day)", description: "4-5 star hotels, fine dining, private tours" },
      { value: "ultra-luxury", label: "Ultra-luxury ($500+/day)", description: "Premium experiences, exclusive access" },
    ],
    allowCustom: true,
  },
  {
    id: "groupSize",
    title: "How many people are in your group?",
    icon: Users,
    options: [
      { value: "1", label: "Solo traveler", description: "Just me" },
      { value: "2", label: "2 people", description: "Couple or friend" },
      { value: "3-4", label: "3-4 people", description: "Small group" },
      { value: "5-8", label: "5-8 people", description: "Medium group" },
      { value: "9+", label: "9+ people", description: "Large group" },
    ],
    allowCustom: true,
  },
  {
    id: "travelWith",
    title: "Who are you traveling with?",
    icon: Heart,
    options: [
      { value: "solo", label: "Solo", description: "Traveling alone" },
      { value: "partner", label: "Partner/Spouse", description: "Romantic getaway" },
      { value: "family", label: "Family", description: "With children or extended family" },
      { value: "friends", label: "Friends", description: "Group of friends" },
      { value: "colleagues", label: "Colleagues", description: "Business or team trip" },
    ],
    allowCustom: true,
  },
  {
    id: "interests",
    title: "What interests you most about Egypt?",
    icon: MapPin,
    options: [
      { value: "history", label: "Ancient History", description: "Pyramids, temples, museums" },
      { value: "culture", label: "Culture & People", description: "Local experiences, traditions" },
      { value: "adventure", label: "Adventure", description: "Desert safaris, diving, hiking" },
      { value: "relaxation", label: "Relaxation", description: "Beaches, spas, leisure" },
      { value: "photography", label: "Photography", description: "Capturing stunning landscapes and monuments" },
    ],
    allowCustom: true,
  },
  {
    id: "pace",
    title: "What's your preferred travel pace?",
    icon: Clock,
    options: [
      { value: "relaxed", label: "Relaxed", description: "2-3 activities per day, plenty of rest time" },
      { value: "moderate", label: "Moderate", description: "3-4 activities per day, balanced schedule" },
      { value: "active", label: "Active", description: "4-5 activities per day, packed itinerary" },
      { value: "flexible", label: "Flexible", description: "Mix of busy and relaxed days" },
    ],
  },
  {
    id: "accommodation",
    title: "What type of accommodation do you prefer?",
    icon: Bed,
    options: [
      { value: "budget", label: "Budget Hotels/Hostels", description: "Clean, basic amenities" },
      { value: "boutique", label: "Boutique Hotels", description: "Unique character, local charm" },
      { value: "luxury", label: "Luxury Hotels", description: "5-star service, premium amenities" },
      { value: "historic", label: "Historic Hotels", description: "Heritage properties with history" },
      { value: "resorts", label: "Resorts", description: "All-inclusive, recreational facilities" },
    ],
    allowCustom: true,
  },
  {
    id: "transportation",
    title: "How do you prefer to get around?",
    icon: MapPin,
    options: [
      { value: "private", label: "Private Driver/Car", description: "Comfort and flexibility" },
      { value: "tours", label: "Organized Tours", description: "Guided experiences with groups" },
      { value: "public", label: "Public Transport", description: "Trains, buses, local transport" },
      { value: "mix", label: "Mix of Options", description: "Different transport for different activities" },
    ],
  },
  {
    id: "dining",
    title: "What's your dining preference?",
    icon: Utensils,
    options: [
      { value: "local", label: "Local Street Food", description: "Authentic, budget-friendly" },
      { value: "restaurants", label: "Local Restaurants", description: "Traditional Egyptian cuisine" },
      { value: "international", label: "International Cuisine", description: "Familiar foods and fine dining" },
      { value: "mix", label: "Mix of Everything", description: "Variety of dining experiences" },
    ],
  },
  {
    id: "specialRequests",
    title: "Any special requirements or requests?",
    icon: Camera,
    inputType: "textarea",
    options: [],
    allowCustom: true,
  },
];

export function TripQuestionnaire({ 
  selections, 
  onComplete 
}: { 
  selections: SelectedItem[];
  onComplete: (answers: QuestionnaireAnswers) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireAnswers>>({});
  const [customInput, setCustomInput] = useState("");

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[question.id] || (question.allowCustom && customInput.trim());

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    setCustomInput("");
  };

  const handleCustomInput = (value: string) => {
    setCustomInput(value);
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers as QuestionnaireAnswers);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setCustomInput("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setCustomInput("");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Selected Places Summary */}
      {currentQuestion === 0 && selections.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Your Selected Places</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selections.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  <MapPin className="h-3 w-3" />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <question.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{question.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.inputType === "textarea" ? (
                <Textarea
                  placeholder="Please share any special requirements, dietary restrictions, accessibility needs, or specific requests..."
                  value={customInput}
                  onChange={(e) => handleCustomInput(e.target.value)}
                  className="min-h-[100px]"
                />
              ) : (
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.allowCustom && question.inputType !== "textarea" && (
                <div className="pt-4 border-t">
                  <Label htmlFor="custom" className="text-sm font-medium mb-2 block">
                    Or specify your own:
                  </Label>
                  <Input
                    id="custom"
                    placeholder="Enter your custom answer..."
                    value={customInput}
                    onChange={(e) => handleCustomInput(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center gap-2"
        >
          {isLastQuestion ? "Generate My Itinerary" : "Next"}
          {!isLastQuestion && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}