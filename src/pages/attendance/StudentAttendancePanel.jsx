import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Calendar as CalendarIcon,
  BarChart3,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  CreditCard,
  QrCode,
  Camera,
  UserCheck,
  Filter,
} from "lucide-react";

const StudentAttendancePanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recordsFilter, setRecordsFilter] = useState("all"); // all, present, absent

  // Mock student data
  const studentInfo = {
    id: "STD001",
    name: "John Doe",
    class: "10A",
    rollNo: "001",
    nfcId: "NFC123456",
    qrCode: "QR001",
    faceRegistered: true,
  };

  // Mock attendance data
  const attendanceStats = {
    totalDays: 30,
    presentDays: 25,
    absentDays: 5,
    lateArrivals: 3,
    percentage: 83.3,
  };

  const monthlyAttendance = [
    { date: "2024-01-01", status: "present", time: "08:45 AM", method: "NFC" },
    { date: "2024-01-02", status: "present", time: "08:50 AM", method: "QR" },
    { date: "2024-01-03", status: "absent", time: null, method: null },
    { date: "2024-01-04", status: "present", time: "08:40 AM", method: "Face" },
    {
      date: "2024-01-05",
      status: "present",
      time: "09:15 AM",
      method: "Normal",
    },
    { date: "2024-01-06", status: "present", time: "08:35 AM", method: "NFC" },
    { date: "2024-01-07", status: "present", time: "08:55 AM", method: "QR" },
    { date: "2024-01-08", status: "absent", time: null, method: null },
  ];

  const subjectAttendance = [
    { subject: "Mathematics", total: 30, present: 27, percentage: 90 },
    { subject: "Physics", total: 25, present: 20, percentage: 80 },
    { subject: "Chemistry", total: 28, present: 24, percentage: 85.7 },
    { subject: "Biology", total: 22, present: 19, percentage: 86.4 },
    { subject: "English", total: 20, present: 18, percentage: 90 },
  ];

  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return "text-green-600 bg-green-50";
    if (percentage >= 75) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "NFC":
        return <CreditCard className="h-4 w-4" />;
      case "QR":
        return <QrCode className="h-4 w-4" />;
      case "Face":
        return <Camera className="h-4 w-4" />;
      case "Normal":
        return <UserCheck className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Compact */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            My Attendance
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span className="font-medium">{studentInfo.name}</span>
            <span className="hidden sm:inline">•</span>
            <span>ID: {studentInfo.id}</span>
            <span className="hidden sm:inline">•</span>
            <span>Class: {studentInfo.class}</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-white shadow-sm">
            <TabsTrigger
              value="overview"
              className="flex items-center justify-center space-x-2 py-2 px-3 text-xs md:text-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="records"
              className="flex items-center justify-center space-x-2 py-2 px-3 text-xs md:text-sm"
            >
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Records</span>
            </TabsTrigger>
            <TabsTrigger
              value="subjects"
              className="flex items-center justify-center space-x-2 py-2 px-3 text-xs md:text-sm"
            >
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Subjects</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center justify-center space-x-2 py-2 px-3 text-xs md:text-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards - More Compact */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-900">{attendanceStats.totalDays}</div>
                    <div className="text-xs font-medium text-blue-700">Total Days</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500 text-white">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-900">{attendanceStats.presentDays}</div>
                    <div className="text-xs font-medium text-green-700">Present</div>
                    <div className="text-xs text-green-600">{attendanceStats.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-red-500 text-white">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-900">{attendanceStats.absentDays}</div>
                    <div className="text-xs font-medium text-red-700">Absent</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-yellow-500 text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-900">{attendanceStats.lateArrivals}</div>
                    <div className="text-xs font-medium text-yellow-700">Late</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attendance Progress - Compact */}
            <Card className="p-4 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Progress</h3>
                <Badge
                  className={`w-fit ${getAttendanceColor(attendanceStats.percentage)} text-sm font-semibold`}
                >
                  {attendanceStats.percentage.toFixed(1)}%
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Attendance</span>
                    <span className="font-medium">
                      {attendanceStats.presentDays}/{attendanceStats.totalDays} days
                    </span>
                  </div>
                  <Progress value={attendanceStats.percentage} className="h-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      {attendanceStats.percentage >= 75 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">Status</span>
                    </div>
                    <Badge
                      variant={attendanceStats.percentage >= 75 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {attendanceStats.percentage >= 85
                        ? "Excellent"
                        : attendanceStats.percentage >= 75
                        ? "Good"
                        : "Poor"}
                    </Badge>
                  </div>

                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600 mb-1">To 85% Target</div>
                    <div className="text-lg font-bold text-blue-600">
                      {attendanceStats.percentage >= 85
                        ? "✓ Achieved!"
                        : `${Math.max(0, Math.ceil(25.5 - attendanceStats.presentDays))} days`}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Attendance - Compact */}
            <Card className="p-4 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {monthlyAttendance.slice(0, 4).map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          record.status === "present" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <div className="text-sm font-medium">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {record.status === "present" ? record.time : "Absent"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        size="sm"
                        variant={record.status === "present" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {record.status === "present" ? "Present" : "Absent"}
                      </Badge>
                      {record.method && (
                        <div className="flex items-center space-x-1">
                          {getMethodIcon(record.method)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Daily Records Tab */}
          <TabsContent value="records" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Calendar Section - Smaller */}
              <Card className="p-4 lg:col-span-1">
                <h3 className="font-semibold text-base mb-3 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                  <span>Calendar</span>
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  classNames={{
                    day_selected: "bg-blue-600 text-white hover:bg-blue-600",
                    day_today: "bg-blue-100 text-blue-600 font-semibold",
                    day: "hover:bg-blue-50 text-sm",
                    month: "text-sm",
                    caption: "text-sm",
                  }}
                />
                
                {/* Quick Stats - Smaller */}
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">This Month</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <div className="text-base font-bold text-green-600">{attendanceStats.presentDays}</div>
                      <div className="text-xs text-green-600">Present</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded-md">
                      <div className="text-base font-bold text-red-600">{attendanceStats.absentDays}</div>
                      <div className="text-xs text-red-600">Absent</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Attendance Records List - Improved */}
              <Card className="p-4 lg:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="font-semibold text-base flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                    <span>Daily Records</span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {monthlyAttendance.length} days
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {attendanceStats.percentage.toFixed(1)}% Present
                    </Badge>
                  </div>
                </div>

                {/* Filter Options - Compact */}
                <div className="flex items-center space-x-2 mb-3">
                  <Filter className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-600">Filter:</span>
                  <div className="flex space-x-1">
                    {["all", "present", "absent"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setRecordsFilter(filter)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                          recordsFilter === filter
                            ? filter === "present"
                              ? "bg-green-100 text-green-700"
                              : filter === "absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Records List - Compact */}
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {monthlyAttendance
                    .filter(record => recordsFilter === "all" || record.status === recordsFilter)
                    .map((record, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-3 transition-all hover:shadow-sm ${
                        record.status === "present"
                          ? "bg-green-50 border-l-green-500 hover:bg-green-100"
                          : "bg-red-50 border-l-red-500 hover:bg-red-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                record.status === "present" ? "bg-green-100" : "bg-red-100"
                              }`}
                            >
                              {record.status === "present" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                              <h4 className="font-medium text-sm text-gray-900 truncate">
                                {new Date(record.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </h4>
                              <Badge
                                size="sm"
                                variant={record.status === "present" ? "default" : "secondary"}
                                className={`text-xs w-fit ${
                                  record.status === "present"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                              >
                                {record.status === "present" ? "Present" : "Absent"}
                              </Badge>
                            </div>
                            
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                              {record.status === "present" ? (
                                <>
                                  <div className="flex items-center space-x-1 text-gray-600">
                                    <Clock className="h-3 w-3" />
                                    <span>{record.time}</span>
                                  </div>
                                  {record.method && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                      {getMethodIcon(record.method)}
                                      <span>{record.method}</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="text-gray-500">No record</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {record.time && (
                          <div className="flex-shrink-0 text-right">
                            <div className="text-sm font-bold text-gray-900">{record.time}</div>
                            <div className={`text-xs ${
                              new Date(`1970/01/01 ${record.time}`).getHours() >= 9
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}>
                              {new Date(`1970/01/01 ${record.time}`).getHours() >= 9 ? "Late" : "On time"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State for Filtered Results */}
                {monthlyAttendance.filter(record => 
                  recordsFilter === "all" || record.status === recordsFilter
                ).length === 0 && (
                  <div className="text-center py-12">
                    <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No records found
                    </h3>
                    <p className="text-gray-500">
                      {recordsFilter === "all" 
                        ? "No attendance records available"
                        : `No ${recordsFilter} records found`
                      }
                    </p>
                  </div>
                )}

                {/* Original Empty State */}
                {monthlyAttendance.length === 0 && (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No attendance records found
                    </h3>
                    <p className="text-gray-500">
                      Attendance records will appear here once you start marking attendance.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Monthly Overview Chart - Proper Calendar Layout */}
            <Card className="p-4">
              <h3 className="font-semibold text-base mb-3 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Monthly Overview</span>
              </h3>
              
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid with proper layout */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {(() => {
                  // Create a proper calendar layout
                  const today = new Date();
                  const year = today.getFullYear();
                  const month = today.getMonth(); // 0-indexed
                  
                  // Get first day of month and number of days
                  const firstDay = new Date(year, month, 1);
                  const lastDay = new Date(year, month + 1, 0);
                  const daysInMonth = lastDay.getDate();
                  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
                  
                  const calendarDays = [];
                  
                  // Add empty cells for days before the first day of the month
                  for (let i = 0; i < startDayOfWeek; i++) {
                    calendarDays.push(
                      <div key={`empty-${i}`} className="w-8 h-8"></div>
                    );
                  }
                  
                  // Add actual days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const record = monthlyAttendance.find(r => 
                      new Date(r.date).getDate() === day
                    );
                    
                    calendarDays.push(
                      <div
                        key={day}
                        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium cursor-pointer transition-all ${
                          record
                            ? record.status === "present"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                        title={
                          record
                            ? `${day}: ${record.status === "present" ? "Present" : "Absent"}${
                                record.time ? ` at ${record.time}` : ""
                              }`
                            : `${day}: No data`
                        }
                      >
                        {day}
                      </div>
                    );
                  }
                  
                  return calendarDays;
                })()}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center space-x-4 pt-2 border-t">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs text-gray-600">Present</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs text-gray-600">Absent</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 border rounded"></div>
                  <span className="text-xs text-gray-600">No Data</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Subject-wise Tab */}
          <TabsContent value="subjects" className="space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Award className="h-4 w-4 text-purple-600" />
                <span>Subject-wise Attendance</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subjectAttendance.map((subject, index) => (
                  <Card key={index} className="p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-base">{subject.subject}</h3>
                      <Badge className={`${getAttendanceColor(subject.percentage)} text-xs font-semibold`}>
                        {subject.percentage.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Present: {subject.present}</span>
                        <span>Total: {subject.total}</span>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold text-base mb-4 flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>Personal Information</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Student Name", value: studentInfo.name },
                    { label: "Student ID", value: studentInfo.id },
                    { label: "Class", value: studentInfo.class },
                    { label: "Roll Number", value: studentInfo.rollNo },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-base mb-4 flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <span>Attendance Methods</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="text-sm font-medium">NFC Card</div>
                        <div className="text-xs text-gray-500">{studentInfo.nfcId}</div>
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <QrCode className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">QR Code</div>
                        <div className="text-xs text-gray-500">{studentInfo.qrCode}</div>
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Camera className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="text-sm font-medium">Face Recognition</div>
                        <div className="text-xs text-gray-500">
                          {studentInfo.faceRegistered ? "Registered" : "Not Registered"}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={studentInfo.faceRegistered ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {studentInfo.faceRegistered ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attendance Guidelines - More Compact */}
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Attendance Guidelines</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                {[
                  "Minimum 75% attendance required for exam eligibility",
                  "Late arrivals (after 15 minutes) will be marked as late",
                  "Use any available method: NFC card, QR code, or face recognition",
                  "Contact class teacher for attendance discrepancies"
                ].map((guideline, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{guideline}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentAttendancePanel;
