import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Calendar, 
  Clock,
  MapPin,
  Users,
  Download,
  Mail,
  Phone,
  Navigation
} from "lucide-react";
import { format } from "date-fns";

export default function ExperienceConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state;

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

  const { experience, date, time, participants, bookingInfo, totalPrice, bookingNumber, paymentMethod } = bookingData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Experience Booked!</h1>
            <p className="text-gray-600">
              Your experience has been successfully booked. Get ready for an amazing time!
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Booking Number:</span>
                <span className="font-mono text-blue-600">#{bookingNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Booking Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Payment Method:</span>
                <span className="capitalize">{paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'cash' ? 'Pay at Location' : 'Bank Transfer'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Paid:</span>
                <span className="font-bold text-lg">{totalPrice} EGP</span>
              </div>
            </CardContent>
          </Card>

          {/* Experience Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Experience Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <img 
                  src={experience.image} 
                  alt={experience.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{experience.name}</h3>
                  <p className="text-gray-600 text-sm">{experience.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-gray-600">{format(date, "PPP")}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-gray-600">{time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-600">{experience.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Participants</p>
                    <p className="text-sm text-gray-600">{participants} {participants === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {bookingInfo.firstName} {bookingInfo.lastName}</p>
                <p><strong>Email:</strong> {bookingInfo.email}</p>
                <p><strong>Phone:</strong> {bookingInfo.phone}</p>
                {bookingInfo.specialRequests && (
                  <p><strong>Special Requests:</strong> {bookingInfo.specialRequests}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Before You Go:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Please arrive 15 minutes before your scheduled time</li>
                    <li>• Bring a valid ID for verification</li>
                    <li>• Wear comfortable clothes that can get dirty</li>
                    <li>• All materials and tools will be provided</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">What's Included:</p>
                  <ul className="text-green-700 space-y-1">
                    {experience.includes.map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-yellow-800 mb-1">Cancellation Policy:</p>
                  <p className="text-yellow-700">
                    Free cancellation up to 24 hours before the experience. 
                    Contact us if you need to reschedule.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Email Ticket
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Contact Host
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/marketplace">Book Another Experience</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/my-bookings">View All Bookings</Link>
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800 mb-2">
              Questions about your booking?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="link" className="text-blue-600">
                <Phone className="h-4 w-4 mr-1" />
                Call Support
              </Button>
              <Button variant="link" className="text-blue-600">
                <Mail className="h-4 w-4 mr-1" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}