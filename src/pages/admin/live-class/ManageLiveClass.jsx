
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../components/ui/dialog';
import { toast } from 'sonner';
import { CheckCircle, Clock, Eye, MonitorPlay, Video, XCircle } from 'lucide-react';

// Sample live class data
const mockLiveClasses = [
  {
    id: 1,
    title: 'Advanced Algebra Concepts',
    subject: 'Mathematics',
    class: 'SSS 3',
    teacher: 'Mr. Johnson',
    scheduledDate: '2025-05-05',
    scheduledTime: '10:00 AM',
    duration: 60,
    platform: 'Zoom',
    meetingId: '852963741',
    status: 'Active',
    participants: 42
  },
  {
    id: 2,
    title: 'Introduction to Literary Analysis',
    subject: 'English Language',
    class: 'SSS 2',
    teacher: 'Mrs. Smith',
    scheduledDate: '2025-05-06',
    scheduledTime: '11:30 AM',
    duration: 45,
    platform: 'Google Meet',
    meetingId: 'abc-defg-hij',
    status: 'Active',
    participants: 38
  },
  {
    id: 3,
    title: 'Chemistry Lab: Chemical Reactions',
    subject: 'Chemistry',
    class: 'SSS 1',
    teacher: 'Dr. Brown',
    scheduledDate: '2025-05-07',
    scheduledTime: '9:00 AM',
    duration: 90,
    platform: 'Microsoft Teams',
    meetingId: '123456789',
    status: 'Pending Approval',
    participants: 0
  },
  {
    id: 4,
    title: 'Physics: Wave Motion and Sound',
    subject: 'Physics',
    class: 'SSS 3',
    teacher: 'Prof. Wilson',
    scheduledDate: '2025-05-08',
    scheduledTime: '2:00 PM',
    duration: 60,
    platform: 'Zoom',
    meetingId: '987654321',
    status: 'Pending Approval',
    participants: 0
  },
  {
    id: 5,
    title: 'World History: Industrial Revolution',
    subject: 'History',
    class: 'SSS 2',
    teacher: 'Ms. Garcia',
    scheduledDate: '2025-05-04',
    scheduledTime: '12:00 PM',
    duration: 60,
    platform: 'Google Meet',
    meetingId: 'xyz-abcd-efg',
    status: 'Inactive',
    participants: 32
  }
];

// Sample courses data
const mockCourses = [
  {
    id: 1,
    title: 'Complete Mathematics for SSS 3',
    subject: 'Mathematics',
    class: 'SSS 3',
    modules: 12,
    lessons: 36,
    teacher: 'Mr. Johnson',
    enrollments: 85,
    status: 'Active',
    completionRate: 68
  },
  {
    id: 2,
    title: 'English Language Mastery',
    subject: 'English Language',
    class: 'SSS 1-3',
    modules: 10,
    lessons: 40,
    teacher: 'Mrs. Smith',
    enrollments: 120,
    status: 'Active',
    completionRate: 72
  },
  {
    id: 3,
    title: 'Physics for JAMB Preparation',
    subject: 'Physics',
    class: 'SSS 3',
    modules: 8,
    lessons: 24,
    teacher: 'Prof. Wilson',
    enrollments: 64,
    status: 'Active',
    completionRate: 55
  },
  {
    id: 4,
    title: 'Introduction to Computer Science',
    subject: 'Computer Science',
    class: 'SSS 1',
    modules: 6,
    lessons: 18,
    teacher: 'Mr. Adams',
    enrollments: 78,
    status: 'Inactive',
    completionRate: 0
  },
  {
    id: 5,
    title: 'Biology Essentials',
    subject: 'Biology',
    class: 'SSS 2',
    modules: 9,
    lessons: 27,
    teacher: 'Dr. Morris',
    enrollments: 92,
    status: 'Active',
    completionRate: 61
  }
];

