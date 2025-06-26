import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

const EditLessonPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    section: '',
    date: '',
    duration: '',
    objectives: [''],
    materials: [''],
    activities: [''],
    assessment: '',
    homework: '',
    notes: '',
    status: 'planned'
  });

  useEffect(() => {
    // Mock data for the lesson plan
    const mockLessonPlan = {
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      class: 'Class 9',
      section: 'A',
      date: '2025-05-15',
      duration: '45',
      objectives: ['Understand basic algebraic concepts', 'Solve simple equations'],
      materials: ['Textbook', 'Whiteboard', 'Calculator'],
      activities: ['Introduction lecture', 'Practice problems', 'Group discussion'],
      assessment: 'Quiz on basic algebraic operations',
      homework: 'Complete exercises 1-10 from textbook',
      notes: 'Focus on practical applications',
      status: 'planned'
    };
    setFormData(mockLessonPlan);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log('Saving lesson plan:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Lesson plan updated successfully!');
      navigate('/teacher/lesson-plan/manage');
    } catch (error) {
      toast.error('Failed to update lesson plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Lesson Plan</h1>
          <p className="text-muted-foreground">Update lesson plan details</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/teacher/lesson-plan/manage')}>
          Back to Lesson Plans
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Plan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Lesson Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter lesson title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleSelectChange('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => handleSelectChange('class', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 8">Class 8</SelectItem>
                  <SelectItem value="Class 9">Class 9</SelectItem>
                  <SelectItem value="Class 10">Class 10</SelectItem>
                  <SelectItem value="Class 11">Class 11</SelectItem>
                  <SelectItem value="Class 12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="section">Section *</Label>
              <Select value={formData.section} onValueChange={(value) => handleSelectChange('section', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                  <SelectItem value="D">Section D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration"
                required
              />
            </div>
          </div>

          {/* Objectives */}
          <div>
            <Label>Learning Objectives</Label>
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={objective}
                  onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                  placeholder="Enter learning objective"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeArrayItem('objectives', index)}
                  disabled={formData.objectives.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('objectives')}>
              Add Objective
            </Button>
          </div>

          {/* Materials */}
          <div>
            <Label>Materials Required</Label>
            {formData.materials.map((material, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={material}
                  onChange={(e) => handleArrayChange('materials', index, e.target.value)}
                  placeholder="Enter material"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeArrayItem('materials', index)}
                  disabled={formData.materials.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('materials')}>
              Add Material
            </Button>
          </div>

          {/* Activities */}
          <div>
            <Label>Learning Activities</Label>
            {formData.activities.map((activity, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={activity}
                  onChange={(e) => handleArrayChange('activities', index, e.target.value)}
                  placeholder="Enter activity"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeArrayItem('activities', index)}
                  disabled={formData.activities.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('activities')}>
              Add Activity
            </Button>
          </div>

          <div>
            <Label htmlFor="assessment">Assessment Method</Label>
            <Textarea
              id="assessment"
              name="assessment"
              value={formData.assessment}
              onChange={handleInputChange}
              placeholder="Describe how you will assess student learning"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="homework">Homework/Assignment</Label>
            <Textarea
              id="homework"
              name="homework"
              value={formData.homework}
              onChange={handleInputChange}
              placeholder="Describe homework or assignments"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any additional notes or reminders"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/teacher/lesson-plan/manage')}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLessonPlan;
