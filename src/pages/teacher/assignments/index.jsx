import { Link } from 'react-router-dom';
import { BarChart2, FileText, Plus, Upload } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { PageHeader } from '../../../components/teacher/assignments/PageHeader';

const TeacherAssignmentsIndex = () => {
  const assignmentStats = [
    { title: 'Total Assignments', value: '32', icon: <FileText className="h-12 w-12 text-gray-200" /> },
    { title: 'Active Assignments', value: '18', icon: <FileText className="h-12 w-12 text-gray-200" /> },
    { title: 'Pending Submissions', value: '43', icon: <Upload className="h-12 w-12 text-gray-200" /> },
    { title: 'Completed', value: '14', icon: <BarChart2 className="h-12 w-12 text-gray-200" /> },
  ];

  const recentAssignments = [
    { id: '1', title: 'Algebraic Equations', subject: 'Mathematics', class: 'Class 10', section: 'A', submissions: '45/50' },
    { id: '2', title: 'Essay on Environmental Conservation', subject: 'English', class: 'Class 9', section: 'B', submissions: '38/45' },
    { id: '3', title: 'Human Anatomy Quiz', subject: 'Biology', class: 'Class 11', section: 'A', submissions: '32/50' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assignment Management"
        description="Create, manage, and track student assignments"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assignmentStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="absolute right-4 bottom-4 opacity-10">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Assignments</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/teacher/assignments/manage">View All</Link>
              </Button>
            </div>
            <CardDescription>
              Recently created or updated assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left font-medium">Assignment</th>
                    <th className="py-2 px-4 text-left font-medium">Subject</th>
                    <th className="py-2 px-4 text-left font-medium">Class</th>
                    <th className="py-2 px-4 text-left font-medium">Submissions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b">
                      <td className="py-2 px-4">{assignment.title}</td>
                      <td className="py-2 px-4">{assignment.subject}</td>
                      <td className="py-2 px-4">{assignment.class} {assignment.section}</td>
                      <td className="py-2 px-4">{assignment.submissions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common assignment tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild className="justify-start" variant="default">
              <Link to="/teacher/assignments/add">
                <Plus className="mr-2 h-4 w-4" />
                Add New Assignment
              </Link>
            </Button>
            <Button asChild className="justify-start" variant="outline">
              <Link to="/teacher/assignments/manage">
                <FileText className="mr-2 h-4 w-4" />
                Manage Assignments
              </Link>
            </Button>
            <Button asChild className="justify-start" variant="outline">
              <Link to="/teacher/assignments/reports">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAssignmentsIndex;