const ManageLiveClass = () => {
  const [liveClasses, setLiveClasses] = useState(mockLiveClasses);
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewCourseDetailsDialog, setViewCourseDetailsDialog] = useState(false);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseStatusFilter, setCourseStatusFilter] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCourseSearch = (e) => {
    setCourseSearchTerm(e.target.value);
  };

  const filteredLiveClasses = liveClasses.filter(liveClass => {
    const matchesSearch = 
      liveClass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      liveClass.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      liveClass.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && liveClass.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(courseSearchTerm.toLowerCase());
      
    if (courseStatusFilter === 'all') return matchesSearch;
    return matchesSearch && course.status.toLowerCase() === courseStatusFilter.toLowerCase();
  });

  const handleLiveClassStatusChange = (classId, newStatus) => {
    const updatedClasses = liveClasses.map(liveClass => 
      liveClass.id === classId ? { ...liveClass, status: newStatus } : liveClass
    );
    setLiveClasses(updatedClasses);
    
    toast.success(`Live class ${newStatus === 'Active' ? 'approved' : 'rejected'} successfully`);
  };

  const handleCourseStatusChange = (courseId, newStatus) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId ? { ...course, status: newStatus } : course
    );
    setCourses(updatedCourses);
    
    toast.success(`Course ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="bg-eduos-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Live Classes & Courses</CardTitle>
              <CardDescription>Manage online learning resources for students</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="liveClasses" className="w-full">
            <div className="px-4 py-2 border-b">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="liveClasses">Live Classes</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="liveClasses" className="m-0">
              <div className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Input 
                    placeholder="Search live classes..." 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-xs"
                  />
                  
                  <Select 
                    defaultValue="all" 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending approval">Pending Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of all live classes</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Scheduled Date</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLiveClasses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">No live classes found</TableCell>
                        </TableRow>
                      ) : (
                        filteredLiveClasses.map((liveClass) => (
                          <TableRow key={liveClass.id}>
                            <TableCell className="font-medium">{liveClass.title}</TableCell>
                            <TableCell>{liveClass.subject}</TableCell>
                            <TableCell>{liveClass.class}</TableCell>
                            <TableCell>{liveClass.teacher}</TableCell>
                            <TableCell>{formatDate(liveClass.scheduledDate)}</TableCell>
                            <TableCell>{liveClass.platform}</TableCell>
                            <TableCell>
                              <Badge 
                                className={`${liveClass.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                  liveClass.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}
                              >
                                {liveClass.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedClass(liveClass);
                                  setViewDetailsDialog(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {liveClass.status === 'Pending Approval' && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-green-600 hover:text-green-700"
                                    onClick={() => handleLiveClassStatusChange(liveClass.id, 'Active')}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => handleLiveClassStatusChange(liveClass.id, 'Inactive')}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="m-0">
              <div className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Input 
                    placeholder="Search courses..." 
                    value={courseSearchTerm}
                    onChange={handleCourseSearch}
                    className="max-w-xs"
                  />
                  
                  <Select 
                    defaultValue="all" 
                    onValueChange={setCourseStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of all courses</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Modules</TableHead>
                        <TableHead>Enrollments</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">No courses found</TableCell>
                        </TableRow>
                      ) : (
                        filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.title}</TableCell>
                            <TableCell>{course.subject}</TableCell>
                            <TableCell>{course.class}</TableCell>
                            <TableCell>{course.teacher}</TableCell>
                            <TableCell>{course.modules}</TableCell>
                            <TableCell>{course.enrollments}</TableCell>
                            <TableCell>
                              <Badge 
                                className={`${course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                                {course.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setViewCourseDetailsDialog(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {course.status === 'Active' ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleCourseStatusChange(course.id, 'Inactive')}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() => handleCourseStatusChange(course.id, 'Active')}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Live Class Details Dialog */}
      <Dialog open={viewDetailsDialog} onOpenChange={setViewDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Live Class Details</DialogTitle>
            <DialogDescription>
              View detailed information about this live class session
            </DialogDescription>
          </DialogHeader>

          {selectedClass && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Class Title</h4>
                  <p className="font-medium">{selectedClass.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                  <p>{selectedClass.subject}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Class</h4>
                  <p>{selectedClass.class}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Teacher</h4>
                  <p>{selectedClass.teacher}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Scheduled Date</h4>
                  <p>{formatDate(selectedClass.scheduledDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Scheduled Time</h4>
                  <p>{selectedClass.scheduledTime}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                  <p>{selectedClass.duration} minutes</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Platform</h4>
                  <p>{selectedClass.platform}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Meeting ID</h4>
                  <p className="font-mono">{selectedClass.meetingId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge 
                    className={`${selectedClass.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      selectedClass.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {selectedClass.status}
                  </Badge>
                </div>
                {selectedClass.status === 'Active' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Participants</h4>
                    <p>{selectedClass.participants}</p>
                  </div>
                )}
              </div>

              {selectedClass.status === 'Pending Approval' && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLiveClassStatusChange(selectedClass.id, 'Inactive');
                      setViewDetailsDialog(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      handleLiveClassStatusChange(selectedClass.id, 'Active');
                      setViewDetailsDialog(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Course Details Dialog */}
      <Dialog open={viewCourseDetailsDialog} onOpenChange={setViewCourseDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>
              View detailed information about this course
            </DialogDescription>
          </DialogHeader>

          {selectedCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Course Title</h4>
                  <p className="font-medium">{selectedCourse.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                  <p>{selectedCourse.subject}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Class</h4>
                  <p>{selectedCourse.class}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Teacher</h4>
                  <p>{selectedCourse.teacher}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Modules</h4>
                  <p>{selectedCourse.modules}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Lessons</h4>
                  <p>{selectedCourse.lessons}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Enrollments</h4>
                  <p>{selectedCourse.enrollments}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge 
                    className={`${selectedCourse.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {selectedCourse.status}
                  </Badge>
                </div>
                {selectedCourse.status === 'Active' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Completion Rate</h4>
                    <div className="flex items-center">
                      <span className="font-medium">{selectedCourse.completionRate}%</span>
                      <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-eduos-primary" 
                          style={{ width: `${selectedCourse.completionRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Module Overview</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Lessons</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>Module {i + 1}</TableCell>
                          <TableCell>
                            {i === 0 ? 'Introduction to Course' : 
                             i === 1 ? 'Core Concepts' : 'Advanced Topics'}
                          </TableCell>
                          <TableCell>{i === 1 ? 5 : 4}</TableCell>
                          <TableCell>{(i + 1) * 30} minutes</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {selectedCourse.status === 'Active' ? (
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      handleCourseStatusChange(selectedCourse.id, 'Inactive');
                      setViewCourseDetailsDialog(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Deactivate Course
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleCourseStatusChange(selectedCourse.id, 'Active');
                      setViewCourseDetailsDialog(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Activate Course
                  </Button>
                )}
                <Button>
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Content
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageLiveClass;
