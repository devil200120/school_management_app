import { Calendar, ChevronRight, Plus, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const LiveClassesIndex = () => {
  // Sample data for upcoming classes
  const upcomingClasses = [
    {
      id: '1',
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      class: 'Class 10',
      section: 'A',
      date: '2025-05-10',
      time: '10:00 - 11:00',
      platform: 'Zoom',
    },
    {
      id: '2',
      title: 'English Literature Discussion',
      subject: 'English',
      class: 'Class 9',
      section: 'B',
      date: '2025-05-12',
      time: '09:00 - 10:00',
      platform: 'Google Meet',
    },
    {
      id: '5',
      title: 'Computer Science Programming',
      subject: 'Computer Science',
      class: 'Class 10',
      section: 'B',
      date: '2025-05-15',
      time: '13:00 - 14:30',
      platform: 'Zoom',
    }
  ];

  // Overview statistics
  const stats = [
    { title: 'Upcoming Classes', value: 3 },
    { title: 'Completed Classes', value: 15 },
    { title: 'Total Students', value: 245 },
    { title: 'Average Attendance', value: '85%' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Classes"
        description="Schedule and manage your live classes for students"
      >
        <Button asChild>
          <Link to="/teacher/live-classes/schedule">
            <Plus className="mr-2 h-4 w-4" />
            Schedule New Class
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-sm text-gray-500">{stat.title}</div>
              <div className="text-3xl font-bold mt-2">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upcoming Live Classes</CardTitle>
          <Button variant="outline" asChild>
            <Link to="/teacher/live-classes/manage">
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingClasses.length === 0 ? (
            <div className="text-center py-10">
              <Video className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium">No upcoming classes</h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven't scheduled any upcoming live classes yet.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/teacher/live-classes/schedule">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule New Class
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{cls.title}</h4>
                    <div className="text-sm text-gray-500">
                      {cls.subject} | {cls.class} {cls.section}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <span>
                        {cls.date}, {cls.time}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Video className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{cls.platform}</span>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/teacher/live-classes/manage?id=${cls.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/teacher/live-classes/schedule">
                <Plus className="mr-2 h-4 w-4" />
                Schedule New Class
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/teacher/live-classes/manage">
                <Video className="mr-2 h-4 w-4" />
                Manage All Classes
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Help & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Getting Started</h3>
                <p className="text-sm text-gray-500">
                  Learn how to set up and manage live classes for your students effectively.
                </p>
              </div>
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Best Practices</h3>
                <p className="text-sm text-gray-500">
                  Tips for running engaging and effective online classes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveClassesIndex;
