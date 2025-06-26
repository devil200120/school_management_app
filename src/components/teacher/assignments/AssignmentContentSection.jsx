
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

export const AssignmentContentSection = ({ control }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Assignment Content</h3>
      
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter assignment description" 
                className="min-h-32 resize-y"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="maxMarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Marks</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Add file upload functionality */}
      <div className="space-y-2">
        <FormLabel>Attachments (Optional)</FormLabel>
        <Input type="file" multiple className="cursor-pointer" />
        <p className="text-sm text-gray-500">Upload any supporting documents</p>
      </div>
    </div>
  );
};
