
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Form } from '../../../components/ui/form';
import { AssignmentDetailsSection } from './AssignmentDetailsSection';
import { ClassSelectionSection } from './ClassSelectionSection';
import { AssignmentContentSection } from './AssignmentContentSection';
import { AssignmentStatusSection } from './AssignmentStatusSection';
import { FormActions } from './FormActions';

// Define assignment schema
const assignmentFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  subject: z.string().min(1, 'Subject is required'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  maxMarks: z.number().min(1, 'Maximum marks is required'),
  attachments: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).default('active')
});

//export type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

const AssignmentForm = () => {
  const navigate = useNavigate();
  
  const form = useForm<object>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      class: '',
      section: '',
      dueDate: '',
      maxMarks: 100,
      attachments: [],
      status: 'active'
    }
  });

  const onSubmit = (values) => {
    console.log('Assignment values:', values);
    
    // In a real app, you would submit to an API
    toast.success('Assignment created successfully!');
    navigate('/teacher/assignments');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AssignmentDetailsSection control={form.control} />
        <ClassSelectionSection control={form.control} />
        <AssignmentContentSection control={form.control} />
        <AssignmentStatusSection control={form.control} />
        <FormActions />
      </form>
    </Form>
  );
};

export default AssignmentForm;
