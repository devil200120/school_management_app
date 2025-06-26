import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
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
import { useToast } from '../../../hooks/use-toast';
import { CheckCircle, Search } from 'lucide-react';
import { Separator } from '../../../components/ui/separator';

const formSchema = z.object({
  studentId: z.string().min(1, { message: 'Student ID is required' }),
  class: z.string().min(1, { message: 'Class is required' }),
  section: z.string().min(1, { message: 'Section is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  examType: z.string().min(1, { message: 'Exam Type is required' }),
  term: z.string().min(1, { message: 'Term is required' }),
  academicYear: z.string().min(1, { message: 'Academic Year is required' }),
  marks: z.string().min(1, { message: 'Marks is required' }),
  totalMarks: z.string().min(1, { message: 'Total Marks is required' }),
  grade: z.string().optional(),
  remarks: z.string().optional(),
});

const grades = [
  { min: 90, max: 100, grade: 'A+', remarks: 'Outstanding' },
  { min: 80, max: 89, grade: 'A', remarks: 'Excellent' },
  { min: 70, max: 79, grade: 'B+', remarks: 'Very Good' },
  { min: 60, max: 69, grade: 'B', remarks: 'Good' },
  { min: 50, max: 59, grade: 'C', remarks: 'Average' },
  { min: 40, max: 49, grade: 'D', remarks: 'Below Average' },
  { min: 0, max: 39, grade: 'F', remarks: 'Failed' },
];

const UploadStudentResult = () => {
  const { toast } = useToast();
  const [studentDetails, setStudentDetails] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      class: '',
      section: '',
      subject: '',
      examType: '',
      term: '',
      academicYear: '',
      marks: '',
      totalMarks: '',
      grade: '',
      remarks: '',
    },
  });

  const calculateGrade = (marks, totalMarks) => {
    if (!marks || !totalMarks) return { grade: '', remarks: '' };
    
    const percentage = (marks / totalMarks) * 100;
    
    for (const gradeInfo of grades) {
      if (percentage >= gradeInfo.min && percentage <= gradeInfo.max) {
        return { grade: gradeInfo.grade, remarks: gradeInfo.remarks };
      }
    }
    
    return { grade: 'N/A', remarks: 'Not Available' };
  };

  const searchStudent = () => {
    const studentId = form.getValues('studentId');
    
    if (!studentId) {
      toast({
        title: "Student ID Required",
        description: "Please enter a valid Student ID.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock student data - in a real app, this would come from your backend
      setStudentDetails({
        name: 'John Doe',
        admissionNumber: studentId,
        class: 'Class 10',
        section: 'Section A',
      });
      
      // Pre-fill the form with student class and section
      form.setValue('class', 'class-10');
      form.setValue('section', 'section-a');
      
      setIsSearching(false);
    }, 1000);
  };

  const onSubmit = (values) => {
    // In a real app, you would validate and save this data to your backend
    console.log('Result values:', values);
    
    toast({
      title: "Result uploaded successfully",
      description: "The student's result has been saved.",
    });
    
    // Reset form
    form.reset();
    setStudentDetails(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Student Result</h1>
        <p className="text-muted-foreground">Upload individual student result for a specific subject</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
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
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-green-800">Student Found</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{studentDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Admission Number</p>
                      <p className="font-medium">{studentDetails.admissionNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="font-medium">{studentDetails.class}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Section</p>
                      <p className="font-medium">{studentDetails.section}</p>
                    </div>
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
              <CardDescription>Enter the academic details and marks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="geography">Geography</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          <SelectItem value="mid-term">Mid Term</SelectItem>
                          <SelectItem value="final">Final Exam</SelectItem>
                          <SelectItem value="practical">Practical</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
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
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="first-term">First Term</SelectItem>
                          <SelectItem value="second-term">Second Term</SelectItem>
                          <SelectItem value="third-term">Third Term</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select academic year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2025-2026">2025-2026</SelectItem>
                          <SelectItem value="2026-2027">2026-2027</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marks Obtained</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="E.g., 85" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const marks = Number(e.target.value);
                            const totalMarks = Number(form.getValues('totalMarks'));
                            
                            if (marks && totalMarks) {
                              const { grade, remarks } = calculateGrade(marks, totalMarks);
                              form.setValue('grade', grade);
                              form.setValue('remarks', remarks);
                            }
                          }}
                        />
                      </FormControl>
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
                        <Input 
                          type="number" 
                          placeholder="E.g., 100" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            const marks = Number(form.getValues('marks'));
                            const totalMarks = Number(e.target.value);
                            
                            if (marks && totalMarks) {
                              const { grade, remarks } = calculateGrade(marks, totalMarks);
                              form.setValue('grade', grade);
                              form.setValue('remarks', remarks);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Auto calculated" 
                          {...field} 
                          readOnly 
                          className="bg-gray-50"
                        />
                      </FormControl>
                      <FormDescription>
                        Grade is calculated automatically based on marks
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Remarks</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Teacher's remarks" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={!studentDetails}>
              Upload Result
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadStudentResult;
