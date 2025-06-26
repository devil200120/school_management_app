import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../../components/ui/select';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { 
  Calendar, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { toast } from 'sonner';

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    class: '',
    duration: '',
    description: '',
    difficulty: 'Medium',
    startDate: '',
    endDate: '',
    status: 'active',
    isPublished: false,
    questions: [
      { 
        question: '', 
        options: ['', '', '', ''], 
        correctAnswer: 0,
        marks: 1
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };
  
  const handleSelectChange = (name, value) => {
    setQuizData({ ...quizData, [name]: value });
  };
  
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = { 
      ...updatedQuestions[index], 
      [field]: value 
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    const options = [...updatedQuestions[questionIndex].options];
    options[optionIndex] = value;
    updatedQuestions[questionIndex].options = options;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  
  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: 0, marks: 1 }
      ]
    });
  };
  
  const removeQuestion = (index) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions.splice(index, 1);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Quiz data to submit:', quizData);
    toast.success("Quiz created successfully!");
    // Reset form or redirect
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Quiz</h1>
          <p className="text-muted-foreground">Design a new quiz for your students</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Enter quiz title"
                  value={quizData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select 
                  value={quizData.subject} 
                  onValueChange={(value) => handleSelectChange('subject', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select 
                  value={quizData.class} 
                  onValueChange={(value) => handleSelectChange('class', value)}
                  required
                >
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
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input 
                  id="duration" 
                  name="duration"
                  type="number"
                  placeholder="Enter duration"
                  value={quizData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="startDate" 
                    name="startDate"
                    type="date"
                    className="pl-10"
                    value={quizData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="endDate" 
                    name="endDate"
                    type="date"
                    className="pl-10"
                    value={quizData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select 
                  value={quizData.difficulty} 
                  onValueChange={(value) => handleSelectChange('difficulty', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Enter quiz description"
                  value={quizData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isPublished" 
                  checked={quizData.isPublished} 
                  onCheckedChange={(checked) => setQuizData({ ...quizData, isPublished: checked })} 
                />
                <Label htmlFor="isPublished">Publish immediately</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Questions</h2>
            <Button type="button" onClick={addQuestion} className="gap-2">
              <Plus size={16} />
              Add Question
            </Button>
          </div>
          
          {quizData.questions.map((question, questionIndex) => (
            <Card key={questionIndex}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                  Question {questionIndex + 1}
                </CardTitle>
                {quizData.questions.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeQuestion(questionIndex)}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                  <Textarea 
                    id={`question-${questionIndex}`}
                    placeholder="Enter your question"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Options</Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <div className="flex items-center h-10 w-10 rounded-md shrink-0 border border-input">
                        <input 
                          type="radio" 
                          name={`correct-answer-${questionIndex}`} 
                          className="ml-3"
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                          required
                        />
                      </div>
                      <Input 
                        placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`marks-${questionIndex}`}>Marks</Label>
                  <Input 
                    id={`marks-${questionIndex}`}
                    type="number"
                    min="1"
                    value={question.marks}
                    onChange={(e) => handleQuestionChange(questionIndex, 'marks', parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Quiz</Button>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
