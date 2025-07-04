
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Search, FileText, FileSpreadsheet, Printer, Copy, Trash, RefreshCw } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

const ManageTrashedStudent = () => {
  // Sample data for demonstration
  const students = [
    { id: 1, surname: "Smith", otherName: "John", level: "Senior Secondary", class: "SS 3", dept: "Science", admissionNo: "SS2023001", status: "Inactive" },
    { id: 2, surname: "Johnson", otherName: "Mary", level: "Junior Secondary", class: "JS 2", dept: "Arts", admissionNo: "JS2023015", status: "Graduated" },
    { id: 3, surname: "Williams", otherName: "Peter", level: "Primary", class: "Primary 5", dept: "N/A", admissionNo: "P2023042", status: "Transferred" },
    { id: 4, surname: "Brown", otherName: "Sarah", level: "Senior Secondary", class: "SS 1", dept: "Commercial", admissionNo: "SS2023103", status: "Inactive" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Trashed Students
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Trashed Student Records</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search students..."
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
                  <TableHead className="bg-gray-100">Surname</TableHead>
                  <TableHead className="bg-gray-100">Other Name</TableHead>
                  <TableHead className="bg-gray-100">Level</TableHead>
                  <TableHead className="bg-gray-100">Class</TableHead>
                  <TableHead className="bg-gray-100">Dept</TableHead>
                  <TableHead className="bg-gray-100">Admission No</TableHead>
                  <TableHead className="bg-gray-100">Status</TableHead>
                  <TableHead className="bg-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.surname}</TableCell>
                    <TableCell>{student.otherName}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.dept}</TableCell>
                    <TableCell>{student.admissionNo}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          student.status === 'Graduated' 
                            ? 'bg-green-100 text-green-800' 
                            : student.status === 'Transferred'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
                          <RefreshCw size={14} />
                          <span>Restore</span>
                        </Button>
                        <Button variant="destructive" size="sm" className="flex items-center gap-1">
                          <Trash size={14} />
                          <span>Delete</span>
                        </Button>
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

export default ManageTrashedStudent;
