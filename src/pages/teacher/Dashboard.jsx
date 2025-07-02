
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  LayoutGrid,
  BarChart2,
  Users,
  Award
} from 'lucide-react';

// Sample data for charts
const subjectPerformanceData = [
  { subject: 'Mathematics', passed: 75, failed: 25 },
  { subject: 'Science', passed: 82, failed: 18 },
  { subject: 'English', passed: 90, failed: 10 },
  { subject: 'History', passed: 65, failed: 35 },
  { subject: 'Geography', passed: 70, failed: 30 },
];

const monthlyPerformanceData = [
  { month: 'Jan', avgScore: 72 },
  { month: 'Feb', avgScore: 75 },
  { month: 'Mar', avgScore: 68 },
  { month: 'Apr', avgScore: 78 },
  { month: 'May', avgScore: 81 },
];

const classAttendanceData = [
  { name: 'Present', value: 85 },
  { name: 'Absent', value: 10 },
  { name: 'Late', value: 5 },
];

const COLORS = ['#38A169', '#E53E3E', '#ECC94B'];

const TeacherDashboard= () => {
  const { user } = useAuth();
  
  const StatCard = ({ title, value, icon, description, color = "bg-eduos-primary", footer }) => (
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-4 pb-0 flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className={`p-2 rounded-md ${color} text-white`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-2xl font-bold">{value}</div>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
      </CardContent>
      {footer && (
        <CardFooter className="px-4 py-2 border-t text-xs text-gray-500">
          {footer}
        </CardFooter>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your teaching statistics</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="text-sm text-gray-500">Current Term:</div>
          <Badge variant="outline" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800">
            First Term 2025-2026
          </Badge>
        </div>
      </div>
      
      {/* Teacher Profile Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-eduos-primary to-eduos-secondary p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name} 
                  className="h-24 w-24 rounded-full object-cover border-4 border-white/30" 
                />
              ) : (
                <div className="h-24 w-24 bg-white/20 flex items-center justify-center text-4xl font-bold">
                  {user?.name.charAt(0)}
                </div>
              )}
              
              <div className="sm:text-left">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-white/80">Senior Mathematics Teacher</p>
                <p className="text-white/70 text-sm mt-1">Senior Secondary School</p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                    <Clock size={14} />
                    <span>5+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                    <BookOpen size={14} />
                    <span>5 Subjects</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                    <Calendar size={14} />
                    <span>32 Classes/Week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="font-medium text-gray-700 mb-3">Your Teaching Performance</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Student Success Rate</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Lesson Completion</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Student Satisfaction</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard 
          title="Total Students" 
          value={248} 
          icon={<Users size={18} />} 
          description="Across all your classes" 
          color="bg-blue-500"
          footer="↑ 12% from last term"
        />
        <StatCard 
          title="Classes Taught" 
          value={32} 
          icon={<BookOpen size={18} />} 
          description="Weekly classes" 
          color="bg-amber-500"
          footer="5 classes today"
        />
        <StatCard 
          title="Assignments" 
          value={12} 
          icon={<CheckCircle size={18} />} 
          description="Pending for review" 
          color="bg-emerald-500"
          footer="Due within 3 days"
        />
        <StatCard 
          title="Upcoming Exams" 
          value={3} 
          icon={<GraduationCap size={18} />} 
          description="In the next 7 days" 
          color="bg-purple-500"
          footer="Next: Mathematics (Class 10A)"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subject Performance Analysis</CardTitle>
            <CardDescription>Student pass/fail rate by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="passed" stackId="a" fill="#38A169" name="Passed" />
                  <Bar dataKey="failed" stackId="a" fill="#E53E3E" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Performance Trend</CardTitle>
            <CardDescription>Average student scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" stroke="#3182CE" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Class Attendance</CardTitle>
            <CardDescription>Average attendance across all classes</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classAttendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {classAttendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Submissions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Submissions</CardTitle>
            <CardDescription>Assignments and exams due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Math Assignment - Class 10A", type: "assignment", date: "May 15, 2025", submissions: "18/35", urgent: true },
                { title: "Physics Quiz - Class 11B", type: "quiz", date: "May 18, 2025", submissions: "0/28", urgent: false },
                { title: "Chemistry Mid-Term - Class 11A", type: "exam", date: "May 20, 2025", submissions: "0/32", urgent: false },
                { title: "Biology Project - Class 9C", type: "assignment", date: "May 22, 2025", submissions: "5/30", urgent: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center border-b pb-3 last:border-0">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-3 ${
                    item.type === 'assignment' ? 'bg-blue-100 text-blue-600' : 
                    item.type === 'quiz' ? 'bg-purple-100 text-purple-600' : 
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {item.type === 'assignment' ? <FileText size={18} /> : 
                     item.type === 'quiz' ? <Award size={18} /> : 
                     <GraduationCap size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      {item.urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>Due: {item.date}</div>
                      <div>Submissions: {item.submissions}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              View All Tasks
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Recent Activities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest actions and notifications</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Today", activity: "Uploaded Math Class 10A exam results", time: "2 hours ago", icon: <BarChart2 size={16} className="text-blue-500" /> },
              { date: "Yesterday", activity: "Created new lesson plan for Science Class 9B", time: "1 day ago", icon: <FileText size={16} className="text-green-500" /> },
              { date: "May 25", activity: "Marked 28 assignments from English Class 8C", time: "2 days ago", icon: <CheckCircle size={16} className="text-amber-500" /> },
              { date: "May 24", activity: "Scheduled a new quiz for History Class 11A", time: "3 days ago", icon: <Award size={16} className="text-purple-500" /> },
              { date: "May 22", activity: "Conducted virtual class for Geography Class 10B", time: "5 days ago", icon: <LayoutGrid size={16} className="text-indigo-500" /> },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="min-w-24 text-sm text-gray-500 text-right">{item.date}</div>
                <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-4 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
