import React, { useState, useEffect } from "react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Clock,
  CreditCard,
  QrCode,
  Camera,
  DollarSign,
  FileText,
  Download,
  Timer,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  TrendingUp,
  Play,
  Square,
  Radio,
  Smartphone,
  Eye,
  Settings,
  AlertCircle,
  BarChart3,
  Printer,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

// Mock teacher data
const teacherData = {
  id: "TCH001",
  name: "John Smith",
  department: "Mathematics",
  employeeId: "EMP2024001",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  position: "Senior Teacher",
  joinDate: "2020-01-15",
  nfcCard: "NFC_TCH001",
  qrCode: "QR_TCH001",
  faceId: "FACE_TCH001",
};

// Salary configuration in Naira (₦)
const salaryConfig = {
  basicSalary: 180000, // ₦180,000 basic salary
  allowances: {
    transport: 25000,
    housing: 30000,
    meal: 15000,
    medical: 10000,
  },
  deductions: {
    tax: 0.075, // 7.5% tax
    pension: 0.08, // 8% pension
    nhis: 1200, // ₦1,200 NHIS
  },
  attendanceBonus: 0.05, // 5% bonus for 100% attendance
  hourlyRate: 1200, // ₦1,200 per hour for overtime
  currency: "₦",
};

const EnhancedTeacherAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchStatus, setPunchStatus] = useState({
    isPunchedIn: false,
    punchInTime: null,
    punchOutTime: null,
    totalHours: 0,
  });

  // Attendance methods
  const [attendanceMethod, setAttendanceMethod] = useState("manual");
  const [nfcReaderActive, setNfcReaderActive] = useState(false);
  const [qrScannerActive, setQrScannerActive] = useState(false);
  const [faceRecognitionActive, setFaceRecognitionActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [faceDetectionConfidence, setFaceDetectionConfidence] = useState(0);

  // Attendance records
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      date: "2024-11-25",
      status: "present",
      punchIn: "08:15",
      punchOut: "16:30",
      hours: 8.25,
      method: "manual",
    },
    {
      id: 2,
      date: "2024-11-24",
      status: "present",
      punchIn: "08:10",
      punchOut: "16:25",
      hours: 8.25,
      method: "nfc",
    },
    {
      id: 3,
      date: "2024-11-23",
      status: "present",
      punchIn: "08:20",
      punchOut: "16:40",
      hours: 8.33,
      method: "face",
    },
    {
      id: 4,
      date: "2024-11-22",
      status: "present",
      punchIn: "08:05",
      punchOut: "16:35",
      hours: 8.5,
      method: "qr",
    },
    {
      id: 5,
      date: "2024-11-21",
      status: "present",
      punchIn: "08:25",
      punchOut: "16:20",
      hours: 7.92,
      method: "manual",
    },
  ]);

  // Salary calculation states
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [showPayslip, setShowPayslip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Calculate working hours if punched in
      if (punchStatus.isPunchedIn && punchStatus.punchInTime) {
        const hours = (new Date() - punchStatus.punchInTime) / (1000 * 60 * 60);
        setPunchStatus((prev) => ({ ...prev, totalHours: hours }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [punchStatus.isPunchedIn, punchStatus.punchInTime]);

  // Attendance Methods
  const handleManualPunch = (action) => {
    const now = new Date();
    if (action === "in") {
      setPunchStatus({
        isPunchedIn: true,
        punchInTime: now,
        punchOutTime: null,
        totalHours: 0,
      });
      toast.success("Punched in successfully");
    } else if (action === "out") {
      const hours = (now - punchStatus.punchInTime) / (1000 * 60 * 60);
      setPunchStatus((prev) => ({
        ...prev,
        isPunchedIn: false,
        punchOutTime: now,
        totalHours: hours,
      }));

      // Add to attendance records
      setAttendanceRecords((prev) => [
        ...prev,
        {
          id: Date.now(),
          date: now.toISOString().split("T")[0],
          status: "present",
          punchIn: punchStatus.punchInTime.toTimeString().slice(0, 5),
          punchOut: now.toTimeString().slice(0, 5),
          hours: hours,
          method: attendanceMethod,
        },
      ]);

      toast.success(
        `Punched out successfully. Worked ${hours.toFixed(2)} hours`
      );
    }
  };

  const handleNFCPunch = async () => {
    setNfcReaderActive(true);
    toast.info("NFC reader activated - Tap your card");

    // Simulate NFC scanning
    setTimeout(() => {
      const action = punchStatus.isPunchedIn ? "out" : "in";
      handleManualPunch(action);
      setNfcReaderActive(false);
      toast.success(`NFC punch ${action} successful`);
    }, 2000);
  };

  const handleQRPunch = () => {
    setQrScannerActive(true);
    toast.info("QR scanner activated - Show your QR code");

    // Simulate QR scanning
    setTimeout(() => {
      const action = punchStatus.isPunchedIn ? "out" : "in";
      handleManualPunch(action);
      setQrScannerActive(false);
      toast.success(`QR punch ${action} successful`);
    }, 3000);
  };

  const handleFacePunch = async () => {
    setFaceRecognitionActive(true);
    setFaceDetectionConfidence(0);
    toast.info("Face recognition activated - Look at the camera");

    try {
      // Simulate camera access
      setCameraStream("active");

      // Simulate face detection
      const detectionInterval = setInterval(() => {
        setFaceDetectionConfidence((prev) => {
          const newConfidence = Math.min(prev + Math.random() * 25, 100);

          if (newConfidence > 85) {
            clearInterval(detectionInterval);
            const action = punchStatus.isPunchedIn ? "out" : "in";
            handleManualPunch(action);
            setFaceRecognitionActive(false);
            setFaceDetectionConfidence(0);
            setCameraStream(null);
            toast.success(`Face recognition punch ${action} successful`);
          }

          return newConfidence;
        });
      }, 500);

      // Timeout after 15 seconds
      setTimeout(() => {
        if (faceRecognitionActive) {
          clearInterval(detectionInterval);
          setFaceRecognitionActive(false);
          setFaceDetectionConfidence(0);
          setCameraStream(null);
          toast.error("Face recognition timeout");
        }
      }, 15000);
    } catch (error) {
      toast.error("Camera access denied");
      setFaceRecognitionActive(false);
    }
  };

  // Salary Calculations
  const calculateSalary = (month) => {
    const monthRecords = attendanceRecords.filter((record) =>
      record.date.startsWith(month)
    );

    const totalWorkingDays = 22; // Standard working days per month
    const presentDays = monthRecords.filter(
      (r) => r.status === "present"
    ).length;
    const totalHours = monthRecords.reduce((sum, r) => sum + (r.hours || 0), 0);
    const attendancePercentage = (presentDays / totalWorkingDays) * 100;

    // Basic calculations
    const basicSalary = salaryConfig.basicSalary;
    const totalAllowances = Object.values(salaryConfig.allowances).reduce(
      (sum, val) => sum + val,
      0
    );

    // Attendance-based adjustments
    const attendanceRatio = presentDays / totalWorkingDays;
    const adjustedBasic = basicSalary * attendanceRatio;
    const adjustedAllowances = totalAllowances * attendanceRatio;

    // Bonus for perfect attendance
    const attendanceBonus =
      attendancePercentage >= 100
        ? basicSalary * salaryConfig.attendanceBonus
        : 0;

    // Overtime (hours > 176 per month)
    const standardHours = 176; // 8 hours * 22 days
    const overtimeHours = Math.max(0, totalHours - standardHours);
    const overtimePay = overtimeHours * salaryConfig.hourlyRate;

    // Gross salary
    const grossSalary =
      adjustedBasic + adjustedAllowances + attendanceBonus + overtimePay;

    // Deductions
    const tax = grossSalary * salaryConfig.deductions.tax;
    const pension = grossSalary * salaryConfig.deductions.pension;
    const nhis = salaryConfig.deductions.nhis;
    const totalDeductions = tax + pension + nhis;

    // Net salary
    const netSalary = grossSalary - totalDeductions;

    return {
      month,
      presentDays,
      totalWorkingDays,
      totalHours: totalHours.toFixed(2),
      attendancePercentage: attendancePercentage.toFixed(1),
      basicSalary: adjustedBasic,
      allowances: {
        transport: salaryConfig.allowances.transport * attendanceRatio,
        housing: salaryConfig.allowances.housing * attendanceRatio,
        meal: salaryConfig.allowances.meal * attendanceRatio,
        medical: salaryConfig.allowances.medical * attendanceRatio,
      },
      attendanceBonus,
      overtimeHours: overtimeHours.toFixed(2),
      overtimePay,
      grossSalary,
      deductions: {
        tax,
        pension,
        nhis,
      },
      totalDeductions,
      netSalary,
    };
  };

  const currentSalary = calculateSalary(selectedMonth);

  const generatePayslip = () => {
    setShowPayslip(true);
    toast.success("Payslip generated successfully");
  };

  const printPayslip = () => {
    window.print();
    toast.success("Payslip sent to printer");
  };

  const formatCurrency = (amount) => {
    return `${salaryConfig.currency}${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Attendance System</h1>
          <p className="text-gray-600">
            Manage your attendance and view salary calculations
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-lg font-semibold">
            {currentTime.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </div>

      <Tabs defaultValue="punch" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="punch" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Punch System</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Attendance Records</span>
          </TabsTrigger>
          <TabsTrigger value="salary" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Salary View</span>
          </TabsTrigger>
          <TabsTrigger value="payslip" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Payslip</span>
          </TabsTrigger>
        </TabsList>

        {/* Punch System Tab */}
        <TabsContent value="punch" className="space-y-6">
          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              className={`${
                punchStatus.isPunchedIn
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Timer className="h-4 w-4" />
                  <span>Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={punchStatus.isPunchedIn ? "default" : "secondary"}
                  className="mb-2"
                >
                  {punchStatus.isPunchedIn ? "Punched In" : "Punched Out"}
                </Badge>
                <p className="text-xs text-gray-600">
                  {punchStatus.isPunchedIn
                    ? "Currently working"
                    : "Not at work"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Punch In</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {formatTime(punchStatus.punchInTime)}
                </p>
                <p className="text-xs text-gray-600">Today's start time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Square className="h-4 w-4" />
                  <span>Punch Out</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {formatTime(punchStatus.punchOutTime)}
                </p>
                <p className="text-xs text-gray-600">Today's end time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Hours Worked</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {punchStatus.totalHours.toFixed(2)}h
                </p>
                <p className="text-xs text-gray-600">Today's total</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Punch In/Out Methods</CardTitle>
              <CardDescription>
                Choose your preferred attendance marking method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Method
                  </label>
                  <Select
                    value={attendanceMethod}
                    onValueChange={setAttendanceMethod}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Punch</SelectItem>
                      <SelectItem value="nfc">NFC Card</SelectItem>
                      <SelectItem value="qr">QR Code</SelectItem>
                      <SelectItem value="face">Face Recognition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Manual Punch */}
              {attendanceMethod === "manual" && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Manual Attendance</span>
                  </h4>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => handleManualPunch("in")}
                      disabled={punchStatus.isPunchedIn}
                      className="flex items-center space-x-2"
                      size="lg"
                    >
                      <Play className="h-4 w-4" />
                      <span>Punch In</span>
                    </Button>
                    <Button
                      onClick={() => handleManualPunch("out")}
                      disabled={!punchStatus.isPunchedIn}
                      variant="destructive"
                      className="flex items-center space-x-2"
                      size="lg"
                    >
                      <Square className="h-4 w-4" />
                      <span>Punch Out</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* NFC Punch */}
              {attendanceMethod === "nfc" && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>NFC Card Attendance</span>
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    {nfcReaderActive ? (
                      <div className="text-center">
                        <div className="animate-pulse mb-3">
                          <CreditCard className="h-12 w-12 text-blue-600 mx-auto" />
                        </div>
                        <p className="text-blue-700 font-medium">
                          NFC Reader Active
                        </p>
                        <p className="text-sm text-blue-600">
                          Tap your employee card on the reader
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <Button
                          onClick={handleNFCPunch}
                          className="flex items-center space-x-2"
                        >
                          <Radio className="h-4 w-4" />
                          <span>Activate NFC Reader</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* QR Code Punch */}
              {attendanceMethod === "qr" && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center space-x-2">
                    <QrCode className="h-4 w-4" />
                    <span>QR Code Attendance</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      {qrScannerActive ? (
                        <div className="text-center">
                          <div className="animate-pulse mb-3">
                            <Smartphone className="h-12 w-12 text-purple-600 mx-auto" />
                          </div>
                          <p className="text-purple-700 font-medium">
                            QR Scanner Active
                          </p>
                          <p className="text-sm text-purple-600">
                            Show your QR code to the camera
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <Button
                            onClick={handleQRPunch}
                            className="flex items-center space-x-2"
                          >
                            <QrCode className="h-4 w-4" />
                            <span>Scan QR Code</span>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <h5 className="font-medium mb-3">Your QR Code</h5>
                      <div className="flex justify-center">
                        <QRCode
                          value={`TEACHER:${teacherData.qrCode}:${teacherData.employeeId}`}
                          size={128}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "128px",
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Employee: {teacherData.employeeId}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Face Recognition Punch */}
              {attendanceMethod === "face" && (
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Face Recognition Attendance</span>
                  </h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    {faceRecognitionActive ? (
                      <div className="text-center">
                        <div className="relative mb-4">
                          <Camera className="h-12 w-12 text-green-600 mx-auto" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-200 to-transparent animate-pulse rounded-full"></div>
                        </div>
                        <p className="text-green-700 font-medium">
                          Face Recognition Active
                        </p>
                        <p className="text-sm text-green-600 mb-3">
                          Look directly at the camera
                        </p>

                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${faceDetectionConfidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {faceDetectionConfidence.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <Button
                          onClick={handleFacePunch}
                          className="flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Start Face Recognition</span>
                        </Button>
                        <p className="text-xs text-gray-600 mt-2">
                          Ensure good lighting and look directly at camera
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Records Tab */}
        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Your recent attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceRecords
                  .slice(-10)
                  .reverse()
                  .map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {record.method === "manual" && (
                            <User className="h-4 w-4 text-gray-600" />
                          )}
                          {record.method === "nfc" && (
                            <CreditCard className="h-4 w-4 text-blue-600" />
                          )}
                          {record.method === "qr" && (
                            <QrCode className="h-4 w-4 text-purple-600" />
                          )}
                          {record.method === "face" && (
                            <Camera className="h-4 w-4 text-green-600" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {record.method.toUpperCase()}
                          </Badge>
                        </div>

                        <div>
                          <Badge
                            variant={
                              record.status === "present"
                                ? "default"
                                : "destructive"
                            }
                            className="mb-1"
                          >
                            {record.status === "present"
                              ? "✓ Present"
                              : "✗ Absent"}
                          </Badge>
                          <div className="flex space-x-2 text-sm text-gray-600">
                            {record.punchIn && (
                              <span>In: {record.punchIn}</span>
                            )}
                            {record.punchOut && (
                              <span>Out: {record.punchOut}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">
                          {record.hours?.toFixed(2)}h
                        </p>
                        <p className="text-sm text-gray-600">worked</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary View Tab */}
        <TabsContent value="salary" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Salary Calculation</h2>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Select Month:</label>
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-40"
              />
            </div>
          </div>

          {/* Salary Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Attendance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {currentSalary.attendancePercentage}%
                </p>
                <p className="text-xs text-blue-700">
                  {currentSalary.presentDays}/{currentSalary.totalWorkingDays}{" "}
                  days
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Hours Worked</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {currentSalary.totalHours}h
                </p>
                <p className="text-xs text-green-700">
                  +{currentSalary.overtimeHours}h overtime
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Gross Salary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(currentSalary.grossSalary)}
                </p>
                <p className="text-xs text-purple-700">Before deductions</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Net Salary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(currentSalary.netSalary)}
                </p>
                <p className="text-xs text-orange-700">Take home pay</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Salary Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Earnings Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Basic Salary</span>
                  <span className="font-medium">
                    {formatCurrency(currentSalary.basicSalary)}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Allowances:
                  </p>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Transport</span>
                      <span>
                        {formatCurrency(currentSalary.allowances.transport)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Housing</span>
                      <span>
                        {formatCurrency(currentSalary.allowances.housing)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Meal</span>
                      <span>
                        {formatCurrency(currentSalary.allowances.meal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Medical</span>
                      <span>
                        {formatCurrency(currentSalary.allowances.medical)}
                      </span>
                    </div>
                  </div>
                </div>

                {currentSalary.attendanceBonus > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Attendance Bonus (5%)</span>
                    <span className="font-medium">
                      {formatCurrency(currentSalary.attendanceBonus)}
                    </span>
                  </div>
                )}

                {currentSalary.overtimePay > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Overtime Pay ({currentSalary.overtimeHours}h)</span>
                    <span className="font-medium">
                      {formatCurrency(currentSalary.overtimePay)}
                    </span>
                  </div>
                )}

                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Gross Total</span>
                    <span>{formatCurrency(currentSalary.grossSalary)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <XCircle className="h-5 w-5" />
                  <span>Deductions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Income Tax (7.5%)</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(currentSalary.deductions.tax)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Pension (8%)</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(currentSalary.deductions.pension)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>NHIS</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(currentSalary.deductions.nhis)}
                  </span>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-red-600">
                    <span>Total Deductions</span>
                    <span>
                      -{formatCurrency(currentSalary.totalDeductions)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-bold text-lg text-green-600">
                    <span>Net Salary</span>
                    <span>{formatCurrency(currentSalary.netSalary)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={generatePayslip}
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Generate Payslip</span>
            </Button>
          </div>
        </TabsContent>

        {/* Payslip Tab */}
        <TabsContent value="payslip" className="space-y-6">
          {showPayslip ? (
            <Card>
              <CardHeader className="text-center border-b">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">PAYSLIP</h2>
                    <p className="text-gray-600">Monthly Salary Statement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Pay Period</p>
                    <p className="font-semibold">
                      {new Date(selectedMonth).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Employee Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Employee Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">{teacherData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employee ID:</span>
                        <span className="font-medium">
                          {teacherData.employeeId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span className="font-medium">
                          {teacherData.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="font-medium">
                          {teacherData.position}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Attendance Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Working Days:</span>
                        <span className="font-medium">
                          {currentSalary.totalWorkingDays}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Days Present:</span>
                        <span className="font-medium">
                          {currentSalary.presentDays}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attendance %:</span>
                        <span className="font-medium">
                          {currentSalary.attendancePercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Hours:</span>
                        <span className="font-medium">
                          {currentSalary.totalHours}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-700">
                      Earnings
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Basic Salary:</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.basicSalary)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport Allowance:</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.allowances.transport)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Housing Allowance:</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.allowances.housing)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meal Allowance:</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.allowances.meal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical Allowance:</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.allowances.medical)}
                        </span>
                      </div>
                      {currentSalary.attendanceBonus > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Attendance Bonus:</span>
                          <span className="font-medium">
                            {formatCurrency(currentSalary.attendanceBonus)}
                          </span>
                        </div>
                      )}
                      {currentSalary.overtimePay > 0 && (
                        <div className="flex justify-between text-blue-600">
                          <span>Overtime Pay:</span>
                          <span className="font-medium">
                            {formatCurrency(currentSalary.overtimePay)}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Gross Salary:</span>
                        <span>{formatCurrency(currentSalary.grossSalary)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-red-700">
                      Deductions
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Income Tax (7.5%):</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.deductions.tax)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pension (8%):</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.deductions.pension)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>NHIS:</span>
                        <span className="font-medium">
                          {formatCurrency(currentSalary.deductions.nhis)}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Deductions:</span>
                        <span>
                          {formatCurrency(currentSalary.totalDeductions)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                    <span className="text-xl font-bold">NET SALARY:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(currentSalary.netSalary)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    Generated on:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={printPayslip}
                      className="flex items-center space-x-2"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No Payslip Generated
                </h3>
                <p className="text-gray-600 mb-4">
                  Generate your payslip from the Salary View tab to view it
                  here.
                </p>
                <Button
                  onClick={() => generatePayslip()}
                  className="flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Generate Current Month Payslip</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTeacherAttendance;
