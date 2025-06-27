
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '../../../hooks/use-toast';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { DatePicker } from '../../../components/ui/date-picker';
import { Separator } from '../../../components/ui/separator';
import { BookOpen, Clock, FileText, Plus, Trash } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  class: z.string().min(1, { message: 'Class is required' }),
  section: z.string().min(1, { message: 'Section is required' }),
  description: z.string().optional(),
  examType: z.string().min(1, { message: 'Exam type is required' }),
  timeToSpend: z.string().min(1, { message: 'Time limit is required' }),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  totalMarks: z.string().min(1, { message: 'Total marks is required' }),
  passingMarks: z.string().min(1, { message: 'Passing marks is required' }),
});

const AddAssessment = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('details');
  const [questions, setQuestions] = React.useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subject: '',
      class: '',
      section: '',
      description: '',
      examType: '',
      timeToSpend: '',
      totalMarks: '',
      passingMarks: '',
    },
  });

  const onSubmit = (values) => {
    // Check if at least one question is added and complete
    const isQuestionsValid = questions.every(q => 
      q.question.trim() !== '' && q.options.every(opt => opt.trim() !== '')
    );

    if (!isQuestionsValid) {
      toast({
        title: "Incomplete Questions",
        description: "Please fill in all questions and options.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would save this assessment to the database
    console.log('Form Values:', values);
    console.log('Questions:', questions);
    
    toast({
      title: "Assessment created successfully",
      description: `${values.title} has been created and saved.`
    });
    
    // Reset form
    form.reset();
    setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    setActiveTab('details');
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    } else {
      toast({
        title: "Cannot Remove",
        description: "At least one question is required",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Assessment</h1>
        <p className="text-muted-foreground">Create a new assessment or exam for your students</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="details">Assessment Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Assessment Information</CardTitle>
                  <CardDescription>Fill in the basic details of your assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assessment Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Midterm Mathematics Exam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                              <SelectItem value="geography">Geography</SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="chemistry">Chemistry</SelectItem>
                              <SelectItem value="biology">Biology</SelectItem>
                              <SelectItem value="computer-science">Computer Science</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="class-6">Class 6</SelectItem>
                              <SelectItem value="class-7">Class 7</SelectItem>
                              <SelectItem value="class-8">Class 8</SelectItem>
                              <SelectItem value="class-9">Class 9</SelectItem>
                              <SelectItem value="class-10">Class 10</SelectItem>
                              <SelectItem value="class-11">Class 11</SelectItem>
                              <SelectItem value="class-12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="section"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a section" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="section-a">Section A</SelectItem>
                              <SelectItem value="section-b">Section B</SelectItem>
                              <SelectItem value="section-c">Section C</SelectItem>
                              <SelectItem value="section-d">Section D</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a short description of the assessment"
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include any special instructions or information about the assessment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="examType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exam Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select exam type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="quiz">Quiz</SelectItem>
                              <SelectItem value="test">Test</SelectItem>
                              <SelectItem value="midterm">Midterm Exam</SelectItem>
                              <SelectItem value="final">Final Exam</SelectItem>
                              <SelectItem value="practice">Practice Test</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeToSpend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Limit (minutes)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="e.g., 60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <DatePicker 
                            date={field.value} 
                            setDate={field.onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <DatePicker 
                            date={field.value} 
                            setDate={field.onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="totalMarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Marks</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="e.g., 100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="passingMarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing Marks</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="e.g., 40" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end mt-6">
                <Button 
                  type="button"
                  onClick={() => setActiveTab('questions')}
                >
                  Continue to Questions
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="questions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Assessment Questions</CardTitle>
                    <CardDescription>Add multiple-choice questions for your assessment</CardDescription>
                  </div>
                  <Button type="button" onClick={addQuestion} className="gap-2">
                    <Plus size={16} />
                    Add Question
                  </Button>
                </CardHeader>
                <CardContent className="space-y-8">
                  {questions.map((q, qIndex) => (
                    <div key={qIndex} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Question {qIndex + 1}</h3>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <Trash size={16} />
                          <span className="ml-1">Remove</span>
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Question Text</label>
                          <Textarea 
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            placeholder="Enter your question here"
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label className="text-sm font-medium">Options</label>
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <Input
                                value={option}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`}
                                className="flex-1"
                              />
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id={`q${qIndex}-o${oIndex}`}
                                  name={`q${qIndex}-correct`}
                                  checked={q.correctAnswer === oIndex}
                                  onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                  className="mr-2"
                                />
                                <label htmlFor={`q${qIndex}-o${oIndex}`} className="text-sm">
                                  Correct Answer
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <div className="flex justify-between mt-6  text-decoration">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab('details')}
                >
                  Back to Details
                </Button>
                <Button type="submit">Create Assessment</Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddAssessment;
