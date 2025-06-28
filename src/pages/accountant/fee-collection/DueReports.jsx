import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../components/ui/table';
import { toast } from 'sonner';
import { Download, ChartBar, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DueReports = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedTerm, setSelectedTerm] = useState<string>("all");

  // Mock data for charts
  const barChartData = [
    { month: 'Jan', pending: 152000, collected: 548000 },
    { month: 'Feb', pending: 180000, collected: 520000 },
    { month: 'Mar', pending: 210000, collected: 590000 },
    { month: 'Apr', pending: 160000, collected: 640000 },
    { month: 'May', pending: 260000, collected: 540000 }
  ];

  const classWiseData = [
    { name: 'JSS 1', value: 180000, fill: '#8884d8' },
    { name: 'JSS 2', value: 150000, fill: '#83a6ed' },
    { name: 'JSS 3', value: 220000, fill: '#8dd1e1' },
    { name: 'SSS 1', value: 280000, fill: '#82ca9d' },
    { name: 'SSS 2', value: 190000, fill: '#a4de6c' },
    { name: 'SSS 3', value: 140000, fill: '#d0ed57' }
  ];

  const termWiseData = [
    { name: 'First Term', value: 450000, fill: '#0088FE' },
    { name: 'Second Term', value: 380000, fill: '#00C49F' },
    { name: 'Third Term', value: 330000, fill: '#FFBB28' }
  ];

  // Summary data
  const summaryData = {
    totalStudentsWithDue: 285,
    totalDueAmount: 1160000,
    classesMostDue: 'SSS 1',
    averageDuePerStudent: 4070,
    percentageStudentsWithDue: 38
  };

  // Class-wise due breakdown
  const classWiseDueBreakdown = [
    { class: 'JSS 1', totalStudents: 85, studentsWithDue: 28, dueAmount: 180000 },
    { class: 'JSS 2', totalStudents: 78, studentsWithDue: 24, dueAmount: 150000 },
    { class: 'JSS 3', totalStudents: 82, studentsWithDue: 35, dueAmount: 220000 },
    { class: 'SSS 1', totalStudents: 90, studentsWithDue: 46, dueAmount: 280000 },
    { class: 'SSS 2', totalStudents: 75, studentsWithDue: 32, dueAmount: 190000 },
    { class: 'SSS 3', totalStudents: 70, studentsWithDue: 20, dueAmount: 140000 }
  ];

  const handleDownload = (format) => {
    toast.success(`Downloading due report as ${format}`);
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
            <h1 className="text-2xl font-bold">Due Reports</h1>
            <p className="text-muted-foreground">Analysis and visualization of fee payment due data</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload("PDF")}>
                  PDF Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("Excel")}>
                  Excel Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/4 space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year" className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/4 space-y-2">
          <Label htmlFor="term">Term</Label>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger id="term" className="w-full">
              <SelectValue placeholder="All Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              <SelectItem value="first">First Term</SelectItem>
              <SelectItem value="second">Second Term</SelectItem>
              <SelectItem value="third">Third Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Students With Due Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalStudentsWithDue}</div>
            <p className="text-xs text-muted-foreground">
              {summaryData.percentageStudentsWithDue}% of total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Due Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₦{summaryData.totalDueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Class Most Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.classesMostDue}</div>
            <p className="text-xs text-muted-foreground">
              ₦280,000 outstanding
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Due Per Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{summaryData.averageDuePerStudent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              For students with pending dues
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Due vs. Collected</CardTitle>
            <CardDescription>
              Comparison between amount collected and pending dues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${(value / 1000)}k`} />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="collected" name="Amount Collected" fill="#4ade80" />
                  <Bar dataKey="pending" name="Amount Pending" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Due Fees Distribution</CardTitle>
            <CardDescription>
              Due fees breakdown by class and term
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classWiseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classWiseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={termWiseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {termWiseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Class-wise Due Breakdown</CardTitle>
            <CardDescription>
              Detailed breakdown of due fees by class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Students with Due</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Due Amount</TableHead>
                  <TableHead>Average Per Student</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classWiseDueBreakdown.map((item) => (
                  <TableRow key={item.class}>
                    <TableCell className="font-medium">{item.class}</TableCell>
                    <TableCell>{item.totalStudents}</TableCell>
                    <TableCell>{item.studentsWithDue}</TableCell>
                    <TableCell>{((item.studentsWithDue / item.totalStudents) * 100).toFixed(1)}%</TableCell>
                    <TableCell>₦{item.dueAmount.toLocaleString()}</TableCell>
                    <TableCell>₦{Math.round(item.dueAmount / item.studentsWithDue).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DueReports;
