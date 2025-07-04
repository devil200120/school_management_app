
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { AlertTriangle } from 'lucide-react';

const RollbackPromotion = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Roll Back Last Promotion
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Promotion Rollback</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-md flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 h-5 w-5 mt-0.5" />
            <p className="text-sm text-amber-800">
              Please note: If you roll back any promotion date, it will delete the promotion history.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="promotionDate">Select Promotion Date</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-07-15">July 15, 2023</SelectItem>
                  <SelectItem value="2023-12-20">December 20, 2023</SelectItem>
                  <SelectItem value="2024-03-30">March 30, 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            variant="destructive"
            className="w-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Roll Back Promotion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RollbackPromotion;
