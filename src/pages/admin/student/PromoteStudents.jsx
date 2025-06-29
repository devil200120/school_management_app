
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
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';

const PromoteStudents = () => {
  const [level, setLevel] = useState('');
  const [session, setSession] = useState('');
  const [targetSession, setTargetSession] = useState('');
  const [isPromote, setIsPromote] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Promotion/Demotion:', { 
      level, 
      session,
      targetSession,
      action: isPromote ? 'promote' : 'demote'
    });
    // Logic to handle promotion/demotion
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Promote and Demote Students
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Promote and Demote Students</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-600">Caution</AlertTitle>
            <AlertDescription>
              This action will affect all students in the selected level and session. Please double-check your selection before proceeding.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4 mb-6">
            <Button 
              type="button" 
              className={`flex-1 ${isPromote 
                ? 'bg-eduos-primary text-white' 
                : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setIsPromote(true)}
            >
              Promote Students
            </Button>
            <Button 
              type="button" 
              className={`flex-1 ${!isPromote 
                ? 'bg-eduos-primary text-white' 
                : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setIsPromote(false)}
            >
              Demote Students
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                <Label htmlFor="session">Current Session</Label>
                <Select>
                  <select 
                    id="session" 
                    value={session} 
                    onChange={(e) => setSession(e.target.value)} 
                    className="w-full"
                    required
                  >
                    <option value="">Select Current Session</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetSession">Target Session</Label>
                <Select>
                  <select 
                    id="targetSession" 
                    value={targetSession} 
                    onChange={(e) => setTargetSession(e.target.value)} 
                    className="w-full"
                    required
                  >
                    <option value="">Select Target Session</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div>
                {isPromote ? (
                  <p className="text-sm text-gray-600">
                    This will promote students from the current level to the next level.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    This will demote students from the current level to the previous level.
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className={isPromote 
                  ? "bg-eduos-primary hover:bg-eduos-secondary transition-colors" 
                  : "bg-amber-500 hover:bg-amber-600 transition-colors"
                }
              >
                {isPromote ? "Promote Students" : "Demote Students"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromoteStudents;
