
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
import { DollarSign, Search, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const CollectFee = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for students with fee details
  const students = [
    {
      id: 1,
      name: 'John Smith',
      class: 'JSS 3A',
      section: 'Science',
      totalFees: 65000,
      paidAmount: 45000,
      pendingAmount: 20000,
      lastPayment: '2024-04-15',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      class: 'JSS 2B',
      section: 'Arts',
      totalFees: 50000,
      paidAmount: 50000,
      pendingAmount: 0,
      lastPayment: '2024-04-22',
    },
    {
      id: 3,
      name: 'Michael Brown',
      class: 'SSS 1A',
      section: 'Science',
      totalFees: 75000,
      paidAmount: 25000,
      pendingAmount: 50000,
      lastPayment: '2024-04-10',
    },
    {
      id: 4,
      name: 'Jessica Williams',
      class: 'SSS 3C',
      section: 'Commercial',
      totalFees: 80000,
      paidAmount: 55000,
      pendingAmount: 25000,
      lastPayment: '2024-04-05',
    },
  ];

  const handleSearch = () => {
    toast.success('Search applied');
    // In a real implementation, this would filter the data
  };

  const handleCollect = (studentId) => {
    toast.info(`Opening fee collection for student #${studentId}`);
    // In a real implementation, this would navigate to a fee collection form
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
            <h1 className="text-2xl font-bold">Collect Fee</h1>
            <p className="text-muted-foreground">Collect payments from students</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
            <CardDescription>
              Search for students to collect fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
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
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
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
                    <Search className="h-4 w-4" />
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
                    <TableHead>Total Fees</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Pending Amount</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>₦{student.totalFees.toLocaleString()}</TableCell>
                      <TableCell>₦{student.paidAmount.toLocaleString()}</TableCell>
                      <TableCell>₦{student.pendingAmount.toLocaleString()}</TableCell>
                      <TableCell>{student.lastPayment}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={student.pendingAmount === 0 ? "default" : "outline"}
                          className={student.pendingAmount === 0 ? "bg-green-500" : "text-yellow-600 border-yellow-600"}
                        >
                          {student.pendingAmount === 0 ? "Paid" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          onClick={() => handleCollect(student.id)}
                          disabled={student.pendingAmount === 0}
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Collect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {students.length} students
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CollectFee;
