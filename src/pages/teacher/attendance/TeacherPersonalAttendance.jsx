import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Play,
  Square,
  CheckCircle,
  XCircle,
  Calendar,
  Timer,
  User,
  MapPin,
  QrCode,
  Wifi,
  Camera,
  Settings,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const TeacherPersonalAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState({
    isPunchedIn: false,
    punchInTime: null,
    punchOutTime: null,
    todayStatus: "not_marked", // not_marked, present, late
    method: null,
  });
  const [activeMethod, setActiveMethod] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  // Mock teacher data
  const teacherData = {
    id: "TCH001",
    name: "John Smith",
    employeeId: "EMP2024001",
    department: "Mathematics",
    position: "Senior Teacher",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  // Attendance methods available for teachers
  const attendanceMethods = [
    {
      id: "manual",
      title: "Manual Punch",
      description: "Traditional punch in/out with buttons",
      icon: <Clock className="h-8 w-8" />,
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

  // Attendance history for current week
  const weeklyAttendance = [
    {
      date: "Monday",
      status: "present",
      punchIn: "08:30 AM",
      punchOut: "04:30 PM",
      hours: 8,
    },
    {
      date: "Tuesday",
      status: "present",
      punchIn: "08:25 AM",
      punchOut: "04:35 PM",
      hours: 8.2,
    },
    {
      date: "Wednesday",
      status: "present",
      punchIn: "08:35 AM",
      punchOut: "04:25 PM",
      hours: 7.8,
    },
    {
      date: "Thursday",
      status: "late",
      punchIn: "09:10 AM",
      punchOut: "05:10 PM",
      hours: 8,
    },
    {
      date: "Friday",
      status: "not_marked",
      punchIn: null,
      punchOut: null,
      hours: 0,
    },
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check if already checked in today (simulate)
  useEffect(() => {
    // Simulate checking existing attendance for today
    const today = new Date().toDateString();
    const existingAttendance = localStorage.getItem(
      `teacher_attendance_${today}`
    );

    if (existingAttendance) {
      const parsedAttendance = JSON.parse(existingAttendance);
      setAttendanceStatus({
        ...parsedAttendance,
        punchInTime: parsedAttendance.punchInTime
          ? new Date(parsedAttendance.punchInTime)
          : null,
        punchOutTime: parsedAttendance.punchOutTime
          ? new Date(parsedAttendance.punchOutTime)
          : null,
      });
    }
  }, []);

  const handlePunchIn = (method = "manual") => {
    const now = new Date();
    const workStartTime = new Date();
    workStartTime.setHours(9, 0, 0, 0); // 9:00 AM

    const isLate = now > workStartTime;
    const status = isLate ? "late" : "present";

    const newAttendance = {
      isPunchedIn: true,
      punchInTime: now,
      punchOutTime: null,
      todayStatus: status,
      method: method,
    };

    setAttendanceStatus(newAttendance);

    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(
      `teacher_attendance_${today}`,
      JSON.stringify({
        ...newAttendance,
        punchInTime: now.toISOString(),
      })
    );

    toast.success(
      isLate ? "Punched In - You're late today" : "Punched In successfully!",
      {
        description: `Welcome ${
          teacherData.name
        }! Method: ${method.toUpperCase()}`,
      }
    );
  };

  const handlePunchOut = (method = "manual") => {
    const now = new Date();

    const newAttendance = {
      ...attendanceStatus,
      isPunchedIn: false,
      punchOutTime: now,
    };

    setAttendanceStatus(newAttendance);

    // Update localStorage
    const today = new Date().toDateString();
    localStorage.setItem(
      `teacher_attendance_${today}`,
      JSON.stringify({
        ...newAttendance,
        punchInTime: attendanceStatus.punchInTime?.toISOString(),
        punchOutTime: now.toISOString(),
      })
    );

    const workingHours = attendanceStatus.punchInTime
      ? ((now - attendanceStatus.punchInTime) / 1000 / 60 / 60).toFixed(1)
      : 0;

    toast.success("Punched Out successfully!", {
      description: `Total working time: ${workingHours} hours`,
    });
  };

  const handleMethodSelect = (method) => {
    setActiveMethod(method.action);

    if (method.action === "manual") {
      if (!attendanceStatus.isPunchedIn) {
        handlePunchIn("manual");
      } else {
        handlePunchOut("manual");
      }
    } else if (method.action === "qr") {
      startQRScanning();
    } else if (method.action === "nfc") {
      startNFCScanning();
    } else if (method.action === "facial") {
      startFaceRecognition();
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
        if (!attendanceStatus.isPunchedIn) {
          handlePunchIn("qr");
        } else {
          handlePunchOut("qr");
        }
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
        if (!attendanceStatus.isPunchedIn) {
          handlePunchIn("nfc");
        } else {
          handlePunchOut("nfc");
        }
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
        if (!attendanceStatus.isPunchedIn) {
          handlePunchIn("face");
        } else {
          handlePunchOut("face");
        }
        setScanMessage("");
        setActiveMethod(null);
      }, 1000);
    }, 4000);
  };

  const formatTime = (date) => {
    return date
      ? date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--:--";
  };

  const getWorkingDuration = () => {
    if (!attendanceStatus.punchInTime) return "0 min";

    const endTime = attendanceStatus.punchOutTime || currentTime;
    const diffMs = endTime - attendanceStatus.punchInTime;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTodayStatusIcon = () => {
    switch (attendanceStatus.todayStatus) {
      case "present":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "late":
        return <Clock className="h-6 w-6 text-yellow-600" />;
      default:
        return <XCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getTodayStatusBadge = () => {
    switch (attendanceStatus.todayStatus) {
      case "present":
        return <Badge className="bg-green-500">✓ Present</Badge>;
      case "late":
        return <Badge className="bg-yellow-500">⏰ Late</Badge>;
      default:
        return <Badge variant="secondary">○ Not Marked</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <User className="text-blue-600" />
                My Attendance
              </h1>
              <p className="text-gray-600">
                Track your daily punch in/out times
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

          {/* Teacher Profile Card */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
                    <img
                      src={teacherData.photo}
                      alt={teacherData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{teacherData.name}</h2>
                    <p className="text-blue-100">{teacherData.position}</p>
                    <p className="text-blue-100 text-sm">
                      {teacherData.department} • ID: {teacherData.employeeId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    {getTodayStatusIcon()}
                    {getTodayStatusBadge()}
                  </div>
                  <div className="text-sm text-blue-100">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Main Campus
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Attendance Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {attendanceMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div
                          className={`${method.color} p-3 rounded-lg text-white mx-auto mb-3 w-fit`}
                        >
                          {method.icon}
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-4">
                          {method.description}
                        </p>

                        <Button
                          onClick={() => handleMethodSelect(method)}
                          variant="outline"
                          className="w-full group text-xs"
                          disabled={
                            isScanning && activeMethod === method.action
                          }
                          size="sm"
                        >
                          {isScanning && activeMethod === method.action
                            ? "Processing..."
                            : !attendanceStatus.isPunchedIn
                            ? `Punch In`
                            : attendanceStatus.punchOutTime
                            ? "Complete"
                            : `Punch Out`}
                          <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Punch System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Punch Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Attendance Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Status Display */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Punch In
                      </label>
                      <div className="text-xl font-bold text-gray-900">
                        {formatTime(attendanceStatus.punchInTime)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Punch Out
                      </label>
                      <div className="text-xl font-bold text-gray-900">
                        {formatTime(attendanceStatus.punchOutTime)}
                      </div>
                    </div>
                  </div>

                  {attendanceStatus.isPunchedIn && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Working Duration:
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {getWorkingDuration()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Punch Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={handlePunchIn}
                    disabled={attendanceStatus.isPunchedIn}
                    className="w-full h-14 text-lg"
                    size="lg"
                  >
                    <Play className="mr-2 h-6 w-6" />
                    {attendanceStatus.isPunchedIn
                      ? "Already Punched In"
                      : "Punch In"}
                  </Button>

                  <Button
                    onClick={handlePunchOut}
                    disabled={!attendanceStatus.isPunchedIn}
                    variant="destructive"
                    className="w-full h-14 text-lg"
                    size="lg"
                  >
                    <Square className="mr-2 h-6 w-6" />
                    {!attendanceStatus.isPunchedIn
                      ? "Not Punched In"
                      : "Punch Out"}
                  </Button>
                </div>

                {/* Status Message */}
                {attendanceStatus.punchInTime &&
                  attendanceStatus.punchOutTime && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Day Complete!
                        </span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Total working time: {getWorkingDuration()}
                      </p>
                    </motion.div>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Today's Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Timer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">
                      {getWorkingDuration()}
                    </div>
                    <div className="text-sm text-blue-700">Hours Worked</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    {getTodayStatusIcon()}
                    <div className="text-lg font-bold text-gray-900 mt-2">
                      {attendanceStatus.todayStatus === "present"
                        ? "On Time"
                        : attendanceStatus.todayStatus === "late"
                        ? "Late Entry"
                        : "Not Marked"}
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Standard Hours:</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Break Time:</span>
                      <span className="font-medium">1:00 PM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Hours:</span>
                      <span className="font-medium">8 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Attendance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weeklyAttendance.map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    day.status === "present"
                      ? "border-green-200 bg-green-50"
                      : day.status === "late"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 mb-2">
                      {day.date}
                    </div>

                    <div className="mb-3">
                      {day.status === "present" && (
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                      )}
                      {day.status === "late" && (
                        <Clock className="h-6 w-6 text-yellow-600 mx-auto" />
                      )}
                      {day.status === "not_marked" && (
                        <XCircle className="h-6 w-6 text-gray-400 mx-auto" />
                      )}
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-gray-600">
                        In: {day.punchIn || "--"}
                      </div>
                      <div className="text-gray-600">
                        Out: {day.punchOut || "--"}
                      </div>
                      <div className="font-semibold text-gray-900">
                        {day.hours}h
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Week Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-900">4/5</div>
                  <div className="text-sm text-blue-700">Days Present</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-900">31.8h</div>
                  <div className="text-sm text-blue-700">Total Hours</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-900">80%</div>
                  <div className="text-sm text-blue-700">Attendance Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPersonalAttendance;
