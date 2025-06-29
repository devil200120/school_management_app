
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Users, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AddSection = () => {
  const [formData, setFormData] = useState({
    sectionName: '',
    sectionCode: '',
    level: '',
    classRoom: '',
    maxStudents: '',
    description: '',
    status: 'active'
  });

  const levels = [
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Section added successfully!');
    setFormData({
      sectionName: '',
      sectionCode: '',
      level: '',
      classRoom: '',
      maxStudents: '',
      description: '',
      status: 'active'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Section</h1>
          <p className="text-muted-foreground">Create a new section for students</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Section Management
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Section Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sectionName">Section Name *</Label>
                <Input
                  id="sectionName"
                  placeholder="e.g., Section A, Section B, Alpha"
                  value={formData.sectionName}
                  onChange={(e) => handleInputChange('sectionName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sectionCode">Section Code *</Label>
                <Input
                  id="sectionCode"
                  placeholder="e.g., 10A, KG-B, 12-ALPHA"
                  value={formData.sectionCode}
                  onChange={(e) => handleInputChange('sectionCode', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <select
                  id="level"
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Level</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="classRoom">Classroom</Label>
                <Input
                  id="classRoom"
                  placeholder="e.g., Room 101, Building A-201"
                  value={formData.classRoom}
                  onChange={(e) => handleInputChange('classRoom', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxStudents">Maximum Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.maxStudents}
                  onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter section description..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-eduos-primary hover:bg-eduos-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSection;
