import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import {
  Form,
} from '../../../components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../components/ui/tabs';

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

function AddAssessment() {
  const form = useForm({
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

  const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computer Science'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
  const sections = ['A', 'B', 'C', 'D'];
  const assessmentTypes = ['Quiz', 'Test', 'Midterm Exam', 'Final Exam', 'Assignment', 'Project'];

  const sampleQuestions = [
    { id: 1, question: 'What is 2+2?', type: 'Multiple Choice', marks: 5 },
    { id: 2, question: "Explain Newton's first law of motion", type: 'Essay', marks: 10 },
    { id: 3, question: 'Name the capital of France', type: 'Short Answer', marks: 3 },
  ];

  const onSubmit = (values) => {
    console.log('Assessment values:', values);
    toast.success('Assessment created successfully!');
    // Optionally navigate to another route here
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
            {/* Details Tab */}
            <TabsContent value="details">
              {/* ... unchanged content from your original */}
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions">
              {/* ... unchanged content from your original */}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              {/* ... unchanged content from your original */}
            </TabsContent>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button type="button" variant="outline" asChild className="transition-all hover:-translate-x-1">
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
}

export default AddAssessment;
