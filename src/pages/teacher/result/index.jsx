import { Link } from 'react-router-dom';
import {
  Upload,
  FileText,
  Edit,
  Search,
  FileCheck,
  BarChart,
  FileUp,
  Download,
  ChevronRight
} from 'lucide-react';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const ResultManagementIndex = () => {
  const resultOptions = [
    {
      title: 'Upload Student Result',
      description: 'Upload individual student result data',
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      link: '/teacher/result/upload-student-result',
      color: 'from-blue-50 to-indigo-50',
      badgeText: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Upload Class Result',
      description: 'Upload result data for an entire class',
      icon: <FileUp className="h-8 w-8 text-green-500" />,
      link: '/teacher/result/upload-class',
      color: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Edit Class Result',
      description: 'Edit or update existing result data',
      icon: <Edit className="h-8 w-8 text-orange-500" />,
      link: '/teacher/result/edit-class-result',
      color: 'from-orange-50 to-amber-50',
    },
    {
      title: 'Manage Term Result',
      description: 'View and manage termly results',
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      link: '/teacher/result/manage-term-result',
      color: 'from-purple-50 to-fuchsia-50',
      badgeText: 'New',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Upload External Result',
      description: 'Upload external examination results',
      icon: <FileCheck className="h-8 w-8 text-teal-500" />,
      link: '/teacher/result/upload-external-result',
      color: 'from-teal-50 to-cyan-50',
    },
    {
      title: 'Upload External Results (Excel)',
      description: 'Bulk upload external results with Excel',
      icon: <FileUp className="h-8 w-8 text-pink-500" />,
      link: '/teacher/result/upload-external-excel',
      color: 'from-pink-50 to-rose-50',
    },
    {
      title: 'View Results',
      description: 'View and search for student results',
      icon: <Search className="h-8 w-8 text-violet-500" />,
      link: '/teacher/result/view',
      color: 'from-violet-50 to-indigo-50',
    },
    {
      title: 'Result Analytics',
      description: 'View performance analytics and reports',
      icon: <BarChart className="h-8 w-8 text-red-500" />,
      link: '/teacher/result/analytics',
      color: 'from-red-50 to-pink-50',
    },
  ];

  const recentActivities = [
    { action: 'Uploaded', target: 'Class 10A Mid-term Results', date: '2 days ago', user: 'You' },
    { action: 'Edited', target: "John Smith's Science Test Score", date: '5 days ago', user: 'You' },
    { action: 'Uploaded', target: 'Class 11B Final Results', date: '1 week ago', user: 'Sarah Chen' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Result Management"
        description="Upload, edit, and manage student results"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resultOptions.map((option) => (
          <Link to={option.link} key={option.title}>
            <Card className="hover:shadow-lg transition-all duration-300 h-full overflow-hidden group">
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
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-700 transition-colors">{option.title}</h3>
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
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-xl text-blue-700">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <FileCheck className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No recent activities</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Result management activities will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="mr-4 mt-1">
                      <div className="bg-blue-100 rounded-full p-2">
                        <FileCheck className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-gray-600"> {activity.action.toLowerCase()} </span>
                        <span className="text-gray-900">{activity.target}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-xl text-blue-700">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start hover:bg-blue-50 transition-all">
                <Link to="/teacher/result/upload-student-result">
                  <Upload className="mr-2 h-4 w-4 text-blue-600" />
                  Upload Student Result
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-green-50 transition-all">
                <Link to="/teacher/result/upload-class">
                  <FileUp className="mr-2 h-4 w-4 text-green-600" />
                  Upload Class Result
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-orange-50 transition-all">
                <Link to="/teacher/result/edit-class-result">
                  <Edit className="mr-2 h-4 w-4 text-orange-600" />
                  Edit Class Result
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-purple-50 transition-all">
                <Link to="/teacher/result/manage-term-result">
                  <FileText className="mr-2 h-4 w-4 text-purple-600" />
                  Manage Term Result
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start hover:bg-red-50 transition-all">
                <Link to="/teacher/result/view">
                 
<Search className="mr-2 h-4 w-4 text-red-600" /> View Results </Link> </Button> </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium flex items-center text-blue-800">
            <Download className="mr-2 h-4 w-4" />
            Templates
          </h3>
          <p className="text-sm text-blue-600 mt-1">Download result templates for uploading student and class results</p>
          <div className="mt-3 space-x-2">
            <Button size="sm" variant="outline" className="text-xs bg-white">Class Template</Button>
            <Button size="sm" variant="outline" className="text-xs bg-white">Student Template</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
);
};

export default ResultManagementIndex;