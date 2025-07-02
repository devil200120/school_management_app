import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, Search, Filter, MoreVertical, Edit, Trash2, Eye, Copy } from 'lucide-react';

import { PageHeader } from '../../../components/teacher/assignments/PageHeader';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { toast } from "sonner";

const ManageClasses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Sample data for live classes
  const classesData = [
    {
      id: '1',
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      class: 'Class 10',
      section: 'A',
      date: '2025-05-10',
      time: '10:00 - 11:00',
      platform: 'Zoom',
      status: 'upcoming',
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
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Chemistry Lab Preparation',
      subject: 'Chemistry',
      class: 'Class 11',
      section: 'A',
      date: '2025-04-30',
      time: '11:00 - 12:30',
      platform: 'Microsoft Teams',
      status: 'completed',
    },
    {
      id: '4',
      title: 'History of Ancient Civilizations',
      subject: 'History',
      class: 'Class 8',
      section: 'C',
      date: '2025-04-28',
      time: '14:00 - 15:00',
      platform: 'Zoom',
      status: 'completed',
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
      status: 'upcoming',
    },
    {
      id: '6',
      title: 'Physics Motion Laws',
      subject: 'Physics',
      class: 'Class 11',
      section: 'B',
      date: '2025-05-05',
      time: '10:00 - 11:00',
      platform: 'Google Meet',
      status: 'cancelled',
    },
  ];

  // Filter classes based on search term and filters
  const filteredClasses = classesData.filter(cls => {
    const matchesSearch =
      cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || cls.subject === filterSubject;
    const matchesClass = filterClass === 'all' || cls.class === filterClass;
    const matchesStatus = activeTab === 'all' || cls.status === activeTab;

    return matchesSearch && matchesSubject && matchesClass && matchesStatus;
  });

  // Get unique values for filters
  const subjects = [...new Set(classesData.map(cls => cls.subject))];
  const classes = [...new Set(classesData.map(cls => cls.class))];

  const handleDelete = (id) => {
    // In a real app, this would delete the class from database
    toast.success('Class deleted successfully');
  };

  const handleCopyLink = (id) => {
    // In a real app, this would copy the class meeting link
    navigator.clipboard.writeText(`https://example-meeting-link.com/${id}`);
    toast.success('Meeting link copied to clipboard');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Live Classes"
        description="View, edit and manage your scheduled live classes"
      >
        <Button asChild>
          <Link to="/teacher/live-classes/schedule">
            Schedule New Class
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>All Live Classes</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search classes..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Subject</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject, index) => (
                      <SelectItem key={index} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Class</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls, index) => (
                      <SelectItem key={index} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {renderClassesList(filteredClasses)}
            </TabsContent>
            <TabsContent value="upcoming" className="mt-0">
              {renderClassesList(filteredClasses)}
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              {renderClassesList(filteredClasses)}
            </TabsContent>
            <TabsContent value="cancelled" className="mt-0">
              {renderClassesList(filteredClasses)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  function renderClassesList(classes) {
    return classes.length === 0 ? (
      <div className="text-center py-10">
        <Video className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium">No classes found</h3>
        <p className="mt-2 text-sm text-gray-500">
          No live classes match your search criteria.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/teacher/live-classes/schedule">
            Schedule New Class
          </Link>
        </Button>
      </div>
    ) : (
      <div className="divide-y">
        {classes.map((cls) => (
          <div key={cls.id} className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{cls.title}</p>
                  {getStatusBadge(cls.status)}
                </div>
                <div className="text-sm text-gray-500">
                  {cls.subject} | {cls.class} {cls.section}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{cls.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Video className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{cls.platform}</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCopyLink(cls.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copy link</span>
                    </DropdownMenuItem>
                    {cls.status === 'upcoming' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to={`/teacher/live-classes/schedule?id=${cls.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(cls.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to={`/teacher/live-classes/view?id=${cls.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View details</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default ManageClasses;
