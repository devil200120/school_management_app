
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

const ConfirmPayment = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Confirm Payment
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Add Session</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transactionId">Enter Transaction/Reference ID</Label>
              <Input 
                id="transactionId" 
                placeholder="Enter the transaction or reference ID" 
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Verify Payment
          </Button>
        </CardContent>
      </Card>

      {/* Payment Details Card (Shows after verification) */}
      <Card className="mt-3 animate-fade-in delay-200 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Transaction ID:</p>
                <p className="font-medium">TRX-12345-ABCDE</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount:</p>
                <p className="font-medium">$500.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Student:</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class:</p>
                <p className="font-medium">Class 10A</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Date:</p>
                <p className="font-medium">April 15, 2023</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status:</p>
                <p className="font-medium text-green-600">Verified</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              Confirm Payment
            </Button>
            <Button 
              variant="destructive"
              className="flex-1 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              Reject Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmPayment;
