import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Star,
  CreditCard
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const experiences = {
  pottery: {
    id: "pottery",
    name: "Pottery Village - Fustat",
    description: "Learn traditional pottery making techniques from master craftsmen in Old Cairo",
    location: "Old Cairo",
    duration: "3-4 hours",
    price: 150,
    rating: 4.8,
    image: "/placeholder.svg",
    includes: [
      "Professional pottery instructor",
      "All materials and tools",
      "Take home your creation",
      "Traditional Egyptian tea",
      "Certificate of completion"
    ],
    schedule: [
      "9:00 AM - 1:00 PM",
      "2:00 PM - 6:00 PM"
    ]
  },
  carpet: {
    id: "carpet",
    name: "Traditional Carpet Weaving",
    description: "Master the ancient art of Egyptian carpet weaving with local artisans",
    location: "Khan El Khalili",
    duration: "2-3 hours",
    price: 200,
    rating: 4.7,
    image: "/placeholder.svg",
    includes: [
      "Expert weaving instructor",
      "Traditional loom access",
      "Quality materials",
      "Small carpet to take home",
      "History of Egyptian textiles"
    ],
    schedule: [
      "10:00 AM - 1:00 PM",
      "3:00 PM - 6:00 PM"
    ]
  },
  jewelry: {
    id: "jewelry",
    name: "Silver Jewelry Workshop",
    description: "Create your own Egyptian-inspired silver jewelry pieces",
    location: "Islamic Cairo",
    duration: "4-5 hours",
    price: 300,
    rating: 4.9,
    image: "/placeholder.svg",
    includes: [
      "Master silversmith guidance",
      "Silver materials included",
      "Professional tools",
      "Custom jewelry piece",
      "Jewelry care instructions"
    ],
    schedule: [
      "9:00 AM - 2:00 PM",
      "2:30 PM - 7:30 PM"
    ]
  }
};

export default function BookExperiencePage() {
  const { experienceId = "pottery" } = useParams();
  const navigate = useNavigate();
  const experience = experiences[experienceId as keyof typeof experiences] || experiences.pottery;
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [participants, setParticipants] = useState(1);
  const [bookingInfo, setBookingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  const totalPrice = experience.price * participants;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }

    const bookingData = {
      experience,
      date: selectedDate,
      time: selectedTime,
      participants,
      bookingInfo,
      totalPrice,
      bookingId: "EXP" + Date.now()
    };

    navigate("/experience-checkout", { state: bookingData });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/marketplace">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Experiences
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience Details */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="relative">
                <img 
                  src={experience.image} 
                  alt={experience.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{experience.rating}</span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{experience.name}</CardTitle>
                <p className="text-gray-600">{experience.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Small groups
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <h3 className="font-semibold mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {experience.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Book Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-2"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label>Select Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {experience.schedule.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Participants */}
                  <div>
                    <Label>Number of Participants</Label>
                    <Select value={participants.toString()} onValueChange={(value) => setParticipants(parseInt(value))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={bookingInfo.firstName}
                        onChange={(e) => setBookingInfo({...bookingInfo, firstName: e.target.value})}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={bookingInfo.lastName}
                        onChange={(e) => setBookingInfo({...bookingInfo, lastName: e.target.value})}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingInfo.email}
                      onChange={(e) => setBookingInfo({...bookingInfo, email: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={bookingInfo.phone}
                      onChange={(e) => setBookingInfo({...bookingInfo, phone: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="requests"
                      value={bookingInfo.specialRequests}
                      onChange={(e) => setBookingInfo({...bookingInfo, specialRequests: e.target.value})}
                      placeholder="Any special requirements or requests..."
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Continue to Payment - {totalPrice} EGP
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{experience.name}</h3>
                  <p className="text-sm text-gray-600">{experience.location}</p>
                </div>

                {selectedDate && (
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-gray-600">{format(selectedDate, "PPP")}</p>
                  </div>
                )}

                {selectedTime && (
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-gray-600">{selectedTime}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-sm text-gray-600">{participants} {participants === 1 ? 'Person' : 'People'}</p>
                </div>

                <hr />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Price per person</span>
                    <span>{experience.price} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Participants</span>
                    <span>× {participants}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{totalPrice} EGP</span>
                </div>

                <div className="text-xs text-gray-500">
                  * Free cancellation up to 24 hours before the experience
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}