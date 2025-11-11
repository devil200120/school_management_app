import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Download,
  AlertCircle,
  BarChart3,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
} from "lucide-react";
import { toast } from "sonner";

const AttendanceReport = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState("11"); // November
  const [selectedYear, setSelectedYear] = useState("2024");

  // Mock data for children's attendance
  const children = [
    {
      id: "1",
      name: "Sarah Johnson",
      class: "JSS 2A",
      admissionNo: "EDU2023001",
      profileImg: "/profile_photo.png",
      totalDays: 92,
      presentDays: 88,
      absentDays: 4,
      attendancePercentage: 95.7,
      // Historical attendance trends
      attendanceTrend: [
        { month: 'Sep', attendance: 93, days: 20 },
        { month: 'Oct', attendance: 96, days: 22 },
        { month: 'Nov', attendance: 95, days: 20 },
        { month: 'Dec', attendance: 98, days: 18 },
        { month: 'Jan', attendance: 97, days: 21 },
      ],
      // Weekly pattern data
      weeklyPattern: [
        { day: 'Monday', present: 18, absent: 2, percentage: 90 },
        { day: 'Tuesday', present: 19, absent: 1, percentage: 95 },
        { day: 'Wednesday', present: 20, absent: 0, percentage: 100 },
        { day: 'Thursday', present: 19, absent: 1, percentage: 95 },
        { day: 'Friday', present: 17, absent: 3, percentage: 85 },
      ],
      // Time distribution
      timeDistribution: [
        { name: 'On Time', value: 85, color: '#10B981' },
        { name: 'Late (< 15 min)', value: 10, color: '#F59E0B' },
        { name: 'Late (> 15 min)', value: 3, color: '#EF4444' },
        { name: 'Absent', value: 2, color: '#6B7280' },
      ],
      monthlyData: {
        "2024-11": {
          totalDays: 20,
          presentDays: 19,
          absentDays: 1,
          lateDays: 2,
          percentage: 95,
          attendanceRecord: [
            {
              date: "2024-11-01",
              status: "present",
              timeIn: "07:45",
              timeOut: "14:30",
            },
            {
              date: "2024-11-02",
              status: "present",
              timeIn: "07:50",
              timeOut: "14:30",
            },
            { date: "2024-11-03", status: "absent", reason: "Sick" },
            {
              date: "2024-11-04",
              status: "present",
              timeIn: "07:40",
              timeOut: "14:30",
            },
            {
              date: "2024-11-05",
              status: "present",
              timeIn: "08:10",
              timeOut: "14:30",
              isLate: true,
            },
            {
              date: "2024-11-06",
              status: "present",
              timeIn: "07:45",
              timeOut: "14:30",
            },
            {
              date: "2024-11-07",
              status: "present",
              timeIn: "07:55",
              timeOut: "14:30",
            },
            {
              date: "2024-11-08",
              status: "present",
              timeIn: "08:15",
              timeOut: "14:30",
              isLate: true,
            },
            {
              date: "2024-11-11",
              status: "present",
              timeIn: "07:35",
              timeOut: "14:30",
            },
            {
              date: "2024-11-12",
              status: "present",
              timeIn: "07:45",
              timeOut: "14:30",
            },
          ],
        },
      },
      recentAbsences: [
        { date: "2024-11-03", reason: "Sick", status: "excused" },
        { date: "2024-10-28", reason: "Family Emergency", status: "excused" },
        {
          date: "2024-10-15",
          reason: "Medical Appointment",
          status: "excused",
        },
      ],
    },
    {
      id: "2",
      name: "Michael Johnson",
      class: "Primary 5B",
      admissionNo: "EDU2023002",
      profileImg: "/profile_photo.png",
      totalDays: 92,
      presentDays: 85,
      absentDays: 7,
      attendancePercentage: 92.4,
      // Historical attendance trends
      attendanceTrend: [
        { month: 'Sep', attendance: 88, days: 20 },
        { month: 'Oct', attendance: 91, days: 22 },
        { month: 'Nov', attendance: 90, days: 20 },
        { month: 'Dec', attendance: 95, days: 18 },
        { month: 'Jan', attendance: 94, days: 21 },
      ],
      // Weekly pattern data
      weeklyPattern: [
        { day: 'Monday', present: 16, absent: 4, percentage: 80 },
        { day: 'Tuesday', present: 18, absent: 2, percentage: 90 },
        { day: 'Wednesday', present: 19, absent: 1, percentage: 95 },
        { day: 'Thursday', present: 17, absent: 3, percentage: 85 },
        { day: 'Friday', present: 15, absent: 5, percentage: 75 },
      ],
      // Time distribution
      timeDistribution: [
        { name: 'On Time', value: 75, color: '#10B981' },
        { name: 'Late (< 15 min)', value: 15, color: '#F59E0B' },
        { name: 'Late (> 15 min)', value: 5, color: '#EF4444' },
        { name: 'Absent', value: 5, color: '#6B7280' },
      ],
      monthlyData: {
        "2024-11": {
          totalDays: 20,
          presentDays: 18,
          absentDays: 2,
          lateDays: 3,
          percentage: 90,
          attendanceRecord: [
            {
              date: "2024-11-01",
              status: "present",
              timeIn: "07:50",
              timeOut: "14:00",
            },
            { date: "2024-11-02", status: "absent", reason: "Sick" },
            {
              date: "2024-11-03",
              status: "present",
              timeIn: "08:20",
              timeOut: "14:00",
              isLate: true,
            },
            {
              date: "2024-11-04",
              status: "present",
              timeIn: "07:45",
              timeOut: "14:00",
            },
            {
              date: "2024-11-05",
              status: "present",
              timeIn: "07:55",
              timeOut: "14:00",
            },
            {
              date: "2024-11-06",
              status: "absent",
              reason: "Dentist Appointment",
            },
            {
              date: "2024-11-07",
              status: "present",
              timeIn: "08:15",
              timeOut: "14:00",
              isLate: true,
            },
            {
              date: "2024-11-08",
              status: "present",
              timeIn: "08:05",
              timeOut: "14:00",
              isLate: true,
            },
            {
              date: "2024-11-11",
              status: "present",
              timeIn: "07:40",
              timeOut: "14:00",
            },
            {
              date: "2024-11-12",
              status: "present",
              timeIn: "07:50",
              timeOut: "14:00",
            },
          ],
        },
      },
      recentAbsences: [
        {
          date: "2024-11-06",
          reason: "Dentist Appointment",
          status: "excused",
        },
        { date: "2024-11-02", reason: "Sick", status: "excused" },
        { date: "2024-10-20", reason: "Family Event", status: "excused" },
      ],
    },
  ];

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = ["2024", "2023"];

  const getSelectedChildData = () =>
    children.find((child) => child.id === selectedChild);

  // Handle attendance report download
  const handleDownloadReport = async () => {
    try {
      toast.success("Generating attendance report...");
      
      const selectedChildData = getSelectedChildData();
      const monthName = months.find(m => m.value === selectedMonth)?.label || 'Unknown';
      
      // Calculate attendance statistics
      const attendanceStats = selectedChildData?.attendance.filter(
        record => 
          new Date(record.date).getMonth() + 1 === parseInt(selectedMonth) &&
          new Date(record.date).getFullYear() === parseInt(selectedYear)
      ) || [];
      
      const totalDays = attendanceStats.length;
      const presentDays = attendanceStats.filter(record => record.status === 'present').length;
      const absentDays = attendanceStats.filter(record => record.status === 'absent').length;
      const lateDays = attendanceStats.filter(record => record.status === 'late').length;
      const attendancePercentage = totalDays > 0 ? ((presentDays + lateDays) / totalDays * 100).toFixed(1) : 0;
      
      // Generate report content
      const reportContent = `ATTENDANCE REPORT
=====================================

Student Information:
- Name: ${selectedChildData?.name || 'N/A'}
- Class: ${selectedChildData?.class || 'N/A'}
- Report Period: ${monthName} ${selectedYear}

Attendance Summary:
- Total School Days: ${totalDays}
- Days Present: ${presentDays}
- Days Absent: ${absentDays}
- Days Late: ${lateDays}
- Attendance Percentage: ${attendancePercentage}%

Detailed Attendance Record:
=====================================
${attendanceStats.map(record => {
  const date = new Date(record.date).toLocaleDateString();
  const status = record.status.toUpperCase();
  const time = record.timeIn || 'N/A';
  return `${date} - ${status} ${record.status === 'present' || record.status === 'late' ? `(Time In: ${time})` : ''}`;
}).join('\n')}

Performance Analysis:
=====================================
${attendancePercentage >= 95 ? '✅ EXCELLENT - Outstanding attendance record!' :
  attendancePercentage >= 85 ? '✅ GOOD - Good attendance, keep it up!' :
  attendancePercentage >= 75 ? '⚠️ FAIR - Attendance needs improvement' :
  '❌ POOR - Urgent attention required for attendance'}

Recommendations:
${attendancePercentage < 85 ? '- Please ensure regular school attendance\n- Contact school if there are ongoing issues\n- Monitor child\'s health and sleeping patterns' :
  '- Keep maintaining excellent attendance\n- Continue current routine'}

Report Generated: ${new Date().toLocaleString()}
Generated by: School Management System - Parent Portal`;

      // Create and download the file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedChildData?.name?.replace(/\s+/g, '_')}_Attendance_${monthName}_${selectedYear}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Attendance report downloaded successfully!");
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download report. Please try again.");
    }
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 95)
      return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (percentage >= 90)
      return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (percentage >= 80)
      return { label: "Average", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Poor", color: "bg-red-100 text-red-800" };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "late":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const selectedChildData = getSelectedChildData();
  const monthlyData =
    selectedChildData?.monthlyData?.[
      `${selectedYear}-${selectedMonth.padStart(2, "0")}`
    ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Report
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your child&apos;s school attendance and punctuality
          </p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleDownloadReport}
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Child</label>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {child.name} - {child.class}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Month</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Choose month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Choose year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedChildData && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Attendance
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedChildData.attendancePercentage}%
                </div>
                <Badge
                  className={
                    getAttendanceStatus(selectedChildData.attendancePercentage)
                      .color
                  }
                >
                  {
                    getAttendanceStatus(selectedChildData.attendancePercentage)
                      .label
                  }
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Present Days
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {selectedChildData.presentDays}
                </div>
                <p className="text-xs text-muted-foreground">
                  out of {selectedChildData.totalDays} total days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Absent Days
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {selectedChildData.absentDays}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (selectedChildData.absentDays /
                      selectedChildData.totalDays) *
                    100
                  ).toFixed(1)}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Month
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monthlyData?.percentage || 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {monthlyData?.presentDays || 0}/{monthlyData?.totalDays || 0}{" "}
                  days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Student Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <img
                  src={selectedChildData.profileImg}
                  alt={selectedChildData.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedChildData.name}
                  </h3>
                  <p className="text-gray-600">
                    Class: {selectedChildData.class}
                  </p>
                  <p className="text-gray-600">
                    Admission No: {selectedChildData.admissionNo}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedChildData.attendancePercentage}%
                  </div>
                  <p className="text-sm text-gray-600">Overall Attendance</p>
                  <Badge
                    className={
                      getAttendanceStatus(
                        selectedChildData.attendancePercentage
                      ).color
                    }
                  >
                    {
                      getAttendanceStatus(
                        selectedChildData.attendancePercentage
                      ).label
                    }
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Attendance Trend (Last 5 Months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={selectedChildData.attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Attendance']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stroke="#10B981"
                      fill="url(#colorAttendance)"
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Attendance Pattern */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Weekly Attendance Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedChildData.weeklyPattern}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'present' ? `${value} days present` : 
                        name === 'absent' ? `${value} days absent` : `${value}%`,
                        name === 'present' ? 'Present' : 
                        name === 'absent' ? 'Absent' : 'Attendance %'
                      ]}
                    />
                    <Bar dataKey="present" fill="#10B981" name="present" />
                    <Bar dataKey="absent" fill="#EF4444" name="absent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Punctuality Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Punctuality Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={selectedChildData.timeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {selectedChildData.timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Attendance Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Daily Attendance Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedChildData.weeklyPattern}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} />
                    <Line 
                      type="monotone" 
                      dataKey="percentage" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#1D4ED8' }}
                    />
                    {/* Goal line at 95% */}
                    <Line 
                      type="monotone" 
                      dataKey={() => 95} 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-medium">Goal: 95% attendance (shown as dashed line)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Attendance Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Performance Analysis */}
                <div className={`p-4 rounded-lg border ${
                  selectedChildData.attendancePercentage >= 95 
                    ? 'bg-green-50 border-green-200' 
                    : selectedChildData.attendancePercentage >= 90 
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {selectedChildData.attendancePercentage >= 95 ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                    <h4 className={`font-semibold ${
                      selectedChildData.attendancePercentage >= 95 
                        ? 'text-green-800' 
                        : selectedChildData.attendancePercentage >= 90 
                          ? 'text-yellow-800'
                          : 'text-red-800'
                    }`}>
                      Performance Status
                    </h4>
                  </div>
                  <p className={`text-sm ${
                    selectedChildData.attendancePercentage >= 95 
                      ? 'text-green-700' 
                      : selectedChildData.attendancePercentage >= 90 
                        ? 'text-yellow-700'
                        : 'text-red-700'
                  }`}>
                    {selectedChildData.attendancePercentage >= 95 
                      ? "Excellent attendance! Keep up the great work."
                      : selectedChildData.attendancePercentage >= 90 
                        ? "Good attendance, but there's room for improvement."
                        : "Attendance needs attention. Consider discussing with teachers."}
                  </p>
                </div>

                {/* Weekly Patterns */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Weekly Pattern</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-blue-700">
                    {selectedChildData.weeklyPattern
                      .sort((a, b) => a.percentage - b.percentage)
                      .slice(0, 2)
                      .map((day, index) => (
                        <li key={index}>
                          • {day.day}s need attention ({day.percentage}%)
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Recommendations</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-purple-700">
                    <li>• Set consistent morning routines</li>
                    <li>• Prepare school items the night before</li>
                    <li>• Monitor health and sleep patterns</li>
                    <li>• Communicate regularly with teachers</li>
                  </ul>
                </div>
              </div>

              {/* Monthly Comparison */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Monthly Attendance Comparison</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {selectedChildData.attendanceTrend.map((month, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-800">{month.attendance}%</div>
                      <div className="text-sm text-gray-600">{month.month}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${month.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Attendance Details */}
          {monthlyData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Monthly Attendance -{" "}
                  {months.find((m) => m.value === selectedMonth)?.label}{" "}
                  {selectedYear}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {monthlyData.presentDays}
                    </div>
                    <div className="text-sm text-gray-600">Present Days</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {monthlyData.absentDays}
                    </div>
                    <div className="text-sm text-gray-600">Absent Days</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {monthlyData.lateDays}
                    </div>
                    <div className="text-sm text-gray-600">Late Arrivals</div>
                  </div>
                </div>

                {/* Daily Attendance Record */}
                <div className="space-y-2">
                  <h4 className="font-semibold mb-3">
                    Daily Attendance Record
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                    {monthlyData.attendanceRecord.map((record, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          record.status === "present"
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(record.status)}
                          <div>
                            <div className="font-medium">
                              {new Date(record.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            {record.reason && (
                              <div className="text-sm text-gray-600">
                                Reason: {record.reason}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          {record.status === "present" && (
                            <div className="text-sm">
                              <div>In: {record.timeIn}</div>
                              <div>Out: {record.timeOut}</div>
                              {record.isLate && (
                                <Badge
                                  variant="outline"
                                  className="text-orange-600"
                                >
                                  Late
                                </Badge>
                              )}
                            </div>
                          )}
                          <Badge
                            className={
                              record.status === "present"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Absences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Recent Absences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedChildData.recentAbsences.map((absence, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <div>
                        <div className="font-medium">
                          {new Date(absence.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {absence.reason}
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={
                        absence.status === "excused"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {absence.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AttendanceReport;
