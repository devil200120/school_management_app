
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
import { Search } from 'lucide-react';

const GroupStudent = () => {
  const [level, setLevel] = useState('');
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [session, setSession] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Group Students:', { level, class: classValue, section, session });
    // Logic to fetch and group students
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Group Students
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Group Students Into Class Sections</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
              <div className="space-y-2">
                <Label htmlFor="section">Select Section</Label>
                <Select>
                  <select 
                    id="section" 
                    value={section} 
                    onChange={(e) => setSection(e.target.value)} 
                    className="w-full"
                    required
                  >
                    <option value="">Select Section</option>
                    <option value="a">Section A</option>
                    <option value="b">Section B</option>
                    <option value="c">Section C</option>
                  </select>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session">Select Session</Label>
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

          <div className="mt-8 border rounded-md">
            <div className="bg-gray-100 p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Available Students</h3>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-9 pr-4 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-center text-gray-500 py-8">
                Please select a level, class, section and session to view students
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupStudent;
