
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PlusCircle, Edit, Trash, Search, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageClass = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Class 1A', level: 'Elementary', students: 25, subjects: 6 },
    { id: 2, name: 'Class 2B', level: 'Elementary', students: 28, subjects: 7 },
    { id: 3, name: 'Class 3C', level: 'Elementary', students: 22, subjects: 8 },
    { id: 4, name: 'Class 7A', level: 'Middle School', students: 30, subjects: 10 },
    { id: 5, name: 'Class 8B', level: 'Middle School', students: 32, subjects: 10 },
    { id: 6, name: 'Class 12A', level: 'High School', students: 35, subjects: 12 },
  ];

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Classes
        </h2>
        <Button
          onClick={() => navigate('/admin/class/add')}
          className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Class
        </Button>
      </div>

      <Card className=" mt-3 animate-fade-in delay-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white flex flex-row items-center justify-between">
          <CardTitle>Classes List</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input
              className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption>A list of all classes in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    S/N
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Class Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{cls.id}</TableCell>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.level}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between p-4 border-t">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">CSV</Button>
              <Button size="sm" variant="outline">PDF</Button>
              <Button size="sm" variant="outline">Print</Button>
              <Button size="sm" variant="outline">Copy</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageClass;
