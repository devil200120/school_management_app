
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Plus, ChevronLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "../../../components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../../components/ui/table";

// Form schema
const assessmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  subject: z.string().min(1, 'Subject is required'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  duration: z.string().min(1, 'Duration is required'),
  totalMarks: z.number().min(1, 'Total marks is required'),
  passingMarks: z.number().min(1, 'Passing marks is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  assessmentType: z.string().min(1, 'Assessment type is required'),
  instructions: z.string().min(1, 'Instructions are required'),
});

const AddAssessment = () => {
  const form = useForm<z.infer<typeof assessmentSchema>>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      class: '',
      section: '',
      duration: '',
      totalMarks: 100,
      passingMarks: 40,
      startDate: '',
      endDate: '',
      assessmentType: '',
      instructions: '',
    },
  });

  // Sample data for dropdowns
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
  const sections = ['A', 'B', 'C', 'D'];
  const assessmentTypes = ['Quiz', 'Test', 'Midterm Exam', 'Final Exam', 'Assignment', 'Project'];

  // Sample questions for the Questions tab
  const sampleQuestions = [
    { id: 1, question: 'What is 2+2?', type: 'Multiple Choice', marks: 5 },
    { id: 2, question: 'Explain Newton\'s first law of motion', type: 'Essay', marks: 10 },
    { id: 3, question: 'Name the capital of France', type: 'Short Answer', marks: 3 },
  ];

  // Handle form submission
  const onSubmit = (values) => {
    console.log('Assessment values:', values);
    
    // In a real app, you would submit to an API
    toast.success('Assessment created successfully!');
    
    // Optionally redirect to manage assessments page
    // navigate('/teacher/exam/manage-assessment');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add New Assessment"
        description="Create a new assessment for your students"
        backLink="/teacher/exam"
      />

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="details">Assessment Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="details">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                  <CardTitle className="text-xl text-indigo-700">Assessment Details</CardTitle>
                  <CardDescription>Basic information about the assessment</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assessment Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter assessment title" 
                              {...field} 
                              className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="assessmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assessment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {assessmentTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
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
                            placeholder="Enter assessment description" 
                            className="min-h-20 resize-y hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all">
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                              ))}
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all">
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {classes.map((cls) => (
                                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                              ))}
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all">
                                <SelectValue placeholder="Select section" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sections.map((section) => (
                                <SelectItem key={section} value={section}>{section}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="totalMarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Marks</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
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
                            <Input 
                              type="number" 
                              min={1} 
                              className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 60" 
                              className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date & Time</FormLabel>
                          <FormControl>
                            <Input 
                              type="datetime-local" 
                              className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date & Time</FormLabel>
                          <FormControl>
                            <Input 
                              type="datetime-local" 
                              className="hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructions for Students</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter instructions for students" 
                            className="min-h-32 resize-y hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide clear instructions on how to attempt the assessment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl text-indigo-700">Questions</CardTitle>
                      <CardDescription>Add questions to your assessment</CardDescription>
                    </div>
                    <Button 
                      type="button"
                      className="bg-indigo-600 hover:bg-indigo-700 transition-all hover:shadow-md"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">No</TableHead>
                          <TableHead>Question</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-center">Marks</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleQuestions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                              No questions added yet. Click 'Add Question' to get started.
                            </TableCell>
                          </TableRow>
                        ) : (
                          sampleQuestions.map((question, index) => (
                            <TableRow key={question.id} className="hover:bg-indigo-50/50 transition-colors">
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="font-medium">{question.question}</TableCell>
                              <TableCell>{question.type}</TableCell>
                              <TableCell className="text-center">{question.marks}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-100">
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                  <CardTitle className="text-xl text-indigo-700">Assessment Settings</CardTitle>
                  <CardDescription>Configure assessment options</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input type="checkbox" className="w-5 h-5" id="shuffle" />
                      <label htmlFor="shuffle" className="text-sm font-medium">Shuffle Questions</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Input type="checkbox" className="w-5 h-5" id="instantFeedback" />
                      <label htmlFor="instantFeedback" className="text-sm font-medium">Show Instant Feedback</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Input type="checkbox" className="w-5 h-5" id="showScore" />
                      <label htmlFor="showScore" className="text-sm font-medium">Show Score After Completion</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Input type="checkbox" className="w-5 h-5" id="limitAttempts" />
                      <label htmlFor="limitAttempts" className="text-sm font-medium">Limit Number of Attempts</label>
                    </div>
                    
                    <div className="pl-7">
                      <Input 
                        type="number" 
                        placeholder="Number of attempts" 
                        min="1" 
                        className="max-w-xs hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all" 
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Input type="checkbox" className="w-5 h-5" id="password" />
                      <label htmlFor="password" className="text-sm font-medium">Require Password</label>
                    </div>
                    
                    <div className="pl-7">
                      <Input 
                        type="password" 
                        placeholder="Enter password" 
                        className="max-w-xs hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-between items-center pt-4">
              <Button 
                type="button" 
                variant="outline" 
                asChild
                className="transition-all hover:-translate-x-1"
              >
                <Link to="/teacher/exam">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Cancel
                </Link>
              </Button>
              <Button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 transition-all hover:shadow-md"
              >
                <Save className="mr-2 h-4 w-4" />
                Create Assessment
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddAssessment;
