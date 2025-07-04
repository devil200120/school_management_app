
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { toast } from 'sonner';
import { Download, Filter, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

const FeeDue = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for students with due fees
  const dueStudents = [
    {
      id: 1,
      name: 'John Smith',
      class: 'JSS 3A',
      section: 'Science',
      term: 'First Term',
      totalFees: 65000,
      paidAmount: 45000,
      pendingAmount: 20000,
      dueDate: '2024-05-15',
      daysOverdue: 5
    },
    {
      id: 3,
      name: 'Michael Brown',
      class: 'SSS 1A',
      section: 'Science',
      term: 'Second Term',
      totalFees: 75000,
      paidAmount: 25000,
      pendingAmount: 50000,
      dueDate: '2024-05-01',
      daysOverdue: 19
    },
    {
      id: 4,
      name: 'Jessica Williams',
      class: 'SSS 3C',
      section: 'Commercial',
      term: 'Third Term',
      totalFees: 80000,
      paidAmount: 55000,
      pendingAmount: 25000,
      dueDate: '2024-05-10',
      daysOverdue: 10
    },
    {
      id: 5,
      name: 'David Miller',
      class: 'JSS 1A',
      section: 'Science',
      term: 'First Term',
      totalFees: 60000,
      paidAmount: 30000,
      pendingAmount: 30000,
      dueDate: '2024-05-20',
      daysOverdue: 0
    },
    {
      id: 6,
      name: 'Emily Davis',
      class: 'SSS 2A',
      section: 'Science',
      term: 'Second Term',
      totalFees: 70000,
      paidAmount: 35000,
      pendingAmount: 35000,
      dueDate: '2024-04-30',
      daysOverdue: 20
    },
  ];

  const handleSearch = () => {
    toast.success('Search applied');
    // In a real implementation, this would filter the data
  };

  const handleSendReminder = (studentId) => {
    toast.success(`Reminder sent to student #${studentId}`);
    // In a real implementation, this would send a notification
  };

  const handleDownload = (format) => {
    toast.success(`Downloading due fees report as ${format}`);
    // In a real implementation, this would trigger a file download
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Fee Due</h1>
            <p className="text-muted-foreground">Monitor and manage outstanding fee payments</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload("PDF")}>
                  PDF Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("Excel")}>
                  Excel Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("CSV")}>
                  CSV Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Due Fee Records</CardTitle>
            <CardDescription>
              List of all students with outstanding fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="jss1">JSS 1</SelectItem>
                    <SelectItem value="jss2">JSS 2</SelectItem>
                    <SelectItem value="jss3">JSS 3</SelectItem>
                    <SelectItem value="sss1">SSS 1</SelectItem>
                    <SelectItem value="sss2">SSS 2</SelectItem>
                    <SelectItem value="sss3">SSS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger id="section">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Terms</SelectItem>
                    <SelectItem value="first">First Term</SelectItem>
                    <SelectItem value="second">Second Term</SelectItem>
                    <SelectItem value="third">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search Student</Label>
                <div className="flex">
                  <Input
                    id="search"
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button
                    onClick={handleSearch}
                    className="rounded-l-none"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Due Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Overdue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dueStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.term}</TableCell>
                      <TableCell>₦{student.pendingAmount.toLocaleString()}</TableCell>
                      <TableCell>{student.dueDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            student.daysOverdue > 15 
                              ? "text-red-600 border-red-600" 
                              : student.daysOverdue > 7 
                                ? "text-orange-600 border-orange-600" 
                                : "text-yellow-600 border-yellow-600"
                          }
                        >
                          {student.daysOverdue} days
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendReminder(student.id)}
                        >
                          <FileSearch className="h-4 w-4 mr-1" />
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between">
            <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
              Showing {dueStudents.length} students with due fees
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-medium">
                Total Due: <span className="text-red-600">₦{dueStudents.reduce((sum, student) => sum + student.pendingAmount, 0).toLocaleString()}</span>
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FeeDue;
