import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Home,
  Download,
  Mail
} from "lucide-react";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const { orderNumber, total, items } = location.state || {
    orderNumber: "EG" + Date.now(),
    total: 203.1,
    items: []
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-blue-600">#{orderNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{estimatedDelivery.toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-bold">${item.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-gray-600">Your order has been received and confirmed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Processing</p>
                    <p className="text-sm text-gray-400">We're preparing your items</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Shipped</p>
                    <p className="text-sm text-gray-400">Your order is on the way</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Home className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Delivered</p>
                    <p className="text-sm text-gray-400">Package delivered to your address</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Email Receipt
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/marketplace">Continue Shopping</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/orders">View All Orders</Link>
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800 mb-2">
              Need help with your order?
            </p>
            <Button variant="link" className="text-blue-600">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}