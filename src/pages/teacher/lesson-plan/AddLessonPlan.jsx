import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '../../../hooks/use-toast';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
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
import { DatePicker } from '../../../components/ui/date-picker';
import { Separator } from '../../../components/ui/separator';
import { Plus, X } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  class: z.string().min(1, { message: 'Class is required' }),
  section: z.string().min(1, { message: 'Section is required' }),
  date: z.date({ required_error: 'Date is required' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  objectives: z.string().min(1, { message: 'Objectives are required' }),
  materials: z.string().optional(),
  activities: z.string().min(1, { message: 'Activities are required' }),
  assessment: z.string().min(1, { message: 'Assessment is required' }),
  homework: z.string().optional(),
  notes: z.string().optional(),
});

const AddLessonPlan = () => {
  const { toast } = useToast();
  const [objectives, setObjectives] = useState(['']);
  const [materials, setMaterials] = useState(['']);
  const [activities, setActivities] = useState(['']);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subject: '',
      class: '',
      section: '',
      duration: '',
      objectives: '',
      materials: '',
      activities: '',
      assessment: '',
      homework: '',
      notes: '',
    },
  });

  const onSubmit = (values) => {
    console.log('Form values:', {
      ...values,
      objectives: objectives.filter(Boolean),
      materials: materials.filter(Boolean),
      activities: activities.filter(Boolean),
    });
    
    toast({
      title: "Lesson plan created",
      description: "Your lesson plan has been saved successfully.",
    });
    
    form.reset();
    setObjectives(['']);
    setMaterials(['']);
    setActivities(['']);
  };

  const handleArrayItemChange = (index, value, array, setArray) => {
    const updatedArray = [...array];
    updatedArray[index] = value;
    setArray(updatedArray);
  };

  const handleAddArrayItem = (array, setArray) => {
    setArray([...array, '']);
  };

  const handleRemoveArrayItem = (index, array, setArray) => {
    if (array.length > 1) {
      const updatedArray = [...array];
      updatedArray.splice(index, 1);
      setArray(updatedArray);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Lesson Plan</h1>
        <p className="text-muted-foreground">Plan your lessons for effective teaching and learning</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Information</CardTitle>
              <CardDescription>Basic details about your lesson</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Introduction to Algebra" {...field} />
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
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Lesson Date</FormLabel>
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="E.g., 45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
              <CardDescription>Detailed plan for your lesson</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <FormLabel className="text-base">Lesson Objectives</FormLabel>
                <FormDescription className="mt-1 mb-3">
                  What students will learn or accomplish by the end of the lesson
                </FormDescription>
                
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={objective}
                      onChange={(e) => handleArrayItemChange(index, e.target.value, objectives, setObjectives)}
                      placeholder={`Objective ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveArrayItem(index, objectives, setObjectives)}
                      disabled={objectives.length === 1}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleAddArrayItem(objectives, setObjectives)}
                >
                  <Plus size={16} className="mr-1" />
                  Add Objective
                </Button>
                
                <FormField
                  control={form.control}
                  name="objectives"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} value={objectives.filter(Boolean).join('\n')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div>
                <FormLabel className="text-base">Materials & Resources</FormLabel>
                <FormDescription className="mt-1 mb-3">
                  Materials needed for the lesson (textbooks, handouts, equipment, etc.)
                </FormDescription>
                
                {materials.map((material, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={material}
                      onChange={(e) => handleArrayItemChange(index, e.target.value, materials, setMaterials)}
                      placeholder={`Material ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveArrayItem(index, materials, setMaterials)}
                      disabled={materials.length === 1}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleAddArrayItem(materials, setMaterials)}
                >
                  <Plus size={16} className="mr-1" />
                  Add Material
                </Button>
                
                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} value={materials.filter(Boolean).join('\n')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div>
                <FormLabel className="text-base">Learning Activities</FormLabel>
                <FormDescription className="mt-1 mb-3">
                  Step-by-step activities to be conducted during the lesson
                </FormDescription>
                
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Textarea
                      value={activity}
                      onChange={(e) => handleArrayItemChange(index, e.target.value, activities, setActivities)}
                      placeholder={`Activity ${index + 1}`}
                      className="flex-1 min-h-24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveArrayItem(index, activities, setActivities)}
                      disabled={activities.length === 1}
                      className="self-start mt-2"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleAddArrayItem(activities, setActivities)}
                >
                  <Plus size={16} className="mr-1" />
                  Add Activity
                </Button>
                
                <FormField
                  control={form.control}
                  name="activities"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} value={activities.filter(Boolean).join('\n')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="assessment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Method</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will you assess student understanding?" 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Describe how you will evaluate student learning
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="homework"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Homework Assignment</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Homework details (optional)" 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Any tasks students should complete at home
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other information or notes (optional)" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Any special considerations, differentiation strategies, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Create Lesson Plan</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default AddLessonPlan;
