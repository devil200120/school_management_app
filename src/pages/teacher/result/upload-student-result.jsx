import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Upload, User, Search, ChevronLeft, Check } from 'lucide-react';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../../../components/ui/form';
import { Textarea } from '../../../components/ui/textarea';

// Form schema for student search and result upload
const formSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  session: z.string().min(1, 'Session is required'),
  term: z.string().min(1, 'Term is required'),
  subject: z.string().min(1, 'Subject is required'),
  testScore: z.number().min(0, 'Test score cannot be negative').max(40, 'Maximum test score is 40'),
  examScore: z.number().min(0, 'Exam score cannot be negative').max(60, 'Maximum exam score is 60'),
  comment: z.string().optional(),
  resultFile: z.any().optional(),
});

const UploadStudentResult = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      session: '',
      term: '',
      subject: '',
      testScore: 0,
      examScore: 0,
      comment: '',
    },
  });

  // Sample data for dropdowns
  const sessions = ['2024-2025', '2023-2024', '2022-2023'];
  const terms = ['First Term', 'Second Term', 'Third Term'];
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];

  // Handle student search
  const searchStudent = () => {
    const studentId = form.getValues('studentId');

    if (!studentId) {
      form.setError('studentId', { message: 'Student ID is required' });
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setStudentDetails({
        id: studentId,
        name: 'John Doe',
        class: 'Class 5',
        section: 'A',
        rollNo: '101',
        admissionNumber: studentId,
      });

      setIsSearching(false);
    }, 1000);
  };

  // Handle form submission
  const onSubmit = (values) => {
    console.log('Result values:', values);

    // Simulate API submission
    toast.success('Student result uploaded successfully!');

    // Reset form
    setStudentDetails(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Upload Student Result"
        description="Upload result for an individual student"
        backLink="/teacher/result"
      />

      <Card>
        <CardHeader>
          <CardTitle>Search Student</CardTitle>
          <CardDescription>Search for a student by their admission number</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID / Admission Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Enter admission number" {...field} />
                          <div className="absolute right-2 top-2">
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="ghost" 
                              onClick={searchStudent}
                              disabled={isSearching}
                              className="h-6 w-6"
                            >
                              <Search size={16} />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex-1">
                <Button 
                  type="button" 
                  onClick={searchStudent} 
                  disabled={isSearching} 
                  className="mt-8"
                >
                  {isSearching ? 'Searching...' : 'Search Student'}
                </Button>
              </div>
            </div>
          </Form>
          
          {studentDetails && (
            <div className="mt-6 p-4 border rounded-md bg-green-50 border-green-200">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Student Found</h3>
                  <p className="text-sm text-gray-600">
                    {studentDetails.name} | Class: {studentDetails.class} {studentDetails.section} | Roll No: {studentDetails.rollNo}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Result Information</CardTitle>
              <CardDescription>Enter the result details for the selected student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="session"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select session" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sessions.map((session) => (
                              <SelectItem key={session} value={session}>{session}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Term</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select term" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {terms.map((term) => (
                              <SelectItem key={term} value={term}>{term}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="testScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test Score (0-40)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="40" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Enter the test score out of 40</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Score (0-60)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="60" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Enter the exam score out of 60</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter comments about student's performance" 
                          className="min-h-20 resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resultFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Result Document (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Upload supporting documents (PDF, DOC, XLS)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button type="button" variant="outline" asChild>
                <Link to="/teacher/result">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <Button type="submit" disabled={!studentDetails || isSearching}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Result
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default UploadStudentResult;
