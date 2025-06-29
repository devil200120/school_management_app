
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';

const ViewClassStudents = () => {
  const [session, setSession] = useState('');
  const [level, setLevel] = useState('');
  const [classValue, setClassValue] = useState('');
  const [showSessionHistory, setShowSessionHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('View class students:', { 
      session, 
      level, 
      class: classValue,
      showSessionHistory
    });
    // Logic to fetch class students
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          View Class Students
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Level, Class and Session of Students</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Select>
                  <select 
                    id="session" 
                    value={session} 
                    onChange={(e) => setSession(e.target.value)} 
                    className="w-full"
                    required
                  >
                    <option value="">Select Session</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Select Level</Label>
                <Select>
                  <select 
                    id="level" 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)} 
                    className="w-full"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="primary">Primary</option>
                    <option value="junior">Junior Secondary</option>
                    <option value="senior">Senior Secondary</option>
                  </select>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Select Class</Label>
                <Select>
                  <select 
                    id="class" 
                    value={classValue} 
                    onChange={(e) => setClassValue(e.target.value)} 
                    className="w-full"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                    <option value="class3">Class 3</option>
                  </select>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showHistory" 
                checked={showSessionHistory}
                onCheckedChange={(checked) => setShowSessionHistory(checked)} 
              />
              <label 
                htmlFor="showHistory" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show with session history
              </label>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-eduos-primary hover:bg-eduos-secondary transition-colors"
              >
                Go Now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewClassStudents;
