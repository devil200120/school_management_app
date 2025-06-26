
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';


export const AssignmentDetailsSection = ({ control }) => {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assignment Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter assignment title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
