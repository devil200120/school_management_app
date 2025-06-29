
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { GraduationCap, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AddLevel = () => {
  const [formData, setFormData] = useState({
    levelName: '',
    levelCode: '',
    description: '',
    minimumAge: '',
    maximumAge: '',
    prerequisites: '',
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Level added successfully!');
    setFormData({
      levelName: '',
      levelCode: '',
      description: '',
      minimumAge: '',
      maximumAge: '',
      prerequisites: '',
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
          <h1 className="text-2xl font-bold tracking-tight">Add New Level</h1>
          <p className="text-muted-foreground">Create a new academic level for students</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Level Management
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Level Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="levelName">Level Name *</Label>
                <Input
                  id="levelName"
                  placeholder="e.g., Grade 10, Kindergarten, Advanced Level"
                  value={formData.levelName}
                  onChange={(e) => handleInputChange('levelName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="levelCode">Level Code *</Label>
                <Input
                  id="levelCode"
                  placeholder="e.g., G10, KG, AL"
                  value={formData.levelCode}
                  onChange={(e) => handleInputChange('levelCode', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumAge">Minimum Age</Label>
                <Input
                  id="minimumAge"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.minimumAge}
                  onChange={(e) => handleInputChange('minimumAge', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maximumAge">Maximum Age</Label>
                <Input
                  id="maximumAge"
                  type="number"
                  placeholder="e.g., 18"
                  value={formData.maximumAge}
                  onChange={(e) => handleInputChange('maximumAge', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter level description..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Textarea
                id="prerequisites"
                placeholder="Enter any prerequisites for this level..."
                rows={3}
                value={formData.prerequisites}
                onChange={(e) => handleInputChange('prerequisites', e.target.value)}
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

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-eduos-primary hover:bg-eduos-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add Level
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLevel;
