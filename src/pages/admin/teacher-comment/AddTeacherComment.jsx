
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';

const AddTeacherComment = () => {
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 pb-12 md:pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in leading-tight">
          Add Teacher Comment To Result
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6 text-center sm:text-left">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Teacher Comment</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-5 md:space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacherComment" className="text-sm sm:text-base block text-center sm:text-left">Enter Teacher Comment</Label>
              <Textarea 
                id="teacherComment" 
                placeholder="Enter a comment that will appear on the student's result..." 
                className="min-h-[100px] sm:min-h-[120px] transition-all duration-300 focus:border-eduos-primary text-sm sm:text-base"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-sm sm:text-base py-2 sm:py-2.5 mt-4"
          >
            Add Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeacherComment;
