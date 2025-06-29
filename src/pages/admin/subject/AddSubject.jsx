
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

const AddSubject = () => {
  // Sample data for the table
  const subjects = [
    { id: 1, name: "Mathematics", level: "High School", class: "Class 10" },
    { id: 2, name: "Physics", level: "High School", class: "Class 11" },
    { id: 3, name: "Chemistry", level: "High School", class: "Class 12" },
    { id: 4, name: "Biology", level: "Middle School", class: "Class 8" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Subject
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Subject Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">Enter Subject Name</Label>
              <Input 
                id="subjectName" 
                placeholder="e.g. Mathematics, Physics, etc." 
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subjectLevel">Select Subject Level</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Select Class</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
                  <SelectItem value="class4">Class 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Add Now
          </Button>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Existing Subjects</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">S/N</TableHead>
                  <TableHead className="bg-gray-100">Subject Name</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>{subject.id}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.level}</TableCell>
                    <TableCell>{subject.class}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSubject;
