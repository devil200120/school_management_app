import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  User,
  MapPin,
  BookOpen,
  Award,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const StudentAttendanceDashboard = () => {
  const [currentDate] = useState(new Date());

  // Auto-fetched student data (simulated)
  const studentData = {
    id: "STD001",
    name: "John Doe",
    class: "10A", // Auto-fetched from student profile
    section: "Science", // Auto-fetched
    rollNo: "001",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  // Auto-calculated attendance stats
  const attendanceStats = {
    currentMonth: {
      totalDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateArrivals: 1,
      percentage: 91,
    },
    overall: {
      totalDays: 180,
      presentDays: 164,
      percentage: 91.1,
    },
  };

  // Today's attendance status
  const todayStatus = {
    isMarked: true,
    status: "present", // present, absent, late
    time: "08:45 AM",
    method: "Face Recognition",
  };

  // Recent attendance history (last 7 days)
  const recentAttendance = [
    {
      date: "Today",
      status: "present",
      time: "08:45 AM",
      method: "Face Recognition",
    },
    {
      date: "Yesterday",
      status: "present",
      time: "08:50 AM",
      method: "QR Code",
    },
    { date: "Nov 29", status: "late", time: "09:15 AM", method: "Manual" },
    { date: "Nov 28", status: "present", time: "08:40 AM", method: "NFC Card" },
    { date: "Nov 27", status: "absent", time: null, method: null },
    {
      date: "Nov 26",
      status: "present",
      time: "08:35 AM",
      method: "Face Recognition",
    },
    { date: "Nov 25", status: "present", time: "08:55 AM", method: "QR Code" },
  ];

  // Subject-wise attendance (auto-calculated)
  const subjectAttendance = [
    { subject: "Mathematics", present: 18, total: 20, percentage: 90 },
    { subject: "Physics", present: 16, total: 18, percentage: 89 },
    { subject: "Chemistry", present: 17, total: 19, percentage: 89 },
    { subject: "Biology", present: 15, total: 17, percentage: 88 },
    { subject: "English", present: 19, total: 20, percentage: 95 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "late":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "absent":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const configs = {
      present: {
        variant: "default",
        label: "Present",
        className: "bg-green-500",
      },
      late: { variant: "secondary", label: "Late", className: "bg-yellow-500" },
      absent: { variant: "destructive", label: "Absent" },
    };

    const config = configs[status] || { variant: "outline", label: "Unknown" };

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header - Auto-populated */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <User className="text-blue-600" />
                My Attendance
              </h1>
              <p className="text-gray-600">
                Track your daily attendance and performance
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-gray-600">
                {currentDate.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Student Profile Card - Auto-populated */}
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
                    <img
                      src={studentData.photo}
                      alt={studentData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{studentData.name}</h2>
                    <p className="text-blue-100">
                      Roll No: {studentData.rollNo}
                    </p>
                    <p className="text-blue-100 text-sm">
                      Class {studentData.class} • {studentData.section} • ID:{" "}
                      {studentData.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(todayStatus.status)}
                    {getStatusBadge(todayStatus.status)}
                  </div>
                  {todayStatus.isMarked && (
                    <div className="text-sm text-blue-100">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {todayStatus.time} via {todayStatus.method}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                      This Month
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {attendanceStats.currentMonth.presentDays}/
                      {attendanceStats.currentMonth.totalDays}
                    </p>
                    <p className="text-xs text-gray-500">Days Present</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
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
                      Attendance Rate
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {attendanceStats.currentMonth.percentage}%
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
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
                      Absent Days
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {attendanceStats.currentMonth.absentDays}
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
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
                      Late Arrivals
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {attendanceStats.currentMonth.lateArrivals}
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Attendance (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttendance.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <div className="font-medium text-gray-900">
                          {record.date}
                        </div>
                        <div className="text-sm text-gray-600">
                          {record.time
                            ? `${record.time} • ${record.method}`
                            : "Not marked"}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(record.status)}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subject-wise Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAttendance.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {subject.subject}
                      </span>
                      <div className="text-right">
                        <span
                          className={`font-bold ${getAttendanceColor(
                            subject.percentage
                          )}`}
                        >
                          {subject.percentage}%
                        </span>
                        <div className="text-xs text-gray-500">
                          {subject.present}/{subject.total} classes
                        </div>
                      </div>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Performance Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Overall Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {attendanceStats.overall.percentage}%
                </div>
                <div className="text-sm text-blue-700 font-medium">
                  Overall Attendance
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {attendanceStats.overall.presentDays}/
                  {attendanceStats.overall.totalDays} days
                </div>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {attendanceStats.currentMonth.percentage >= 90
                    ? "Excellent"
                    : attendanceStats.currentMonth.percentage >= 80
                    ? "Good"
                    : "Needs Improvement"}
                </div>
                <div className="text-sm text-green-700 font-medium">
                  Performance Grade
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Based on current month
                </div>
              </div>

              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {Math.max(0, 22 - attendanceStats.currentMonth.presentDays)}
                </div>
                <div className="text-sm text-indigo-700 font-medium">
                  Days Remaining
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  To complete this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Guidelines */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">
                  Attendance Guidelines
                </h3>
                <div className="text-blue-700 text-sm space-y-1">
                  <p>• Minimum 75% attendance required for exam eligibility</p>
                  <p>
                    • 90% attendance qualifies you for academic excellence
                    awards
                  </p>
                  <p>• Late arrivals after 9:00 AM are marked as "Late"</p>
                  <p>
                    • Contact class teacher for any attendance discrepancies
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAttendanceDashboard;
