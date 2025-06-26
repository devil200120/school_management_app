import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { DatePicker } from '../../../components/ui/date-picker';
import { toast } from 'sonner';

const ScheduleClass = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(undefined);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    section: '',
    startTime: '',
    endTime: '',
    platform: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subject || !formData.class || !formData.section ||
        !date || !formData.startTime || !formData.endTime || !formData.platform) {
      toast.error('Please fill all required fields');
      return;
    }

    const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

    // Normally save to database here
    toast.success('Live class scheduled successfully');
    navigate('/teacher/live-classes');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule New Live Class"
        description="Create a new live class session for your students"
      >
        <Button variant="outline" onClick={() => navigate('/teacher/live-classes')}>
          Cancel
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Class Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter class title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class <span className="text-red-500">*</span></Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, 'class')}
                  value={formData.class}
                >
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 6">Class 6</SelectItem>
                    <SelectItem value="Class 7">Class 7</SelectItem>
                    <SelectItem value="Class 8">Class 8</SelectItem>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Class 11">Class 11</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section <span className="text-red-500">*</span></Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, 'section')}
                  value={formData.section}
                >
                  <SelectTrigger id="section">
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

              <div className="space-y-2">
                <Label>Date <span className="text-red-500">*</span></Label>
                <DatePicker date={date} setDate={setDate} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform <span className="text-red-500">*</span></Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, 'platform')}
                  value={formData.platform}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zoom">Zoom</SelectItem>
                    <SelectItem value="Google Meet">Google Meet</SelectItem>
                    <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time <span className="text-red-500">*</span></Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time <span className="text-red-500">*</span></Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter class description, topics to be covered, preparation requirements, etc."
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[120px]"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Important Notes</h4>
                <ul className="mt-2 text-sm text-blue-700 space-y-1 list-disc ml-4">
                  <li>Make sure to set up the virtual meeting before the scheduled time.</li>
                  <li>Share the meeting link with students via the platform.</li>
                  <li>Record the session if possible for students who cannot attend.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button" onClick={() => navigate('/teacher/live-classes')}>
                Cancel
              </Button>
              <Button type="submit">
                Schedule Class
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleClass;
