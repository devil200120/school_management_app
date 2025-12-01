
import { useState, useEffect } from 'react';
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
  Legend,
  LineChart,
  Line
} from 'recharts';

// Sample student attendance data
const mockStudentAttendance = [
  { id: 1, name: 'Emma Johnson', class: 'SSS 3A', present: 52, absent: 3, leave: 5, percentage: 87 },
  { id: 2, name: 'James Smith', class: 'SSS 3A', present: 57, absent: 2, leave: 1, percentage: 95 },
  { id: 3, name: 'Sophia Williams', class: 'SSS 3B', present: 54, absent: 6, leave: 0, percentage: 90 },
  { id: 4, name: 'Liam Brown', class: 'SSS 3B', present: 51, absent: 5, leave: 4, percentage: 85 },
  { id: 5, name: 'Olivia Garcia', class: 'SSS 3C', present: 58, absent: 1, leave: 1, percentage: 97 },
  { id: 6, name: 'Noah Davis', class: 'SSS 3C', present: 53, absent: 4, leave: 3, percentage: 88 },
  { id: 7, name: 'Isabella Wilson', class: 'JSS 3A', present: 55, absent: 2, leave: 3, percentage: 92 },
];

// Sample leave applications
const mockLeaveApplications = [
  { 
    id: 1, 
    studentName: 'Emma Johnson', 
    class: 'SSS 3A',
    regNumber: 'SSS/2022/001',
    fromDate: '2025-05-10',
    toDate: '2025-05-12',
    reason: 'Family emergency',
    status: 'Pending',
    appliedOn: '2025-05-05'
  },
  { 
    id: 2, 
    studentName: 'Liam Brown', 
    class: 'SSS 3B',
    regNumber: 'SSS/2022/042',
    fromDate: '2025-05-15',
    toDate: '2025-05-15',
    reason: 'Medical appointment',
    status: 'Approved',
    appliedOn: '2025-05-01'
  },
  { 
    id: 3, 
    studentName: 'Noah Davis', 
    class: 'SSS 3C',
    regNumber: 'SSS/2022/078',
    fromDate: '2025-05-20',
    toDate: '2025-05-24',
    reason: 'Medical treatment',
    status: 'Pending',
    appliedOn: '2025-05-04'
  },
  { 
    id: 4, 
    studentName: 'Sophia Williams', 
    class: 'SSS 3B',
    regNumber: 'SSS/2022/023',
    fromDate: '2025-05-18',
    toDate: '2025-05-19',
    reason: 'Family function',
    status: 'Rejected',
    appliedOn: '2025-05-03'
  }
];

// Sample chart data
const attendanceChartData = [
  { class: 'SSS 3A', present: 92, absent: 8 },
  { class: 'SSS 3B', present: 88, absent: 12 },
  { class: 'SSS 3C', present: 94, absent: 6 },
  { class: 'JSS 3A', present: 86, absent: 14 },
  { class: 'JSS 3B', present: 90, absent: 10 },
];

const weeklyAttendanceData = [
  { week: 'Week 1', attendance: 96 },
  { week: 'Week 2', attendance: 92 },
  { week: 'Week 3', attendance: 88 },
  { week: 'Week 4', attendance: 94 },
  { week: 'Week 5', attendance: 91 },
  { week: 'Week 6', attendance: 89 },
  { week: 'Week 7', attendance: 93 },
  { week: 'Week 8', attendance: 95 },
];

const StudentAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [leaveApplications, setLeaveApplications] = useState(mockLeaveApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewApplicationDialog, setViewApplicationDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewStudentDialog, setViewStudentDialog] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);

  // Auto-fetch classes from students data
  useEffect(() => {
    const classes = [...new Set(mockStudentAttendance.map(student => student.class))];
    setAvailableClasses(classes);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = mockStudentAttendance.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (classFilter === 'all') return matchesSearch;
    return matchesSearch && student.class.toLowerCase() === classFilter.toLowerCase();
  });

  const filteredApplications = leaveApplications.filter(application => 
    application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.class.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Get sample attendance data for a specific student
  const getStudentAttendanceData = () => {
    return [
      { date: '2025-05-01', status: 'Present' },
      { date: '2025-05-02', status: 'Present' },
      { date: '2025-05-03', status: 'Weekend' },
      { date: '2025-05-04', status: 'Weekend' },
      { date: '2025-05-05', status: 'Present' },
      { date: '2025-05-06', status: 'Absent' },
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
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>Monitor student attendance and leave applications</CardDescription>
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

            <div className="p-4 space-y-4">
              <TabsContent value="overview" className="mt-0 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Students
                      </CardTitle>
                      <Users className="h-4 w-4 text-eduos-primary" />
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                      <div className="text-2xl font-bold">750</div>
                      <p className="text-xs text-muted-foreground">
                        Across all classes
                      </p>
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
                      <div className="text-2xl font-bold">702</div>
                      <p className="text-xs text-muted-foreground">
                        93.6% attendance rate
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
                      <div className="text-2xl font-bold">23</div>
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
                      <div className="text-2xl font-bold">25</div>
                      <p className="text-xs text-muted-foreground">
                        Without approval
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Class Attendance Overview</CardTitle>
                      <CardDescription>
                        Monthly attendance percentage by class
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
                          <XAxis dataKey="class" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="present" name="Present %" fill="#82ca9d" />
                          <Bar dataKey="absent" name="Absent %" fill="#ff8042" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Attendance Trend</CardTitle>
                      <CardDescription>
                        School-wide attendance percentage over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={weeklyAttendanceData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis domain={[80, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="attendance"
                            name="Attendance %"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
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
                          <TableHead>Student</TableHead>
                          <TableHead>Class</TableHead>
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
                              <TableCell className="font-medium">{application.studentName}</TableCell>
                              <TableCell>{application.class}</TableCell>
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
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">Quick Attendance Selection</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-blue-700 mb-1">Select Class</label>
                      <Select 
                        defaultValue="all" 
                        onValueChange={setClassFilter}
                      >
                        <SelectTrigger className="w-full bg-white border-blue-300">
                          <SelectValue placeholder="Choose a class to take attendance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">📚 All Classes</SelectItem>
                          {availableClasses.map((className) => (
                            <SelectItem key={className} value={className.toLowerCase()}>
                              👥 {className}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-blue-700 mb-1">Search Students</label>
                      <Input 
                        placeholder="Type student name to search..." 
                        value={searchTerm}
                        onChange={handleSearch}
                        className="bg-white border-blue-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Quick attendance marking for today - {new Date().toLocaleDateString()}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Attendance %</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Mark Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">No students found</TableCell>
                        </TableRow>
                      ) : (
                        filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="font-medium">{student.percentage}%</span>
                                <div className="ml-2 h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      student.percentage >= 90 ? 'bg-green-500' : 
                                      student.percentage >= 75 ? 'bg-yellow-500' : 
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${student.percentage}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${
                                student.percentage >= 90 ? 'bg-green-100 text-green-800' : 
                                student.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {student.percentage >= 90 ? 'Excellent' : student.percentage >= 75 ? 'Good' : 'Poor'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                >
                                  Present
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                                >
                                  Absent
                                </Button>
                              </div>
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
                    <TableCaption>List of leave applications from students</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
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
                            <TableCell className="font-medium">{application.studentName}</TableCell>
                            <TableCell>{application.class}</TableCell>
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
                                className={`${
                                  application.status === 'Approved' ? 'bg-green-100 text-green-800' :
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
                  <h4 className="text-sm font-medium text-gray-500">Student Name</h4>
                  <p className="font-medium">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Class</h4>
                  <p>{selectedApplication.class}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Reg Number</h4>
                  <p>{selectedApplication.regNumber}</p>
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
                    className={`${
                      selectedApplication.status === 'Approved' ? 'bg-green-100 text-green-800' :
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

      {/* Student Details Dialog */}
      <Dialog open={viewStudentDialog} onOpenChange={setViewStudentDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Student Attendance Details</DialogTitle>
            <DialogDescription>
              Detailed attendance record for the selected student
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.class}</p>
                </div>
                
                <div className="mt-2 md:mt-0 flex items-center gap-1">
                  <Badge className="bg-eduos-light text-eduos-primary">
                    Attendance: {selectedStudent.percentage}%
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Present Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <div className="text-2xl font-bold text-green-600">{selectedStudent.present}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Absent Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <div className="text-2xl font-bold text-red-500">{selectedStudent.absent}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Leave Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 pt-0 pb-0">
                    <div className="text-2xl font-bold text-yellow-500">{selectedStudent.leave}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-md">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium">Recent Attendance Pattern</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                    {getStudentAttendanceData().map((record, index) => (
                      <div 
                        key={index}
                        className={`p-2 text-center rounded-md text-xs ${
                          record.status === 'Present' ? 'bg-green-100 text-green-800' :
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

              <div className="border rounded-md">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium">Monthly Attendance Trend</h3>
                </div>
                <div className="p-4 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: 'Jan', percentage: 92 },
                        { month: 'Feb', percentage: 95 },
                        { month: 'Mar', percentage: 89 },
                        { month: 'Apr', percentage: 87 },
                        { month: 'May', percentage: 91 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="percentage" name="Attendance %" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentAttendance;
