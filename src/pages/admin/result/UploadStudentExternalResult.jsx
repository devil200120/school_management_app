
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';

const UploadStudentExternalResult = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Student External Result
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>External Result Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Select Student</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student1">John Doe</SelectItem>
                  <SelectItem value="student2">Jane Smith</SelectItem>
                  <SelectItem value="student3">Alice Johnson</SelectItem>
                  <SelectItem value="student4">Bob Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waec">WAEC</SelectItem>
                  <SelectItem value="jamb">JAMB</SelectItem>
                  <SelectItem value="neco">NECO</SelectItem>
                  <SelectItem value="gce">GCE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="examYear">Exam Year</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select exam year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultFile">Upload Result File (Optional)</Label>
              <Input 
                id="resultFile" 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png" 
                className="transition-all duration-300"
              />
              <p className="text-xs text-gray-500 mt-1">Accepted formats: .pdf, .jpg, .jpeg, .png</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resultDetails">Result Details</Label>
              <Textarea 
                id="resultDetails" 
                placeholder="Enter detailed result information..." 
                className="min-h-[120px] transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Upload Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadStudentExternalResult;
