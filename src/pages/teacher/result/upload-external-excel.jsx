import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Upload, ChevronLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
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
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";

// Form schema
const formSchema = z.object({
  examType: z.string().min(1, 'Exam type is required'),
  examYear: z.string().min(1, 'Exam year is required'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  excelFile: z.any().refine((file) => file?.name, {
    message: "Please upload a file",
  }),
});

const UploadExternalExcel = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examType: '',
      examYear: '',
      class: '',
      section: '',
    },
  });

  // Sample data for dropdowns
  const examTypes = ['WAEC', 'JAMB', 'NECO', 'GCE', 'IGCSE', 'SAT', 'TOEFL', 'IELTS'];
  const examYears = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];
  const classes = ['Class 10', 'Class 11', 'Class 12'];
  const sections = ['A', 'B', 'C', 'D'];

  // Handle form submission
  const onSubmit = (values) => {
    console.log('Bulk external result values:', values);
    
    // In a real app, you would submit to an API
    toast.success('External results uploaded successfully!');
    
    // Reset form
    form.reset();
  };

  // Handle template download
  const handleDownloadTemplate = () => {
    // In a real app, this would download an Excel template
    toast.success('Template downloaded successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Upload External Results with Excel"
        description="Bulk upload external examination results using Excel"
        backLink="/teacher/result"
      />

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <AlertTitle className="text-blue-800 flex items-center font-medium">
          <Download className="h-4 w-4 mr-2" /> 
          Download The Template First
        </AlertTitle>
        <AlertDescription className="text-blue-700">
          For accurate data import, download and use our Excel template. Fill in the required fields and upload the completed file.
        </AlertDescription>
      </Alert>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
          <CardTitle className="text-xl text-teal-700">Upload External Results Excel File</CardTitle>
          <CardDescription>Upload multiple external results in one go</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="examType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="hover:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all">
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {examTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Type of external examination</FormDescription>
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
                          <SelectTrigger className="hover:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all">
                            <SelectValue placeholder="Select exam year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {examYears.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Year when the exam was conducted</FormDescription>
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
                          <SelectTrigger className="hover:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Class of students</FormDescription>
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
                          <SelectTrigger className="hover:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all">
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section} value={section}>{section}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Section of the class</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="excelFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Excel File</FormLabel>
                    <FormControl>
                      <Input 
                        type="file"
                        accept=".xlsx,.xls,.csv" 
                        className="hover:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription>Upload Excel file (.xlsx, .xls, .csv)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center pt-6">
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    asChild
                    className="transition-all hover:-translate-x-1"
                  >
                    <Link to="/teacher/result">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Link>
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleDownloadTemplate}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 transition-all"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </div>
                
                <Button 
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 transition-all hover:shadow-md"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Excel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadExternalExcel;
