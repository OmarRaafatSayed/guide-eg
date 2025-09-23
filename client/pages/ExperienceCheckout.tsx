import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  CreditCard,
  Shield,
  Calendar,
  MapPin,
  Users,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ExperienceCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">No booking data found</p>
            <Button asChild>
              <Link to="/marketplace">Back to Experiences</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { experience, date, time, participants, bookingInfo, totalPrice } = bookingData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Experience booked successfully!");
      navigate("/experience-confirmation", { 
        state: { 
          ...bookingData,
          bookingNumber: "EXP" + Date.now(),
          paymentMethod
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to={`/book-experience/${experience.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Booking
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="cash">Pay at Location</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cash" className="mt-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>Pay at Location</strong>
                        </p>
                        <p className="text-sm text-blue-700">
                          You can pay the full amount when you arrive at the experience location. 
                          Please bring exact change or a credit card.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="bank" className="mt-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800 mb-2">
                          <strong>Bank Transfer Details:</strong>
                        </p>
                        <div className="text-sm font-mono text-green-700">
                          Bank: National Bank of Egypt<br/>
                          Account: 9876543210<br/>
                          IBAN: EG987654321098765432109876<br/>
                          Reference: {bookingData.bookingId}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Booking Terms & Conditions</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• Free cancellation up to 24 hours before the experience</p>
                      <p>• Please arrive 15 minutes before your scheduled time</p>
                      <p>• All materials and tools are provided</p>
                      <p>• Minimum age requirement: 12 years old</p>
                      <p>• Experience may be rescheduled due to weather conditions</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" required className="rounded" />
                      <label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions and cancellation policy
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Confirm Booking - {totalPrice} EGP
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <img 
                    src={experience.image} 
                    alt={experience.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">{experience.name}</h3>
                  <p className="text-sm text-gray-600">{experience.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{format(date, "PPP")}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{experience.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{participants} {participants === 1 ? 'Person' : 'People'}</span>
                  </div>
                </div>

                <hr />

                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{bookingInfo.firstName} {bookingInfo.lastName}</p>
                    <p>{bookingInfo.email}</p>
                    <p>{bookingInfo.phone}</p>
                  </div>
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

                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure booking</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}