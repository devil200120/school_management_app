import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronLeft, Save, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
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
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

// Schema stays the same
const searchSchema = z.object({
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  subject: z.string().min(1, 'Subject is required'),
  term: z.string().min(1, 'Term is required'),
  session: z.string().min(1, 'Session is required'),
});

const sampleResults = [
  { id: '1', name: 'John Doe', regNumber: 'REG001', testScore: 30, examScore: 45, comment: 'Good performance' },
  { id: '2', name: 'Jane Smith', regNumber: 'REG002', testScore: 35, examScore: 52, comment: 'Excellent work' },
  { id: '3', name: 'Michael Johnson', regNumber: 'REG003', testScore: 28, examScore: 41, comment: 'Needs improvement' },
  { id: '4', name: 'Emily Brown', regNumber: 'REG004', testScore: 32, examScore: 48, comment: 'Consistent effort' },
  { id: '5', name: 'David Wilson', regNumber: 'REG005', testScore: 38, examScore: 55, comment: 'Outstanding' },
];

const EditClassResult = () => {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState([]);
  const [studentResults, setStudentResults] = useState({});

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      class: '',
      section: '',
      subject: '',
      term: '',
      session: '',
    },
  });

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];
  const terms = ['First Term', 'Second Term', 'Third Term'];
  const sessions = ['2024-2025', '2023-2024', '2022-2023'];

  const onSubmitSearch = (values) => {
    console.log('Search criteria:', values);
    setResults(sampleResults);

    const initialResults = {};
    sampleResults.forEach(student => {
      initialResults[student.id] = {
        testScore: student.testScore,
        examScore: student.examScore,
        comment: student.comment
      };
    });
    setStudentResults(initialResults);
    setStep(2);
  };

  const handleResultChange = (studentId, field, value) => {
    setStudentResults(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: field === 'comment' ? value : Number(value)
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log('Form values:', form.getValues());
    console.log('Updated student results:', studentResults);
    toast.success('Results updated successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class Results"
        description="Search and update existing class results"
        backLink="/teacher/result"
      />

      <Card className="p-6">
        {step === 1 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitSearch)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "class", label: "Class", options: classes },
                  { name: "section", label: "Section", options: sections },
                  { name: "subject", label: "Subject", options: subjects },
                  { name: "term", label: "Term", options: terms },
                  { name: "session", label: "Session", options: sessions },
                ].map(({ name, label, options }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
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
        )}

        {step === 2 && results.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Edit Results for Class {form.getValues('class')} {form.getValues('section')}
              </h3>
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
                  {results.map((student, index) => {
                    const studentResult = studentResults[student.id];
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
                Back to Search
              </Button>
              <Button type="button" onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditClassResult;