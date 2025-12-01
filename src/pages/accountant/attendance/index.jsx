import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  UserCheck,
  QrCode,
  Wifi,
  Camera,
  FileText,
  Clock,
  Calendar,
  TrendingUp,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  User,
  Activity,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AccountantAttendanceHub = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayAttendance, setTodayAttendance] = useState(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate current user attendance data (accountant only)
  const accountantData = {
    id: "ACC001",
    name: "Sarah Johnson",
    role: "Senior Accountant",
    department: "Finance & Administration",
    employeeId: "EMP2024001",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
  };

  // Mock attendance data for current month
  const attendanceStats = {
    totalWorkingDays: 22,
    daysPresent: 20,
    daysAbsent: 1,
    daysLate: 1,
    attendancePercentage: 91,
    avgCheckInTime: "08:45 AM",
    avgCheckOutTime: "05:30 PM",
    totalWorkingHours: 176,
  };

  // Today's status
  const todayStatus = todayAttendance || "not_marked";

  const attendanceMethods = [
    {
      id: "staff",
      title: "Attendance Hub",
      description: "View and manage your attendance records",
      icon: <UserCheck className="h-8 w-8" />,
      color: "bg-blue-500",
      path: "/accountant/attendance/staff",
      status: "primary",
    },
    {
      id: "qr",
      title: "QR Code Check-In",
      description: "Quick attendance using QR code scanning",
      icon: <QrCode className="h-8 w-8" />,
      color: "bg-purple-500",
      path: "/accountant/attendance/qr",
      status: "active",
    },
    {
      id: "nfc",
      title: "NFC Card",
      description: "Tap your NFC card for instant attendance",
      icon: <Wifi className="h-8 w-8" />,
      color: "bg-green-500",
      path: "/accountant/attendance/nfc",
      status: "available",
    },
    {
      id: "facial",
      title: "Facial Recognition",
      description: "Advanced biometric attendance system",
      icon: <Camera className="h-8 w-8" />,
      color: "bg-orange-500",
      path: "/accountant/attendance/facial-recognition",
      status: "beta",
    },
    {
      id: "manual",
      title: "Manual Log",
      description: "Manual attendance entry and corrections",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-gray-500",
      path: "/accountant/attendance/manual-log",
      status: "backup",
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      description: "View detailed attendance reports and analytics",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-indigo-500",
      path: "/accountant/attendance/reports",
      status: "insights",
    },
  ];

  const handleQuickCheckIn = () => {
    if (todayStatus === "not_marked") {
      setTodayAttendance("present");
      toast.success("Checked in successfully!", {
        description: `Welcome ${accountantData.name}! Your attendance has been recorded.`,
      });
    } else {
      toast.info("Already checked in today", {
        description: "You have already marked your attendance for today.",
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      primary: { variant: "default", label: "Main Hub" },
      active: { variant: "default", label: "Quick Access" },
      available: { variant: "outline", label: "Available" },
      beta: { variant: "secondary", label: "Beta" },
      backup: { variant: "outline", label: "Backup Method" },
      insights: { variant: "default", label: "Analytics" },
    };

    const config = statusConfig[status] || {
      variant: "outline",
      label: status,
    };

    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  const getTodayStatusIcon = () => {
    switch (todayStatus) {
      case "present":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "absent":
        return <XCircle className="h-6 w-6 text-red-600" />;
      case "late":
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <UserCheck className="text-blue-600" />
                Staff Attendance System
              </h1>
              <p className="text-gray-600">
                Manage your attendance and track work hours
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Current User Status */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
                    <img
                      src={accountantData.photo}
                      alt={accountantData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {accountantData.name}
                    </h2>
                    <p className="text-blue-100">{accountantData.role}</p>
                    <p className="text-blue-100 text-sm">
                      {accountantData.department} • ID:{" "}
                      {accountantData.employeeId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    {getTodayStatusIcon()}
                    <span className="font-semibold">
                      {todayStatus === "not_marked"
                        ? "Not Marked"
                        : todayStatus.charAt(0).toUpperCase() +
                          todayStatus.slice(1)}
                    </span>
                  </div>
                  <Button
                    onClick={handleQuickCheckIn}
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    disabled={todayStatus !== "not_marked"}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {todayStatus === "not_marked"
                      ? "Quick Check-In"
                      : "Checked In"}
                  </Button>
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
                    <p className="text-2xl font-bold text-green-600">
                      {attendanceStats.daysPresent}/
                      {attendanceStats.totalWorkingDays}
                    </p>
                    <p className="text-xs text-gray-500">Days Present</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
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
                    <p className="text-2xl font-bold text-blue-600">
                      {attendanceStats.attendancePercentage}%
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
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
                      Avg Check-In
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {attendanceStats.avgCheckInTime}
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
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
                      Working Hours
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {attendanceStats.totalWorkingHours}h
                    </p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attendance Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Attendance Methods
            </CardTitle>
            <CardDescription>
              Choose your preferred method to mark attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attendanceMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`${method.color} p-3 rounded-lg text-white`}
                        >
                          {method.icon}
                        </div>
                        {getStatusBadge(method.status)}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {method.description}
                      </p>

                      <Button
                        onClick={() => navigate(method.path)}
                        variant="outline"
                        className="w-full group"
                      >
                        Access {method.title}
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  Attendance Policy Reminder
                </h3>
                <p className="text-yellow-700 text-sm">
                  Please ensure you mark your attendance daily before 9:00 AM.
                  Late arrivals should be reported to HR. For any attendance
                  corrections or issues, please contact the administration
                  office.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantAttendanceHub;
