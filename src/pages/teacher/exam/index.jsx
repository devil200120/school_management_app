import { Link } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Edit, 
  Search,
  ListChecks,
  FileQuestion,
  FileUp,
  Settings,
  ChevronRight,
  BarChart4
} from 'lucide-react';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const ExamManagementIndex= () => {
  // Menu items for exam management with enhanced styling
  const examOptions = [
    {
      title: 'Add Assessment',
      description: 'Create new assessments for students',
      icon: <Plus className="h-8 w-8 text-indigo-500" />,
      link: '/teacher/exam/add-assessment',
      color: 'from-indigo-50 to-blue-50',
      badgeText: 'Popular',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      title: 'Manage Assessments',
      description: 'View and manage existing assessments',
      icon: <FileText className="h-8 w-8 text-violet-500" />,
      link: '/teacher/exam/manage-assessment',
      color: 'from-violet-50 to-purple-50',
    },
    {
      title: 'Manage Exam Questions',
      description: 'Create and manage questions for exams',
      icon: <FileQuestion className="h-8 w-8 text-orange-500" />,
      link: '/teacher/exam/manage-exam-questions',
      color: 'from-orange-50 to-amber-50',
    },
    {
      title: 'Question Bank',
      description: 'Organize and store all test questions',
      icon: <ListChecks className="h-8 w-8 text-green-500" />,
      link: '/teacher/exam/question-bank',
      color: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Upload Questions (Excel)',
      description: 'Bulk upload questions using Excel',
      icon: <FileUp className="h-8 w-8 text-cyan-500" />,
      link: '/teacher/exam/upload-excel-questions',
      color: 'from-cyan-50 to-teal-50',
      badgeText: 'New',
      badgeColor: 'bg-cyan-100 text-cyan-800'
    },
    {
      title: 'Assessment Settings',
      description: 'Configure global assessment settings',
      icon: <Settings className="h-8 w-8 text-rose-500" />,
      link: '/teacher/exam/assessment-settings',
      color: 'from-rose-50 to-pink-50',
    },
    {
      title: 'View Reports',
      description: 'View assessment reports and analytics',
      icon: <BarChart4 className="h-8 w-8 text-blue-500" />,
      link: '/teacher/exam/reports',
      color: 'from-blue-50 to-sky-50',
    },
    {
      title: 'Search Assessments',
      description: 'Search and filter assessments',
      icon: <Search className="h-8 w-8 text-fuchsia-500" />,
      link: '/teacher/exam/search',
      color: 'from-fuchsia-50 to-purple-50',
    },
  ];

  // Recent exams - would be dynamic in a real app
  const recentExams = [
    { 
      title: 'Mathematics Final Exam', 
      class: 'Class 10A', 
      date: '2024-06-25', 
      status: 'Upcoming',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    { 
      title: 'English Mid-Term Quiz', 
      class: 'Class 11B', 
      date: '2024-05-15', 
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Science Weekly Test', 
      class: 'Class 9C', 
      date: '2024-04-28', 
      status: 'Completed',
      statusColor: 'bg-gray-100 text-gray-800'
    },
    { 
      title: 'History Quiz', 
      class: 'Class 10D', 
      date: '2024-04-20', 
      status: 'Completed',
      statusColor: 'bg-gray-100 text-gray-800'
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Management"
        description="Create, manage, and evaluate student exams and assessments"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {examOptions.map((option) => (
          <Link to={option.link} key={option.title}>
            <Card className="hover:shadow-lg transition-all duration-300 h-full overflow-hidden group border border-gray-200">
              <div className={`bg-gradient-to-br ${option.color} p-6 border-b flex justify-between items-start`}>
                <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                {option.badgeText && (
                  <Badge className={`${option.badgeColor}`}>
                    {option.badgeText}
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-2 group-hover:text-indigo-700 transition-colors">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1"
                  >
                    Get Started <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
            <CardTitle className="text-xl text-indigo-700">Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {recentExams.map((exam, index) => (
                <li key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-500">{exam.class} • {new Date(exam.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={exam.statusColor}>
                        {exam.status}
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                        View
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
            <CardTitle className="text-xl text-indigo-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button asChild variant="default" className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 transition-all">
                <Link to="/teacher/exam/add-assessment">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-violet-50 transition-all">
                <Link to="/teacher/exam/manage-assessment">
                  <Edit className="mr-2 h-4 w-4 text-violet-600" />
                  Manage Assessments
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-orange-50 transition-all">
                <Link to="/teacher/exam/manage-exam-questions">
                  <FileQuestion className="mr-2 h-4 w-4 text-orange-600" />
                  Manage Exam Questions
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-green-50 transition-all">
                <Link to="/teacher/exam/question-bank">
                  <ListChecks className="mr-2 h-4 w-4 text-green-600" />
                  Question Bank
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-blue-50 transition-all">
                <Link to="/teacher/exam/reports">
                  <BarChart4 className="mr-2 h-4 w-4 text-blue-600" />
                  View Reports
                </Link>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-indigo-800">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Active Assessments</p>
                  <p className="text-xl font-semibold text-indigo-700">12</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="text-xl font-semibold text-indigo-700">248</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamManagementIndex;
