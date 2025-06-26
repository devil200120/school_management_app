import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Upload, ChevronLeft, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
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

// Form schema for initial class selection
const formSchema = z.object({
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  subject: z.string().min(1, 'Subject is required'),
  term: z.string().min(1, 'Term is required'),
  session: z.string().min(1, 'Session is required'),
  file: z.any().optional(),
});

// Sample student data for the selected class
const sampleStudents = [
  { id: '1', name: 'John Doe', regNumber: 'REG001' },
  { id: '2', name: 'Jane Smith', regNumber: 'REG002' },
  { id: '3', name: 'Michael Johnson', regNumber: 'REG003' },
  { id: '4', name: 'Emily Brown', regNumber: 'REG004' },
  { id: '5', name: 'David Wilson', regNumber: 'REG005' },
  { id: '6', name: 'Sarah Lee', regNumber: 'REG006' },
  { id: '7', name: 'James Taylor', regNumber: 'REG007' },
];

const UploadClassResult = () => {
  const [step, setStep] = useState(1);
  const [students, setStudents] = useState([]);
  const [studentResults, setStudentResults] = useState({});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: '',
      section: '',
      subject: '',
      term: '',
      session: '',
    },
  });

  // Sample data for dropdowns
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];
  const terms = ['First Term', 'Second Term', 'Third Term'];
  const sessions = ['2024-2025', '2023-2024', '2022-2023'];

  const onSubmitClassSelection = (values) => {
    console.log('Class selection:', values);

    // In a real app, you would fetch students for the selected class
    // Here we'll use the sample data
    setStudents(sampleStudents);

    // Initialize student results with empty values
    const initialResults = {};
    sampleStudents.forEach(student => {
      initialResults[student.id] = {
        testScore: 0,
        examScore: 0,
        comment: ''
      };
    });
    setStudentResults(initialResults);

    setStep(2);
  };

  // Handle result input changes
  const handleResultChange = (studentId, field, value) => {
    setStudentResults(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: field === 'comment' ? value : Number(value)
      }
    }));
  };

  // Handle final submission of all results
  const handleSubmitResults = () => {
    // In a real app, submit all student results to an API
    console.log('Form values:', form.getValues());
    console.log('Student results:', studentResults);

    toast.success('Class results uploaded successfully');
    setStep(1);
    form.reset();
    setStudents([]);
    setStudentResults({});
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Upload Class Result"
        description="Enter result data for an entire class"
        backLink="/teacher/result"
      />

      <Card className="p-6">
        {step === 1 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitClassSelection)} className="space-y-6">
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

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Result Sheet (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".xls,.xlsx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload an Excel sheet with student results
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button type="button" variant="outline" asChild>
                  <Link to="/teacher/result">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" type="button" asChild>
                    <Link to="#" onClick={(e) => e.preventDefault()}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Link>
                  </Button>
                  <Button type="submit">
                    <FileText className="mr-2 h-4 w-4" />
                    Proceed
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}

        {step === 2 && students.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Enter Results for Class {form.getValues('class')} {form.getValues('section')}</h3>
              <div className="text-sm text-gray-500">
                Subject: {form.getValues('subject')} | Term: {form.getValues('term')} | Session: {form.getValues('session')}
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">S/N</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Reg No.</TableHead>
                    <TableHead>Test (0-40)</TableHead>
                    <TableHead>Exam (0-60)</TableHead>
                    <TableHead>Total (100)</TableHead>
                    <TableHead>Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => {
                    const studentResult = studentResults[student.id] || { testScore: 0, examScore: 0, comment: '' };
                    const total = studentResult.testScore + studentResult.examScore;

                    return (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.regNumber}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="40"
                            value={studentResult.testScore}
                            onChange={(e) => handleResultChange(student.id, 'testScore', e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="60"
                            value={studentResult.examScore}
                            onChange={(e) => handleResultChange(student.id, 'examScore', e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{total}</TableCell>
                        <TableCell>
                          <Input
                            value={studentResult.comment}
                            onChange={(e) => handleResultChange(student.id, 'comment', e.target.value)}
                            placeholder="Optional comment"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Class Selection
              </Button>
              <Button type="button" onClick={handleSubmitResults}>
                <Upload className="mr-2 h-4 w-4" />
                Upload All Results
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UploadClassResult;
