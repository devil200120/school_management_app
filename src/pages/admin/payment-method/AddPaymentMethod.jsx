import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

const AddPaymentMethod = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Payment Method
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Payment Method Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Enter Payment Method/Bank Name</Label>
              <Input 
                id="paymentMethod" 
                placeholder="e.g. Credit Card, PayPal, Bank Transfer, etc." 
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Add Now
          </Button>
        </CardContent>
      </Card>

      {/* Existing Payment Methods */}
      <Card className="mt-3 animate-fade-in delay-200 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Existing Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {["Credit Card", "Bank Transfer", "PayPal", "Cash"].map((method, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 transition-all"
            >
              <span>{method}</span>
              <div className="flex space-x-2">
                <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPaymentMethod;
