
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Search, Plus, Edit, Trash2, Scissors } from 'lucide-react';
import { toast } from 'sonner';

const ManageSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sections] = useState([
    {
      id: '1',
      name: 'Section A',
      level: 'Grade 1',
      capacity: 30,
      currentStudents: 28,
      teacher: 'Mrs. Johnson',
      room: 'Room 101',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Section B',
      level: 'Grade 1',
      capacity: 30,
      currentStudents: 25,
      teacher: 'Mr. Smith',
      room: 'Room 102',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'Section A',
      level: 'Grade 2',
      capacity: 32,
      currentStudents: 30,
      teacher: 'Ms. Davis',
      room: 'Room 201',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '4',
      name: 'Section C',
      level: 'Grade 10',
      capacity: 25,
      currentStudents: 0,
      teacher: 'TBD',
      room: 'Room 301',
      status: 'inactive',
      createdAt: '2024-01-10'
    }
  ]);

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getCapacityColor = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleEditSection = (id) => {
    toast.info(`Edit section ${id} feature would open a modal here`);
  };

  const handleDeleteSection = (id) => {
    toast.info(`Delete section ${id} feature would show confirmation here`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Sections</h1>
          <p className="text-muted-foreground">Manage class sections and student groups</p>
        </div>
        <Button className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5" />
            Class Sections
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sections..."
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
                  <th className="text-left p-3 font-semibold">Section</th>
                  <th className="text-left p-3 font-semibold">Level</th>
                  <th className="text-left p-3 font-semibold">Teacher</th>
                  <th className="text-left p-3 font-semibold">Room</th>
                  <th className="text-left p-3 font-semibold">Students</th>
                  <th className="text-left p-3 font-semibold">Capacity</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Created</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.map((section) => (
                  <tr key={section.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{section.name}</td>
                    <td className="p-3">
                      <Badge variant="outline">{section.level}</Badge>
                    </td>
                    <td className="p-3">{section.teacher}</td>
                    <td className="p-3">{section.room}</td>
                    <td className="p-3">
                      <span className={getCapacityColor(section.currentStudents, section.capacity)}>
                        {section.currentStudents}
                      </span>
                    </td>
                    <td className="p-3">{section.capacity}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(section.status)}>
                        {section.status}
                      </Badge>
                    </td>
                    <td className="p-3">{section.createdAt}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSection(section.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSections.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sections found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSection;
