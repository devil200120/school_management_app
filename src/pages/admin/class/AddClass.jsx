
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';

const AddClass = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Class
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 mt-3 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="className">Enter Class Name</Label>
              <Input 
                id="className" 
                placeholder="e.g. Class 1A, 10th Grade, etc." 
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="classLevel">Select Class Level</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Add Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddClass;
