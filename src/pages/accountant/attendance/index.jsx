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
  const [punchStatus, setPunchStatus] = useState({
    isPunchedIn: false,
    punchInTime: null,
    punchOutTime: null,
    method: null,
  });
  const [activeMethod, setActiveMethod] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load existing attendance data
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Use YYYY-MM-DD format
    const existingAttendance = localStorage.getItem(
      `accountant_attendance_${today}`
    );

    if (existingAttendance) {
      try {
        const parsedAttendance = JSON.parse(existingAttendance);
        console.log("Loaded attendance data:", parsedAttendance); // Debug log

        setPunchStatus({
          isPunchedIn: parsedAttendance.isPunchedIn || false,
          punchInTime: parsedAttendance.punchInTime
            ? new Date(parsedAttendance.punchInTime)
            : null,
          punchOutTime: parsedAttendance.punchOutTime
            ? new Date(parsedAttendance.punchOutTime)
            : null,
          method: parsedAttendance.method || "manual",
        });
        setTodayAttendance(parsedAttendance.status || "not_marked");
      } catch (error) {
        console.error("Error parsing attendance data:", error);
      }
    }
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

  // Calculate real attendance data from localStorage
  const getAttendanceStats = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let daysPresent = 0;
    let daysLate = 0;
    let totalWorkingHours = 0;
    let checkInTimes = [];
    let checkOutTimes = [];

    // Count weekdays only (excluding weekends)
    let workingDays = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        // Not Sunday or Saturday
        workingDays++;

        const dateStr = date.toISOString().split("T")[0];
        const dayData = localStorage.getItem(
          `accountant_attendance_${dateStr}`
        );

        if (dayData) {
          try {
            const parsed = JSON.parse(dayData);
            if (parsed.status === "present" || parsed.status === "late") {
              daysPresent++;
              if (parsed.status === "late") daysLate++;

              if (parsed.punchInTime) {
                const punchIn = new Date(parsed.punchInTime);
                checkInTimes.push(punchIn);
              }

              if (parsed.punchOutTime) {
                const punchOut = new Date(parsed.punchOutTime);
                checkOutTimes.push(punchOut);

                if (parsed.punchInTime) {
                  const hours =
                    (punchOut - new Date(parsed.punchInTime)) /
                    (1000 * 60 * 60);
                  totalWorkingHours += hours;
                }
              }
            }
          } catch (error) {
            console.error("Error parsing day data:", error);
          }
        }
      }
    }

    const daysAbsent = workingDays - daysPresent;
    const attendancePercentage =
      workingDays > 0 ? Math.round((daysPresent / workingDays) * 100) : 0;

    // Calculate average times
    const avgCheckIn =
      checkInTimes.length > 0
        ? new Date(
            checkInTimes.reduce((sum, time) => sum + time.getTime(), 0) /
              checkInTimes.length
          )
        : null;

    const avgCheckOut =
      checkOutTimes.length > 0
        ? new Date(
            checkOutTimes.reduce((sum, time) => sum + time.getTime(), 0) /
              checkOutTimes.length
          )
        : null;

    return {
      totalWorkingDays: workingDays,
      daysPresent,
      daysAbsent,
      daysLate,
      attendancePercentage,
      avgCheckInTime: avgCheckIn
        ? avgCheckIn.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        : "Not available",
      avgCheckOutTime: avgCheckOut
        ? avgCheckOut.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        : "Not available",
      totalWorkingHours: Math.round(totalWorkingHours),
    };
  };

  const attendanceStats = getAttendanceStats();

  // Today's status
  const todayStatus = todayAttendance || "not_marked";

  const attendanceMethods = [
    {
      id: "manual",
      title: "Manual Punch",
      description: "Traditional punch in/out with buttons",
      icon: <UserCheck className="h-8 w-8" />,
      color: "bg-blue-500",
      action: "manual",
      status: "primary",
    },
    {
      id: "qr",
      title: "QR Code Punch",
      description: "Scan your personal QR code to punch in/out",
      icon: <QrCode className="h-8 w-8" />,
      color: "bg-purple-500",
      action: "qr",
      status: "active",
    },
    {
      id: "nfc",
      title: "NFC Card Punch",
      description: "Tap your personal NFC card to punch in/out",
      icon: <Wifi className="h-8 w-8" />,
      color: "bg-green-500",
      action: "nfc",
      status: "available",
    },
    {
      id: "facial",
      title: "Face Recognition Punch",
      description: "Use face recognition for punch in/out",
      icon: <Camera className="h-8 w-8" />,
      color: "bg-orange-500",
      action: "facial",
      status: "beta",
    },
  ];

  const handlePunchAction = (method = "manual") => {
    const now = new Date();
    const workStartTime = new Date();
    workStartTime.setHours(9, 0, 0, 0); // 9:00 AM

    if (!punchStatus.isPunchedIn) {
      // Punch In
      const isLate = now > workStartTime;
      const status = isLate ? "late" : "present";

      setPunchStatus({
        isPunchedIn: true,
        punchInTime: now,
        punchOutTime: null,
        method: method,
      });

      setTodayAttendance(status);

      const today = new Date().toISOString().split("T")[0];
      const attendanceData = {
        isPunchedIn: true,
        punchInTime: now.toISOString(),
        punchOutTime: null,
        method: method,
        status: status,
        date: today,
        employeeId: accountantData.employeeId,
        employeeName: accountantData.name,
      };
      localStorage.setItem(
        `accountant_attendance_${today}`,
        JSON.stringify(attendanceData)
      );
      console.log("Saved punch in data:", attendanceData); // Debug log

      toast.success(
        isLate ? "Punched In - You're late today" : "Punched In successfully!",
        {
          description: `Welcome ${
            accountantData.name
          }! Method: ${method.toUpperCase()}`,
        }
      );
    } else {
      // Punch Out
      const workingHours = (
        (now - punchStatus.punchInTime) /
        1000 /
        60 /
        60
      ).toFixed(1);

      setPunchStatus({
        ...punchStatus,
        isPunchedIn: false,
        punchOutTime: now,
      });

      const today = new Date().toISOString().split("T")[0];
      const existingData = JSON.parse(
        localStorage.getItem(`accountant_attendance_${today}`) || "{}"
      );
      const updatedData = {
        ...existingData,
        isPunchedIn: false,
        punchOutTime: now.toISOString(),
      };
      localStorage.setItem(
        `accountant_attendance_${today}`,
        JSON.stringify(updatedData)
      );
      console.log("Saved punch out data:", updatedData); // Debug log

      toast.success("Punched Out successfully!", {
        description: `Total working time: ${workingHours} hours`,
      });
    }
  };

  const handleMethodSelect = (method) => {
    setActiveMethod(method.action);

    if (method.action === "manual") {
      handlePunchAction("manual");
    } else if (method.action === "qr") {
      startQRScanning();
    } else if (method.action === "nfc") {
      startNFCScanning();
    } else if (method.action === "facial") {
      startFaceRecognition();
    } else if (method.path) {
      navigate(method.path);
    }
  };

  const startQRScanning = () => {
    setIsScanning(true);
    setScanMessage("📱 Position your personal QR code in front of camera...");

    // Simulate QR scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage("✅ QR Code detected! Processing...");
      setTimeout(() => {
        handlePunchAction("qr");
        setScanMessage("");
        setActiveMethod(null);
      }, 1000);
    }, 3000);
  };

  const startNFCScanning = () => {
    setIsScanning(true);
    setScanMessage("💳 Tap your personal NFC card on the reader...");

    // Simulate NFC scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage("✅ NFC Card detected! Processing...");
      setTimeout(() => {
        handlePunchAction("nfc");
        setScanMessage("");
        setActiveMethod(null);
      }, 1000);
    }, 2000);
  };

  const startFaceRecognition = () => {
    setIsScanning(true);
    setScanMessage("👤 Look at the camera for face recognition...");

    // Simulate face recognition
    setTimeout(() => {
      setIsScanning(false);
      setScanMessage("✅ Face recognized! Processing...");
      setTimeout(() => {
        handlePunchAction("face");
        setScanMessage("");
        setActiveMethod(null);
      }, 1000);
    }, 4000);
  };

  const handleQuickCheckIn = () => {
    handlePunchAction("manual");
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
                Personal Attendance
              </h1>
              <p className="text-gray-600">
                Track your personal work hours and attendance
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
                      {!punchStatus.isPunchedIn && !punchStatus.punchOutTime
                        ? "Not Punched"
                        : punchStatus.punchOutTime
                        ? "Day Complete"
                        : "Punched In"}
                    </span>
                  </div>
                  {punchStatus.punchInTime && (
                    <div className="text-sm text-blue-100 mt-1">
                      In: {punchStatus.punchInTime.toLocaleTimeString()}
                      {punchStatus.punchOutTime && (
                        <>
                          {" "}
                          • Out: {punchStatus.punchOutTime.toLocaleTimeString()}
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      Refresh Data
                    </Button>
                    <Button
                      onClick={handleQuickCheckIn}
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                      disabled={
                        punchStatus.isPunchedIn && !punchStatus.punchOutTime
                      }
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {!punchStatus.isPunchedIn
                        ? "Quick Punch In"
                        : punchStatus.punchOutTime
                        ? "Day Complete"
                        : "Quick Punch Out"}
                    </Button>
                  </div>
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

        {/* Scanning Status */}
        {scanMessage && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">
                    {activeMethod?.toUpperCase()} Attendance
                  </h3>
                  <p className="text-blue-700 text-sm">{scanMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Attendance Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Personal Punch Methods
            </CardTitle>
            <CardDescription>
              Choose your preferred method to punch in/out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        onClick={() => handleMethodSelect(method)}
                        variant="outline"
                        className="w-full group"
                        disabled={isScanning && activeMethod === method.action}
                      >
                        {isScanning && activeMethod === method.action
                          ? "Processing..."
                          : method.path
                          ? `View ${method.title}`
                          : !punchStatus.isPunchedIn
                          ? `Punch In via ${method.title}`
                          : punchStatus.punchOutTime
                          ? "Day Complete"
                          : `Punch Out via ${method.title}`}
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
                  Personal Attendance Reminder
                </h3>
                <p className="text-yellow-700 text-sm">
                  Please ensure you punch in daily before 9:00 AM using any of
                  the available methods. Late arrivals will be automatically
                  flagged. For attendance corrections or technical issues,
                  please contact the HR department.
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
