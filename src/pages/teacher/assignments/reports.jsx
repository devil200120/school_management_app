import { useState } from 'react';
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
import { Download, Filter } from 'lucide-react';
import { toast } from 'sonner';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';

// Mock data for charts
const submissionStatusData = [
  { name: 'Submitted', value: 75 },
  { name: 'Pending', value: 25 },
];

const assignmentPerformanceData = [
  { name: '90-100%', students: 12 },
  { name: '80-89%', students: 24 },
  { name: '70-79%', students: 18 },
  { name: '60-69%', students: 15 },
  { name: '50-59%', students: 9 },
  { name: 'Below 50%', students: 6 },
];

const subjectPerformanceData = [
  { name: 'Mathematics', avgScore: 78 },
  { name: 'English', avgScore: 82 },
  { name: 'Science', avgScore: 75 },
  { name: 'History', avgScore: 68 },
  { name: 'Geography', avgScore: 73 },
  { name: 'Computer Science', avgScore: 85 },
];

const monthlyAssignmentData = [
  { name: 'Jan', completed: 18, pending: 4 },
  { name: 'Feb', completed: 22, pending: 6 },
  { name: 'Mar', completed: 25, pending: 3 },
  { name: 'Apr', completed: 20, pending: 8 },
  { name: 'May', completed: 28, pending: 5 },
  { name: 'Jun', completed: 15, pending: 2 },
];

// Colors for pie chart
const COLORS = ['#00C49F', '#FF8042'];

function AssignmentReports() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const classes = ['All Classes', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'];
  const timeframes = ['All Time', 'This Month', 'This Week', 'Today'];

  const handleExport = (format) => {
    toast.success(`Report exported as ${format} successfully`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assignment Reports"
        description="View and analyze assignment performance analytics"
        backLink="/teacher/assignments"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => handleExport('PDF')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('Excel')}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Filter Reports</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto flex-1">
              <Select defaultValue={selectedClass} onValueChange={(value) => setSelectedClass(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls, index) => (
                    <SelectItem key={index} value={index === 0 ? 'all' : cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto flex-1">
              <Select defaultValue={selectedTimeframe} onValueChange={(value) => setSelectedTimeframe(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((timeframe, index) => (
                    <SelectItem key={index} value={index === 0 ? 'all' : timeframe}>
                      {timeframe}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="btnSearchQuiz">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Assignments", value: "84" },
          { label: "Completion Rate", value: "76%" },
          { label: "Avg. Score", value: "72%" },
          { label: "High Performers", value: "36" }
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
                <CardDescription>Percentage of submitted vs pending assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={submissionStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {submissionStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assignment Performance</CardTitle>
                <CardDescription>Distribution of student scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assignmentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#8884d8" name="Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Details</CardTitle>
              <CardDescription>Score distribution across all assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assignmentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" name="Students" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Subject</CardTitle>
              <CardDescription>Average scores across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgScore" fill="#82ca9d" name="Average Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Assignment Completion</CardTitle>
              <CardDescription>Trend of completed vs pending assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyAssignmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                    <Bar dataKey="pending" fill="#FF8042" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AssignmentReports;
