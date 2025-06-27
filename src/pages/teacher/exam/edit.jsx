import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

const EditAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    section: '',
    examType: '',
    startDate: '',
    endDate: '',
    timeToSpend: '',
    totalQuestions: '',
    totalMarks: '',
    status: 'upcoming'
  });

  useEffect(() => {
    // Mock data for the assessment
    const mockAssessment = {
      title: 'Mathematics Mid-Term Exam',
      subject: 'Mathematics',
      class: 'Class 10',
      section: 'A',
      examType: 'Mid-Term',
      startDate: '2025-05-10',
      endDate: '2025-05-10',
      timeToSpend: '90',
      totalQuestions: '25',
      totalMarks: '100',
      status: 'upcoming'
    };
    setFormData(mockAssessment);
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

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log('Saving assessment:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Assessment updated successfully!');
      navigate('/teacher/exam/manage-assessment');
    } catch (error) {
      toast.error('Failed to update assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between  text-decoration">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Assessment</h1>
          <p className="text-muted-foreground">Update assessment details</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/teacher/exam/manage-assessment')}>
          Back to Assessments
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Assessment Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter assessment title"
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
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="examType">Exam Type</Label>
              <Select value={formData.examType} onValueChange={(value) => handleSelectChange('examType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                  <SelectItem value="Final Exam">Final Exam</SelectItem>
                  <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="timeToSpend">Duration (minutes) *</Label>
              <Input
                id="timeToSpend"
                name="timeToSpend"
                type="number"
                value={formData.timeToSpend}
                onChange={handleInputChange}
                placeholder="Enter duration in minutes"
                required
              />
            </div>

            <div>
              <Label htmlFor="totalQuestions">Total Questions *</Label>
              <Input
                id="totalQuestions"
                name="totalQuestions"
                type="number"
                value={formData.totalQuestions}
                onChange={handleInputChange}
                placeholder="Enter total questions"
                required
              />
            </div>

            <div>
              <Label htmlFor="totalMarks">Total Marks *</Label>
              <Input
                id="totalMarks"
                name="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={handleInputChange}
                placeholder="Enter total marks"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/teacher/exam/manage-assessment')}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAssessment;
