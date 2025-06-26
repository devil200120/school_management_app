
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { 
  Check,
  X,
  Clock,
  Download,
  Search,
  BarChart2,
  Save,
  CheckCircle} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for students
const students = [
  { id: "S001", name: "John Smith" },
  { id: "S002", name: "Maria Garcia" },
  { id: "S003", name: "Ahmed Khan" },
  { id: "S004", name: "Lisa Chen" },
  { id: "S005", name: "David Wilson" },
  { id: "S006", name: "Priya Patel" },
  { id: "S007", name: "Michael Brown" },
  { id: "S008", name: "Sarah Johnson" },
  { id: "S009", name: "James Lee" },
  { id: "S010", name: "Emma Davis" },
  { id: "S011", name: "Mohammed Ali" },
  { id: "S012", name: "Sofia Rodriguez" },
  { id: "S013", name: "William Taylor" },
  { id: "S014", name: "Olivia Martin" },
  { id: "S015", name: "Daniel Kim" }
];

// Sample attendance records
const initialAttendanceRecords = [
  {
    id: "A001",
    studentId: "S001",
    studentName: "John Smith",
    date: "2025-05-01",
    status: "present",
    class: "Class 9",
    section: "A",
    subject: "Mathematics"
  },
  {
    id: "A002",
    studentId: "S002",
    studentName: "Maria Garcia",
    date: "2025-05-01",
    status: "present",
    class: "Class 9",
    section: "A",
    subject: "Mathematics"
  },
  {
    id: "A003",
    studentId: "S003",
    studentName: "Ahmed Khan",
    date: "2025-05-01",
    status: "absent",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
    remarks: "Informed absence due to medical reasons"
  },
  {
    id: "A004",
    studentId: "S004",
    studentName: "Lisa Chen",
    date: "2025-05-01",
    status: "present",
    class: "Class 9",
    section: "A",
    subject: "Mathematics"
  },
  {
    id: "A005",
    studentId: "S005",
    studentName: "David Wilson",
    date: "2025-05-01",
    status: "late",
    class: "Class 9",
    section: "A",
    subject: "Mathematics",
    remarks: "Late by 10 minutes"
  }
];

const TeacherStudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 9');
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Attendance states
  const [attendanceRecords, setAttendanceRecords] = useState<Object>(initialAttendanceRecords);
  const [studentAttendance, setStudentAttendance] = useState<Object>({});
  const [remarks, setRemarks] = useState<Object>({});
  
  // Stats for the attendance
  const stats = {
    total: students.length,
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    notMarked: students.length - attendanceRecords.length,
  };
  
  // Charts data
  const pieData = [
    { name: 'Present', value: stats.present, color: '#10b981' },
    { name: 'Absent', value: stats.absent, color: '#ef4444' },
    { name: 'Late', value: stats.late, color: '#f59e0b' },
  ];
  
  const weeklyData = [
    { day: 'Mon', present: 13, absent: 2, late: 0 },
    { day: 'Tue', present: 14, absent: 1, late: 0 },
    { day: 'Wed', present: 12, absent: 2, late: 1 },
    { day: 'Thu', present: 14, absent: 0, late: 1 },
    { day: 'Fri', present: stats.present, absent: stats.absent, late: stats.late },
  ];
  
  // Handle attendance marking
  const handleAttendanceChange = (studentId, status) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  // Handle remarks change
  const handleRemarksChange = (studentId, remark) => {
    setRemarks(prev => ({
      ...prev,
      [studentId]: remark
    }));
  };
  
  // Save attendance
  const handleSaveAttendance = () => {
    // Here you would typically send the attendance data to your API
    console.log({
      date: selectedDate,
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      attendance: studentAttendance,
      remarks
    });
    
    toast.success("Attendance saved successfully");
    
    // Update local attendance records
    const newRecords = students.map(student => ({
      id: `A${Date.now()}-${student.id}`,
      studentId: student.id,
      studentName: student.name,
      date: selectedDate,
      status: studentAttendance[student.id] || "present",
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      remarks: remarks[student.id]
    }));
    
    setAttendanceRecords(newRecords);
  };
  
  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Attendance</h1>
          <p className="text-muted-foreground">Manage attendance for your classes</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button variant="outline" className="gap-2">
            <BarChart2 size={16} />
            Analytics
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.present}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{stats.absent}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">{stats.late}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Today's attendance summary</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span>Late</span>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Weekly Trend Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
            <CardDescription>This week's attendance patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={weeklyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" />
                <Bar dataKey="absent" fill="#ef4444" />
                <Bar dataKey="late" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select class, section, and date to mark attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 7">Class 7</SelectItem>
                  <SelectItem value="Class 8">Class 8</SelectItem>
                  <SelectItem value="Class 9">Class 9</SelectItem>
                  <SelectItem value="Class 10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Section</label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search by name or ID"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button className="gap-2" onClick={() => {
                const allPresent = {};
                students.forEach(s => {
                  allPresent[s.id] = "present";
                });
                setStudentAttendance(allPresent);
              }}>
                <CheckCircle size={16} />
                Mark All Present
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[200px]">Mark Attendance</TableHead>
                  <TableHead>Remarks (Optional)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={studentAttendance[student.id] === "present" ? "default" : "outline"}
                          className={`gap-1 ${studentAttendance[student.id] === "present" ? "bg-green-500 hover:bg-green-600" : ""}`}
                          onClick={() => handleAttendanceChange(student.id, "present")}
                        >
                          <Check size={14} />
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={studentAttendance[student.id] === "absent" ? "default" : "outline"}
                          className={`gap-1 ${studentAttendance[student.id] === "absent" ? "bg-red-500 hover:bg-red-600" : ""}`}
                          onClick={() => handleAttendanceChange(student.id, "absent")}
                        >
                          <X size={14} />
                          Absent
                        </Button>
                        <Button
                          size="sm"
                          variant={studentAttendance[student.id] === "late" ? "default" : "outline"}
                          className={`gap-1 ${studentAttendance[student.id] === "late" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                          onClick={() => handleAttendanceChange(student.id, "late")}
                        >
                          <Clock size={14} />
                          Late
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={remarks[student.id] || ''}
                        onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                        placeholder="Add remarks here (optional)"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button className="gap-2" onClick={handleSaveAttendance}>
              <Save size={16} />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStudentAttendance;
