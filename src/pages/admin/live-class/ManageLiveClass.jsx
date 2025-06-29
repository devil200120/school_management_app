import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Eye, Video, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const ManageLiveClass = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [liveClasses] = useState([
    {
      id: '1',
      title: 'Advanced Mathematics - Calculus',
      subject: 'Mathematics',
      level: 'Grade 12',
      teacher: 'Mr. Johnson',
      date: '2024-02-01',
      time: '10:00 AM',
      duration: 60,
      status: 'scheduled',
      participants: 25,
      maxParticipants: 30
    },
    {
      id: '2',
      title: 'Physics - Quantum Mechanics',
      subject: 'Physics',
      level: 'Grade 11',
      teacher: 'Dr. Smith',
      date: '2024-02-01',
      time: '2:00 PM',
      duration: 90,
      status: 'live',
      participants: 18,
      maxParticipants: 25
    }
  ]);

  const filteredClasses = liveClasses.filter(liveClass =>
    liveClass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    liveClass.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    liveClass.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Live Classes</h1>
          <p className="text-muted-foreground">Schedule and manage live classes for students</p>
        </div>
        <Button className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Class
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Live Classes Management
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search live classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Class Title</th>
                  <th className="text-left p-3 font-semibold">Subject</th>
                  <th className="text-left p-3 font-semibold">Level</th>
                  <th className="text-left p-3 font-semibold">Teacher</th>
                  <th className="text-left p-3 font-semibold">Schedule</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                  <th className="text-left p-3 font-semibold">Participants</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((liveClass) => (
                  <tr key={liveClass.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{liveClass.title}</td>
                    <td className="p-3">{liveClass.subject}</td>
                    <td className="p-3">
                      <Badge variant="outline">{liveClass.level}</Badge>
                    </td>
                    <td className="p-3">{liveClass.teacher}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {liveClass.date}
                        </div>
                        <div className="text-muted-foreground">{liveClass.time}</div>
                      </div>
                    </td>
                    <td className="p-3">{liveClass.duration} min</td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{liveClass.participants}/{liveClass.maxParticipants}</div>
                        <div className="text-muted-foreground">enrolled</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(liveClass.status)}>
                        {liveClass.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {liveClass.status === 'scheduled' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.info('Starting live class...')}
                          >
                            <Video className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageLiveClass;
