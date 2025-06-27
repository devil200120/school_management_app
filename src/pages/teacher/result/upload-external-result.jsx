import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Upload, ChevronLeft, Search, User, Check } from 'lucide-react';
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

// Form schema
const formSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  examType: z.string().min(1, 'Exam type is required'),
  examYear: z.string().min(1, 'Exam year is required'),
  resultDetails: z.string().min(1, 'Result details are required'),
  resultFile: z.any().optional(),
});

const UploadExternalResult = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      examType: '',
      examYear: '',
      resultDetails: '',
    },
  });

  const examTypes = ['WAEC', 'JAMB', 'NECO', 'GCE', 'IGCSE', 'SAT', 'TOEFL', 'IELTS'];
  const examYears = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const searchStudent = () => {
    const studentId = form.getValues('studentId');
    
    if (!studentId) {
      form.setError('studentId', { message: 'Student ID is required' });
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setStudentDetails({
        id: studentId,
        name: 'John Doe',
        class: 'Class 12',
        section: 'A',
        rollNo: '101',
        admissionNumber: studentId,
      });
      
      setIsSearching(false);
    }, 1000);
  };

  const onSubmit = (values) => {
    console.log('External result values:', values);
    
    toast.success('External result uploaded successfully!');
    
    setStudentDetails(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Upload External Result"
        description="Upload external examination results for students"
        backLink="/teacher/result"
      />

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
          <CardTitle className="text-xl text-purple-700">Search Student</CardTitle>
          <CardDescription>Search for a student by their admission number</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
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
                          <Input 
                            placeholder="Enter admission number" 
                            {...field} 
                            className="hover:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                          />
                          <div className="absolute right-2 top-2">
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="ghost" 
                              onClick={searchStudent}
                              disabled={isSearching}
                              className="h-6 w-6"
                            >
                              <Search size={16} className="text-purple-500" />
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
                  className="mt-8 bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                >
                  {isSearching ? 'Searching...' : 'Search Student'}
                </Button>
              </div>
            </div>
          </Form>
          
          {studentDetails && (
            <div className="mt-6 p-4 border rounded-md bg-purple-50 border-purple-200 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-purple-600" />
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
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
              <CardTitle className="text-xl text-purple-700">External Result Information</CardTitle>
              <CardDescription>Enter external examination result details</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="examType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all">
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {examTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all">
                              <SelectValue placeholder="Select exam year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {examYears.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
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
                  name="resultDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter detailed result information..." 
                          className="min-h-32 resize-y hover:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include subject scores and grades as applicable
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resultFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Result File (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png" 
                          className="hover:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Accepted formats: .pdf, .jpg, .jpeg, .png</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                type="button" 
                variant="outline" 
                asChild
                className="transition-all hover:-translate-x-1 text-decoration"
              >
                <Link to="/teacher/result">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <Button 
                type="submit" 
                disabled={!studentDetails || isSearching}
                className="bg-purple-600 hover:bg-purple-700 transition-all hover:shadow-md"
              >
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

export default UploadExternalResult;
