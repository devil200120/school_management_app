
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';

const AddAssessment = () => {
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
    correctAnswer: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assessment added:', formData);
    // Would submit to API in a real app
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Add Assessment/Questions</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Assessment Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Question</Label>
                <Input 
                  id="question" 
                  name="question"
                  placeholder="Enter the question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="optionA">Option A</Label>
                  <Input 
                    id="optionA" 
                    name="optionA"
                    placeholder="Enter option A"
                    value={formData.optionA}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="optionB">Option B</Label>
                  <Input 
                    id="optionB" 
                    name="optionB"
                    placeholder="Enter option B"
                    value={formData.optionB}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="optionC">Option C</Label>
                  <Input 
                    id="optionC" 
                    name="optionC"
                    placeholder="Enter option C"
                    value={formData.optionC}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="optionD">Option D</Label>
                  <Input 
                    id="optionD" 
                    name="optionD"
                    placeholder="Enter option D"
                    value={formData.optionD}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label>Select Correct Option</Label>
                <RadioGroup 
                  value={formData.correctOption}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, correctOption: value }))}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id="optA" />
                    <Label htmlFor="optA">Option A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id="optB" />
                    <Label htmlFor="optB">Option B</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="optC" />
                    <Label htmlFor="optC">Option C</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D" id="optD" />
                    <Label htmlFor="optD">Option D</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="correctAnswer">Enter Correct Ans in Words</Label>
                <Input 
                  id="correctAnswer" 
                  name="correctAnswer"
                  placeholder="Enter the correct answer in words"
                  value={formData.correctAnswer}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="questionImage">Question Image</Label>
                <Input 
                  id="questionImage" 
                  name="questionImage"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">ADD NOW</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAssessment;
