
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Layers } from 'lucide-react';
import { toast } from 'sonner';

const ManageLevel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levels] = useState([
    {
      id: '1',
      name: 'Grade 1',
      code: 'G1',
      description: 'First grade primary education',
      totalStudents: 120,
      totalSections: 4,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Grade 2',
      code: 'G2',
      description: 'Second grade primary education',
      totalStudents: 95,
      totalSections: 3,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'Grade 10',
      code: 'G10',
      description: 'Tenth grade secondary education',
      totalStudents: 80,
      totalSections: 3,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '4',
      name: 'Pre-K',
      code: 'PK',
      description: 'Pre-kindergarten level',
      totalStudents: 0,
      totalSections: 0,
      status: 'inactive',
      createdAt: '2024-01-10'
    }
  ]);

  const filteredLevels = levels.filter(level =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleEditLevel = (id) => {
    toast.info(`Edit level ${id} feature would open a modal here`);
  };

  const handleDeleteLevel = (id) => {
    toast.info(`Delete level ${id} feature would show confirmation here`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Levels</h1>
          <p className="text-muted-foreground">Manage academic levels and grades</p>
        </div>
        <Button className="bg-eduos-primary hover:bg-eduos-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Level
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Academic Levels
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search levels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 px-5"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Level Name</th>
                  <th className="text-left p-3 font-semibold">Code</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                  <th className="text-left p-3 font-semibold">Students</th>
                  <th className="text-left p-3 font-semibold">Sections</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Created</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLevels.map((level) => (
                  <tr key={level.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{level.name}</td>
                    <td className="p-3">
                      <Badge variant="outline">{level.code}</Badge>
                    </td>
                    <td className="p-3">{level.description}</td>
                    <td className="p-3">{level.totalStudents}</td>
                    <td className="p-3">{level.totalSections}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(level.status)}>
                        {level.status}
                      </Badge>
                    </td>
                    <td className="p-3">{level.createdAt}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditLevel(level.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLevel(level.id)}
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
          
          {filteredLevels.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No levels found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageLevel;
