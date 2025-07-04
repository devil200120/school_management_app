import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Search, FileText, FileSpreadsheet, Printer, Copy } from 'lucide-react';

const ManageDepartment = () => {
  // Sample data for demonstration
  const departments = [
    { id: 1, name: "Science Department", level: "High School" },
    { id: 2, name: "Arts Department", level: "College" },
    { id: 3, name: "Mathematics Department", level: "Middle School" },
    { id: 4, name: "Sports Department", level: "Elementary" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Department
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Department List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search departments..."
                className="pl-10 px-5"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">S/N</TableHead>
                  <TableHead className="bg-gray-100">Dept Name</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>{dept.id}</TableCell>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell>{dept.level}</TableCell>
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

export default ManageDepartment;
