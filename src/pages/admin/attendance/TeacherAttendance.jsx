
import { useState } from 'react';
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
import {
  CheckCircle,
  ClipboardList,
  Eye,
  Users,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Sample teacher attendance data
const mockTeacherAttendance = [
  { id: 1, name: 'Mr. Johnson', subject: 'Mathematics', department: 'Science', present: 22, absent: 1, leave: 2, percentage: 88 },
  { id: 2, name: 'Mrs. Smith', subject: 'English', department: 'Language', present: 24, absent: 0, leave: 1, percentage: 96 },
  { id: 3, name: 'Dr. Williams', subject: 'Physics', department: 'Science', present: 21, absent: 3, leave: 1, percentage: 84 },
  { id: 4, name: 'Prof. Brown', subject: 'Chemistry', department: 'Science', present: 23, absent: 2, leave: 0, percentage: 92 },
  { id: 5, name: 'Ms. Garcia', subject: 'History', department: 'Humanities', present: 20, absent: 4, leave: 1, percentage: 80 },
  { id: 6, name: 'Mr. Davis', subject: 'Biology', department: 'Science', present: 22, absent: 2, leave: 1, percentage: 88 },
  { id: 7, name: 'Mrs. Wilson', subject: 'Geography', department: 'Humanities', present: 23, absent: 1, leave: 1, percentage: 92 },
];

// Sample leave applications
const mockLeaveApplications = [
  {
    id: 1,
    teacherName: 'Mr. Johnson',
    subject: 'Mathematics',
    department: 'Science',
    fromDate: '2025-05-10',
    toDate: '2025-05-12',
    reason: 'Family emergency',
    status: 'Pending',
    appliedOn: '2025-05-05'
  },
  {
    id: 2,
    teacherName: 'Mrs. Smith',
    subject: 'English',
    department: 'Language',
    fromDate: '2025-05-15',
    toDate: '2025-05-15',
    reason: 'Medical appointment',
    status: 'Approved',
    appliedOn: '2025-05-01'
  },
  {
    id: 3,
    teacherName: 'Dr. Williams',
    subject: 'Physics',
    department: 'Science',
    fromDate: '2025-05-20',
    toDate: '2025-05-24',
    reason: 'Conference attendance',
    status: 'Pending',
    appliedOn: '2025-05-04'
  },
  {
    id: 4,
    teacherName: 'Ms. Garcia',
    subject: 'History',
    department: 'Humanities',
    fromDate: '2025-05-18',
    toDate: '2025-05-19',
    reason: 'Personal leave',
    status: 'Rejected',
    appliedOn: '2025-05-03'
  }
];

// Sample chart data
const attendanceChartData = [
  { department: 'Science', present: 88, absent: 12 },
  { department: 'Language', present: 92, absent: 8 },
  { department: 'Humanities', present: 84, absent: 16 },
  { department: 'Arts', present: 78, absent: 22 },
  { department: 'Physical Ed', present: 90, absent: 10 },
];

const TeacherAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [leaveApplications, setLeaveApplications] = useState(mockLeaveApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewApplicationDialog, setViewApplicationDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [viewTeacherDialog, setViewTeacherDialog] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTeachers = mockTeacherAttendance.filter(teacher => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());

    if (departmentFilter === 'all') return matchesSearch;
    return matchesSearch && teacher.department.toLowerCase() === departmentFilter.toLowerCase();
  });

  const filteredApplications = leaveApplications.filter(application =>
    application.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLeaveStatusChange = (applicationId, newStatus) => {
    const updatedApplications = leaveApplications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setLeaveApplications(updatedApplications);

    toast.success(`Leave application ${newStatus.toLowerCase()} successfully`);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get sample attendance data for a specific teacher
  const getTeacherAttendanceData = () => {
    return [
      { date: '2025-05-01', status: 'Present' },
      { date: '2025-05-02', status: 'Present' },
      { date: '2025-05-03', status: 'Weekend' },
      { date: '2025-05-04', status: 'Weekend' },
      { date: '2025-05-05', status: 'Present' },
      { date: '2025-05-06', status: 'Present' },
      { date: '2025-05-07', status: 'Present' },
      { date: '2025-05-08', status: 'Leave' },
      { date: '2025-05-09', status: 'Present' },
      { date: '2025-05-10', status: 'Weekend' },
    ];
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader className="bg-eduos-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Teacher Attendance</CardTitle>
              <CardDescription>Monitor teacher attendance and leave applications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-1">
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-1 py-1 border-b">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="leave">Leave Applications</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-3 space-y-4">
              <TabsContent value="overview" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="w-full sm:max-w-xs">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Teachers
                      </CardTitle>
                      <Users className="h-4 w-4 text-eduos-primary" />
                    </CardHeader>

                    <CardContent className="p-2 sm:p-2 pt-0 pb-0">
                      <div className="text-2xl font-bold pt-0 pb-0 p-0">42</div>
                      <p className="text-xs text-muted-foreground pt-0 pb-0 p-0">Across all departments</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Present Today
                      </CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                      <div className="text-2xl font-bold">38</div>
                      <p className="text-xs text-muted-foreground">
                        90% attendance rate
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        On Leave
                      </CardTitle>
                      <ClipboardList className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        Approved leaves
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Absent
                      </CardTitle>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-xs text-muted-foreground">
                        Without approval
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Department Attendance Overview</CardTitle>
                    <CardDescription>
                      Monthly attendance percentage by department
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={attendanceChartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="present" name="Present %" fill="#82ca9d" />
                        <Bar dataKey="absent" name="Absent %" fill="#ff8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Recent Leave Applications</CardTitle>
                    <CardDescription>
                      Latest leave applications requiring attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaveApplications
                          .filter(app => app.status === 'Pending')
                          .slice(0, 3)
                          .map((application) => (
                            <TableRow key={application.id}>
                              <TableCell className="font-medium">{application.teacherName}</TableCell>
                              <TableCell>{application.department}</TableCell>
                              <TableCell>{formatDate(application.fromDate)}</TableCell>
                              <TableCell>{formatDate(application.toDate)}</TableCell>
                              <TableCell>
                                <Badge
                                  className={`bg-yellow-100 text-yellow-800`}
                                >
                                  {application.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApplication(application);
                                    setViewApplicationDialog(true);
                                  }}
                                >
                                  Review
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="mt-0">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Input
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-xs"
                  />

                  <Select
                    defaultValue="all"
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="humanities">Humanities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Monthly attendance record of teachers</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Leave</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeachers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">No teachers found</TableCell>
                        </TableRow>
                      ) : (
                        filteredTeachers.map((teacher) => (
                          <TableRow key={teacher.id}>
                            <TableCell className="font-medium">{teacher.name}</TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.department}</TableCell>
                            <TableCell>{teacher.present}</TableCell>
                            <TableCell>{teacher.absent}</TableCell>
                            <TableCell>{teacher.leave}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="font-medium">{teacher.percentage}%</span>
                                <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${teacher.percentage >= 90 ? 'bg-green-500' :
                                        teacher.percentage >= 75 ? 'bg-yellow-500' :
                                          'bg-red-500'
                                      }`}
                                    style={{ width: `${teacher.percentage}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedTeacher(teacher);
                                  setViewTeacherDialog(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="leave" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of leave applications from teachers</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>From Date</TableHead>
                        <TableHead>To Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">No leave applications found</TableCell>
                        </TableRow>
                      ) : (
                        filteredApplications.map((application) => (
                          <TableRow key={application.id}>
                            <TableCell className="font-medium">{application.teacherName}</TableCell>
                            <TableCell>{application.department}</TableCell>
                            <TableCell>{formatDate(application.fromDate)}</TableCell>
                            <TableCell>{formatDate(application.toDate)}</TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate" title={application.reason}>
                                {application.reason}
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(application.appliedOn)}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                    application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                      'bg-yellow-100 text-yellow-800'
                                  }`}
                              >
                                {application.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setViewApplicationDialog(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>

                              {application.status === 'Pending' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-green-600 hover:text-green-700"
                                    onClick={() => handleLeaveStatusChange(application.id, 'Approved')}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => handleLeaveStatusChange(application.id, 'Rejected')}
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
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Leave Application Dialog */}
      <Dialog open={viewApplicationDialog} onOpenChange={setViewApplicationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Leave Application Details</DialogTitle>
            <DialogDescription>
              Review leave application details and take action
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Teacher Name</h4>
                  <p className="font-medium">{selectedApplication.teacherName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                  <p>{selectedApplication.subject}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Department</h4>
                  <p>{selectedApplication.department}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Applied On</h4>
                  <p>{formatDate(selectedApplication.appliedOn)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">From Date</h4>
                  <p>{formatDate(selectedApplication.fromDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">To Date</h4>
                  <p>{formatDate(selectedApplication.toDate)}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge
                    className={`${selectedApplication.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        selectedApplication.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {selectedApplication.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Reason</h4>
                  <p className="border p-3 rounded-md bg-gray-50">
                    {selectedApplication.reason}
                  </p>
                </div>
              </div>

              {selectedApplication.status === 'Pending' && (
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleLeaveStatusChange(selectedApplication.id, 'Rejected');
                      setViewApplicationDialog(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      handleLeaveStatusChange(selectedApplication.id, 'Approved');
                      setViewApplicationDialog(false);
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Teacher Details Dialog */}
      <Dialog open={viewTeacherDialog} onOpenChange={setViewTeacherDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Teacher Attendance Details</DialogTitle>
            <DialogDescription>
              Detailed attendance record for the selected teacher
            </DialogDescription>
          </DialogHeader>

          {selectedTeacher && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold">{selectedTeacher.name}</h3>
                  <p className="text-gray-600">{selectedTeacher.subject} Teacher, {selectedTeacher.department} Department</p>
                </div>

                <div className="mt-2 md:mt-0 flex items-center gap-1">
                  <Badge className="bg-eduos-light text-eduos-primary">Attendance: {selectedTeacher.percentage}%</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Present Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <div className="text-2xl font-bold text-green-600">{selectedTeacher.present}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Absent Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <div className="text-2xl font-bold text-red-500">{selectedTeacher.absent}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Leave Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <div className="text-2xl font-bold text-yellow-500">{selectedTeacher.leave}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-md">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium">Daily Attendance Record - May 2025</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                    {getTeacherAttendanceData().map((record, index) => (
                      <div
                        key={index}
                        className={`p-2 text-center rounded-md text-xs ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                            record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                              record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-600'
                          }`}
                      >
                        <div className="font-bold">{formatDate(record.date).split(' ')[1]}</div>
                        <div>{record.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border rounded-md">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium">Leave History</h3>
                </div>
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>May 8, 2025</TableCell>
                        <TableCell>May 8, 2025</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>Medical appointment</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Approved
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherAttendance;
