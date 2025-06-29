
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';

const UploadExcelQuestions = () => {
  const [formData, setFormData] = useState({
    level: '',
    subject: '',
    class: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Excel questions uploaded:', formData);
    // Would submit to API in a real app
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Upload Excel Questions</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Exam Question with Excel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="level">Select Level</Label>
                <Select>
                  <select 
                    id="level"
                    name="level"
                    className="w-full"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="subject">Select Subject</Label>
                <Select>
                  <select 
                    id="subject"
                    name="subject"
                    className="w-full"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="math">Mathematics</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                  </select>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="class">Select Class</Label>
                <Select>
                  <select 
                    id="class"
                    name="class"
                    className="w-full"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                    <option value="class3">Class 3</option>
                  </select>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="file">Select File (CSV)</Label>
                <Input 
                  id="file" 
                  name="file"
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Only CSV format is supported
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Add Now</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadExcelQuestions;
