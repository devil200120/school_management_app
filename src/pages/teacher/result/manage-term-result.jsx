import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronLeft, Search, Eye, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import {
  Form,
  FormControl,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from '../../../components/ui/input';

// Form schema for search criteria
const searchSchema = z.object({
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  term: z.string().min(1, 'Term is required'),
  session: z.string().min(1, 'Session is required'),
  subject: z.string().optional(),
});

// Sample student results data
const sampleResults = [
  { id: '1', name: 'John Doe', regNumber: 'REG001', average: 86, grade: 'A', status: 'Pass' },
  { id: '2', name: 'Jane Smith', regNumber: 'REG002', average: 92, grade: 'A*', status: 'Pass' },
  { id: '3', name: 'Michael Johnson', regNumber: 'REG003', average: 65, grade: 'C', status: 'Pass' },
  { id: '4', name: 'Emily Brown', regNumber: 'REG004', average: 78, grade: 'B', status: 'Pass' },
  { id: '5', name: 'David Wilson', regNumber: 'REG005', average: 45, grade: 'F', status: 'Fail' },
  { id: '6', name: 'Sarah Lee', regNumber: 'REG006', average: 88, grade: 'A', status: 'Pass' },
  { id: '7', name: 'James Taylor', regNumber: 'REG007', average: 72, grade: 'B', status: 'Pass' },
];

const ManageTermResult = () => {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useState(null);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      class: '',
      section: '',
      term: '',
      session: '',
      subject: '',
    },
  });

  // Sample data for dropdowns
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = ['All Subjects', 'Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];
  const terms = ['First Term', 'Second Term', 'Third Term'];
  const sessions = ['2024-2025', '2023-2024', '2022-2023'];

  const onSubmitSearch = (values) => {
    console.log('Search criteria:', values);

    // In a real app, you would fetch results based on the search criteria
    // Here we'll use the sample data
    setResults(sampleResults);
    setSearchParams(values);
    setStep(2);
  };

  // Handle view individual student result
  const handleViewStudentResult = (studentId) => {
    console.log('View student result:', studentId);
    toast.info('Viewing student result');
    // In a real app, navigate to detailed view or show modal
  };

  // Handle downloading result
  const handleDownloadResult = () => {
    console.log('Download results');
    toast.success('Results downloaded successfully');
    // In a real app, generate and download CSV/PDF
  };

  // Handle printing result
  const handlePrintResult = () => {
    console.log('Print results');
    toast.success('Results sent to printer');
    // In a real app, open print dialog
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manage Term Results"
        description="View and manage results for an entire term"
        backLink="/teacher/result"
      />

      <Card>
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Search Term Results</CardTitle>
              <CardDescription>Enter the criteria to view term results</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitSearch)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
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
                              <SelectTrigger>
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

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject (Optional)</FormLabel>
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
                  </div>

                  <div className="flex justify-between items-center pt-4 text-decoration">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/teacher/result">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Link>
                    </Button>
                    <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      Search Results
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </>
        )}

        {step === 2 && results.length > 0 && searchParams && (
          <>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Term Results</CardTitle>
                  <CardDescription>
                    {searchParams.class} {searchParams.section} | {searchParams.term} | {searchParams.session}
                    {searchParams.subject !== 'All Subjects' && searchParams.subject && ` | ${searchParams.subject}`}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleDownloadResult}>
                    <Download size={16} className="mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrintResult}>
                    <Printer size={16} className="mr-1" />
                    Print
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Showing {results.length} student results
                </div>
                <div className="max-w-sm">
                  <Input placeholder="Search students..." />
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">S/N</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Reg Number</TableHead>
                      <TableHead className="text-center">Average Score</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.regNumber}</TableCell>
                        <TableCell className="text-center">{student.average}%</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                            student.grade === 'A*' || student.grade === 'A' ? 'bg-green-100 text-green-800' :
                            student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            student.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {student.grade}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                            student.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewStudentResult(student.id)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6 text-decoration">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default ManageTermResult;
