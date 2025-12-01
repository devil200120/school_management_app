import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  BarChart3,
  ArrowLeft,
  Download,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  PieChart,
  Activity,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const AccountantAttendanceReports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Current accountant data
  const accountantData = {
    id: "ACC001",
    name: "Sarah Johnson",
    role: "Senior Accountant",
    department: "Finance & Administration",
    employeeId: "EMP2024001",
  };

  // Mock attendance data
  const attendanceData = [
    {
      date: "2024-12-01",
      status: "present",
      checkIn: "08:45",
      checkOut: "17:30",
      hours: 8.75,
    },
    {
      date: "2024-11-30",
      status: "late",
      checkIn: "09:15",
      checkOut: "17:45",
      hours: 8.5,
    },
    {
      date: "2024-11-29",
      status: "present",
      checkIn: "08:30",
      checkOut: "17:15",
      hours: 8.75,
    },
    {
      date: "2024-11-28",
      status: "absent",
      checkIn: null,
      checkOut: null,
      hours: 0,
    },
    {
      date: "2024-11-27",
      status: "present",
      checkIn: "08:40",
      checkOut: "17:20",
      hours: 8.67,
    },
    {
      date: "2024-11-26",
      status: "present",
      checkIn: "08:35",
      checkOut: "17:25",
      hours: 8.83,
    },
    {
      date: "2024-11-25",
      status: "present",
      checkIn: "08:50",
      checkOut: "17:30",
      hours: 8.67,
    },
    {
      date: "2024-11-24",
      status: "late",
      checkIn: "09:30",
      checkOut: "17:30",
      hours: 8.0,
    },
    {
      date: "2024-11-23",
      status: "present",
      checkIn: "08:45",
      checkOut: "17:15",
      hours: 8.5,
    },
    {
      date: "2024-11-22",
      status: "present",
      checkIn: "08:30",
      checkOut: "17:20",
      hours: 8.83,
    },
  ];

  // Calculate statistics based on selected period
  const calculateStats = () => {
    const today = new Date();
    let filteredData = attendanceData;

    if (selectedPeriod === "thisWeek") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      filteredData = attendanceData.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= weekStart;
      });
    } else if (selectedPeriod === "thisMonth") {
      filteredData = attendanceData.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear()
        );
      });
    } else if (selectedPeriod === "custom") {
      filteredData = attendanceData.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() + 1 === selectedMonth &&
          recordDate.getFullYear() === selectedYear
        );
      });
    }

    const totalDays = filteredData.length;
    const presentDays = filteredData.filter(
      (r) => r.status === "present"
    ).length;
    const lateDays = filteredData.filter((r) => r.status === "late").length;
    const absentDays = filteredData.filter((r) => r.status === "absent").length;
    const totalHours = filteredData.reduce(
      (sum, record) => sum + record.hours,
      0
    );
    const avgHoursPerDay =
      totalDays > 0 ? totalHours / (totalDays - absentDays) : 0;
    const attendanceRate =
      totalDays > 0
        ? Math.round(((presentDays + lateDays) / totalDays) * 100)
        : 0;

    // Calculate average check-in time
    const checkInTimes = filteredData
      .filter((r) => r.checkIn)
      .map((r) => {
        const [hours, minutes] = r.checkIn.split(":").map(Number);
        return hours + minutes / 60;
      });

    const avgCheckIn =
      checkInTimes.length > 0
        ? checkInTimes.reduce((sum, time) => sum + time, 0) /
          checkInTimes.length
        : 0;

    const avgCheckInFormatted =
      avgCheckIn > 0
        ? `${Math.floor(avgCheckIn)}:${String(
            Math.round((avgCheckIn % 1) * 60)
          ).padStart(2, "0")}`
        : "--:--";

    return {
      totalDays,
      presentDays,
      lateDays,
      absentDays,
      totalHours: Math.round(totalHours * 100) / 100,
      avgHoursPerDay: Math.round(avgHoursPerDay * 100) / 100,
      attendanceRate,
      avgCheckIn: avgCheckInFormatted,
      filteredData,
    };
  };

  const stats = calculateStats();

  // Chart data for attendance overview
  const pieChartData = [
    { name: "Present", value: stats.presentDays, color: "#10b981" },
    { name: "Late", value: stats.lateDays, color: "#f59e0b" },
    { name: "Absent", value: stats.absentDays, color: "#ef4444" },
  ];

  // Weekly trend data
  const weeklyTrendData = [
    { week: "Week 1", present: 4, late: 1, absent: 0, hours: 36 },
    { week: "Week 2", present: 5, late: 0, absent: 0, hours: 43 },
    { week: "Week 3", present: 4, late: 0, absent: 1, hours: 35 },
    { week: "Week 4", present: 4, late: 1, absent: 0, hours: 38 },
  ];

  const handleExportReport = () => {
    const reportData = {
      employee: accountantData,
      period: selectedPeriod,
      statistics: stats,
      attendanceRecords: stats.filteredData,
      generatedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance-report-${accountantData.employeeId}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Report exported successfully!");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      present: {
        variant: "default",
        label: "Present",
        className: "bg-green-100 text-green-800",
      },
      absent: {
        variant: "destructive",
        label: "Absent",
        className: "bg-red-100 text-red-800",
      },
      late: {
        variant: "secondary",
        label: "Late",
        className: "bg-yellow-100 text-yellow-800",
      },
    };

    const { variant, label, className } = config[status] || {
      variant: "outline",
      label: status,
    };

    return (
      <Badge variant={variant} className={className}>
        {label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/accountant/attendance")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Hub
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="text-indigo-600" />
                Attendance Reports & Analytics
              </h1>
              <p className="text-gray-600">
                Detailed insights into your attendance patterns and performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExportReport}>
                <Download size={16} className="mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Period Selection */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Report Period:</span>
              </div>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>

              {selectedPeriod === "custom" && (
                <>
                  <Select
                    value={selectedMonth.toString()}
                    onValueChange={(value) => setSelectedMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedYear.toString()}
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2023, 2024, 2025].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employee Info */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {accountantData.name}
                </h2>
                <p className="text-indigo-700 font-medium">
                  {accountantData.role}
                </p>
                <p className="text-gray-600">{accountantData.department}</p>
                <p className="text-gray-600 text-sm">
                  Employee ID: {accountantData.employeeId}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">
                  {stats.attendanceRate}%
                </div>
                <div className="text-sm text-gray-600">Attendance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Days
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalDays}
                    </p>
                    <p className="text-xs text-gray-500">Working days</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Present Days
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.presentDays}
                    </p>
                    <p className="text-xs text-gray-500">On time arrivals</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Hours
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {stats.totalHours}h
                    </p>
                    <p className="text-xs text-gray-500">Working hours</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg. Check-in
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {stats.avgCheckIn}
                    </p>
                    <p className="text-xs text-gray-500">Average time</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Attendance Distribution
              </CardTitle>
              <CardDescription>Breakdown of attendance status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Trend
              </CardTitle>
              <CardDescription>
                Weekly attendance and hours worked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" name="Present" />
                  <Bar dataKey="late" fill="#f59e0b" name="Late" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detailed Attendance Records
            </CardTitle>
            <CardDescription>
              Complete record of attendance for the selected period (
              {stats.totalDays} days)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours Worked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No attendance records found for the selected period
                      </TableCell>
                    </TableRow>
                  ) : (
                    stats.filteredData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            {getStatusBadge(record.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {record.checkIn ? (
                            <span className="font-mono">{record.checkIn}</span>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.checkOut ? (
                            <span className="font-mono">{record.checkOut}</span>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {record.hours > 0 ? `${record.hours}h` : "--"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="mt-6 border-indigo-200 bg-indigo-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {stats.attendanceRate}%
                </div>
                <div className="text-sm text-indigo-800">
                  Overall Attendance Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {stats.avgHoursPerDay}h
                </div>
                <div className="text-sm text-indigo-800">
                  Average Hours per Day
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {stats.lateDays}
                </div>
                <div className="text-sm text-indigo-800">Late Arrivals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantAttendanceReports;
