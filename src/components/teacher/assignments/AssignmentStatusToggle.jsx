
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '../../ui/form';
import { Switch } from '../../ui/switch';


export const AssignmentStatusToggle = ({ control }) => {
  return (
    <div className="flex items-center space-x-2">
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Switch
                checked={field.value === 'active'}
                onCheckedChange={(checked) => 
                  field.onChange(checked ? 'active' : 'inactive')
                }
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Active</FormLabel>
              <FormDescription>
                Make this assignment visible to students
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
